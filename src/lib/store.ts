import { create } from "zustand";
import { cloneKit, DEMO_KIT, CLIMATE_KITS, emptyKit } from "./presets";
import { applyAccent, DEFAULT_ACCENT } from "./theme";
import type {
  Channel,
  ClimateSnapshot,
  PianoNote,
  StudioView,
} from "./types";
import { STEP_COUNT } from "./types";
import { clamp, isValidHex, uid } from "./utils";

const STORAGE_KEY = "helix-studio-v1";

type PersistShape = {
  onboarded: boolean;
  producerName: string;
  projectName: string;
  accent: string;
  bpm: number;
  swing: number;
  masterVolume: number;
  channels: Channel[];
  pianoNotes: Record<string, PianoNote[]>;
  selectedId: string;
  coverArt: string | null;
  climate: ClimateSnapshot | null;
};

export type StudioState = PersistShape & {
  playing: boolean;
  currentStep: number;
  view: StudioView;
  heldKeys: string[];
  setOnboarded: (value: boolean) => void;
  setProducerName: (name: string) => void;
  setProjectName: (name: string) => void;
  setAccent: (hex: string) => void;
  setBpm: (bpm: number) => void;
  setSwing: (swing: number) => void;
  setMasterVolume: (volume: number) => void;
  setView: (view: StudioView) => void;
  setSelected: (id: string) => void;
  setCoverArt: (url: string | null) => void;
  setClimate: (climate: ClimateSnapshot | null) => void;
  setStep: (channelId: string, step: number, value: boolean) => void;
  toggleMute: (id: string) => void;
  toggleSolo: (id: string) => void;
  setVolume: (id: string, volume: number) => void;
  setPan: (id: string, pan: number) => void;
  reorderChannels: (fromId: string, toId: string) => void;
  addNote: (channelId: string, note: Omit<PianoNote, "id">) => void;
  moveNote: (channelId: string, noteId: string, step: number, pitch: number) => void;
  removeNote: (channelId: string, noteId: string) => void;
  applyKit: (kind: "demo" | "empty" | ClimateSnapshot["kitId"]) => void;
  holdKey: (midi: string, down: boolean) => void;
};

function defaultState(): PersistShape {
  const demo = cloneKit(DEMO_KIT);
  return {
    onboarded: false,
    producerName: "",
    projectName: "Nueva sesión",
    accent: DEFAULT_ACCENT,
    bpm: demo.bpm,
    swing: demo.swing,
    masterVolume: 0.85,
    channels: demo.channels,
    pianoNotes: demo.pianoNotes,
    selectedId: "kick",
    coverArt: null,
    climate: null,
  };
}

function pickPersist(s: StudioState): PersistShape {
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
    climate: s.climate,
  };
}

export const useStudio = create<StudioState>((set, get) => ({
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
  setStep: (channelId, step, value) =>
    set((s) => ({
      channels: s.channels.map((ch) =>
        ch.id === channelId
          ? {
              ...ch,
              steps: ch.steps.map((v, i) => (i === step ? value : v)),
            }
          : ch,
      ),
    })),
  toggleMute: (id) =>
    set((s) => ({
      channels: s.channels.map((ch) =>
        ch.id === id ? { ...ch, mute: !ch.mute } : ch,
      ),
    })),
  toggleSolo: (id) =>
    set((s) => ({
      channels: s.channels.map((ch) =>
        ch.id === id ? { ...ch, solo: !ch.solo } : ch,
      ),
    })),
  setVolume: (id, volume) =>
    set((s) => ({
      channels: s.channels.map((ch) =>
        ch.id === id ? { ...ch, volume: clamp(volume, 0, 1) } : ch,
      ),
    })),
  setPan: (id, pan) =>
    set((s) => ({
      channels: s.channels.map((ch) =>
        ch.id === id ? { ...ch, pan: clamp(pan, -1, 1) } : ch,
      ),
    })),
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
  addNote: (channelId, note) =>
    set((s) => {
      const list = s.pianoNotes[channelId] ?? [];
      const exists = list.some(
        (n) => n.step === note.step && n.pitch === note.pitch,
      );
      if (exists) return s;
      return {
        pianoNotes: {
          ...s.pianoNotes,
          [channelId]: [...list, { ...note, id: uid() }],
        },
      };
    }),
  moveNote: (channelId, noteId, step, pitch) =>
    set((s) => ({
      pianoNotes: {
        ...s.pianoNotes,
        [channelId]: (s.pianoNotes[channelId] ?? []).map((n) =>
          n.id === noteId
            ? {
                ...n,
                step: clamp(Math.round(step), 0, STEP_COUNT - 1),
                pitch: clamp(Math.round(pitch), 24, 84),
              }
            : n,
        ),
      },
    })),
  removeNote: (channelId, noteId) =>
    set((s) => ({
      pianoNotes: {
        ...s.pianoNotes,
        [channelId]: (s.pianoNotes[channelId] ?? []).filter((n) => n.id !== noteId),
      },
    })),
  applyKit: (kind) => {
    const source =
      kind === "demo"
        ? DEMO_KIT
        : kind === "empty"
          ? emptyKit()
          : CLIMATE_KITS[kind];
    const kit = cloneKit(source);
    set({
      bpm: kit.bpm,
      swing: kit.swing,
      channels: kit.channels,
      pianoNotes: kit.pianoNotes,
      selectedId: kit.channels[0]?.id ?? "kick",
    });
  },
  holdKey: (midi, down) =>
    set((s) => {
      const has = s.heldKeys.includes(midi);
      if (down && !has) return { heldKeys: [...s.heldKeys, midi] };
      if (!down && has) return { heldKeys: s.heldKeys.filter((k) => k !== midi) };
      return s;
    }),
}));

export function loadPersisted() {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw) as Partial<PersistShape>;
    const base = defaultState();
    useStudio.setState({
      ...base,
      ...data,
      accent: data.accent && isValidHex(data.accent) ? data.accent : base.accent,
      producerName: (data.producerName ?? "").slice(0, 24),
      projectName: (data.projectName ?? "Untitled").slice(0, 40),
    });
    applyAccent(useStudio.getState().accent);
  } catch {
    // ignore broken saves
  }
}

export function savePersisted() {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(pickPersist(useStudio.getState())),
    );
  } catch {
    // quota
  }
}

let saveTimer: number | null = null;
let subscribed = false;

export function watchPersist() {
  if (typeof window === "undefined" || subscribed) return;
  subscribed = true;
  useStudio.subscribe(() => {
    if (saveTimer) window.clearTimeout(saveTimer);
    saveTimer = window.setTimeout(() => {
      savePersisted();
    }, 160);
  });
}
