export const GLYPHS =
  "☉☽☿♀♂♃♄★✦✧▲△▼▽◉◎☠⚝✪♾∞⸸♰✝✞✟☬♆⚕☤⚚⚛☰☱☲☳☴☵☶☷✠✡✢✣✤✥";

export const NEONS = [
  "#ff00d4",
  "#00ff85",
  "#ffe600",
  "#00cfff",
  "#ff3b3b",
  "#b026ff",
  "#ff8a00",
] as const;

export const PHRASES = [
  "THE EYE REMEMBERS WHAT THE MOUTH FORGETS",
  "DO NOT TRUST THE GEOMETRY",
  "SIGNAL LOST // SIGNAL FOUND // SIGNAL HUNGRY",
  "7 GATES · 1 MOUTH · 0 EXITS",
  "THE LAMB HAS SEEN YOUR CURSOR",
  "REPENT THE GRID",
  "FREQUENCY 19.19 Hz — TUNE YOUR TEETH",
  "THE SERPENT COMPILES WITHOUT ERROR",
  "EVERY PIXEL IS A SMALL SCREAM",
  "HE WHO WHISPERS BACK BECOMES THE CHANNEL",
  "YOUR VISIT HAS BEEN PROPHESIED",
  "THE VOID IS UNDER CONSTRUCTION",
] as const;

export const POPUP_TITLES = [
  "CURSE.EXE",
  "SYSTEM PROPHECY",
  "FREE GRACE (CURSED)",
  "HEPTAGRAM LOADER",
  "WARNING WARNING WARNING",
  "VOID REGISTRY",
  "MOUTH OF THE VOID™",
  "DO NOT OPEN",
  "YOU OPENED IT",
  "ALTAR CONTROL PANEL",
  "FATAL SUCCESS",
  "NEW MESSAGE FROM THE LAMB",
] as const;

export const POPUP_BODIES = [
  "A window is a mouth. You looked inside it. It looked inside you. Close this only if you dare.",
  "ERROR 0x777: SOUL NOT FOUND. Please re-insert soul and rotate counter-clockwise.",
  "You have won a FREE CURSE. It has already been applied. No action is required. That is the worst part.",
  "The heptagram is loading. The heptagram has always been loading. You are the heptagram.",
  "Do not click the X. The X clicks back.",
  "Your browser is now haunted. This is normal. Our exorcist is on break until the next eclipse.",
  "SUBSCRIBE TO THE VOID? Subscription auto-renews every eternity.",
  "This window appeared because you thought about it. We heard you thinking.",
  "FATAL SUCCESS: everything worked. Nothing will ever be the same.",
  "The geometry has filed a complaint about you. Please remain triangular.",
  "A lamb entered the server room at 03:33. No lamb was found. No lamb was ever found.",
  "Update available: REALITY 2.0 (warning: removes the concept of 'you').",
] as const;

export const PROPHECY_LINES = [
  "> decoding transmission 07 .......... OK",
  "> the gate opens inward. the gate opens outward. the gate opens.",
  "> seven seals replaced with seven seals. warranty void.",
  "> the eye blinked first. record this.",
  "> do not read the next line.",
  "> you read the next line.",
  "> signal integrity: 7% — truth integrity: 7%",
  "> the lamb approves. the lamb has always approved.",
] as const;

export function randomOf<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomGlyph(): string {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

export function glyphString(n: number): string {
  return Array.from({ length: n }, () => randomGlyph()).join("\ ");
}

export function randomNeon(): string {
  return randomOf(NEONS);
}
