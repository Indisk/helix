import { getEngine } from "@/lib/audio/engine";
import { useStudio } from "@/lib/store";
import { STEP_COUNT } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useStepPaint } from "./use-step-paint";

export function Pads() {
  const channels = useStudio((s) => s.channels);
  const selectedId = useStudio((s) => s.selectedId);
  const currentStep = useStudio((s) => s.currentStep);
  const playing = useStudio((s) => s.playing);
  const setSelected = useStudio((s) => s.setSelected);
  const onStepPointerDown = useStepPaint();

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 overflow-auto p-3 md:p-4">
      <div>
        <h2 className="font-display text-lg tracking-tight text-fg">Pads</h2>
        <p className="text-xs text-muted">
          Arrastra sobre los pasos para colocarlos. Un clic en un paso encendido lo borra.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {channels.map((ch) => (
          <div
            key={ch.id}
            data-kind={ch.kind}
            className={cn(
              "flex flex-col gap-2 rounded-[var(--radius-lg)] border border-border bg-elevated p-3",
              selectedId === ch.id && "border-accent bg-accent-soft",
            )}
          >
            <button
              type="button"
              onPointerDown={() => {
                setSelected(ch.id);
                getEngine().trigger(ch.id);
              }}
              className="flex min-h-11 items-center gap-2 text-left active:scale-[0.98]"
            >
              <span className="ch-dot size-2.5 rounded-full" />
              <span>
                <span className="block font-display text-base text-fg">{ch.name}</span>
                <span className="text-[11px] uppercase tracking-wider text-faint">
                  {ch.kind}
                </span>
              </span>
            </button>
            <div className="paint-surface grid grid-cols-8 gap-1">
              {ch.steps.map((on, step) => (
                <button
                  key={step}
                  type="button"
                  data-ch={ch.id}
                  data-step={step}
                  aria-label={`${ch.name} paso ${step + 1}`}
                  aria-pressed={on}
                  onPointerDown={(e) => onStepPointerDown(e, ch.id, step, on)}
                  className={cn(
                    "h-8 rounded-[var(--radius-xs)] border transition-colors duration-[var(--motion-micro)]",
                    on ? "step-on" : "step-off",
                    playing && currentStep === step && "step-now",
                    step % 4 === 0 && !on && "step-beat",
                  )}
                />
              ))}
            </div>
            <p className="font-mono text-[10px] text-faint">
              {STEP_COUNT} pasos · clic borra · arrastre pinta
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
