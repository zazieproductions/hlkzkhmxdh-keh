import { useState } from "react";
import ScrambleText from "./ScrambleText";
import { glyphString } from "../lib/occult";

type Props = { onEnter: () => void };

export default function WarningGate({ onEnter }: Props) {
  const [defy, setDefy] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-3 border-4 border-double border-red-600 pointer-events-none blink" />
      <div className="absolute inset-6 border-2 border-yellow-400 pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-2xl w-full text-center font-terminal">
        <p className="text-6xl md:text-8xl mb-4 blink-fast" aria-hidden>
          ⚠
        </p>
        <h1 className="text-3xl md:text-5xl text-red-500 tracking-[0.2em] mb-6">
          <ScrambleText text="COGNITOHAZARD WARNING" interval={110} density={0.15} />
        </h1>

        <div className="text-left text-lg md:text-xl leading-relaxed text-lime-400 bg-black/80 border-2 border-lime-500 p-5 space-y-2">
          <p>&gt; this site contains FLASHING COLORS, SEIZURE-ADJACENT GEOMETRY and UNLICENSED SYMBOLISM.</p>
          <p>&gt; 3D objects move faster than your regrets.</p>
          <p>&gt; popups multiply when fed. do not feed the popups.</p>
          <p>&gt; the eye is decorative. the eye is not decorative.</p>
          <p className="text-red-500 blink">&gt; photosensitive visitors: the void understands.</p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onEnter}
            className="bg-red-600 hover:bg-red-500 hover:scale-105 transition-all text-white text-xl px-8 py-3 border-4 border-double border-yellow-300 tracking-widest shadow-[0_0_30px_#ff0000]"
          >
            👁 I OPEN MY EYES
          </button>
          <button
            onClick={() => {
              if (defy >= 1) onEnter();
              else setDefy(1);
            }}
            className="bg-black hover:bg-zinc-900 hover:scale-105 transition-all text-zinc-300 text-xl px-8 py-3 border-4 border-double border-zinc-600 tracking-widest"
          >
            {defy ? "I SAID NO" : "TAKE ME TO SAFETY"}
          </button>
        </div>

        {defy > 0 && (
          <p className="mt-6 text-red-500 text-2xl blink">
            THERE IS NO EXIT. THERE IS ONLY DEEPER.
          </p>
        )}

        <p className="mt-8 text-xs text-zinc-500">
          by entering you consent to being perceived · {glyphString(5)}
        </p>
      </div>
    </div>
  );
}
