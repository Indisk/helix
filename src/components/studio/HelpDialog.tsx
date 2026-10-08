import { Button } from "@/components/ui/button";

const ROWS = [
  ["Espacio", "Play / stop"],
  ["Z S X D C V G B H N J M", "Piano (octava baja)"],
  ["Q 2 W 3 E R 5 T 6 Y 7 U I", "Piano (octava alta)"],
  ["Arrastrar en rack, piano o pads", "Colocar notas"],
  ["Clic en una nota", "Borrarla"],
  ["Asa de canal", "Reordenar canales"],
  ["Faders", "Arrastrar volumen"],
  ["Refs → header", "Soltar portada en el proyecto"],
];

type Props = { open: boolean; onClose: () => void };

export function HelpDialog({ open, onClose }: Props) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-40 grid place-items-center bg-bg/70 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-labelledby="help-title"
        className="w-full max-w-md rounded-[var(--radius-xl)] border border-border bg-surface p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="help-title" className="font-display text-lg text-fg">
          Atajos y gestos
        </h2>
        <ul className="mt-4 space-y-2">
          {ROWS.map(([k, v]) => (
            <li key={k} className="flex justify-between gap-3 text-sm">
              <span className="font-mono text-xs text-accent">{k}</span>
              <span className="text-right text-muted">{v}</span>
            </li>
          ))}
        </ul>
        <Button className="mt-5 w-full" onClick={onClose}>
          Cerrar
        </Button>
      </div>
    </div>
  );
}
