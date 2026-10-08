import { GripVertical } from "lucide-react";
import { getEngine } from "@/lib/audio/engine";
import { useStudio } from "@/lib/store";
import { STEP_COUNT } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useStepPaint } from "./use-step-paint";

export function Sequencer() {
  const channels = useStudio((s) => s.channels);
  const selectedId = useStudio((s) => s.selectedId);
  const currentStep = useStudio((s) => s.currentStep);
  const playing = useStudio((s) => s.playing);
  const setSelected = useStudio((s) => s.setSelected);
  const toggleMute = useStudio((s) => s.toggleMute);
  const toggleSolo = useStudio((s) => s.toggleSolo);
  const reorderChannels = useStudio((s) => s.reorderChannels);
  const setView = useStudio((s) => s.setView);
  const onStepPointerDown = useStepPaint();

  return (
    <div className="flex h-full min-h-0 flex-col gap-2 p-3 md:p-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-lg tracking-tight text-fg">Channel rack</h2>
          <p className="text-xs text-muted">
            Arrastra para colocar pasos. Un clic sobre un paso encendido lo borra.
          </p>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-2 md:p-3">
        <div className="mb-1 flex gap-1 pl-[156px] font-mono text-[10px] text-faint md:pl-[188px]">
          {Array.from({ length: STEP_COUNT }, (_, i) => (
            <span
              key={i}
              className={cn(
                "grid h-4 min-w-7 flex-1 place-items-center",
                i % 4 === 0 && "text-muted",
              )}
            >
              {i + 1}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-1">
          {channels.map((ch) => {
            const melodic = ch.kind === "bass" || ch.kind === "lead" || ch.kind === "pad";
            return (
              <div
                key={ch.id}
                data-kind={ch.kind}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const from = e.dataTransfer.getData("text/channel");
                  if (from) reorderChannels(from, ch.id);
                }}
                className={cn(
                  "flex items-center gap-1 rounded-[var(--radius-md)] p-1",
                  selectedId === ch.id ? "bg-accent-soft" : "hover:bg-elevated",
                )}
              >
                <button
                  type="button"
                  draggable
                  aria-label={`Mover ${ch.name}`}
                  onDragStart={(e) => {
                    e.dataTransfer.setData("text/channel", ch.id);
                    e.dataTransfer.effectAllowed = "move";
                  }}
                  className="grid size-8 shrink-0 cursor-grab place-items-center text-faint active:cursor-grabbing"
                >
                  <GripVertical className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelected(ch.id);
                    getEngine().trigger(ch.id);
                  }}
                  className="flex w-[72px] shrink-0 items-center gap-2 md:w-[96px]"
                >
                  <span className="ch-dot size-2.5 shrink-0 rounded-full" />
                  <span className="truncate text-left text-xs font-medium text-fg">
                    {ch.name}
                  </span>
                </button>
                <div className="paint-surface flex min-w-0 flex-1 gap-1">
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
                        "h-8 min-w-7 flex-1 rounded-[var(--radius-xs)] border transition-colors duration-[var(--motion-micro)]",
                        on ? "step-on" : "step-off",
                        playing && currentStep === step && "step-now",
                        step % 4 === 0 && !on && "step-beat",
                      )}
                    />
                  ))}
                </div>
                <div className="flex shrink-0 gap-0.5">
                  <button
                    type="button"
                    onClick={() => toggleMute(ch.id)}
                    className={cn(
                      "h-8 min-w-8 rounded-[var(--radius-xs)] text-[10px] font-semibold",
                      ch.mute ? "bg-danger/80 text-fg" : "text-faint hover:bg-elevated",
                    )}
                  >
                    M
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleSolo(ch.id)}
                    className={cn(
                      "h-8 min-w-8 rounded-[var(--radius-xs)] text-[10px] font-semibold",
                      ch.solo ? "bg-meter/80 text-bg" : "text-faint hover:bg-elevated",
                    )}
                  >
                    S
                  </button>
                  {melodic ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSelected(ch.id);
                        setView("piano");
                      }}
                      className="hidden h-8 rounded-[var(--radius-xs)] px-2 text-[10px] text-muted hover:text-fg md:inline"
                    >
                      Piano
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
