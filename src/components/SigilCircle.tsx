import { GLYPHS } from "../lib/occult";

function starPoints(cx: number, cy: number, points: number, outer: number, inner: number): string {
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i) / points - Math.PI / 2;
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return pts.join(" ");
}

export default function SigilCircle({ size = 480, className = "" }: { size?: number; className?: string }) {
  const c = size / 2;
  const ringGlyphs = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2;
    const r = c * 0.78;
    return {
      ch: GLYPHS[i % GLYPHS.length],
      x: c + r * Math.cos(a),
      y: c + r * Math.sin(a),
      deg: (a * 180) / Math.PI + 90,
    };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className} aria-hidden>
      <g className="spin-slow" style={{ transformOrigin: "center", transformBox: "fill-box" }}>
        <circle cx={c} cy={c} r={c * 0.92} fill="none" stroke="#ff00d4" strokeWidth={2} strokeDasharray="14 6 2 6" />
        <circle cx={c} cy={c} r={c * 0.86} fill="none" stroke="#00ffcc" strokeWidth={1} strokeDasharray="2 8" />
        {ringGlyphs.map((g, i) => (
          <text
            key={i}
            x={g.x}
            y={g.y}
            fill="#ffe600"
            fontSize={size * 0.05}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${g.deg} ${g.x} ${g.y})`}
          >
            {g.ch}
          </text>
        ))}
      </g>
      <g className="spin-rev" style={{ transformOrigin: "center", transformBox: "fill-box" }}>
        <polygon points={starPoints(c, c, 7, c * 0.62, c * 0.3)} fill="none" stroke="#ff3b3b" strokeWidth={2} />
        <circle cx={c} cy={c} r={c * 0.66} fill="none" stroke="#b026ff" strokeWidth={1.5} strokeDasharray="30 12" />
      </g>
      <circle cx={c} cy={c} r={c * 0.3} fill="rgba(0,0,0,0.55)" stroke="#ffe600" strokeWidth={2} />
      <image
        href="/images/eye.png"
        x={c - c * 0.26}
        y={c - c * 0.26}
        width={c * 0.52}
        height={c * 0.52}
        className="hue-spin-fast"
      />
    </svg>
  );
}
