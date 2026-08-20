import { useEffect, useState } from "react";

export default function VisitorCounter() {
  const [count, setCount] = useState(777919);

  useEffect(() => {
    const id = window.setInterval(
      () => setCount((c) => c + Math.floor(Math.random() * 13) + 1),
      900
    );
    return () => window.clearInterval(id);
  }, []);

  const digits = String(count).padStart(9, "0").split("");

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-terminal text-cyan-300 text-2xl blink">YOU ARE SOUL №</p>
      <div className="flex gap-1 flex-wrap justify-center">
        {digits.map((d, i) => (
          <span
            key={i}
            className="w-8 h-12 md:w-10 md:h-14 bg-black border-2 border-lime-400 text-lime-400 font-terminal text-3xl md:text-4xl flex items-center justify-center shadow-[0_0_12px_#00ff85]"
          >
            {d}
          </span>
        ))}
      </div>
      <p className="font-terminal text-sm text-red-400">
        (the counter cannot stop. the counter has never stopped.)
      </p>
    </div>
  );
}
