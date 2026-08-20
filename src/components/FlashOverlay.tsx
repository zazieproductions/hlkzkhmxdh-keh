import { useEffect, useState } from "react";
import { randomNeon } from "../lib/occult";

export default function FlashOverlay({ chaos }: { chaos: number }) {
  const [color, setColor] = useState<string | null>(null);

  useEffect(() => {
    if (chaos < 2) {
      setColor(null);
      return;
    }
    const interval = Math.max(520, 1600 - chaos * 220);
    const id = window.setInterval(() => {
      setColor(randomNeon());
      window.setTimeout(() => setColor(null), 85);
    }, interval);
    return () => window.clearInterval(id);
  }, [chaos]);

  if (!color) return null;
  return (
    <div
      className="fixed inset-0 z-[55] pointer-events-none mix-blend-difference"
      style={{ backgroundColor: color, opacity: 0.55 }}
    />
  );
}
