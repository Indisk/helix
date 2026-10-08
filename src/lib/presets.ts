import type { Channel, ClimateKitId, PianoNote } from "./types";
import { STEP_COUNT } from "./types";

function flags(...on: number[]): boolean[] {
  const steps = Array.from({ length: STEP_COUNT }, () => false);
  for (const i of on) {
    if (i >= 0 && i < STEP_COUNT) steps[i] = true;
  }
  return steps;
}

function channel(
  id: string,
  name: string,
  kind: Channel["kind"],
  on: number[],
  extra?: Partial<Pick<Channel, "volume" | "pan">>,
): Channel {
  return {
    id,
    name,
    kind,
    steps: flags(...on),
    mute: false,
    solo: false,
    volume: extra?.volume ?? 0.86,
    pan: extra?.pan ?? 0,
  };
}

function n(step: number, pitch: number, length = 1, velocity = 0.9): PianoNote {
  return {
    id: `${step}:${pitch}:${length}`,
    step,
    pitch,
    length,
    velocity,
  };
}

export type Kit = {
  bpm: number;
  swing: number;
  channels: Channel[];
  pianoNotes: Record<string, PianoNote[]>;
};

function kit(
  bpm: number,
  swing: number,
  drums: Channel[],
  pianoNotes: Record<string, PianoNote[]>,
): Kit {
  return { bpm, swing, channels: drums, pianoNotes };
}

const BASE_DRUMS = (
  kick: number[],
  snare: number[],
  hat: number[],
  clap: number[],
  perc: number[],
  vols?: Partial<Record<string, number>>,
) => [
  channel("kick", "Kick", "kick", kick, { volume: vols?.kick ?? 0.95 }),
  channel("snare", "Snare", "snare", snare, {
    volume: vols?.snare ?? 0.82,
    pan: 0.04,
  }),
  channel("hat", "Hats", "hat", hat, { volume: vols?.hat ?? 0.55, pan: 0.18 }),
  channel("clap", "Clap", "clap", clap, {
    volume: vols?.clap ?? 0.7,
    pan: -0.1,
  }),
  channel("perc", "Perc", "perc", perc, {
    volume: vols?.perc ?? 0.62,
    pan: -0.22,
  }),
  channel("bass", "Bass", "bass", [], { volume: vols?.bass ?? 0.88 }),
  channel("lead", "Lead", "lead", [], { volume: vols?.lead ?? 0.64, pan: 0.12 }),
  channel("pad", "Pad", "pad", [], { volume: vols?.pad ?? 0.48 }),
];

export const DEMO_KIT: Kit = kit(
  120,
  0.08,
  BASE_DRUMS(
    [0, 4, 8, 12],
    [4, 12],
    [0, 2, 4, 6, 8, 10, 12, 14],
    [4, 12],
    [3, 6, 11, 14],
  ),
  {
    bass: [
      n(0, 36, 2),
      n(3, 36, 1, 0.7),
      n(4, 39, 2),
      n(8, 43, 2),
      n(12, 36, 2),
      n(14, 34, 2),
    ],
    lead: [n(2, 63, 1), n(6, 67, 1), n(10, 70, 2), n(14, 67, 1)],
    pad: [n(0, 48, 8, 0.55), n(8, 43, 8, 0.5)],
  },
);

export const CLIMATE_KITS: Record<ClimateKitId, Kit> = {
  sun: kit(
    122,
    0.04,
    BASE_DRUMS(
      [0, 4, 8, 12],
      [4, 12],
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      [4, 12],
      [7, 15],
      { hat: 0.42, perc: 0.5 },
    ),
    {
      bass: [n(0, 38, 2), n(4, 38, 2), n(8, 41, 2), n(12, 43, 2)],
      lead: [n(1, 65, 1), n(5, 69, 1), n(9, 72, 2), n(13, 69, 1)],
      pad: [n(0, 50, 8, 0.45), n(8, 53, 8, 0.4)],
    },
  ),
  cloud: kit(
    104,
    0.12,
    BASE_DRUMS(
      [0, 8, 10],
      [4, 12],
      [2, 6, 10, 14],
      [12],
      [3, 7, 11],
      { kick: 0.8, hat: 0.48 },
    ),
    {
      bass: [n(0, 41, 3), n(6, 38, 2), n(10, 36, 3)],
      lead: [n(2, 60, 2), n(8, 65, 2), n(14, 62, 2)],
      pad: [n(0, 48, 16, 0.42)],
    },
  ),
  rain: kit(
    86,
    0.28,
    BASE_DRUMS(
      [0, 7, 10],
      [4, 12],
      [0, 3, 6, 8, 11, 14],
      [4, 13],
      [2, 9, 15],
      { kick: 0.9, hat: 0.38, snare: 0.7 },
    ),
    {
      bass: [n(0, 33, 4), n(8, 36, 3), n(12, 31, 4)],
      lead: [n(3, 58, 2), n(7, 61, 1), n(11, 63, 2)],
      pad: [n(0, 45, 16, 0.5)],
    },
  ),
  fog: kit(
    78,
    0.16,
    BASE_DRUMS([0, 10], [8], [4, 12], [], [6, 14], {
      kick: 0.7,
      snare: 0.45,
      hat: 0.28,
      perc: 0.4,
      pad: 0.62,
    }),
    {
      bass: [n(0, 29, 8), n(8, 32, 8)],
      lead: [n(4, 56, 4), n(12, 53, 4)],
      pad: [n(0, 41, 16, 0.6)],
    },
  ),
  snow: kit(
    92,
    0.1,
    BASE_DRUMS(
      [0, 8],
      [4, 12],
      [2, 6, 8, 10, 14],
      [12],
      [1, 5, 9, 13],
      { kick: 0.78, perc: 0.7, hat: 0.4 },
    ),
    {
      bass: [n(0, 38, 4), n(8, 43, 4)],
      lead: [n(2, 74, 1), n(6, 79, 1), n(10, 76, 2), n(14, 81, 1)],
      pad: [n(0, 55, 8, 0.38), n(8, 50, 8, 0.38)],
    },
  ),
  storm: kit(
    138,
    0.02,
    BASE_DRUMS(
      [0, 2, 4, 6, 8, 10, 12, 14],
      [4, 12],
      [1, 3, 5, 7, 9, 11, 13, 15],
      [4, 7, 12],
      [3, 6, 11, 15],
      { kick: 1, hat: 0.5, snare: 0.88, perc: 0.72 },
    ),
    {
      bass: [n(0, 28, 2), n(4, 28, 2), n(8, 31, 2), n(12, 27, 2)],
      lead: [n(0, 52, 1), n(3, 55, 1), n(6, 58, 1), n(9, 55, 1), n(12, 51, 2)],
      pad: [n(0, 40, 8, 0.4), n(8, 39, 8, 0.4)],
    },
  ),
};

export function emptyKit(): Kit {
  return kit(
    120,
    0,
    BASE_DRUMS([], [], [], [], [], {
      kick: 0.9,
      snare: 0.8,
      hat: 0.5,
      clap: 0.7,
      perc: 0.6,
    }),
    { bass: [], lead: [], pad: [] },
  );
}

export function cloneKit(source: Kit): Kit {
  return {
    bpm: source.bpm,
    swing: source.swing,
    channels: source.channels.map((ch) => ({
      ...ch,
      steps: [...ch.steps],
    })),
    pianoNotes: Object.fromEntries(
      Object.entries(source.pianoNotes).map(([id, notes]) => [
        id,
        notes.map((note) => ({ ...note })),
      ]),
    ),
  };
}
