import { isValidHex } from "./utils";

export const DEFAULT_ACCENT = "#e86a2c";

export function applyAccent(hex: string) {
  if (typeof document === "undefined") return;
  const value = isValidHex(hex) ? hex : DEFAULT_ACCENT;
  document.documentElement.style.setProperty("--color-accent", value);
  document.documentElement.style.setProperty(
    "--color-accent-soft",
    `color-mix(in oklab, ${value} 22%, transparent)`,
  );
}
