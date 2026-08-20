import { useDrone } from "../hooks/useDrone";
import { POPUP_BODIES, POPUP_TITLES, randomOf } from "../lib/occult";

const ROMAN = ["I", "II", "III", "IV", "V"];

type Props = { chaos: number; setChaos: (n: number) => void };

export default function ControlDock({ chaos, setChaos }: Props) {
  const { on, toggle } = useDrone();

  const summon = () =>
    window.dispatchEvent(
      new CustomEvent("chaos:popup", {
        detail: { title: randomOf(POPUP_TITLES), body: randomOf(POPUP_BODIES) },
      })
    );

  return (
    <div className="fixed bottom-8 right-3 z-[65] font-terminal">
      <div className="bg-black/90 border-2 border-fuchsia-500 p-3 flex flex-col gap-2 shadow-[0_0_30px_#ff00d4] rotate-1 max-w-[240px]">
        <p className="text-[11px] tracking-[0.25em] text-fuchsia-300 blink">⛧ CHAOS DIAL ⛧</p>
        <div className="flex gap-1">
          {ROMAN.map((r, i) => (
            <button
              key={r}
              onClick={() => setChaos(i + 1)}
              className={`flex-1 border px-1 py-0.5 text-sm transition-colors ${
                chaos === i + 1
                  ? "bg-fuchsia-500 text-black border-fuchsia-300"
                  : "border-fuchsia-700 text-fuchsia-400 hover:bg-fuchsia-950"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <button
          onClick={toggle}
          className={`border px-2 py-1 text-sm transition-colors ${
            on
              ? "bg-lime-400 text-black border-lime-300 blink"
              : "border-lime-500 text-lime-400 hover:bg-lime-950"
          }`}
        >
          {on ? "☊ SILENCE THE TRANSMISSION" : "☊ RECEIVE TRANSMISSION"}
        </button>
        <button
          onClick={summon}
          className="border border-yellow-400 text-yellow-300 px-2 py-1 text-sm hover:bg-yellow-400 hover:text-black transition-colors"
        >
          ✦ SUMMON WINDOW
        </button>
      </div>
    </div>
  );
}
