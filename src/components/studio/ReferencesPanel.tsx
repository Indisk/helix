import { Loader2, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { searchItunes } from "@/lib/api";
import type { ItunesTrack } from "@/lib/types";
import { getEngine } from "@/lib/audio/engine";
import { useStudio } from "@/lib/store";

export function ReferencesPanel() {
  const setCoverArt = useStudio((s) => s.setCoverArt);
  const setProjectName = useStudio((s) => s.setProjectName);
  const [q, setQ] = useState("Daft Punk");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tracks, setTracks] = useState<ItunesTrack[]>([]);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  async function search() {
    const term = q.trim();
    if (term.length < 2) {
      setError("Escribe al menos 2 letras.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const result = await searchItunes({ data: { q: term } });
      if (!result.ok) {
        setError(result.message);
        return;
      }
      setTracks(result.tracks);
      if (result.tracks.length === 0) {
        setError("Sin resultados. Prueba otro término.");
      }
    } catch {
      setError("No se pudo buscar en iTunes.");
    } finally {
      setLoading(false);
    }
  }

  function togglePreview(track: ItunesTrack) {
    if (!track.previewUrl) {
      toast("Esta pista no tiene preview.");
      return;
    }
    if (!audioRef.current) audioRef.current = new Audio();
    const audio = audioRef.current;
    if (playingId === track.trackId) {
      audio.pause();
      setPlayingId(null);
      return;
    }
    getEngine().stop();
    audio.src = track.previewUrl;
    void audio.play();
    audio.onended = () => setPlayingId(null);
    setPlayingId(track.trackId);
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-2xl flex-col gap-4 p-4 md:p-6">
      <div>
        <h2 className="font-display text-xl tracking-tight text-fg">Referencias</h2>
        <p className="text-sm text-muted">
          Busca en iTunes, escucha 30 s y arrastra la portada al header para usarla.
        </p>
      </div>
      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void search();
          }}
          placeholder="Artista o canción"
          className="h-11 flex-1 rounded-[var(--radius-md)] border border-border bg-elevated px-3 text-sm text-fg outline-none ring-accent/60 placeholder:text-faint focus:ring-2"
        />
        <Button onClick={() => void search()} disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Buscar"}
        </Button>
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}

      <ul className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto">
        {tracks.map((track) => (
          <li
            key={track.trackId}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("application/x-helix-art", track.artwork);
              e.dataTransfer.setData("text/uri-list", track.artwork);
              e.dataTransfer.effectAllowed = "copy";
            }}
            className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-2"
          >
            <img
              src={track.artwork}
              alt=""
              draggable={false}
              className="size-14 rounded-[var(--radius-sm)] object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm text-fg">{track.trackName}</p>
              <p className="truncate text-xs text-muted">{track.artistName}</p>
            </div>
            <Button
              size="icon-sm"
              variant="secondary"
              aria-label="Preview"
              onClick={() => togglePreview(track)}
            >
              {playingId === track.trackId ? (
                <Pause className="size-3.5" />
              ) : (
                <Play className="size-3.5" />
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setCoverArt(track.artwork);
                setProjectName(track.trackName.slice(0, 40));
                toast("Portada aplicada al proyecto");
              }}
            >
              Portada
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
