export type DrumKind = "kick" | "snare" | "hat" | "clap" | "perc";
export type MelodicKind = "bass" | "lead" | "pad";
export type ChannelKind = DrumKind | MelodicKind;

export type PianoNote = {
  id: string;
  step: number;
  pitch: number;
  length: number;
  velocity: number;
};

export type Channel = {
  id: string;
  name: string;
  kind: ChannelKind;
  steps: boolean[];
  mute: boolean;
  solo: boolean;
  volume: number;
  pan: number;
};

export type ClimateKitId =
  | "sun"
  | "cloud"
  | "rain"
  | "fog"
  | "snow"
  | "storm";

export type ClimateSnapshot = {
  city: string;
  country: string;
  temp: number;
  wind: number;
  label: string;
  genre: string;
  bpm: number;
  kitId: ClimateKitId;
  isDay: boolean;
};

export type ItunesTrack = {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artwork: string;
  previewUrl: string | null;
};

export type StudioView = "rack" | "piano" | "pads" | "mix" | "clima" | "refs";

export const STEP_COUNT = 16;

export const ACCENT_PRESETS = [
  { id: "ember", label: "Ember", value: "#e86a2c" },
  { id: "teal", label: "Teal", value: "#2eb8a0" },
  { id: "ice", label: "Hielo", value: "#7aa2c4" },
  { id: "sage", label: "Sage", value: "#6f9a7c" },
] as const;
