import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
import { a as Pause, c as CloudSun, i as Play, l as CircleHelp, n as Square, o as LoaderCircle, r as Settings2, s as GripVertical } from "../_libs/lucide-react.mjs";
import { n as toast, t as Toaster } from "../_libs/sonner.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BfF5Jwuz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ACCENT_PRESETS = [
	{
		id: "ember",
		label: "Ember",
		value: "#e86a2c"
	},
	{
		id: "teal",
		label: "Teal",
		value: "#2eb8a0"
	},
	{
		id: "ice",
		label: "Hielo",
		value: "#7aa2c4"
	},
	{
		id: "sage",
		label: "Sage",
		value: "#6f9a7c"
	}
];
function flags(...on) {
	const steps = Array.from({ length: 16 }, () => false);
	for (const i of on) if (i >= 0 && i < 16) steps[i] = true;
	return steps;
}
function channel(id, name, kind, on, extra) {
	return {
		id,
		name,
		kind,
		steps: flags(...on),
		mute: false,
		solo: false,
		volume: extra?.volume ?? .86,
		pan: extra?.pan ?? 0
	};
}
function n(step, pitch, length = 1, velocity = .9) {
	return {
		id: `${step}:${pitch}:${length}`,
		step,
		pitch,
		length,
		velocity
	};
}
function kit(bpm, swing, drums, pianoNotes) {
	return {
		bpm,
		swing,
		channels: drums,
		pianoNotes
	};
}
var BASE_DRUMS = (kick, snare, hat, clap, perc, vols) => [
	channel("kick", "Kick", "kick", kick, { volume: vols?.kick ?? .95 }),
	channel("snare", "Snare", "snare", snare, {
		volume: vols?.snare ?? .82,
		pan: .04
	}),
	channel("hat", "Hats", "hat", hat, {
		volume: vols?.hat ?? .55,
		pan: .18
	}),
	channel("clap", "Clap", "clap", clap, {
		volume: vols?.clap ?? .7,
		pan: -.1
	}),
	channel("perc", "Perc", "perc", perc, {
		volume: vols?.perc ?? .62,
		pan: -.22
	}),
	channel("bass", "Bass", "bass", [], { volume: vols?.bass ?? .88 }),
	channel("lead", "Lead", "lead", [], {
		volume: vols?.lead ?? .64,
		pan: .12
	}),
	channel("pad", "Pad", "pad", [], { volume: vols?.pad ?? .48 })
];
var DEMO_KIT = kit(120, .08, BASE_DRUMS([
	0,
	4,
	8,
	12
], [4, 12], [
	0,
	2,
	4,
	6,
	8,
	10,
	12,
	14
], [4, 12], [
	3,
	6,
	11,
	14
]), {
	bass: [
		n(0, 36, 2),
		n(3, 36, 1, .7),
		n(4, 39, 2),
		n(8, 43, 2),
		n(12, 36, 2),
		n(14, 34, 2)
	],
	lead: [
		n(2, 63, 1),
		n(6, 67, 1),
		n(10, 70, 2),
		n(14, 67, 1)
	],
	pad: [n(0, 48, 8, .55), n(8, 43, 8, .5)]
});
var CLIMATE_KITS = {
	sun: kit(122, .04, BASE_DRUMS([
		0,
		4,
		8,
		12
	], [4, 12], [
		0,
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10,
		11,
		12,
		13,
		14,
		15
	], [4, 12], [7, 15], {
		hat: .42,
		perc: .5
	}), {
		bass: [
			n(0, 38, 2),
			n(4, 38, 2),
			n(8, 41, 2),
			n(12, 43, 2)
		],
		lead: [
			n(1, 65, 1),
			n(5, 69, 1),
			n(9, 72, 2),
			n(13, 69, 1)
		],
		pad: [n(0, 50, 8, .45), n(8, 53, 8, .4)]
	}),
	cloud: kit(104, .12, BASE_DRUMS([
		0,
		8,
		10
	], [4, 12], [
		2,
		6,
		10,
		14
	], [12], [
		3,
		7,
		11
	], {
		kick: .8,
		hat: .48
	}), {
		bass: [
			n(0, 41, 3),
			n(6, 38, 2),
			n(10, 36, 3)
		],
		lead: [
			n(2, 60, 2),
			n(8, 65, 2),
			n(14, 62, 2)
		],
		pad: [n(0, 48, 16, .42)]
	}),
	rain: kit(86, .28, BASE_DRUMS([
		0,
		7,
		10
	], [4, 12], [
		0,
		3,
		6,
		8,
		11,
		14
	], [4, 13], [
		2,
		9,
		15
	], {
		kick: .9,
		hat: .38,
		snare: .7
	}), {
		bass: [
			n(0, 33, 4),
			n(8, 36, 3),
			n(12, 31, 4)
		],
		lead: [
			n(3, 58, 2),
			n(7, 61, 1),
			n(11, 63, 2)
		],
		pad: [n(0, 45, 16, .5)]
	}),
	fog: kit(78, .16, BASE_DRUMS([0, 10], [8], [4, 12], [], [6, 14], {
		kick: .7,
		snare: .45,
		hat: .28,
		perc: .4,
		pad: .62
	}), {
		bass: [n(0, 29, 8), n(8, 32, 8)],
		lead: [n(4, 56, 4), n(12, 53, 4)],
		pad: [n(0, 41, 16, .6)]
	}),
	snow: kit(92, .1, BASE_DRUMS([0, 8], [4, 12], [
		2,
		6,
		8,
		10,
		14
	], [12], [
		1,
		5,
		9,
		13
	], {
		kick: .78,
		perc: .7,
		hat: .4
	}), {
		bass: [n(0, 38, 4), n(8, 43, 4)],
		lead: [
			n(2, 74, 1),
			n(6, 79, 1),
			n(10, 76, 2),
			n(14, 81, 1)
		],
		pad: [n(0, 55, 8, .38), n(8, 50, 8, .38)]
	}),
	storm: kit(138, .02, BASE_DRUMS([
		0,
		2,
		4,
		6,
		8,
		10,
		12,
		14
	], [4, 12], [
		1,
		3,
		5,
		7,
		9,
		11,
		13,
		15
	], [
		4,
		7,
		12
	], [
		3,
		6,
		11,
		15
	], {
		kick: 1,
		hat: .5,
		snare: .88,
		perc: .72
	}), {
		bass: [
			n(0, 28, 2),
			n(4, 28, 2),
			n(8, 31, 2),
			n(12, 27, 2)
		],
		lead: [
			n(0, 52, 1),
			n(3, 55, 1),
			n(6, 58, 1),
			n(9, 55, 1),
			n(12, 51, 2)
		],
		pad: [n(0, 40, 8, .4), n(8, 39, 8, .4)]
	})
};
function emptyKit() {
	return kit(120, 0, BASE_DRUMS([], [], [], [], [], {
		kick: .9,
		snare: .8,
		hat: .5,
		clap: .7,
		perc: .6
	}), {
		bass: [],
		lead: [],
		pad: []
	});
}
function cloneKit(source) {
	return {
		bpm: source.bpm,
		swing: source.swing,
		channels: source.channels.map((ch) => ({
			...ch,
			steps: [...ch.steps]
		})),
		pianoNotes: Object.fromEntries(Object.entries(source.pianoNotes).map(([id, notes]) => [id, notes.map((note) => ({ ...note }))]))
	};
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}
function uid() {
	return crypto.randomUUID();
}
function pitchName(midi) {
	return `${[
		"C",
		"C#",
		"D",
		"D#",
		"E",
		"F",
		"F#",
		"G",
		"G#",
		"A",
		"A#",
		"B"
	][(midi % 12 + 12) % 12]}${Math.floor(midi / 12) - 1}`;
}
function isBlackKey(midi) {
	return [
		1,
		3,
		6,
		8,
		10
	].includes((midi % 12 + 12) % 12);
}
function isValidHex(value) {
	return /^#[0-9a-fA-F]{6}$/.test(value);
}
var DEFAULT_ACCENT = "#e86a2c";
function applyAccent(hex) {
	if (typeof document === "undefined") return;
	const value = isValidHex(hex) ? hex : DEFAULT_ACCENT;
	document.documentElement.style.setProperty("--color-accent", value);
	document.documentElement.style.setProperty("--color-accent-soft", `color-mix(in oklab, ${value} 22%, transparent)`);
}
var STORAGE_KEY = "helix-studio-v1";
function defaultState() {
	const demo = cloneKit(DEMO_KIT);
	return {
		onboarded: false,
		producerName: "",
		projectName: "Nueva sesión",
		accent: DEFAULT_ACCENT,
		bpm: demo.bpm,
		swing: demo.swing,
		masterVolume: .85,
		channels: demo.channels,
		pianoNotes: demo.pianoNotes,
		selectedId: "kick",
		coverArt: null,
		climate: null
	};
}
function pickPersist(s) {
	return {
		onboarded: s.onboarded,
		producerName: s.producerName,
		projectName: s.projectName,
		accent: s.accent,
		bpm: s.bpm,
		swing: s.swing,
		masterVolume: s.masterVolume,
		channels: s.channels,
		pianoNotes: s.pianoNotes,
		selectedId: s.selectedId,
		coverArt: s.coverArt,
		climate: s.climate
	};
}
var useStudio = create((set, get) => ({
	...defaultState(),
	playing: false,
	currentStep: 0,
	view: "rack",
	heldKeys: [],
	setOnboarded: (value) => set({ onboarded: value }),
	setProducerName: (name) => set({ producerName: name.slice(0, 24) }),
	setProjectName: (name) => set({ projectName: name.slice(0, 40) }),
	setAccent: (hex) => {
		if (!isValidHex(hex)) return;
		applyAccent(hex);
		set({ accent: hex });
	},
	setBpm: (bpm) => set({ bpm: clamp(Math.round(bpm), 40, 240) }),
	setSwing: (swing) => set({ swing: clamp(swing, 0, 1) }),
	setMasterVolume: (volume) => set({ masterVolume: clamp(volume, 0, 1) }),
	setView: (view) => set({ view }),
	setSelected: (id) => set({ selectedId: id }),
	setCoverArt: (url) => set({ coverArt: url }),
	setClimate: (climate) => set({ climate }),
	setStep: (channelId, step, value) => set((s) => ({ channels: s.channels.map((ch) => ch.id === channelId ? {
		...ch,
		steps: ch.steps.map((v, i) => i === step ? value : v)
	} : ch) })),
	toggleMute: (id) => set((s) => ({ channels: s.channels.map((ch) => ch.id === id ? {
		...ch,
		mute: !ch.mute
	} : ch) })),
	toggleSolo: (id) => set((s) => ({ channels: s.channels.map((ch) => ch.id === id ? {
		...ch,
		solo: !ch.solo
	} : ch) })),
	setVolume: (id, volume) => set((s) => ({ channels: s.channels.map((ch) => ch.id === id ? {
		...ch,
		volume: clamp(volume, 0, 1)
	} : ch) })),
	setPan: (id, pan) => set((s) => ({ channels: s.channels.map((ch) => ch.id === id ? {
		...ch,
		pan: clamp(pan, -1, 1)
	} : ch) })),
	reorderChannels: (fromId, toId) => {
		if (fromId === toId) return;
		const channels = [...get().channels];
		const from = channels.findIndex((c) => c.id === fromId);
		const to = channels.findIndex((c) => c.id === toId);
		if (from < 0 || to < 0) return;
		const [item] = channels.splice(from, 1);
		channels.splice(to, 0, item);
		set({ channels });
	},
	addNote: (channelId, note) => set((s) => {
		const list = s.pianoNotes[channelId] ?? [];
		if (list.some((n) => n.step === note.step && n.pitch === note.pitch)) return s;
		return { pianoNotes: {
			...s.pianoNotes,
			[channelId]: [...list, {
				...note,
				id: uid()
			}]
		} };
	}),
	moveNote: (channelId, noteId, step, pitch) => set((s) => ({ pianoNotes: {
		...s.pianoNotes,
		[channelId]: (s.pianoNotes[channelId] ?? []).map((n) => n.id === noteId ? {
			...n,
			step: clamp(Math.round(step), 0, 15),
			pitch: clamp(Math.round(pitch), 24, 84)
		} : n)
	} })),
	removeNote: (channelId, noteId) => set((s) => ({ pianoNotes: {
		...s.pianoNotes,
		[channelId]: (s.pianoNotes[channelId] ?? []).filter((n) => n.id !== noteId)
	} })),
	applyKit: (kind) => {
		const kit = cloneKit(kind === "demo" ? DEMO_KIT : kind === "empty" ? emptyKit() : CLIMATE_KITS[kind]);
		set({
			bpm: kit.bpm,
			swing: kit.swing,
			channels: kit.channels,
			pianoNotes: kit.pianoNotes,
			selectedId: kit.channels[0]?.id ?? "kick"
		});
	},
	holdKey: (midi, down) => set((s) => {
		const has = s.heldKeys.includes(midi);
		if (down && !has) return { heldKeys: [...s.heldKeys, midi] };
		if (!down && has) return { heldKeys: s.heldKeys.filter((k) => k !== midi) };
		return s;
	})
}));
function loadPersisted() {
	if (typeof window === "undefined") return;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return;
		const data = JSON.parse(raw);
		const base = defaultState();
		useStudio.setState({
			...base,
			...data,
			accent: data.accent && isValidHex(data.accent) ? data.accent : base.accent,
			producerName: (data.producerName ?? "").slice(0, 24),
			projectName: (data.projectName ?? "Untitled").slice(0, 40)
		});
		applyAccent(useStudio.getState().accent);
	} catch {}
}
function savePersisted() {
	if (typeof window === "undefined") return;
	try {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(pickPersist(useStudio.getState())));
	} catch {}
}
var saveTimer = null;
var subscribed = false;
function watchPersist() {
	if (typeof window === "undefined" || subscribed) return;
	subscribed = true;
	useStudio.subscribe(() => {
		if (saveTimer) window.clearTimeout(saveTimer);
		saveTimer = window.setTimeout(() => {
			savePersisted();
		}, 160);
	});
}
function makeNoiseBuffer(ctx, seconds = 1.6) {
	const length = Math.floor(ctx.sampleRate * seconds);
	const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
	return buffer;
}
function env(ctx, time, peak, attack, decay) {
	const gain = ctx.createGain();
	gain.gain.setValueAtTime(1e-4, time);
	gain.gain.exponentialRampToValueAtTime(Math.max(2e-4, peak), time + attack);
	gain.gain.exponentialRampToValueAtTime(1e-4, time + attack + decay);
	return gain;
}
function playKick(ctx, dest, time, velocity, noise) {
	const osc = ctx.createOscillator();
	osc.type = "sine";
	osc.frequency.setValueAtTime(168, time);
	osc.frequency.exponentialRampToValueAtTime(42, time + .11);
	const body = env(ctx, time, velocity * 1.05, .004, .32);
	osc.connect(body);
	body.connect(dest);
	osc.start(time);
	osc.stop(time + .34);
	const click = ctx.createBufferSource();
	click.buffer = noise;
	const hp = ctx.createBiquadFilter();
	hp.type = "highpass";
	hp.frequency.value = 1800;
	const cg = env(ctx, time, velocity * .22, .001, .03);
	click.connect(hp);
	hp.connect(cg);
	cg.connect(dest);
	click.start(time);
	click.stop(time + .04);
}
function playSnare(ctx, dest, time, velocity, noise) {
	const tone = ctx.createOscillator();
	tone.type = "triangle";
	tone.frequency.setValueAtTime(210, time);
	tone.frequency.exponentialRampToValueAtTime(140, time + .12);
	const tg = env(ctx, time, velocity * .45, .002, .14);
	tone.connect(tg);
	tg.connect(dest);
	tone.start(time);
	tone.stop(time + .16);
	const src = ctx.createBufferSource();
	src.buffer = noise;
	const bp = ctx.createBiquadFilter();
	bp.type = "bandpass";
	bp.frequency.value = 1800;
	bp.Q.value = .9;
	const ng = env(ctx, time, velocity * .7, .002, .18);
	src.connect(bp);
	bp.connect(ng);
	ng.connect(dest);
	src.start(time);
	src.stop(time + .2);
}
function playHat(ctx, dest, time, velocity, noise, open = false) {
	const src = ctx.createBufferSource();
	src.buffer = noise;
	const hp = ctx.createBiquadFilter();
	hp.type = "highpass";
	hp.frequency.value = 7200;
	const bp = ctx.createBiquadFilter();
	bp.type = "bandpass";
	bp.frequency.value = 9500;
	bp.Q.value = .7;
	const decay = open ? .22 : .045;
	const g = env(ctx, time, velocity * (open ? .4 : .5), .001, decay);
	src.connect(hp);
	hp.connect(bp);
	bp.connect(g);
	g.connect(dest);
	src.start(time);
	src.stop(time + decay + .02);
}
function playClap(ctx, dest, time, velocity, noise) {
	for (const offset of [
		0,
		.018,
		.038
	]) {
		const src = ctx.createBufferSource();
		src.buffer = noise;
		const bp = ctx.createBiquadFilter();
		bp.type = "bandpass";
		bp.frequency.value = 1400;
		bp.Q.value = .7;
		const g = env(ctx, time + offset, velocity * .55, .001, .09);
		src.connect(bp);
		bp.connect(g);
		g.connect(dest);
		src.start(time + offset);
		src.stop(time + offset + .11);
	}
}
function playPerc(ctx, dest, time, velocity) {
	const osc = ctx.createOscillator();
	osc.type = "triangle";
	osc.frequency.setValueAtTime(740, time);
	osc.frequency.exponentialRampToValueAtTime(220, time + .09);
	const g = env(ctx, time, velocity * .42, .001, .12);
	osc.connect(g);
	g.connect(dest);
	osc.start(time);
	osc.stop(time + .14);
}
function midiToHz(midi) {
	return 440 * 2 ** ((midi - 69) / 12);
}
function playBass(ctx, dest, time, midi, duration, velocity) {
	const osc = ctx.createOscillator();
	osc.type = "sawtooth";
	osc.frequency.setValueAtTime(midiToHz(midi), time);
	const filter = ctx.createBiquadFilter();
	filter.type = "lowpass";
	filter.frequency.setValueAtTime(90, time);
	filter.frequency.exponentialRampToValueAtTime(520, time + .04);
	filter.frequency.exponentialRampToValueAtTime(140, time + duration);
	filter.Q.value = 6;
	const g = ctx.createGain();
	g.gain.setValueAtTime(1e-4, time);
	g.gain.exponentialRampToValueAtTime(velocity * .55, time + .01);
	g.gain.exponentialRampToValueAtTime(1e-4, time + duration);
	osc.connect(filter);
	filter.connect(g);
	g.connect(dest);
	osc.start(time);
	osc.stop(time + duration + .02);
}
function playLead(ctx, dest, time, midi, duration, velocity) {
	const osc = ctx.createOscillator();
	osc.type = "square";
	osc.frequency.setValueAtTime(midiToHz(midi), time);
	const filter = ctx.createBiquadFilter();
	filter.type = "lowpass";
	filter.frequency.setValueAtTime(2400, time);
	filter.frequency.exponentialRampToValueAtTime(900, time + duration);
	const g = ctx.createGain();
	g.gain.setValueAtTime(1e-4, time);
	g.gain.exponentialRampToValueAtTime(velocity * .22, time + .008);
	g.gain.exponentialRampToValueAtTime(1e-4, time + duration);
	osc.connect(filter);
	filter.connect(g);
	g.connect(dest);
	osc.start(time);
	osc.stop(time + duration + .02);
}
function playPad(ctx, dest, time, midi, duration, velocity) {
	for (const cents of [
		-8,
		0,
		11
	]) {
		const osc = ctx.createOscillator();
		osc.type = "sawtooth";
		osc.frequency.setValueAtTime(midiToHz(midi), time);
		osc.detune.value = cents;
		const filter = ctx.createBiquadFilter();
		filter.type = "lowpass";
		filter.frequency.value = 900;
		filter.Q.value = .4;
		const g = ctx.createGain();
		g.gain.setValueAtTime(1e-4, time);
		g.gain.linearRampToValueAtTime(velocity * .09, time + .08);
		g.gain.setValueAtTime(velocity * .09, time + duration - .12);
		g.gain.exponentialRampToValueAtTime(1e-4, time + duration);
		osc.connect(filter);
		filter.connect(g);
		g.connect(dest);
		osc.start(time);
		osc.stop(time + duration + .02);
	}
}
function startLiveLead(ctx, dest, midi, velocity) {
	const osc = ctx.createOscillator();
	osc.type = "sawtooth";
	osc.frequency.value = midiToHz(midi);
	const filter = ctx.createBiquadFilter();
	filter.type = "lowpass";
	filter.frequency.value = 1800;
	const g = ctx.createGain();
	const now = ctx.currentTime;
	g.gain.setValueAtTime(1e-4, now);
	g.gain.exponentialRampToValueAtTime(velocity * .22, now + .01);
	osc.connect(filter);
	filter.connect(g);
	g.connect(dest);
	osc.start(now);
	return { stop(time) {
		g.gain.cancelScheduledValues(time);
		g.gain.setValueAtTime(Math.max(1e-4, g.gain.value), time);
		g.gain.exponentialRampToValueAtTime(1e-4, time + .08);
		osc.stop(time + .1);
	} };
}
var LOOKAHEAD = .22;
var HelixEngine = class {
	ctx = null;
	master = null;
	analyser = null;
	noise = null;
	channels = /* @__PURE__ */ new Map();
	timer = null;
	nextNoteTime = 0;
	step = 0;
	live = /* @__PURE__ */ new Map();
	uiTimers = [];
	ensure() {
		if (!this.ctx) {
			const ctx = new AudioContext({ latencyHint: "interactive" });
			const master = ctx.createGain();
			master.gain.value = .9;
			const comp = ctx.createDynamicsCompressor();
			comp.threshold.value = -16;
			comp.knee.value = 10;
			comp.ratio.value = 3.2;
			comp.attack.value = .01;
			comp.release.value = .18;
			const analyser = ctx.createAnalyser();
			analyser.fftSize = 256;
			analyser.smoothingTimeConstant = .72;
			const delay = ctx.createDelay(1);
			delay.delayTime.value = .22;
			const delayGain = ctx.createGain();
			delayGain.gain.value = .16;
			const delayFilter = ctx.createBiquadFilter();
			delayFilter.type = "lowpass";
			delayFilter.frequency.value = 2200;
			master.connect(comp);
			comp.connect(analyser);
			analyser.connect(ctx.destination);
			master.connect(delayFilter);
			delayFilter.connect(delay);
			delay.connect(delayGain);
			delayGain.connect(comp);
			this.ctx = ctx;
			this.master = master;
			this.analyser = analyser;
			this.noise = makeNoiseBuffer(ctx);
		}
		if (this.ctx.state === "suspended") this.ctx.resume();
		return this.ctx;
	}
	unlock() {
		const ctx = this.ensure();
		const state = useStudio.getState();
		this.syncMixer(state.channels, state.masterVolume);
		return ctx;
	}
	bus(id) {
		const ctx = this.ensure();
		let nodes = this.channels.get(id);
		if (!nodes) {
			const gain = ctx.createGain();
			const pan = ctx.createStereoPanner();
			gain.connect(pan);
			pan.connect(this.master);
			nodes = {
				gain,
				pan
			};
			this.channels.set(id, nodes);
		}
		return nodes;
	}
	syncMixer(channels, masterVolume) {
		if (!this.master) return;
		const v = Math.max(0, Math.min(1, masterVolume));
		this.master.gain.setTargetAtTime(v * v, this.ctx.currentTime, .02);
		for (const ch of channels) {
			const nodes = this.bus(ch.id);
			nodes.gain.gain.setTargetAtTime(Math.max(0, Math.min(1, ch.volume)) ** 1.6, this.ctx.currentTime, .02);
			nodes.pan.pan.setTargetAtTime(Math.max(-1, Math.min(1, ch.pan)), this.ctx.currentTime, .02);
		}
	}
	audible(ch, channels) {
		if (ch.mute) return false;
		if (channels.some((c) => c.solo) && !ch.solo) return false;
		return true;
	}
	triggerKind(kind, dest, time, velocity, pitch, duration = .18) {
		const ctx = this.ctx;
		const noise = this.noise;
		switch (kind) {
			case "kick":
				playKick(ctx, dest, time, velocity, noise);
				break;
			case "snare":
				playSnare(ctx, dest, time, velocity, noise);
				break;
			case "hat":
				playHat(ctx, dest, time, velocity, noise, false);
				break;
			case "clap":
				playClap(ctx, dest, time, velocity, noise);
				break;
			case "perc":
				playPerc(ctx, dest, time, velocity);
				break;
			case "bass":
				playBass(ctx, dest, time, pitch ?? 36, duration, velocity);
				break;
			case "lead":
				playLead(ctx, dest, time, pitch ?? 60, duration, velocity);
				break;
			case "pad": playPad(ctx, dest, time, pitch ?? 48, duration, velocity);
		}
	}
	trigger(channelId, pitch) {
		const { channels } = useStudio.getState();
		const ch = channels.find((c) => c.id === channelId);
		if (!ch) return;
		const ctx = this.unlock();
		const dest = this.bus(ch.id).gain;
		const t = ctx.currentTime + .01;
		this.triggerKind(ch.kind, dest, t, .95, pitch, .28);
	}
	noteOn(midi) {
		const key = String(midi);
		if (this.live.has(key)) return;
		const ctx = this.unlock();
		const { channels, selectedId } = useStudio.getState();
		const selected = channels.find((c) => c.id === selectedId);
		const destId = selected?.kind === "bass" || selected?.kind === "pad" ? selected.id : "lead";
		const dest = this.bus(destId).gain;
		const voice = startLiveLead(ctx, dest, midi, .9);
		this.live.set(key, voice);
	}
	noteOff(midi) {
		const key = String(midi);
		const voice = this.live.get(key);
		if (!voice || !this.ctx) return;
		voice.stop(this.ctx.currentTime);
		this.live.delete(key);
	}
	schedule(step, time, bpm, channels, pianoNotes) {
		const sixteenth = 60 / bpm / 4;
		for (const ch of channels) {
			if (!this.audible(ch, channels)) continue;
			const dest = this.bus(ch.id).gain;
			if (ch.kind === "bass" || ch.kind === "lead" || ch.kind === "pad") {
				const notes = pianoNotes[ch.id] ?? [];
				for (const note of notes) {
					if (note.step !== step) continue;
					const dur = Math.max(.08, note.length * sixteenth * .94);
					this.triggerKind(ch.kind, dest, time, note.velocity, note.pitch, dur);
				}
			} else if (ch.steps[step]) {
				const vel = step % 4 === 0 ? 1 : .72;
				this.triggerKind(ch.kind, dest, time, vel);
			}
		}
	}
	start() {
		const ctx = this.unlock();
		this.stopClock();
		this.step = 0;
		this.nextNoteTime = ctx.currentTime + .05;
		useStudio.setState({
			playing: true,
			currentStep: 0
		});
		this.timer = setInterval(() => this.tick(), 25);
	}
	tick() {
		const state = useStudio.getState();
		if (!state.playing || !this.ctx) return;
		const sixteenth = 60 / state.bpm / 4;
		while (this.nextNoteTime < this.ctx.currentTime + LOOKAHEAD) {
			const step = this.step;
			let when = this.nextNoteTime;
			if (step % 2 === 1) when += sixteenth * state.swing * .55;
			this.schedule(step, when, state.bpm, state.channels, state.pianoNotes);
			const delayMs = Math.max(0, (when - this.ctx.currentTime) * 1e3);
			const id = window.setTimeout(() => {
				if (useStudio.getState().playing) useStudio.setState({ currentStep: step });
			}, delayMs);
			this.uiTimers.push(id);
			this.nextNoteTime += sixteenth;
			this.step = (this.step + 1) % 16;
		}
	}
	stopClock() {
		if (this.timer) {
			clearInterval(this.timer);
			this.timer = null;
		}
		for (const id of this.uiTimers) window.clearTimeout(id);
		this.uiTimers = [];
	}
	stop() {
		this.stopClock();
		for (const voice of this.live.values()) if (this.ctx) voice.stop(this.ctx.currentTime);
		this.live.clear();
		useStudio.setState({
			playing: false,
			currentStep: 0
		});
	}
	resumeIfNeeded() {
		if (this.ctx?.state === "suspended") this.ctx.resume();
	}
};
var engine = null;
function getEngine() {
	if (!engine) engine = new HelixEngine();
	return engine;
}
var PIANO_KEY_MAP = {
	z: 48,
	s: 49,
	x: 50,
	d: 51,
	c: 52,
	v: 53,
	g: 54,
	b: 55,
	h: 56,
	n: 57,
	j: 58,
	m: 59,
	",": 60,
	q: 60,
	"2": 61,
	w: 62,
	"3": 63,
	e: 64,
	r: 65,
	"5": 66,
	t: 67,
	"6": 68,
	y: 69,
	"7": 70,
	u: 71,
	i: 72
};
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,color,border-color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 disabled:pointer-events-none disabled:opacity-40 active:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			secondary: "bg-elevated text-fg border border-border hover:bg-surface",
			ghost: "text-muted hover:text-fg hover:bg-elevated",
			danger: "bg-danger text-fg hover:opacity-90"
		},
		size: {
			sm: "h-8 px-3 text-xs rounded-[var(--radius-sm)]",
			md: "h-10 px-4 text-sm rounded-[var(--radius-md)]",
			lg: "h-12 px-5 text-sm rounded-[var(--radius-md)]",
			icon: "size-10 rounded-[var(--radius-md)]",
			"icon-sm": "size-8 rounded-[var(--radius-sm)]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var CityQuery = object({ city: string().trim().min(2, "Escribe al menos 2 letras").max(60, "El nombre es demasiado largo") });
var TrackQuery = object({ q: string().trim().min(2, "Escribe al menos 2 letras").max(80, "La búsqueda es demasiado larga") });
var fetchClimateMix = createServerFn({ method: "GET" }).validator(CityQuery).handler(createSsrRpc("48e7f6b40e49812c202273be836e8b5d185344a87b29fc543ba9a3fd12c0dafd"));
var searchItunes = createServerFn({ method: "GET" }).validator(TrackQuery).handler(createSsrRpc("bc9492f8e937be97e6bac4260fd484dacc4edaca99a195a641147a2305349641"));
function ClimatePanel() {
	const climate = useStudio((s) => s.climate);
	const setClimate = useStudio((s) => s.setClimate);
	const applyKit = useStudio((s) => s.applyKit);
	const [city, setCity] = (0, import_react.useState)(climate?.city ?? "Buenos Aires");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
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
		toast(`${climate.city}: ${climate.label} · ${climate.bpm} BPM · ${climate.genre}`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex h-full w-full max-w-xl flex-col gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid size-10 place-items-center rounded-[var(--radius-md)] bg-elevated text-accent",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl tracking-tight text-fg",
					children: "Clima Mix"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "El tiempo real de una ciudad elige BPM, groove y kit. Datos de Open-Meteo."
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: city,
					onChange: (e) => setCity(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") search();
					},
					placeholder: "Ciudad",
					className: "h-11 flex-1 rounded-[var(--radius-md)] border border-border bg-elevated px-3 text-sm text-fg outline-none ring-accent/60 placeholder:text-faint focus:ring-2"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => void search(),
					disabled: loading,
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : "Buscar"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-danger",
				children: error
			}) : null,
			climate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-lg)] border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.14em] text-faint",
						children: "Sesión"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-display text-2xl tracking-tight text-fg",
						children: [climate.city, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-2 text-base font-sans text-muted",
							children: climate.country
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 grid grid-cols-2 gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-faint",
								children: "Condición"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-fg",
								children: climate.label
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-faint",
								children: "Temperatura"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "font-mono text-fg",
								children: [climate.temp, "°"]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-faint",
								children: "Viento"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "font-mono text-fg",
								children: [climate.wind, " km/h"]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-faint",
								children: "Kit"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
								className: "text-fg",
								children: [
									climate.genre,
									" · ",
									climate.bpm,
									" BPM"
								]
							})] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-5 w-full",
						onClick: apply,
						children: "Aplicar al beat"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-[var(--radius-lg)] border border-dashed border-border bg-surface/60 p-6 text-sm text-muted",
				children: "Busca una ciudad para adaptar el beat al clima actual."
			})
		]
	});
}
function HelixMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M9 5c7.5 0 7.5 22 15 22",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2.4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M24 5c-7.5 0-7.5 22-15 22",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2.4",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16.5",
				cy: "16",
				r: "2.15",
				fill: "currentColor"
			})
		]
	});
}
function Gate() {
	const producerName = useStudio((s) => s.producerName);
	const projectName = useStudio((s) => s.projectName);
	const accent = useStudio((s) => s.accent);
	const setProducerName = useStudio((s) => s.setProducerName);
	const setProjectName = useStudio((s) => s.setProjectName);
	const setAccent = useStudio((s) => s.setAccent);
	const setOnboarded = useStudio((s) => s.setOnboarded);
	const [errors, setErrors] = (0, import_react.useState)({});
	function submit() {
		const producer = producerName.trim();
		const project = projectName.trim();
		const next = {};
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-dvh items-center justify-center overflow-hidden bg-bg px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 studio-wash" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative w-full max-w-md rounded-[var(--radius-xl)] border border-border bg-surface p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] md:p-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "gate-stagger flex flex-col gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-11 place-items-center rounded-[var(--radius-md)] bg-accent text-accent-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelixMark, { className: "size-6" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl tracking-tight text-fg",
							children: "Helix"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "Estudio de producción en el navegador"
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-faint",
								children: "Nombre de productor"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: producerName,
								onChange: (e) => setProducerName(e.target.value),
								maxLength: 24,
								placeholder: "Tu alias",
								className: "h-11 w-full rounded-[var(--radius-md)] border border-border bg-elevated px-3 text-sm text-fg outline-none ring-accent/60 placeholder:text-faint focus:ring-2"
							}),
							errors.producer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-danger",
								children: errors.producer
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-faint",
								children: "Nombre del proyecto"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: projectName,
								onChange: (e) => setProjectName(e.target.value),
								maxLength: 40,
								placeholder: "Untitled",
								className: "h-11 w-full rounded-[var(--radius-md)] border border-border bg-elevated px-3 text-sm text-fg outline-none ring-accent/60 placeholder:text-faint focus:ring-2"
							}),
							errors.project ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-danger",
								children: errors.project
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-medium uppercase tracking-[0.14em] text-faint",
						children: "Color de acento"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [ACCENT_PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": preset.label,
							onClick: () => setAccent(preset.value),
							className: cn("size-8 rounded-full border border-border transition-[transform,box-shadow] duration-[var(--motion-quick)]", accent === preset.value && "ring-2 ring-fg ring-offset-2 ring-offset-surface"),
							style: { background: `var(--swatch-${preset.id})` }
						}, preset.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid size-8 place-items-center overflow-hidden rounded-full border border-border bg-elevated",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "sr-only",
								children: "Color personalizado"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "color",
								value: accent,
								onChange: (e) => setAccent(e.target.value),
								className: "h-10 w-10 cursor-pointer scale-150"
							})]
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "lg",
						className: "w-full",
						onClick: submit,
						children: "Entrar al estudio"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-faint",
						children: "El audio se activa con este clic. Espacio reproduce. Z–M es el piano."
					})
				]
			})
		})]
	});
}
var ROWS = [
	["Espacio", "Play / stop"],
	["Z S X D C V G B H N J M", "Piano (octava baja)"],
	["Q 2 W 3 E R 5 T 6 Y 7 U I", "Piano (octava alta)"],
	["Arrastrar en rack, piano o pads", "Colocar notas"],
	["Clic en una nota", "Borrarla"],
	["Asa de canal", "Reordenar canales"],
	["Faders", "Arrastrar volumen"],
	["Refs → header", "Soltar portada en el proyecto"]
];
function HelpDialog({ open, onClose }) {
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-40 grid place-items-center bg-bg/70 p-4",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "dialog",
			"aria-labelledby": "help-title",
			className: "w-full max-w-md rounded-[var(--radius-xl)] border border-border bg-surface p-5",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					id: "help-title",
					className: "font-display text-lg text-fg",
					children: "Atajos y gestos"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-2",
					children: ROWS.map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-accent",
							children: k
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-right text-muted",
							children: v
						})]
					}, k))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-5 w-full",
					onClick: onClose,
					children: "Cerrar"
				})
			]
		})
	});
}
function Fader({ value, onChange, label }) {
	const ref = (0, import_react.useRef)(null);
	function at(clientY) {
		const rect = ref.current?.getBoundingClientRect();
		if (!rect) return;
		onChange(clamp(1 - (clientY - rect.top) / rect.height, 0, 1));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		role: "slider",
		"aria-label": label,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-valuenow": Math.round(value * 100),
		tabIndex: 0,
		onPointerDown: (e) => {
			e.target.setPointerCapture(e.pointerId);
			at(e.clientY);
		},
		onPointerMove: (e) => {
			if (e.buttons !== 1) return;
			at(e.clientY);
		},
		onKeyDown: (e) => {
			if (e.key === "ArrowUp") onChange(clamp(value + .05, 0, 1));
			if (e.key === "ArrowDown") onChange(clamp(value - .05, 0, 1));
		},
		className: "relative h-36 w-8 cursor-ns-resize rounded-full bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fader-fill absolute inset-x-1 bottom-1 rounded-full",
			style: { height: `${Math.max(8, value * 100)}%` }
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute left-1/2 h-3 w-7 -translate-x-1/2 rounded-[3px] bg-fg",
			style: { bottom: `calc(${value * 100}% - 6px)` }
		})]
	});
}
function Mixer() {
	const channels = useStudio((s) => s.channels);
	const masterVolume = useStudio((s) => s.masterVolume);
	const setVolume = useStudio((s) => s.setVolume);
	const setPan = useStudio((s) => s.setPan);
	const setMasterVolume = useStudio((s) => s.setMasterVolume);
	const toggleMute = useStudio((s) => s.toggleMute);
	const toggleSolo = useStudio((s) => s.toggleSolo);
	const selectedId = useStudio((s) => s.selectedId);
	const setSelected = useStudio((s) => s.setSelected);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col gap-3 p-3 md:p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg tracking-tight text-fg",
			children: "Mezclador"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: "Arrastra los faders. Pan de −100 a 100."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 gap-2 overflow-x-auto pb-2",
			children: [channels.map((ch) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-kind": ch.kind,
				className: cn("flex w-[88px] shrink-0 flex-col items-center gap-2 rounded-[var(--radius-md)] border border-border bg-surface p-2", selectedId === ch.id && "border-accent"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSelected(ch.id),
						className: "text-[11px] font-medium text-fg",
						children: ch.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fader, {
						value: ch.volume,
						onChange: (v) => setVolume(ch.id, v),
						label: `Volumen ${ch.name}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: -1,
						max: 1,
						step: .01,
						value: ch.pan,
						onChange: (e) => setPan(ch.id, Number(e.target.value)),
						className: "helix-range w-full",
						"aria-label": `Pan ${ch.name}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => toggleMute(ch.id),
							className: cn("h-7 w-7 rounded-[var(--radius-xs)] text-[10px] font-semibold", ch.mute ? "bg-danger text-fg" : "bg-elevated text-muted"),
							children: "M"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => toggleSolo(ch.id),
							className: cn("h-7 w-7 rounded-[var(--radius-xs)] text-[10px] font-semibold", ch.solo ? "bg-meter text-bg" : "bg-elevated text-muted"),
							children: "S"
						})]
					})
				]
			}, ch.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-[88px] shrink-0 flex-col items-center gap-2 rounded-[var(--radius-md)] border border-accent/40 bg-elevated p-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium text-fg",
						children: "Master"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fader, {
						value: masterVolume,
						onChange: setMasterVolume,
						label: "Volumen master"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[11px] text-muted",
						children: Math.round(masterVolume * 100)
					})
				]
			})]
		})]
	});
}
var SLOP$1 = 6;
function useStepPaint() {
	const setStep = useStudio((s) => s.setStep);
	const setSelected = useStudio((s) => s.setSelected);
	const stroke = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const move = (e) => {
			const current = stroke.current;
			if (!current) return;
			if (!current.moved && Math.hypot(e.clientX - current.x, e.clientY - current.y) > SLOP$1) current.moved = true;
			if (!current.moved) return;
			const cell = document.elementFromPoint(e.clientX, e.clientY)?.closest("[data-step]");
			if (!cell) return;
			const ch = cell.dataset.ch;
			const step = Number(cell.dataset.step);
			if (!ch || Number.isNaN(step)) return;
			const chState = useStudio.getState().channels.find((c) => c.id === ch);
			if (!chState || chState.steps[step]) return;
			setSelected(ch);
			setStep(ch, step, true);
			if (!current.heard) {
				current.heard = true;
				getEngine().trigger(ch);
			}
		};
		const up = () => {
			const current = stroke.current;
			stroke.current = null;
			if (current && !current.moved && current.startOn) setStep(current.startCh, current.startStep, false);
		};
		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", up);
		window.addEventListener("pointercancel", up);
		return () => {
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", up);
			window.removeEventListener("pointercancel", up);
		};
	}, [setSelected, setStep]);
	function onStepPointerDown(e, channelId, step, on) {
		e.preventDefault();
		setSelected(channelId);
		stroke.current = {
			place: true,
			moved: false,
			startOn: on,
			startCh: channelId,
			startStep: step,
			x: e.clientX,
			y: e.clientY,
			heard: false
		};
		if (!on) {
			setStep(channelId, step, true);
			getEngine().trigger(channelId);
			stroke.current.heard = true;
		}
	}
	return onStepPointerDown;
}
function Pads() {
	const channels = useStudio((s) => s.channels);
	const selectedId = useStudio((s) => s.selectedId);
	const currentStep = useStudio((s) => s.currentStep);
	const playing = useStudio((s) => s.playing);
	const setSelected = useStudio((s) => s.setSelected);
	const onStepPointerDown = useStepPaint();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col gap-3 overflow-auto p-3 md:p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg tracking-tight text-fg",
			children: "Pads"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: "Arrastra sobre los pasos para colocarlos. Un clic en un paso encendido lo borra."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4",
			children: channels.map((ch) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				"data-kind": ch.kind,
				className: cn("flex flex-col gap-2 rounded-[var(--radius-lg)] border border-border bg-elevated p-3", selectedId === ch.id && "border-accent bg-accent-soft"),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onPointerDown: () => {
							setSelected(ch.id);
							getEngine().trigger(ch.id);
						},
						className: "flex min-h-11 items-center gap-2 text-left active:scale-[0.98]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ch-dot size-2.5 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-display text-base text-fg",
							children: ch.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] uppercase tracking-wider text-faint",
							children: ch.kind
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "paint-surface grid grid-cols-8 gap-1",
						children: ch.steps.map((on, step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"data-ch": ch.id,
							"data-step": step,
							"aria-label": `${ch.name} paso ${step + 1}`,
							"aria-pressed": on,
							onPointerDown: (e) => onStepPointerDown(e, ch.id, step, on),
							className: cn("h-8 rounded-[var(--radius-xs)] border transition-colors duration-[var(--motion-micro)]", on ? "step-on" : "step-off", playing && currentStep === step && "step-now", step % 4 === 0 && !on && "step-beat")
						}, step))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[10px] text-faint",
						children: [16, " pasos · clic borra · arrastre pinta"]
					})
				]
			}, ch.id))
		})]
	});
}
var SLOP = 6;
function rangeFor(kind) {
	if (kind === "bass") return {
		min: 28,
		max: 51
	};
	if (kind === "pad") return {
		min: 36,
		max: 59
	};
	return {
		min: 48,
		max: 71
	};
}
function covering(notes, step, pitch) {
	return notes.find((n) => n.pitch === pitch && step >= n.step && step < n.step + n.length);
}
function PianoRoll() {
	const channels = useStudio((s) => s.channels);
	const selectedId = useStudio((s) => s.selectedId);
	const pianoNotes = useStudio((s) => s.pianoNotes);
	const currentStep = useStudio((s) => s.currentStep);
	const playing = useStudio((s) => s.playing);
	const heldKeys = useStudio((s) => s.heldKeys);
	const addNote = useStudio((s) => s.addNote);
	const removeNote = useStudio((s) => s.removeNote);
	const setSelected = useStudio((s) => s.setSelected);
	const gridRef = (0, import_react.useRef)(null);
	const stroke = (0, import_react.useRef)(null);
	const selected = channels.find((c) => c.id === selectedId);
	const melodic = channels.filter((c) => c.kind === "bass" || c.kind === "lead" || c.kind === "pad");
	const channel = selected && (selected.kind === "bass" || selected.kind === "lead" || selected.kind === "pad") ? selected : melodic[0];
	const range = rangeFor(channel?.kind ?? "lead");
	const pitches = (0, import_react.useMemo)(() => {
		const list = [];
		for (let p = range.max; p >= range.min; p -= 1) list.push(p);
		return list;
	}, [range.max, range.min]);
	const notes = channel ? pianoNotes[channel.id] ?? [] : [];
	const pitchesRef = (0, import_react.useRef)(pitches);
	pitchesRef.current = pitches;
	const channelIdRef = (0, import_react.useRef)(channel?.id);
	channelIdRef.current = channel?.id;
	function cellAt(clientX, clientY) {
		const grid = gridRef.current;
		const rows = pitchesRef.current;
		if (!grid) return null;
		const rect = grid.getBoundingClientRect();
		const step = Math.floor((clientX - rect.left) / rect.width * 16);
		const pitch = rows[Math.floor((clientY - rect.top) / rect.height * rows.length)];
		if (pitch === void 0 || step < 0 || step >= 16) return null;
		return {
			step,
			pitch
		};
	}
	(0, import_react.useEffect)(() => {
		const move = (e) => {
			const current = stroke.current;
			if (!current) return;
			if (!current.moved && Math.hypot(e.clientX - current.x, e.clientY - current.y) > SLOP) current.moved = true;
			if (!current.moved) return;
			const cell = cellAt(e.clientX, e.clientY);
			const channelId = channelIdRef.current;
			if (!cell || !channelId) return;
			if (covering(useStudio.getState().pianoNotes[channelId] ?? [], cell.step, cell.pitch)) return;
			addNote(channelId, {
				step: cell.step,
				pitch: cell.pitch,
				length: 1,
				velocity: .9
			});
			getEngine().trigger(channelId, cell.pitch);
		};
		const up = () => {
			const current = stroke.current;
			stroke.current = null;
			if (current && !current.moved && current.startNoteId) removeNote(current.channelId, current.startNoteId);
		};
		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", up);
		window.addEventListener("pointercancel", up);
		return () => {
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", up);
			window.removeEventListener("pointercancel", up);
		};
	}, [addNote, removeNote]);
	if (!channel) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-full place-items-center p-6 text-sm text-muted",
		children: "No hay canales melódicos."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col gap-2 p-3 md:p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg tracking-tight text-fg",
					children: "Piano roll"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Arrastra para colocar notas. Un clic sobre una nota la borra."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1",
					children: melodic.map((ch) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setSelected(ch.id),
						className: cn("h-8 rounded-[var(--radius-sm)] px-3 text-xs", channel.id === ch.id ? "bg-accent text-accent-fg" : "bg-elevated text-muted hover:text-fg"),
						children: ch.name
					}, ch.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex w-10 shrink-0 flex-col border-r border-border bg-elevated md:w-12",
					children: pitches.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("flex flex-1 items-center justify-center font-mono text-[9px]", isBlackKey(p) ? "text-faint" : "text-muted"),
						children: pitchName(p).includes("#") ? "" : pitchName(p)
					}, p))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: gridRef,
					className: "paint-surface relative min-h-[320px] flex-1",
					onPointerDown: (e) => {
						if (e.button !== 0) return;
						const cell = cellAt(e.clientX, e.clientY);
						if (!cell) return;
						e.preventDefault();
						const hit = covering(notes, cell.step, cell.pitch);
						stroke.current = {
							channelId: channel.id,
							moved: false,
							startNoteId: hit?.id ?? null,
							x: e.clientX,
							y: e.clientY
						};
						if (!hit) {
							addNote(channel.id, {
								step: cell.step,
								pitch: cell.pitch,
								length: 1,
								velocity: .9
							});
							getEngine().trigger(channel.id, cell.pitch);
						}
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-0 grid",
						style: {
							gridTemplateColumns: `repeat(16, 1fr)`,
							gridTemplateRows: `repeat(${pitches.length}, 1fr)`
						},
						children: pitches.map((p) => Array.from({ length: 16 }, (_, col) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("border-b border-r border-border/60", isBlackKey(p) ? "bg-bg/70" : "bg-transparent", col % 4 === 0 && "border-l border-l-border", playing && currentStep === col && "bg-accent/10") }, `${p}-${col}`)))
					}), notes.map((note) => {
						const row = pitches.indexOf(note.pitch);
						if (row < 0) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pointer-events-none absolute rounded-[3px] bg-accent shadow-sm",
							style: {
								left: `${note.step / 16 * 100}%`,
								top: `${row / pitches.length * 100}%`,
								width: `${Math.max(1, note.length) / 16 * 100}%`,
								height: `${1 / pitches.length * 100}%`
							},
							"aria-hidden": true
						}, note.id);
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex h-12 overflow-hidden rounded-[var(--radius-md)] border border-border",
				children: Array.from({ length: 13 }, (_, i) => {
					const midi = 48 + i;
					const black = isBlackKey(midi);
					const held = heldKeys.includes(String(midi));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onPointerDown: () => {
							getEngine().noteOn(midi);
							useStudio.getState().holdKey(String(midi), true);
						},
						onPointerUp: () => {
							getEngine().noteOff(midi);
							useStudio.getState().holdKey(String(midi), false);
						},
						onPointerLeave: () => {
							getEngine().noteOff(midi);
							useStudio.getState().holdKey(String(midi), false);
						},
						className: cn("flex-1 border-r border-border text-[9px] font-mono", black ? "bg-elevated text-faint" : "bg-fg/90 text-bg", held && "bg-accent text-accent-fg"),
						children: pitchName(midi)
					}, midi);
				})
			})
		]
	});
}
function ReferencesPanel() {
	const setCoverArt = useStudio((s) => s.setCoverArt);
	const setProjectName = useStudio((s) => s.setProjectName);
	const [q, setQ] = (0, import_react.useState)("Daft Punk");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [tracks, setTracks] = (0, import_react.useState)([]);
	const [playingId, setPlayingId] = (0, import_react.useState)(null);
	const audioRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
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
			if (result.tracks.length === 0) setError("Sin resultados. Prueba otro término.");
		} catch {
			setError("No se pudo buscar en iTunes.");
		} finally {
			setLoading(false);
		}
	}
	function togglePreview(track) {
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
		audio.play();
		audio.onended = () => setPlayingId(null);
		setPlayingId(track.trackId);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex h-full w-full max-w-2xl flex-col gap-4 p-4 md:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl tracking-tight text-fg",
				children: "Referencias"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Busca en iTunes, escucha 30 s y arrastra la portada al header para usarla."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: q,
					onChange: (e) => setQ(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") search();
					},
					placeholder: "Artista o canción",
					className: "h-11 flex-1 rounded-[var(--radius-md)] border border-border bg-elevated px-3 text-sm text-fg outline-none ring-accent/60 placeholder:text-faint focus:ring-2"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => void search(),
					disabled: loading,
					children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : "Buscar"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-danger",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "flex min-h-0 flex-1 flex-col gap-2 overflow-auto",
				children: tracks.map((track) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					draggable: true,
					onDragStart: (e) => {
						e.dataTransfer.setData("application/x-helix-art", track.artwork);
						e.dataTransfer.setData("text/uri-list", track.artwork);
						e.dataTransfer.effectAllowed = "copy";
					},
					className: "flex items-center gap-3 rounded-[var(--radius-md)] border border-border bg-surface p-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: track.artwork,
							alt: "",
							draggable: false,
							className: "size-14 rounded-[var(--radius-sm)] object-cover"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm text-fg",
								children: track.trackName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted",
								children: track.artistName
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon-sm",
							variant: "secondary",
							"aria-label": "Preview",
							onClick: () => togglePreview(track),
							children: playingId === track.trackId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							variant: "ghost",
							onClick: () => {
								setCoverArt(track.artwork);
								setProjectName(track.trackName.slice(0, 40));
								toast("Portada aplicada al proyecto");
							},
							children: "Portada"
						})
					]
				}, track.trackId))
			})
		]
	});
}
function Sequencer() {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col gap-2 p-3 md:p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-end justify-between gap-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight text-fg",
				children: "Channel rack"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Arrastra para colocar pasos. Un clic sobre un paso encendido lo borra."
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-h-0 flex-1 overflow-auto rounded-[var(--radius-lg)] border border-border bg-surface p-2 md:p-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-1 flex gap-1 pl-[156px] font-mono text-[10px] text-faint md:pl-[188px]",
				children: Array.from({ length: 16 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("grid h-4 min-w-7 flex-1 place-items-center", i % 4 === 0 && "text-muted"),
					children: i + 1
				}, i))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-1",
				children: channels.map((ch) => {
					const melodic = ch.kind === "bass" || ch.kind === "lead" || ch.kind === "pad";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						"data-kind": ch.kind,
						onDragOver: (e) => e.preventDefault(),
						onDrop: (e) => {
							e.preventDefault();
							const from = e.dataTransfer.getData("text/channel");
							if (from) reorderChannels(from, ch.id);
						},
						className: cn("flex items-center gap-1 rounded-[var(--radius-md)] p-1", selectedId === ch.id ? "bg-accent-soft" : "hover:bg-elevated"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								draggable: true,
								"aria-label": `Mover ${ch.name}`,
								onDragStart: (e) => {
									e.dataTransfer.setData("text/channel", ch.id);
									e.dataTransfer.effectAllowed = "move";
								},
								className: "grid size-8 shrink-0 cursor-grab place-items-center text-faint active:cursor-grabbing",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripVertical, { className: "size-3.5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									setSelected(ch.id);
									getEngine().trigger(ch.id);
								},
								className: "flex w-[72px] shrink-0 items-center gap-2 md:w-[96px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ch-dot size-2.5 shrink-0 rounded-full" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-left text-xs font-medium text-fg",
									children: ch.name
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "paint-surface flex min-w-0 flex-1 gap-1",
								children: ch.steps.map((on, step) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"data-ch": ch.id,
									"data-step": step,
									"aria-label": `${ch.name} paso ${step + 1}`,
									"aria-pressed": on,
									onPointerDown: (e) => onStepPointerDown(e, ch.id, step, on),
									className: cn("h-8 min-w-7 flex-1 rounded-[var(--radius-xs)] border transition-colors duration-[var(--motion-micro)]", on ? "step-on" : "step-off", playing && currentStep === step && "step-now", step % 4 === 0 && !on && "step-beat")
								}, step))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex shrink-0 gap-0.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => toggleMute(ch.id),
										className: cn("h-8 min-w-8 rounded-[var(--radius-xs)] text-[10px] font-semibold", ch.mute ? "bg-danger/80 text-fg" : "text-faint hover:bg-elevated"),
										children: "M"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => toggleSolo(ch.id),
										className: cn("h-8 min-w-8 rounded-[var(--radius-xs)] text-[10px] font-semibold", ch.solo ? "bg-meter/80 text-bg" : "text-faint hover:bg-elevated"),
										children: "S"
									}),
									melodic ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											setSelected(ch.id);
											setView("piano");
										},
										className: "hidden h-8 rounded-[var(--radius-xs)] px-2 text-[10px] text-muted hover:text-fg md:inline",
										children: "Piano"
									}) : null
								]
							})
						]
					}, ch.id);
				})
			})]
		})]
	});
}
function SettingsPanel({ open, onClose }) {
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute right-3 top-14 z-30 w-[min(100%-24px,360px)] rounded-[var(--radius-lg)] border border-border bg-surface p-4 shadow-[0_16px_48px_rgba(0,0,0,0.4)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-base text-fg",
				children: "Personalización"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-xs text-muted",
					children: "Productor"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: producerName,
					onChange: (e) => setProducerName(e.target.value),
					maxLength: 24,
					className: "h-10 w-full rounded-[var(--radius-sm)] border border-border bg-elevated px-3 text-sm text-fg outline-none focus:ring-2 focus:ring-accent/60"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mb-1 block text-xs text-muted",
					children: "Proyecto"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: projectName,
					onChange: (e) => setProjectName(e.target.value),
					maxLength: 40,
					className: "h-10 w-full rounded-[var(--radius-sm)] border border-border bg-elevated px-3 text-sm text-fg outline-none focus:ring-2 focus:ring-accent/60"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-1 text-xs text-muted",
					children: "Acento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [ACCENT_PRESETS.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": preset.label,
						onClick: () => setAccent(preset.value),
						className: cn("size-7 rounded-full border border-border", accent === preset.value && "ring-2 ring-fg ring-offset-2 ring-offset-surface"),
						style: { background: `var(--swatch-${preset.id})` }
					}, preset.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "color",
						value: accent,
						onChange: (e) => setAccent(e.target.value),
						className: "size-7 cursor-pointer rounded-full",
						"aria-label": "Color personalizado"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: () => {
						applyKit("demo");
						toast("Demo cargada");
					},
					children: "Cargar demo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "secondary",
					onClick: () => {
						applyKit("empty");
						toast("Patrón vacío");
					},
					children: "Vaciar patrón"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex justify-end gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "ghost",
					onClick: onClose,
					children: "Cerrar"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: save,
					children: "Guardar"
				})]
			})
		]
	});
}
function Visualizer() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx2d = canvas.getContext("2d");
		if (!ctx2d) return;
		let raf = 0;
		const draw = () => {
			const { width, height } = canvas;
			ctx2d.clearRect(0, 0, width, height);
			const analyser = getEngine().analyser;
			ctx2d.fillStyle = getComputedStyle(canvas).getPropertyValue("--color-border");
			if (!analyser) {
				ctx2d.fillRect(0, height - 2, width, 2);
				raf = requestAnimationFrame(draw);
				return;
			}
			const bins = new Uint8Array(analyser.frequencyBinCount);
			analyser.getByteFrequencyData(bins);
			const accent = getComputedStyle(canvas).getPropertyValue("--color-accent").trim();
			const barCount = 16;
			const gap = 2;
			const bw = (width - 30) / barCount;
			for (let i = 0; i < barCount; i += 1) {
				const mag = bins[Math.floor(i / barCount * bins.length * .6)] / 255;
				const h = Math.max(2, mag * height);
				ctx2d.fillStyle = accent;
				ctx2d.globalAlpha = .35 + mag * .65;
				ctx2d.fillRect(i * (bw + gap), height - h, bw, h);
			}
			ctx2d.globalAlpha = 1;
			raf = requestAnimationFrame(draw);
		};
		raf = requestAnimationFrame(draw);
		return () => cancelAnimationFrame(raf);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		width: 120,
		height: 28,
		className: "h-7 w-[88px] rounded-[var(--radius-xs)] bg-elevated md:w-[120px]",
		"aria-hidden": "true"
	});
}
var VIEWS = [
	{
		id: "rack",
		label: "Rack"
	},
	{
		id: "piano",
		label: "Piano"
	},
	{
		id: "pads",
		label: "Pads"
	},
	{
		id: "mix",
		label: "Mix"
	},
	{
		id: "clima",
		label: "Clima"
	},
	{
		id: "refs",
		label: "Refs"
	}
];
function Transport({ onHelp, onSettings }) {
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
	const [bpmDraft, setBpmDraft] = (0, import_react.useState)(String(bpm));
	(0, import_react.useEffect)(() => {
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
	function togglePlay() {
		const engine = getEngine();
		if (playing) engine.stop();
		else engine.start();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "flex flex-col gap-2 border-b border-border bg-surface px-3 py-2 md:px-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 md:gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "grid size-8 shrink-0 place-items-center rounded-[var(--radius-sm)] bg-accent text-accent-fg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelixMark, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-display text-sm leading-tight tracking-tight text-fg",
							children: "Helix"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-[11px] text-muted",
							children: producerName || "Productor"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden items-center gap-2 rounded-[var(--radius-md)] border border-dashed border-border bg-elevated px-2 py-1 md:flex",
					onDragOver: (e) => {
						if (e.dataTransfer.types.includes("application/x-helix-art")) e.preventDefault();
					},
					onDrop: (e) => {
						const url = e.dataTransfer.getData("application/x-helix-art");
						if (url) {
							e.preventDefault();
							setCoverArt(url);
						}
					},
					children: [coverArt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: coverArt,
						alt: "",
						className: "size-8 rounded-[var(--radius-xs)] object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-8 place-items-center rounded-[var(--radius-xs)] bg-bg text-[9px] uppercase tracking-wider text-faint",
						children: "Art"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-[140px] truncate text-xs text-fg",
						children: projectName
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-1 md:gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Visualizer, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: playing ? "secondary" : "primary",
							"aria-label": playing ? "Pausar" : "Reproducir",
							onClick: togglePlay,
							children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "secondary",
							"aria-label": "Detener",
							onClick: () => getEngine().stop(),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-1 rounded-[var(--radius-sm)] border border-border bg-elevated px-2 py-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-wider text-faint",
								children: "BPM"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: bpmDraft,
								onChange: (e) => setBpmDraft(e.target.value),
								onBlur: commitBpm,
								onKeyDown: (e) => {
									if (e.key === "Enter") e.target.blur();
								},
								inputMode: "numeric",
								className: "w-10 bg-transparent text-right font-mono text-sm text-fg outline-none",
								"aria-label": "Tempo"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon-sm",
							variant: "ghost",
							"aria-label": "Ajustes",
							onClick: onSettings,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon-sm",
							variant: "ghost",
							"aria-label": "Ayuda",
							onClick: onHelp,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-4" })
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 overflow-x-auto pb-0.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex gap-1",
				children: VIEWS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setView(item.id),
					className: cn("h-8 rounded-[var(--radius-sm)] px-3 text-xs font-medium transition-colors duration-[var(--motion-quick)]", view === item.id ? "bg-accent text-accent-fg" : "text-muted hover:bg-elevated hover:text-fg"),
					children: item.label
				}, item.id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ml-auto hidden items-center gap-2 md:flex",
				children: [climate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "truncate font-mono text-[11px] text-muted",
					children: [
						climate.city,
						" · ",
						climate.temp,
						"° · ",
						climate.label
					]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center gap-2 text-[11px] text-muted",
					children: ["Swing", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "range",
						min: 0,
						max: 1,
						step: .01,
						value: swing,
						onChange: (e) => setSwing(Number(e.target.value)),
						className: "helix-range w-24",
						"aria-label": "Swing"
					})]
				})]
			})]
		})]
	});
}
function isTypingTarget(target) {
	const el = target;
	if (!el) return false;
	const tag = el.tagName;
	return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
}
function StudioShell() {
	const view = useStudio((s) => s.view);
	const accent = useStudio((s) => s.accent);
	const channels = useStudio((s) => s.channels);
	const masterVolume = useStudio((s) => s.masterVolume);
	const [help, setHelp] = (0, import_react.useState)(false);
	const [settings, setSettings] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		applyAccent(accent);
	}, [accent]);
	(0, import_react.useEffect)(() => {
		getEngine().syncMixer(channels, masterVolume);
	}, [channels, masterVolume]);
	(0, import_react.useEffect)(() => {
		const down = (e) => {
			if (isTypingTarget(e.target)) return;
			if (e.code === "Space") {
				e.preventDefault();
				const engine = getEngine();
				if (useStudio.getState().playing) engine.stop();
				else engine.start();
				return;
			}
			const midi = PIANO_KEY_MAP[e.key.toLowerCase()];
			if (midi !== void 0 && !e.repeat) {
				e.preventDefault();
				getEngine().noteOn(midi);
				useStudio.getState().holdKey(String(midi), true);
			}
		};
		const up = (e) => {
			const midi = PIANO_KEY_MAP[e.key.toLowerCase()];
			if (midi !== void 0) {
				getEngine().noteOff(midi);
				useStudio.getState().holdKey(String(midi), false);
			}
		};
		const vis = () => getEngine().resumeIfNeeded();
		window.addEventListener("keydown", down);
		window.addEventListener("keyup", up);
		document.addEventListener("visibilitychange", vis);
		return () => {
			window.removeEventListener("keydown", down);
			window.removeEventListener("keyup", up);
			document.removeEventListener("visibilitychange", vis);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-dvh min-h-0 flex-col overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Transport, {
				onHelp: () => setHelp(true),
				onSettings: () => setSettings((v) => !v)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPanel, {
				open: settings,
				onClose: () => setSettings(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "min-h-0 flex-1 overflow-hidden",
				children: [
					view === "rack" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sequencer, {}) : null,
					view === "piano" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PianoRoll, {}) : null,
					view === "pads" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pads, {}) : null,
					view === "mix" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mixer, {}) : null,
					view === "clima" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClimatePanel, {}) : null,
					view === "refs" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferencesPanel, {}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HelpDialog, {
				open: help,
				onClose: () => setHelp(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				theme: "dark",
				position: "bottom-right",
				toastOptions: { style: {
					background: "var(--color-elevated)",
					color: "var(--color-fg)",
					border: "1px solid var(--color-border)"
				} }
			})
		]
	});
}
function StudioApp() {
	const onboarded = useStudio((s) => s.onboarded);
	(0, import_react.useEffect)(() => {
		loadPersisted();
		watchPersist();
		applyAccent(useStudio.getState().accent);
	}, []);
	if (!onboarded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gate, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioShell, {});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioApp, {});
}
//#endregion
export { Home as component };
