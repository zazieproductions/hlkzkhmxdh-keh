import { useEffect, useState } from "react";
import { GLYPHS } from "../lib/occult";

type Props = {
  text: string;
  className?: string;
  interval?: number;
  density?: number;
};

export default function ScrambleText({ text, className, interval = 90, density = 0.25 }: Props) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    setDisplay(text);
    const id = window.setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((ch) => {
            if (ch === " " || ch === "\n") return ch;
            return Math.random() < density ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : ch;
          })
          .join("")
      );
    }, interval);
    return () => window.clearInterval(id);
  }, [text, interval, density]);

  return <span className={className}>{display}</span>;
}
