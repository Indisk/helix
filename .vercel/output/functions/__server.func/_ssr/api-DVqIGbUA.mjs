import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-DVqIGbUA.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var CityQuery = object({ city: string().trim().min(2, "Escribe al menos 2 letras").max(60, "El nombre es demasiado largo") });
var TrackQuery = object({ q: string().trim().min(2, "Escribe al menos 2 letras").max(80, "La búsqueda es demasiado larga") });
function kitFromCode(code) {
	if (code === 0 || code === 1) return {
		kitId: "sun",
		label: "Despejado",
		genre: "House",
		bpm: 122
	};
	if (code === 2 || code === 3) return {
		kitId: "cloud",
		label: "Nublado",
		genre: "Chill",
		bpm: 104
	};
	if (code === 45 || code === 48) return {
		kitId: "fog",
		label: "Niebla",
		genre: "Ambient",
		bpm: 78
	};
	if (code >= 51 && code <= 67 || code >= 80 && code <= 82) return {
		kitId: "rain",
		label: "Lluvia",
		genre: "Lo-fi",
		bpm: 86
	};
	if (code >= 71 && code <= 77 || code === 85 || code === 86) return {
		kitId: "snow",
		label: "Nieve",
		genre: "Sparkle",
		bpm: 92
	};
	if (code >= 95) return {
		kitId: "storm",
		label: "Tormenta",
		genre: "Dark",
		bpm: 138
	};
	return {
		kitId: "cloud",
		label: "Variable",
		genre: "Chill",
		bpm: 104
	};
}
var fetchClimateMix_createServerFn_handler = createServerRpc({
	id: "48e7f6b40e49812c202273be836e8b5d185344a87b29fc543ba9a3fd12c0dafd",
	name: "fetchClimateMix",
	filename: "src/lib/api.ts"
}, (opts) => fetchClimateMix.__executeServer(opts));
var fetchClimateMix = createServerFn({ method: "GET" }).validator(CityQuery).handler(fetchClimateMix_createServerFn_handler, async ({ data }) => {
	try {
		const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(data.city)}&count=1&language=es&format=json`;
		const geoRes = await fetch(geoUrl);
		if (!geoRes.ok) return {
			ok: false,
			message: "No se pudo buscar la ciudad."
		};
		const place = (await geoRes.json()).results?.[0];
		if (!place) return {
			ok: false,
			message: "No encontramos esa ciudad. Prueba otro nombre."
		};
		const wxUrl = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,weather_code,wind_speed_10m,is_day&timezone=auto`;
		const wxRes = await fetch(wxUrl);
		if (!wxRes.ok) return {
			ok: false,
			message: "No se pudo leer el clima."
		};
		const current = (await wxRes.json()).current;
		if (!current) return {
			ok: false,
			message: "Sin datos de clima para esa ciudad."
		};
		const mapped = kitFromCode(current.weather_code);
		return {
			ok: true,
			mix: {
				city: place.name,
				country: place.country,
				temp: Math.round(current.temperature_2m),
				wind: Math.round(current.wind_speed_10m),
				isDay: current.is_day === 1,
				...mapped
			}
		};
	} catch {
		return {
			ok: false,
			message: "Error de red al consultar el clima."
		};
	}
});
var searchItunes_createServerFn_handler = createServerRpc({
	id: "bc9492f8e937be97e6bac4260fd484dacc4edaca99a195a641147a2305349641",
	name: "searchItunes",
	filename: "src/lib/api.ts"
}, (opts) => searchItunes.__executeServer(opts));
var searchItunes = createServerFn({ method: "GET" }).validator(TrackQuery).handler(searchItunes_createServerFn_handler, async ({ data }) => {
	try {
		const url = `https://itunes.apple.com/search?term=${encodeURIComponent(data.q)}&media=music&entity=song&limit=8`;
		const res = await fetch(url);
		if (!res.ok) return {
			ok: false,
			message: "iTunes no respondió. Intenta de nuevo."
		};
		return {
			ok: true,
			tracks: ((await res.json()).results ?? []).map((row) => ({
				trackId: row.trackId,
				trackName: row.trackName,
				artistName: row.artistName,
				collectionName: row.collectionName,
				artwork: (row.artworkUrl100 ?? "").replace("100x100bb", "300x300bb"),
				previewUrl: row.previewUrl ?? null
			}))
		};
	} catch {
		return {
			ok: false,
			message: "Error de red al buscar canciones."
		};
	}
});
//#endregion
export { fetchClimateMix_createServerFn_handler, searchItunes_createServerFn_handler };
