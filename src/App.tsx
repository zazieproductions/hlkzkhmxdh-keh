import { useState } from "react";
import ThreeVoid from "./components/ThreeVoid";
import WarningGate from "./components/WarningGate";
import MarqueeLayer, { MarqueeRow } from "./components/MarqueeLayer";
import PopupStorm from "./components/PopupStorm";
import CursorTrail from "./components/CursorTrail";
import FlashOverlay from "./components/FlashOverlay";
import ControlDock from "./components/ControlDock";
import SigilCircle from "./components/SigilCircle";
import ScrambleText from "./components/ScrambleText";
import RunawayButton from "./components/RunawayButton";
import RelicGallery from "./components/RelicGallery";
import VisitorCounter from "./components/VisitorCounter";
import { PHRASES, PROPHECY_LINES, glyphString } from "./lib/occult";

function summon(title: string, body: string) {
  window.dispatchEvent(new CustomEvent("chaos:popup", { detail: { title, body } }));
}

export default function App() {
  const [entered, setEntered] = useState(false);
  const [chaos, setChaos] = useState(2);

  if (!entered) return <WarningGate onEnter={() => setEntered(true)} />;

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <ThreeVoid chaos={chaos} />
      <div className="noise-overlay" aria-hidden />
      <MarqueeLayer chaos={chaos} />
      <CursorTrail />
      <FlashOverlay chaos={chaos} />

      {/* eternal construction banner */}
      <div className="fixed top-12 left-2 z-40 -rotate-6 pointer-events-none hidden sm:block">
        <div className="bg-yellow-300 text-black font-terminal px-3 py-1 border-4 border-black shadow-[6px_6px_0_#ff00d4]">
          <p className="text-sm font-bold blink">🚧 ETERNAL CONSTRUCTION 🚧</p>
          <div className="h-2 w-40 bg-black mt-1">
            <div className="h-full load-fake bg-gradient-to-r from-lime-400 via-yellow-300 to-red-500" />
          </div>
          <p className="text-[10px] mt-0.5">loading the absolute… 93%</p>
        </div>
      </div>

      <main className={`relative z-10 ${chaos >= 4 ? "shake-hard" : ""}`}>
        {/* ============ HERO ============ */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative pt-16 pb-20">
          <SigilCircle size={560} className="absolute opacity-40 pointer-events-none max-w-none" />

          <p className="font-terminal text-lime-400 text-xl md:text-2xl blink mb-3 relative">
            TRANSMISSION №7 // LIVE FROM NOWHERE
          </p>

          <h1 className="font-occult rainbow-text text-7xl md:text-9xl leading-none drop-shadow-[0_0_25px_rgba(255,0,212,0.8)] relative">
            <ScrambleText text="ØØØØØØØ" interval={120} />
          </h1>

          <h2 className="font-occult text-3xl md:text-5xl mt-4 text-yellow-300 drop-shadow-[0_0_15px_#ffe600] relative">
            <ScrambleText text="THE MOUTH OF THE VOID" interval={160} density={0.12} />
          </h2>

          <p className="font-terminal text-cyan-300 text-lg md:text-xl mt-4 blink-fast relative">
            {glyphString(7)} the gate is open {glyphString(7)}
          </p>

          <div className="relative mt-6">
            <RunawayButton
              label="☞ CLICK HERE FOR ENLIGHTENMENT ☜"
              onCatch={() => {
                setChaos((c) => Math.min(5, c + 1));
                summon(
                  "ENLIGHTENMENT ACHIEVED",
                  "You caught the button. The button remembers. Chaos increased. There is no undo for awakening."
                );
              }}
            />
          </div>

          <div className="w-full max-w-4xl -rotate-3 my-6 relative">
            <MarqueeRow
              phrases={PHRASES}
              duration={14}
              className="bg-red-600 text-yellow-200 border-y-4 border-double border-black py-1 font-bold"
            />
          </div>

          <p className="font-terminal text-fuchsia-300 text-xl animate-bounce relative">
            ▼ SCROLL IF YOU DARE ▼
          </p>
        </section>

        {/* ============ PROPHECY ============ */}
        <section className="py-24 px-4 relative">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <div className="relative flex items-center justify-center">
              <img
                src="/images/woodcut.png"
                alt="occult woodcut of the devouring sun"
                className="w-full max-w-md border-4 border-fuchsia-500 hue-spin shadow-[0_0_40px_#b026ff]"
              />
              <SigilCircle size={300} className="absolute opacity-60 pointer-events-none" />
            </div>
            <div className="bg-black/85 border-4 strobe-border p-6 font-terminal text-lime-400 text-lg md:text-xl leading-relaxed">
              <p className="text-fuchsia-400 blink mb-3 text-xl">
                ▚▚ THE PROPHECY OF THE SEVENTH GLYPH ▞▞
              </p>
              {PROPHECY_LINES.map((line, i) => (
                <p key={i}>
                  <ScrambleText text={line} interval={140 + i * 15} density={0.08} />
                </p>
              ))}
              <p className="blink-fast mt-3 text-2xl">█</p>
            </div>
          </div>
        </section>

        {/* ============ SKY INTERSTITIAL ============ */}
        <section className="relative h-72 md:h-96 overflow-hidden border-y-8 border-double border-fuchsia-600">
          <img
            src="/images/storm.jpg"
            alt="apocalyptic lightning storm"
            className="absolute inset-0 w-full h-full object-cover hue-spin"
          />
          <div className="absolute inset-0 bg-fuchsia-900/30 mix-blend-multiply" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 gap-2">
            <p className="font-occult text-4xl md:text-6xl text-yellow-200 drop-shadow-[0_0_20px_#000]">
              <ScrambleText text="THE SKY IS A SCREEN" interval={130} />
            </p>
            <p className="font-occult text-3xl md:text-5xl text-white drop-shadow-[0_0_20px_#000]">
              <ScrambleText text="THE SCREEN IS A SKY" interval={170} />
            </p>
            <p className="font-terminal text-lime-300 blink text-lg">the lightning is data. the data is angry.</p>
          </div>
        </section>

        {/* ============ RELICS ============ */}
        <section className="py-24 px-4">
          <h2 className="text-center font-occult text-5xl md:text-7xl rainbow-text mb-2">
            <ScrambleText text="THE RELIQUARY" interval={150} density={0.15} />
          </h2>
          <p className="text-center font-terminal text-yellow-300 blink mb-12 text-lg">
            touch nothing. everything touches back.
          </p>
          <RelicGallery />
        </section>

        {/* ============ COUNTER + WEBRING ============ */}
        <section className="py-24 px-4 flex flex-col items-center gap-10">
          <VisitorCounter />
          <div className="font-terminal text-center">
            <p className="text-fuchsia-300 text-lg mb-3 blink">☾ THE SACRED WEBRING ☽</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() =>
                  summon(
                    "WEBRING ◄ PREV",
                    "The previous site was consumed in 1999. You are standing in its ashes. Mind the embers."
                  )
                }
                className="bg-black border-2 border-cyan-400 text-cyan-300 px-5 py-2 hover:bg-cyan-400 hover:text-black hover:scale-110 transition-all -rotate-2"
              >
                ◄ PREV
              </button>
              <button
                onClick={() =>
                  summon(
                    "WEBRING ✦ RANDOM",
                    "Randomness selected YOU. The ring has no beginning. The ring has no end. You are already there."
                  )
                }
                className="bg-black border-2 border-yellow-400 text-yellow-300 px-5 py-2 hover:bg-yellow-400 hover:text-black hover:scale-110 transition-all rotate-1"
              >
                ✦ RANDOM
              </button>
              <button
                onClick={() =>
                  summon(
                    "WEBRING NEXT ►",
                    "The next site does not exist yet. It is being dreamed by a moth. Please wait 7–9 eternities."
                  )
                }
                className="bg-black border-2 border-red-500 text-red-400 px-5 py-2 hover:bg-red-500 hover:text-black hover:scale-110 transition-all -rotate-1"
              >
                NEXT ►
              </button>
            </div>
          </div>
        </section>

        <footer className="pb-28 pt-6 text-center font-terminal text-sm text-fuchsia-300 px-4">
          <p>
            © 1919–∞ THE MOUTH OF THE VOID · best viewed with eyes closed · resolution 777×137 ·{" "}
            <span className="blink">no rights reserved, all rites reversed</span>
          </p>
          <p className="mt-2 text-zinc-500">
            webmaster: <span className="text-lime-400">lamb@the.gate</span> (replies in dreams only)
          </p>
        </footer>
      </main>

      <PopupStorm />
      <ControlDock chaos={chaos} setChaos={setChaos} />
    </div>
  );
}
