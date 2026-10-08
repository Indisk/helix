import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { ClimateKitId, ClimateSnapshot, ItunesTrack } from "./types";

const CityQuery = z.object({
  city: z
    .string()
    .trim()
    .min(2, "Escribe al menos 2 letras")
    .max(60, "El nombre es demasiado largo"),
});

const TrackQuery = z.object({
  q: z
    .string()
    .trim()
    .min(2, "Escribe al menos 2 letras")
    .max(80, "La búsqueda es demasiado larga"),
});

type GeoResult = {
  results?: Array<{
    name: string;
    country: string;
    latitude: number;
    longitude: number;
  }>;
};

type ForecastResult = {
  current?: {
    temperature_2m: number;
    weather_code: number;
    wind_speed_10m: number;
    is_day: number;
  };
};

type ItunesRaw = {
  results?: Array<{
    trackId: number;
    trackName: string;
    artistName: string;
    collectionName: string;
    artworkUrl100?: string;
    previewUrl?: string;
  }>;
};

function kitFromCode(code: number): {
  kitId: ClimateKitId;
  label: string;
  genre: string;
  bpm: number;
} {
  if (code === 0 || code === 1) {
    return { kitId: "sun", label: "Despejado", genre: "House", bpm: 122 };
  }
  if (code === 2 || code === 3) {
    return { kitId: "cloud", label: "Nublado", genre: "Chill", bpm: 104 };
  }
  if (code === 45 || code === 48) {
    return { kitId: "fog", label: "Niebla", genre: "Ambient", bpm: 78 };
  }
  if (
    (code >= 51 && code <= 67) ||
    (code >= 80 && code <= 82)
  ) {
    return { kitId: "rain", label: "Lluvia", genre: "Lo-fi", bpm: 86 };
  }
  if ((code >= 71 && code <= 77) || code === 85 || code === 86) {
    return { kitId: "snow", label: "Nieve", genre: "Sparkle", bpm: 92 };
  }
  if (code >= 95) {
    return { kitId: "storm", label: "Tormenta", genre: "Dark", bpm: 138 };
  }
  return { kitId: "cloud", label: "Variable", genre: "Chill", bpm: 104 };
}

export const fetchClimateMix = createServerFn({ method: "GET" })
  .validator(CityQuery)
  .handler(
    async ({
      data,
    }): Promise<{ ok: true; mix: ClimateSnapshot } | { ok: false; message: string }> => {
      try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(data.city)}&count=1&language=es&format=json`;
        const geoRes = await fetch(geoUrl);
        if (!geoRes.ok) {
          return { ok: false, message: "No se pudo buscar la ciudad." };
        }
        const geo = (await geoRes.json()) as GeoResult;
        const place = geo.results?.[0];
        if (!place) {
          return { ok: false, message: "No encontramos esa ciudad. Prueba otro nombre." };
        }
        const wxUrl = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,weather_code,wind_speed_10m,is_day&timezone=auto`;
        const wxRes = await fetch(wxUrl);
        if (!wxRes.ok) {
          return { ok: false, message: "No se pudo leer el clima." };
        }
        const wx = (await wxRes.json()) as ForecastResult;
        const current = wx.current;
        if (!current) {
          return { ok: false, message: "Sin datos de clima para esa ciudad." };
        }
        const mapped = kitFromCode(current.weather_code);
        return {
          ok: true,
          mix: {
            city: place.name,
            country: place.country,
            temp: Math.round(current.temperature_2m),
            wind: Math.round(current.wind_speed_10m),
            isDay: current.is_day === 1,
            ...mapped,
          },
        };
      } catch {
        return { ok: false, message: "Error de red al consultar el clima." };
      }
    },
  );

export const searchItunes = createServerFn({ method: "GET" })
  .validator(TrackQuery)
  .handler(
    async ({
      data,
    }): Promise<{ ok: true; tracks: ItunesTrack[] } | { ok: false; message: string }> => {
      try {
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(data.q)}&media=music&entity=song&limit=8`;
        const res = await fetch(url);
        if (!res.ok) {
          return { ok: false, message: "iTunes no respondió. Intenta de nuevo." };
        }
        const json = (await res.json()) as ItunesRaw;
        const tracks: ItunesTrack[] = (json.results ?? []).map((row) => ({
          trackId: row.trackId,
          trackName: row.trackName,
          artistName: row.artistName,
          collectionName: row.collectionName,
          artwork: (row.artworkUrl100 ?? "").replace("100x100bb", "300x300bb"),
          previewUrl: row.previewUrl ?? null,
        }));
        return { ok: true, tracks };
      } catch {
        return { ok: false, message: "Error de red al buscar canciones." };
      }
    },
  );
