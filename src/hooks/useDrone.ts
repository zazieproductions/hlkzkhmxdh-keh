import { useEffect, useRef, useState } from "react";

/**
 * A WebAudio chaos drone: detuned oscillators breathing through LFOs,
 * plus random square-wave beeps like a possessed modem.
 * Must be toggled from a user gesture.
 */
export function useDrone() {
  const [on, setOn] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);

  const toggle = () => {
    if (stopRef.current) {
      stopRef.current();
      stopRef.current = null;
      setOn(false);
      return;
    }

    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();

    const master = ctx.createGain();
    master.gain.value = 0.045;
    master.connect(ctx.destination);

    const oscs: OscillatorNode[] = [];
    const freqs = [55, 55.7, 82.41, 110.6, 164.81];
    const types: OscillatorType[] = ["sawtooth", "square", "sine", "triangle", "sawtooth"];

    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator();
      osc.type = types[i];
      osc.frequency.value = f;
      const gain = ctx.createGain();
      gain.gain.value = 0.16 / (i + 1);
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.09 + i * 0.06;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.07 / (i + 1);
      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);
      osc.connect(gain);
      gain.connect(master);
      osc.start();
      lfo.start();
      oscs.push(osc, lfo);
    });

    const beep = window.setInterval(() => {
      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.value = 160 + Math.random() * 1700;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09);
      osc.connect(gain);
      gain.connect(master);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    }, 640);

    stopRef.current = () => {
      window.clearInterval(beep);
      oscs.forEach((o) => {
        try {
          o.stop();
        } catch {
          /* already stopped */
        }
      });
      void ctx.close();
    };
    setOn(true);
  };

  useEffect(
    () => () => {
      stopRef.current?.();
    },
    []
  );

  return { on, toggle };
}
