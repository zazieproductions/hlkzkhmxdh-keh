const RELICS = [
  {
    src: "/images/woodcut.png",
    name: "RELIC 01 — THE DEVOURING SUN",
    note: "recovered from a burning server, 1997",
    imgClass: "hue-spin",
  },
  {
    src: "/images/sigil.png",
    name: "RELIC 02 — SEAL OF THE MOUTH",
    note: "do not lick",
    imgClass: "",
  },
  {
    src: "/images/serpent.png",
    name: "RELIC 03 — OUROBOROS.SYS",
    note: "still loading since 1919",
    imgClass: "spin-slow",
  },
  {
    src: "/images/crow.jpg",
    name: "RELIC 04 — THE WITNESS",
    note: "it filed a report on you",
    imgClass: "",
  },
  {
    src: "/images/eye.png",
    name: "RELIC 05 — THE WEEPING EYE",
    note: "it saw you first",
    imgClass: "hue-spin-fast",
  },
];

export default function RelicGallery() {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {RELICS.map((relic, i) => (
        <div
          key={relic.name}
          className={`group bg-black/75 border-4 strobe-border p-4 text-center hover:scale-105 hover:rotate-1 transition-transform ${
            i % 2 ? "rotate-1" : "-rotate-1"
          }`}
        >
          <div className="h-52 flex items-center justify-center overflow-hidden bg-black">
            <img
              src={relic.src}
              alt={relic.name}
              loading="lazy"
              className={`max-h-full max-w-full object-contain group-hover:scale-110 transition-transform ${relic.imgClass}`}
            />
          </div>
          <h3 className="mt-3 font-terminal text-yellow-300 text-lg leading-tight">{relic.name}</h3>
          <p className="font-terminal text-fuchsia-400 text-sm blink">{relic.note}</p>
        </div>
      ))}
      <div className="bg-black/75 border-4 border-dashed border-red-600 p-4 text-center flex flex-col items-center justify-center gap-3 -rotate-2">
        <p className="font-terminal text-red-500 text-2xl blink-fast">RELIC 06 — [MISSING]</p>
        <p className="font-terminal text-zinc-400">it removed itself. we do not speak of it.</p>
        <p className="text-4xl" aria-hidden>⸸</p>
      </div>
    </div>
  );
}
