import { useRef } from "react";
import { useStudio } from "@/lib/store";
import { clamp, cn } from "@/lib/utils";

function Fader({
  value,
  onChange,
  label,
}: {
  value: number;
  onChange: (v: number) => void;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function at(clientY: number) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const next = 1 - (clientY - rect.top) / rect.height;
    onChange(clamp(next, 0, 1));
  }

  return (
    <div
      ref={ref}
      role="slider"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
      tabIndex={0}
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        at(e.clientY);
      }}
      onPointerMove={(e) => {
        if (e.buttons !== 1) return;
        at(e.clientY);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowUp") onChange(clamp(value + 0.05, 0, 1));
        if (e.key === "ArrowDown") onChange(clamp(value - 0.05, 0, 1));
      }}
      className="relative h-36 w-8 cursor-ns-resize rounded-full bg-bg"
    >
      <div
        className="fader-fill absolute inset-x-1 bottom-1 rounded-full"
        style={{ height: `${Math.max(8, value * 100)}%` }}
      />
      <div
        className="absolute left-1/2 h-3 w-7 -translate-x-1/2 rounded-[3px] bg-fg"
        style={{ bottom: `calc(${value * 100}% - 6px)` }}
      />
    </div>
  );
}

export function Mixer() {
  const channels = useStudio((s) => s.channels);
  const masterVolume = useStudio((s) => s.masterVolume);
  const setVolume = useStudio((s) => s.setVolume);
  const setPan = useStudio((s) => s.setPan);
  const setMasterVolume = useStudio((s) => s.setMasterVolume);
  const toggleMute = useStudio((s) => s.toggleMute);
  const toggleSolo = useStudio((s) => s.toggleSolo);
  const selectedId = useStudio((s) => s.selectedId);
  const setSelected = useStudio((s) => s.setSelected);

  return (
    <div className="flex h-full min-h-0 flex-col gap-3 p-3 md:p-4">
      <div>
        <h2 className="font-display text-lg tracking-tight text-fg">Mezclador</h2>
        <p className="text-xs text-muted">Arrastra los faders. Pan de −100 a 100.</p>
      </div>
      <div className="flex min-h-0 flex-1 gap-2 overflow-x-auto pb-2">
        {channels.map((ch) => (
          <div
            key={ch.id}
            data-kind={ch.kind}
            className={cn(
              "flex w-[88px] shrink-0 flex-col items-center gap-2 rounded-[var(--radius-md)] border border-border bg-surface p-2",
              selectedId === ch.id && "border-accent",
            )}
          >
            <button
              type="button"
              onClick={() => setSelected(ch.id)}
              className="text-[11px] font-medium text-fg"
            >
              {ch.name}
            </button>
            <Fader
              value={ch.volume}
              onChange={(v) => setVolume(ch.id, v)}
              label={`Volumen ${ch.name}`}
            />
            <input
              type="range"
              min={-1}
              max={1}
              step={0.01}
              value={ch.pan}
              onChange={(e) => setPan(ch.id, Number(e.target.value))}
              className="helix-range w-full"
              aria-label={`Pan ${ch.name}`}
            />
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => toggleMute(ch.id)}
                className={cn(
                  "h-7 w-7 rounded-[var(--radius-xs)] text-[10px] font-semibold",
                  ch.mute ? "bg-danger text-fg" : "bg-elevated text-muted",
                )}
              >
                M
              </button>
              <button
                type="button"
                onClick={() => toggleSolo(ch.id)}
                className={cn(
                  "h-7 w-7 rounded-[var(--radius-xs)] text-[10px] font-semibold",
                  ch.solo ? "bg-meter text-bg" : "bg-elevated text-muted",
                )}
              >
                S
              </button>
            </div>
          </div>
        ))}
        <div className="flex w-[88px] shrink-0 flex-col items-center gap-2 rounded-[var(--radius-md)] border border-accent/40 bg-elevated p-2">
          <p className="text-[11px] font-medium text-fg">Master</p>
          <Fader
            value={masterVolume}
            onChange={setMasterVolume}
            label="Volumen master"
          />
          <p className="font-mono text-[11px] text-muted">
            {Math.round(masterVolume * 100)}
          </p>
        </div>
      </div>
    </div>
  );
}
