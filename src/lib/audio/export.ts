import type { Channel, PianoNote } from "@/lib/types";
import { STEP_COUNT } from "@/lib/types";
import {
  makeNoiseBuffer,
  playBass,
  playClap,
  playHat,
  playKick,
  playLead,
  playPad,
  playPerc,
  playSnare,
} from "./voices";

const BARS = 4;
const TAIL_SECONDS = 1.5;

function writeWav(buffer: AudioBuffer) {
  const channels = buffer.numberOfChannels;
  const frames = buffer.length;
  const bytesPerSample = 2;
  const dataSize = frames * channels * bytesPerSample;
  const wav = new ArrayBuffer(44 + dataSize);
  const view = new DataView(wav);
  const writeText = (offset: number, value: string) => {
    for (let i = 0; i < value.length; i += 1) {
      view.setUint8(offset + i, value.charCodeAt(i));
    }
  };

  writeText(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeText(8, "WAVE");
  writeText(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, channels, true);
  view.setUint32(24, buffer.sampleRate, true);
  view.setUint32(28, buffer.sampleRate * channels * bytesPerSample, true);
  view.setUint16(32, channels * bytesPerSample, true);
  view.setUint16(34, 16, true);
  writeText(36, "data");
  view.setUint32(40, dataSize, true);

  let offset = 44;
  for (let frame = 0; frame < frames; frame += 1) {
    for (let channel = 0; channel < channels; channel += 1) {
      const sample = Math.max(-1, Math.min(1, buffer.getChannelData(channel)[frame]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += bytesPerSample;
    }
  }
  return new Blob([wav], { type: "audio/wav" });
}

export async function exportStudioWav(input: {
  projectName: string;
  bpm: number;
  swing: number;
  masterVolume: number;
  channels: Channel[];
  pianoNotes: Record<string, PianoNote[]>;
}) {
  const { bpm, swing, masterVolume, channels, pianoNotes } = input;
  const stepDuration = 60 / bpm / 4;
  const musicDuration = stepDuration * STEP_COUNT * BARS;
  const sampleRate = 44100;
  const frameCount = Math.ceil((musicDuration + TAIL_SECONDS) * sampleRate);
  const offline = new OfflineAudioContext(2, frameCount, sampleRate);
  const master = offline.createGain();
  master.gain.value = Math.max(0, Math.min(1, masterVolume)) ** 2;
  const compressor = offline.createDynamicsCompressor();
  compressor.threshold.value = -16;
  compressor.knee.value = 10;
  compressor.ratio.value = 3.2;
  compressor.attack.value = 0.01;
  compressor.release.value = 0.18;
  const delay = offline.createDelay(1);
  delay.delayTime.value = 0.22;
  const delayGain = offline.createGain();
  delayGain.gain.value = 0.12;
  const delayFilter = offline.createBiquadFilter();
  delayFilter.type = "lowpass";
  delayFilter.frequency.value = 2200;
  master.connect(compressor);
  compressor.connect(offline.destination);
  master.connect(delayFilter);
  delayFilter.connect(delay);
  delay.connect(delayGain);
  delayGain.connect(compressor);

  const noise = makeNoiseBuffer(offline as unknown as AudioContext);
  const anySolo = channels.some((channel) => channel.solo);
  const buses = new Map<string, GainNode>();
  const getBus = (channel: Channel) => {
    const existing = buses.get(channel.id);
    if (existing) return existing;
    const gain = offline.createGain();
    gain.gain.value = Math.max(0, Math.min(1, channel.volume)) ** 1.6;
    const pan = offline.createStereoPanner();
    pan.pan.value = Math.max(-1, Math.min(1, channel.pan));
    gain.connect(pan);
    pan.connect(master);
    buses.set(channel.id, gain);
    return gain;
  };

  for (const channel of channels) {
    if (channel.mute || (anySolo && !channel.solo)) continue;
    const destination = getBus(channel);
    for (let bar = 0; bar < BARS; bar += 1) {
      for (let step = 0; step < STEP_COUNT; step += 1) {
        const time = bar * STEP_COUNT * stepDuration
          + step * stepDuration
          + (step % 2 === 1 ? stepDuration * swing * 0.55 : 0);
        if (channel.kind === "bass" || channel.kind === "lead" || channel.kind === "pad") {
          for (const note of pianoNotes[channel.id] ?? []) {
            if (note.step !== step) continue;
            const duration = Math.max(0.08, note.length * stepDuration * 0.94);
            const ctx = offline as unknown as AudioContext;
            if (channel.kind === "bass") playBass(ctx, destination, time, note.pitch, duration, note.velocity);
            else if (channel.kind === "lead") playLead(ctx, destination, time, note.pitch, duration, note.velocity);
            else playPad(ctx, destination, time, note.pitch, duration, note.velocity);
          }
          continue;
        }
        if (!channel.steps[step]) continue;
        const velocity = step % 4 === 0 ? 1 : 0.72;
        const ctx = offline as unknown as AudioContext;
        switch (channel.kind) {
          case "kick": playKick(ctx, destination, time, velocity, noise); break;
          case "snare": playSnare(ctx, destination, time, velocity, noise); break;
          case "hat": playHat(ctx, destination, time, velocity, noise, false); break;
          case "clap": playClap(ctx, destination, time, velocity, noise); break;
          case "perc": playPerc(ctx, destination, time, velocity); break;
        }
      }
    }
  }

  const rendered = await offline.startRendering();
  return writeWav(rendered);
}

export function downloadWav(blob: Blob, projectName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const safeName = projectName.trim().replace(/[^a-z0-9-_]+/gi, "-").replace(/^-+|-+$/g, "") || "helix";
  link.href = url;
  link.download = `${safeName}.wav`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
