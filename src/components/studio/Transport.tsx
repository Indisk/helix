import { Download, HelpCircle, Pause, Play, Settings2, Square } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getEngine } from "@/lib/audio/engine";
import { downloadWav, exportStudioWav } from "@/lib/audio/export";
import { useStudio } from "@/lib/store";
import { cn } from "@/lib/utils";
import { HelixMark } from "./HelixMark";
import { Visualizer } from "./Visualizer";

const VIEWS = [
  { id: "rack", label: "Rack" },
  { id: "piano", label: "Piano" },
  { id: "pads", label: "Pads" },
  { id: "mix", label: "Mix" },
] as const;

type Props = {
  onHelp: () => void;
  onSettings: () => void;
};

export function Transport({ onHelp, onSettings }: Props) {
  const playing = useStudio((s) => s.playing);
  const bpm = useStudio((s) => s.bpm);
  const swing = useStudio((s) => s.swing);
  const view = useStudio((s) => s.view);
  const producerName = useStudio((s) => s.producerName);
  const projectName = useStudio((s) => s.projectName);
  const coverArt = useStudio((s) => s.coverArt);
  const climate = useStudio((s) => s.climate);
  const setBpm = useStudio((s) => s.setBpm);
  const setSwing = useStudio((s) => s.setSwing);
  const setView = useStudio((s) => s.setView);
  const setCoverArt = useStudio((s) => s.setCoverArt);
  const [bpmDraft, setBpmDraft] = useState(String(bpm));
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    setBpmDraft(String(bpm));
  }, [bpm]);

  function commitBpm() {
    const n = Number(bpmDraft);
    if (!Number.isFinite(n)) {
      setBpmDraft(String(bpm));
      return;
    }
    if (n < 40 || n > 240) {
      setBpmDraft(String(bpm));
      return;
    }
    setBpm(n);
  }

  async function handleExport() {
    if (exporting) return;
    setExporting(true);
    const state = useStudio.getState();
    try {
      const blob = await exportStudioWav({
        projectName: state.projectName,
        bpm: state.bpm,
        swing: state.swing,
        masterVolume: state.masterVolume,
        channels: state.channels,
        pianoNotes: state.pianoNotes,
      });
      downloadWav(blob, state.projectName);
      toast.success("Exportación WAV lista");
    } catch (error) {
      console.error("No se pudo exportar el audio", error);
      toast.error("No se pudo exportar el audio. Inténtalo de nuevo.");
    } finally {
      setExporting(false);
    }
  }

  function togglePlay() {
    const engine = getEngine();
    if (playing) engine.stop();
    else engine.start();
  }

  return (
    <header className="flex flex-col gap-2 border-b border-border bg-surface px-3 py-2 md:px-4">
      <div className="flex items-center gap-2 md:gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid size-8 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-accent text-accent-fg">
            <HelixMark className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="truncate font-display text-sm leading-tight tracking-tight text-fg">
              Helix
            </p>
            <p className="truncate text-[11px] text-muted">
              {producerName || "Productor"}
            </p>
          </div>
        </div>

        <div
          className="hidden items-center gap-2 rounded-[var(--radius-md)] border border-dashed border-border bg-elevated px-2 py-1 md:flex"
          onDragOver={(e) => {
            if (e.dataTransfer.types.includes("application/x-helix-art")) {
              e.preventDefault();
            }
          }}
          onDrop={(e) => {
            const url = e.dataTransfer.getData("application/x-helix-art");
            if (url) {
              e.preventDefault();
              setCoverArt(url);
            }
          }}
        >
          {coverArt ? (
            <img
              src={coverArt}
              alt=""
              className="size-8 rounded-[var(--radius-xs)] object-cover"
            />
          ) : (
            <div className="grid size-8 place-items-center rounded-[var(--radius-xs)] bg-bg text-[9px] uppercase tracking-wider text-faint">
              Art
            </div>
          )}
          <p className="max-w-[140px] truncate text-xs text-fg">{projectName}</p>
        </div>

        <div className="ml-auto flex items-center gap-1 md:gap-2">
          <Visualizer />
          <Button
            size="icon"
            variant={playing ? "secondary" : "primary"}
            aria-label={playing ? "Pausar" : "Reproducir"}
            onClick={togglePlay}
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </Button>
          <Button
            size="icon"
            variant="secondary"
            aria-label="Detener"
            onClick={() => getEngine().stop()}
          >
            <Square className="size-3.5" />
          </Button>
          <Button size="sm" variant="secondary" onClick={handleExport} disabled={exporting} aria-label="Exportar música como WAV">
            <Download className="size-3.5" />
            {exporting ? "Exportando…" : "Exportar WAV"}
          </Button>
          <label className="flex items-center gap-1 rounded-[var(--radius-sm)] border border-border bg-elevated px-2 py-1">
            <span className="text-[10px] uppercase tracking-wider text-faint">BPM</span>
            <input
              value={bpmDraft}
              onChange={(e) => setBpmDraft(e.target.value)}
              onBlur={commitBpm}
              onKeyDown={(e) => {
                if (e.key === "Enter") (e.target as HTMLInputElement).blur();
              }}
              inputMode="numeric"
              className="w-10 bg-transparent text-right font-mono text-sm text-fg outline-none"
              aria-label="Tempo"
            />
          </label>
          <Button size="icon-sm" variant="ghost" aria-label="Ajustes" onClick={onSettings}>
            <Settings2 className="size-4" />
          </Button>
          <Button size="icon-sm" variant="ghost" aria-label="Ayuda" onClick={onHelp}>
            <HelpCircle className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-0.5">
        <nav className="flex gap-1">
          {VIEWS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              className={cn(
                "h-8 rounded-[var(--radius-sm)] px-3 text-xs font-medium transition-colors duration-[var(--motion-quick)]",
                view === item.id
                  ? "bg-accent text-accent-fg"
                  : "text-muted hover:bg-elevated hover:text-fg",
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2 md:flex">
          {climate ? (
            <p className="truncate font-mono text-[11px] text-muted">
              {climate.city} · {climate.temp}° · {climate.label}
            </p>
          ) : null}
          <label className="flex items-center gap-2 text-[11px] text-muted">
            Swing
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={swing}
              onChange={(e) => setSwing(Number(e.target.value))}
              className="helix-range w-24"
              aria-label="Swing"
            />
          </label>
        </div>
      </div>
    </header>
  );
}
