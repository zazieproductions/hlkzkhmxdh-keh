type RowProps = {
  phrases: readonly string[];
  duration: number;
  reverse?: boolean;
  className?: string;
};

export function MarqueeRow({ phrases, duration, reverse, className }: RowProps) {
  const text = phrases.join("  ✧  ") + "  ✧  ";
  return (
    <div className={"overflow-hidden whitespace-nowrap " + (className ?? "")}>
      <div
        className="marquee-track"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[0, 1].map((k) => (
          <span key={k} className="px-2">
            {text.repeat(3)}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function MarqueeLayer({ chaos }: { chaos: number }) {
  const topPhrases = [
    "★ WELCOME TO THE MOUTH OF THE VOID ★",
    "TRANSMISSION №7 IS LIVE",
    "DO NOT ADJUST YOUR SKULL",
    "THE LAMB IS WATCHING",
    "NOW WITH 700% MORE GEOMETRY",
  ];
  const bottomPhrases = [
    "☾ the signal was here before us ☽",
    "ERROR IS A FORM OF PRAYER",
    "SCROLL DESCENDS",
    "YOUR ATTENTION HAS BEEN SACRIFICED — THANK YOU",
    "19.19 Hz",
  ];
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-30 -rotate-1 scale-x-105 pointer-events-none">
        <MarqueeRow
          phrases={topPhrases}
          duration={Math.max(4, 11 - chaos)}
          className="bg-yellow-300 text-black font-bold text-lg border-y-4 border-red-600 py-1"
        />
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-30 rotate-1 scale-x-105 pointer-events-none">
        <MarqueeRow
          phrases={bottomPhrases}
          duration={Math.max(5, 13 - chaos)}
          reverse
          className="bg-black text-lime-400 font-terminal text-xl border-y-4 border-cyan-400 py-1"
        />
      </div>
    </>
  );
}
