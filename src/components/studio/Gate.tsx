import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getEngine } from "@/lib/audio/engine";
import { ACCENT_PRESETS } from "@/lib/types";
import { useStudio } from "@/lib/store";
import { cn } from "@/lib/utils";
import { HelixMark } from "./HelixMark";

export function Gate() {
  const producerName = useStudio((s) => s.producerName);
  const projectName = useStudio((s) => s.projectName);
  const accent = useStudio((s) => s.accent);
  const setProducerName = useStudio((s) => s.setProducerName);
  const setProjectName = useStudio((s) => s.setProjectName);
  const setAccent = useStudio((s) => s.setAccent);
  const setOnboarded = useStudio((s) => s.setOnboarded);
  const [errors, setErrors] = useState<{ producer?: string; project?: string }>(
    {},
  );

  function submit() {
    const producer = producerName.trim();
    const project = projectName.trim();
    const next: { producer?: string; project?: string } = {};
    if (producer.length < 2) next.producer = "Mínimo 2 caracteres.";
    if (producer.length > 24) next.producer = "Máximo 24 caracteres.";
    if (!project) next.project = "Ponle un nombre al proyecto.";
    setErrors(next);
    if (next.producer || next.project) return;
    setProducerName(producer);
    setProjectName(project);
    getEngine().unlock();
    setOnboarded(true);
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-bg px-4 py-10">
      <div className="pointer-events-none absolute inset-0 studio-wash" />
      <div className="relative w-full max-w-md rounded-[var(--radius-xl)] border border-border bg-surface p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:p-8">
        <div className="gate-stagger flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-[var(--radius-md)] bg-accent text-accent-fg">
              <HelixMark className="size-6" />
            </span>
            <div>
              <p className="font-display text-xl tracking-tight text-fg">Helix</p>
              <p className="text-sm text-muted">Estudio de producción en el navegador</p>
            </div>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-faint">
              Nombre de productor
            </span>
            <input
              value={producerName}
              onChange={(e) => setProducerName(e.target.value)}
              maxLength={24}
              placeholder="Tu alias"
              className="h-11 w-full rounded-[var(--radius-md)] border border-border bg-elevated px-3 text-sm text-fg outline-none ring-accent/60 placeholder:text-faint focus:ring-2"
            />
            {errors.producer ? (
              <p className="mt-1 text-xs text-danger">{errors.producer}</p>
            ) : null}
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-faint">
              Nombre del proyecto
            </span>
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              maxLength={40}
              placeholder="Untitled"
              className="h-11 w-full rounded-[var(--radius-md)] border border-border bg-elevated px-3 text-sm text-fg outline-none ring-accent/60 placeholder:text-faint focus:ring-2"
            />
            {errors.project ? (
              <p className="mt-1 text-xs text-danger">{errors.project}</p>
            ) : null}
          </label>

          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-faint">
              Color de acento
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {ACCENT_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  aria-label={preset.label}
                  onClick={() => setAccent(preset.value)}
                  className={cn(
                    "size-8 rounded-full border border-border transition-[transform,box-shadow] duration-[var(--motion-quick)]",
                    accent === preset.value && "ring-2 ring-fg ring-offset-2 ring-offset-surface",
                  )}
                  style={{ background: `var(--swatch-${preset.id})` }}
                />
              ))}
              <label className="grid size-8 place-items-center overflow-hidden rounded-full border border-border bg-elevated">
                <span className="sr-only">Color personalizado</span>
                <input
                  type="color"
                  value={accent}
                  onChange={(e) => setAccent(e.target.value)}
                  className="h-10 w-10 cursor-pointer scale-150"
                />
              </label>
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={submit}>
            Entrar al estudio
          </Button>
          <p className="text-center text-xs text-faint">
            El audio se activa con este clic. Espacio reproduce. Z–M es el piano.
          </p>
        </div>
      </div>
    </div>
  );
}
