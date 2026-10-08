import { CloudSun, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { fetchClimateMix } from "@/lib/api";
import { useStudio } from "@/lib/store";

export function ClimatePanel() {
  const climate = useStudio((s) => s.climate);
  const setClimate = useStudio((s) => s.setClimate);
  const applyKit = useStudio((s) => s.applyKit);
  const [city, setCity] = useState(climate?.city ?? "Buenos Aires");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function search() {
    const q = city.trim();
    if (q.length < 2) {
      setError("Escribe al menos 2 letras.");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const result = await fetchClimateMix({ data: { city: q } });
      if (!result.ok) {
        setError(result.message);
        return;
      }
      setClimate(result.mix);
    } catch {
      setError("No se pudo consultar el clima.");
    } finally {
      setLoading(false);
    }
  }

  function apply() {
    if (!climate) return;
    applyKit(climate.kitId);
    toast(
      `${climate.city}: ${climate.label} · ${climate.bpm} BPM · ${climate.genre}`,
    );
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-xl flex-col gap-4 p-4 md:p-6">
      <div className="flex items-start gap-3">
        <span className="grid size-10 place-items-center rounded-[var(--radius-md)] bg-elevated text-accent">
          <CloudSun className="size-5" />
        </span>
        <div>
          <h2 className="font-display text-xl tracking-tight text-fg">Clima Mix</h2>
          <p className="text-sm text-muted">
            El tiempo real de una ciudad elige BPM, groove y kit. Datos de Open-Meteo.
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void search();
          }}
          placeholder="Ciudad"
          className="h-11 flex-1 rounded-[var(--radius-md)] border border-border bg-elevated px-3 text-sm text-fg outline-none ring-accent/60 placeholder:text-faint focus:ring-2"
        />
        <Button onClick={() => void search()} disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : "Buscar"}
        </Button>
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}

      {climate ? (
        <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-[0.14em] text-faint">Sesión</p>
          <p className="mt-1 font-display text-2xl tracking-tight text-fg">
            {climate.city}
            <span className="ml-2 text-base font-sans text-muted">{climate.country}</span>
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-faint">Condición</dt>
              <dd className="text-fg">{climate.label}</dd>
            </div>
            <div>
              <dt className="text-faint">Temperatura</dt>
              <dd className="font-mono text-fg">{climate.temp}°</dd>
            </div>
            <div>
              <dt className="text-faint">Viento</dt>
              <dd className="font-mono text-fg">{climate.wind} km/h</dd>
            </div>
            <div>
              <dt className="text-faint">Kit</dt>
              <dd className="text-fg">
                {climate.genre} · {climate.bpm} BPM
              </dd>
            </div>
          </dl>
          <Button className="mt-5 w-full" onClick={apply}>
            Aplicar al beat
          </Button>
        </div>
      ) : (
        <div className="rounded-[var(--radius-lg)] border border-dashed border-border bg-surface/60 p-6 text-sm text-muted">
          Busca una ciudad para adaptar el beat al clima actual.
        </div>
      )}
    </div>
  );
}
