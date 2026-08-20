import { useRef, useState } from "react";

export default function RunawayButton({ label, onCatch }: { label: string; onCatch: () => void }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dodges = useRef(0);

  const dodge = () => {
    dodges.current += 1;
    if (dodges.current > 5) {
      dodges.current = 0;
      setOffset({ x: 0, y: 0 });
      return;
    }
    setOffset({ x: (Math.random() - 0.5) * 320, y: (Math.random() - 0.5) * 160 });
  };

  return (
    <div className="relative h-24 flex items-center justify-center">
      <button
        onMouseEnter={dodge}
        onClick={onCatch}
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
        className="transition-transform duration-150 bg-yellow-300 text-black font-bold text-lg md:text-xl px-6 py-3 border-4 border-double border-red-600 shadow-[0_0_25px_#ffe600] hover:bg-yellow-200 blink"
      >
        {label}
      </button>
    </div>
  );
}
