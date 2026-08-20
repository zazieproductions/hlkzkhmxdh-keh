import { useCallback, useEffect, useRef, useState } from "react";
import { POPUP_BODIES, POPUP_TITLES, glyphString, randomNeon, randomOf } from "../lib/occult";

type PopupData = {
  id: number;
  x: number;
  y: number;
  title: string;
  body: string;
  hydra: boolean;
  tone: string;
};

let nextId = 1;

function makePopup(custom?: { title: string; body: string }): PopupData {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return {
    id: nextId++,
    x: Math.max(8, Math.random() * Math.max(40, w - 380)),
    y: Math.max(64, Math.random() * Math.max(120, h - 340)),
    title: custom?.title ?? randomOf(POPUP_TITLES),
    body: custom?.body ?? randomOf(POPUP_BODIES),
    hydra: Math.random() < 0.35,
    tone: randomNeon(),
  };
}

function PopupWindow({
  data,
  onClose,
}: {
  data: PopupData;
  onClose: (id: number, hydra: boolean) => void;
}) {
  const [pos, setPos] = useState({ x: data.x, y: data.y });
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  return (
    <div className="fixed z-[48] w-72 md:w-80 font-terminal select-none" style={{ left: pos.x, top: pos.y }}>
      <div className="border-4 bg-black/95 shadow-[0_0_30px_rgba(255,0,212,0.5)]" style={{ borderColor: data.tone }}>
        <div
          className="flex items-center justify-between px-2 py-1 cursor-grab active:cursor-grabbing text-black font-bold touch-none"
          style={{ background: `linear-gradient(90deg, ${data.tone}, #ffffff66, ${data.tone})` }}
          onPointerDown={(e) => {
            drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            if (drag.current) setPos({ x: e.clientX - drag.current.dx, y: e.clientY - drag.current.dy });
          }}
          onPointerUp={() => {
            drag.current = null;
          }}
        >
          <span className="text-sm truncate">⚠ {data.title}</span>
          <button
            onClick={() => onClose(data.id, data.hydra)}
            className="ml-2 w-6 h-6 shrink-0 bg-red-600 text-white border-2 border-white hover:bg-red-400 leading-none blink-fast"
            aria-label="close (it may not work)"
          >
            ✖
          </button>
        </div>
        <div className="p-3 text-sm leading-snug" style={{ color: data.tone }}>
          <p className="mb-2">{data.body}</p>
          <p className="text-xs opacity-70 blink">{glyphString(12)}</p>
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => onClose(data.id, data.hydra)}
              className="border px-2 py-0.5 text-xs hover:invert transition-colors"
              style={{ borderColor: data.tone }}
            >
              OK
            </button>
            <button
              onClick={() => onClose(data.id, data.hydra)}
              className="border px-2 py-0.5 text-xs hover:invert transition-colors"
              style={{ borderColor: data.tone }}
            >
              ALSO OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PopupStorm() {
  const [popups, setPopups] = useState<PopupData[]>([]);

  const spawn = useCallback((custom?: { title: string; body: string }) => {
    setPopups((p) => (p.length >= 12 ? p : [...p, makePopup(custom)]));
  }, []);

  useEffect(() => {
    const t1 = window.setTimeout(() => spawn(), 1000);
    const t2 = window.setTimeout(() => spawn(), 2100);
    const interval = window.setInterval(() => spawn(), 3200);
    const onSummon = (e: Event) => spawn((e as CustomEvent<{ title: string; body: string }>).detail);
    window.addEventListener("chaos:popup", onSummon);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearInterval(interval);
      window.removeEventListener("chaos:popup", onSummon);
    };
  }, [spawn]);

  const close = useCallback(
    (id: number, hydra: boolean) => {
      setPopups((p) => p.filter((q) => q.id !== id));
      if (hydra) {
        window.setTimeout(() => spawn(), 120);
        window.setTimeout(() => spawn(), 260);
      }
    },
    [spawn]
  );

  return (
    <>
      {popups.map((p) => (
        <PopupWindow key={p.id} data={p} onClose={close} />
      ))}
    </>
  );
}
