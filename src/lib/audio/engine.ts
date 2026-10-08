import { useStudio } from "@/lib/store";
import type { Channel, ChannelKind } from "@/lib/types";
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
  startLiveLead,
  type LiveVoice,
} from "./voices";

const LOOKAHEAD = 0.22;

type ChannelNodes = {
  gain: GainNode;
  pan: StereoPannerNode;
};

class HelixEngine {
  ctx: AudioContext | null = null;
  master: GainNode | null = null;
  analyser: AnalyserNode | null = null;
  noise: AudioBuffer | null = null;
  channels = new Map<string, ChannelNodes>();
  timer: ReturnType<typeof setInterval> | null = null;
  nextNoteTime = 0;
  step = 0;
  live = new Map<string, LiveVoice>();
  uiTimers: number[] = [];

  private ensure() {
    if (!this.ctx) {
      const ctx = new AudioContext({ latencyHint: "interactive" });
      const master = ctx.createGain();
      master.gain.value = 0.9;
      const comp = ctx.createDynamicsCompressor();
      comp.threshold.value = -16;
      comp.knee.value = 10;
      comp.ratio.value = 3.2;
      comp.attack.value = 0.01;
      comp.release.value = 0.18;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.72;
      const delay = ctx.createDelay(1);
      delay.delayTime.value = 0.22;
      const delayGain = ctx.createGain();
      delayGain.gain.value = 0.16;
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
    if (this.ctx.state === "suspended") {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  unlock() {
    const ctx = this.ensure();
    const state = useStudio.getState();
    this.syncMixer(state.channels, state.masterVolume);
    return ctx;
  }

  private bus(id: string): ChannelNodes {
    const ctx = this.ensure();
    let nodes = this.channels.get(id);
    if (!nodes) {
      const gain = ctx.createGain();
      const pan = ctx.createStereoPanner();
      gain.connect(pan);
      pan.connect(this.master!);
      nodes = { gain, pan };
      this.channels.set(id, nodes);
    }
    return nodes;
  }

  syncMixer(channels: Channel[], masterVolume: number) {
    if (!this.master) return;
    const v = Math.max(0, Math.min(1, masterVolume));
    this.master.gain.setTargetAtTime(v * v, this.ctx!.currentTime, 0.02);
    for (const ch of channels) {
      const nodes = this.bus(ch.id);
      nodes.gain.gain.setTargetAtTime(
        Math.max(0, Math.min(1, ch.volume)) ** 1.6,
        this.ctx!.currentTime,
        0.02,
      );
      nodes.pan.pan.setTargetAtTime(
        Math.max(-1, Math.min(1, ch.pan)),
        this.ctx!.currentTime,
        0.02,
      );
    }
  }

  private audible(ch: Channel, channels: Channel[]) {
    if (ch.mute) return false;
    const anySolo = channels.some((c) => c.solo);
    if (anySolo && !ch.solo) return false;
    return true;
  }

  private triggerKind(
    kind: ChannelKind,
    dest: AudioNode,
    time: number,
    velocity: number,
    pitch?: number,
    duration = 0.18,
  ) {
    const ctx = this.ctx!;
    const noise = this.noise!;
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
      case "pad":
        playPad(ctx, dest, time, pitch ?? 48, duration, velocity);
        break;
      default:
        break;
    }
  }

  trigger(channelId: string, pitch?: number) {
    const { channels } = useStudio.getState();
    const ch = channels.find((c) => c.id === channelId);
    if (!ch) return;
    const ctx = this.unlock();
    const dest = this.bus(ch.id).gain;
    const t = ctx.currentTime + 0.01;
    this.triggerKind(ch.kind, dest, t, 0.95, pitch, 0.28);
  }

  noteOn(midi: number) {
    const key = String(midi);
    if (this.live.has(key)) return;
    const ctx = this.unlock();
    const { channels, selectedId } = useStudio.getState();
    const selected = channels.find((c) => c.id === selectedId);
    const destId =
      selected?.kind === "bass" || selected?.kind === "pad"
        ? selected.id
        : "lead";
    const dest = this.bus(destId).gain;
    const voice = startLiveLead(ctx, dest, midi, 0.9);
    this.live.set(key, voice);
  }

  noteOff(midi: number) {
    const key = String(midi);
    const voice = this.live.get(key);
    if (!voice || !this.ctx) return;
    voice.stop(this.ctx.currentTime);
    this.live.delete(key);
  }

  private schedule(
    step: number,
    time: number,
    bpm: number,
    channels: Channel[],
    pianoNotes: Record<string, { step: number; pitch: number; length: number; velocity: number }[]>,
  ) {
    const sixteenth = 60 / bpm / 4;
    for (const ch of channels) {
      if (!this.audible(ch, channels)) continue;
      const dest = this.bus(ch.id).gain;
      if (ch.kind === "bass" || ch.kind === "lead" || ch.kind === "pad") {
        const notes = pianoNotes[ch.id] ?? [];
        for (const note of notes) {
          if (note.step !== step) continue;
          const dur = Math.max(0.08, note.length * sixteenth * 0.94);
          this.triggerKind(ch.kind, dest, time, note.velocity, note.pitch, dur);
        }
      } else if (ch.steps[step]) {
        const vel = step % 4 === 0 ? 1 : 0.72;
        this.triggerKind(ch.kind, dest, time, vel);
      }
    }
  }

  start() {
    const ctx = this.unlock();
    this.stopClock();
    this.step = 0;
    this.nextNoteTime = ctx.currentTime + 0.05;
    useStudio.setState({ playing: true, currentStep: 0 });
    this.timer = setInterval(() => this.tick(), 25);
  }

  private tick() {
    const state = useStudio.getState();
    if (!state.playing || !this.ctx) return;
    const sixteenth = 60 / state.bpm / 4;
    while (this.nextNoteTime < this.ctx.currentTime + LOOKAHEAD) {
      const step = this.step;
      let when = this.nextNoteTime;
      if (step % 2 === 1) when += sixteenth * state.swing * 0.55;
      this.schedule(step, when, state.bpm, state.channels, state.pianoNotes);
      const delayMs = Math.max(0, (when - this.ctx.currentTime) * 1000);
      const id = window.setTimeout(() => {
        if (useStudio.getState().playing) {
          useStudio.setState({ currentStep: step });
        }
      }, delayMs);
      this.uiTimers.push(id);
      this.nextNoteTime += sixteenth;
      this.step = (this.step + 1) % 16;
    }
  }

  private stopClock() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    for (const id of this.uiTimers) window.clearTimeout(id);
    this.uiTimers = [];
  }

  stop() {
    this.stopClock();
    for (const voice of this.live.values()) {
      if (this.ctx) voice.stop(this.ctx.currentTime);
    }
    this.live.clear();
    useStudio.setState({ playing: false, currentStep: 0 });
  }

  resumeIfNeeded() {
    if (this.ctx?.state === "suspended") void this.ctx.resume();
  }
}

let engine: HelixEngine | null = null;

export function getEngine() {
  if (!engine) engine = new HelixEngine();
  return engine;
}
