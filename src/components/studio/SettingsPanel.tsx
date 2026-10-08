import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ACCENT_PRESETS } from "@/lib/types";
import { useStudio } from "@/lib/store";
import { cn } from "@/lib/utils";

type Props = { open: boolean; onClose: () => void };

export function SettingsPanel({ open, onClose }: Props) {
  const producerName = useStudio((s) => s.producerName);
  const projectName = useStudio((s) => s.projectName);
  const accent = useStudio((s) => s.accent);
  const setProducerName = useStudio((s) => s.setProducerName);
  const setProjectName = useStudio((s) => s.setProjectName);
  const setAccent = useStudio((s) => s.setAccent);
  const applyKit = useStudio((s) => s.applyKit);

  if (!open) return null;

  function save() {
    const producer = producerName.trim();
    const project = projectName.trim();
    if (producer.length < 2) {
      toast.error("El nombre de productor necesita 2 caracteres.");
      return;
    }
    if (!project) {
      toast.error("El proyecto necesita un nombre.");
      return;
    }
    setProducerName(producer);
    setProjectName(project);
    toast("Ajustes guardados");
    onClose();
  }

  return (
    <div className="absolute right-3 top-14 z-30 w-[min(100%-24px,360px)] rounded-[var(--radius-lg)] border border-border bg-surface p-4 shadow-[0_16px_48px_rgba(0,0,0,0.4)]">
      <p className="font-display text-base text-fg">Personalización</p>
      <label className="mt-3 block">
        <span className="mb-1 block text-xs text-muted">Productor</span>
        <input
          value={producerName}
          onChange={(e) => setProducerName(e.target.value)}
          maxLength={24}
          className="h-10 w-full rounded-[var(--radius-sm)] border border-border bg-elevated px-3 text-sm text-fg outline-none focus:ring-2 focus:ring-accent/60"
        />
      </label>
      <label className="mt-3 block">
        <span className="mb-1 block text-xs text-muted">Proyecto</span>
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          maxLength={40}
          className="h-10 w-full rounded-[var(--radius-sm)] border border-border bg-elevated px-3 text-sm text-fg outline-none focus:ring-2 focus:ring-accent/60"
        />
      </label>
      <div className="mt-3">
        <p className="mb-1 text-xs text-muted">Acento</p>
        <div className="flex gap-2">
          {ACCENT_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              aria-label={preset.label}
              onClick={() => setAccent(preset.value)}
              className={cn(
                "size-7 rounded-full border border-border",
                accent === preset.value && "ring-2 ring-fg ring-offset-2 ring-offset-surface",
              )}
              style={{ background: `var(--swatch-${preset.id})` }}
            />
          ))}
          <input
            type="color"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            className="size-7 cursor-pointer rounded-full"
            aria-label="Color personalizado"
          />
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            applyKit("demo");
            toast("Demo cargada");
          }}
        >
          Cargar demo
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => {
            applyKit("empty");
            toast("Patrón vacío");
          }}
        >
          Vaciar patrón
        </Button>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <Button size="sm" variant="ghost" onClick={onClose}>
          Cerrar
        </Button>
        <Button size="sm" onClick={save}>
          Guardar
        </Button>
      </div>
    </div>
  );
}
