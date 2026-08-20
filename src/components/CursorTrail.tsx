import { useEffect, useRef } from "react";
import { randomGlyph, randomNeon } from "../lib/occult";

export default function CursorTrail() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    let last = 0;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - last < 40) return;
      last = now;
      if (layer.childElementCount > 50) layer.firstElementChild?.remove();

      const el = document.createElement("span");
      el.className = "cursor-glyph";
      el.textContent = randomGlyph();
      el.style.left = `${e.clientX - 8 + (Math.random() - 0.5) * 14}px`;
      el.style.top = `${e.clientY - 8 + (Math.random() - 0.5) * 14}px`;
      el.style.color = randomNeon();
      el.style.setProperty("--rot", `${(Math.random() - 0.5) * 90}deg`);
      el.style.textShadow = "0 0 8px currentColor";
      layer.appendChild(el);
      window.setTimeout(() => el.remove(), 950);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return <div ref={layerRef} className="fixed inset-0 z-[70] pointer-events-none" aria-hidden />;
}
