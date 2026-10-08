export function makeNoiseBuffer(ctx: AudioContext, seconds = 1.6) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

function env(
  ctx: AudioContext,
  time: number,
  peak: number,
  attack: number,
  decay: number,
) {
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), time + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + attack + decay);
  return gain;
}

export function playKick(
  ctx: AudioContext,
  dest: AudioNode,
  time: number,
  velocity: number,
  noise: AudioBuffer,
) {
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(168, time);
  osc.frequency.exponentialRampToValueAtTime(42, time + 0.11);
  const body = env(ctx, time, velocity * 1.05, 0.004, 0.32);
  osc.connect(body);
  body.connect(dest);
  osc.start(time);
  osc.stop(time + 0.34);

  const click = ctx.createBufferSource();
  click.buffer = noise;
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 1800;
  const cg = env(ctx, time, velocity * 0.22, 0.001, 0.03);
  click.connect(hp);
  hp.connect(cg);
  cg.connect(dest);
  click.start(time);
  click.stop(time + 0.04);
}

export function playSnare(
  ctx: AudioContext,
  dest: AudioNode,
  time: number,
  velocity: number,
  noise: AudioBuffer,
) {
  const tone = ctx.createOscillator();
  tone.type = "triangle";
  tone.frequency.setValueAtTime(210, time);
  tone.frequency.exponentialRampToValueAtTime(140, time + 0.12);
  const tg = env(ctx, time, velocity * 0.45, 0.002, 0.14);
  tone.connect(tg);
  tg.connect(dest);
  tone.start(time);
  tone.stop(time + 0.16);

  const src = ctx.createBufferSource();
  src.buffer = noise;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1800;
  bp.Q.value = 0.9;
  const ng = env(ctx, time, velocity * 0.7, 0.002, 0.18);
  src.connect(bp);
  bp.connect(ng);
  ng.connect(dest);
  src.start(time);
  src.stop(time + 0.2);
}

export function playHat(
  ctx: AudioContext,
  dest: AudioNode,
  time: number,
  velocity: number,
  noise: AudioBuffer,
  open = false,
) {
  const src = ctx.createBufferSource();
  src.buffer = noise;
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 7200;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 9500;
  bp.Q.value = 0.7;
  const decay = open ? 0.22 : 0.045;
  const g = env(ctx, time, velocity * (open ? 0.4 : 0.5), 0.001, decay);
  src.connect(hp);
  hp.connect(bp);
  bp.connect(g);
  g.connect(dest);
  src.start(time);
  src.stop(time + decay + 0.02);
}

export function playClap(
  ctx: AudioContext,
  dest: AudioNode,
  time: number,
  velocity: number,
  noise: AudioBuffer,
) {
  const bursts = [0, 0.018, 0.038];
  for (const offset of bursts) {
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.value = 1400;
    bp.Q.value = 0.7;
    const g = env(ctx, time + offset, velocity * 0.55, 0.001, 0.09);
    src.connect(bp);
    bp.connect(g);
    g.connect(dest);
    src.start(time + offset);
    src.stop(time + offset + 0.11);
  }
}

export function playPerc(
  ctx: AudioContext,
  dest: AudioNode,
  time: number,
  velocity: number,
) {
  const osc = ctx.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(740, time);
  osc.frequency.exponentialRampToValueAtTime(220, time + 0.09);
  const g = env(ctx, time, velocity * 0.42, 0.001, 0.12);
  osc.connect(g);
  g.connect(dest);
  osc.start(time);
  osc.stop(time + 0.14);
}

function midiToHz(midi: number) {
  return 440 * 2 ** ((midi - 69) / 12);
}

export function playBass(
  ctx: AudioContext,
  dest: AudioNode,
  time: number,
  midi: number,
  duration: number,
  velocity: number,
) {
  const osc = ctx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(midiToHz(midi), time);
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(90, time);
  filter.frequency.exponentialRampToValueAtTime(520, time + 0.04);
  filter.frequency.exponentialRampToValueAtTime(140, time + duration);
  filter.Q.value = 6;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, time);
  g.gain.exponentialRampToValueAtTime(velocity * 0.55, time + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  osc.connect(filter);
  filter.connect(g);
  g.connect(dest);
  osc.start(time);
  osc.stop(time + duration + 0.02);
}

export function playLead(
  ctx: AudioContext,
  dest: AudioNode,
  time: number,
  midi: number,
  duration: number,
  velocity: number,
) {
  const osc = ctx.createOscillator();
  osc.type = "square";
  osc.frequency.setValueAtTime(midiToHz(midi), time);
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(2400, time);
  filter.frequency.exponentialRampToValueAtTime(900, time + duration);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, time);
  g.gain.exponentialRampToValueAtTime(velocity * 0.22, time + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, time + duration);
  osc.connect(filter);
  filter.connect(g);
  g.connect(dest);
  osc.start(time);
  osc.stop(time + duration + 0.02);
}

export function playPad(
  ctx: AudioContext,
  dest: AudioNode,
  time: number,
  midi: number,
  duration: number,
  velocity: number,
) {
  const detune = [-8, 0, 11];
  for (const cents of detune) {
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(midiToHz(midi), time);
    osc.detune.value = cents;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.4;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, time);
    g.gain.linearRampToValueAtTime(velocity * 0.09, time + 0.08);
    g.gain.setValueAtTime(velocity * 0.09, time + duration - 0.12);
    g.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    osc.connect(filter);
    filter.connect(g);
    g.connect(dest);
    osc.start(time);
    osc.stop(time + duration + 0.02);
  }
}

export type LiveVoice = {
  stop: (time: number) => void;
};

export function startLiveLead(
  ctx: AudioContext,
  dest: AudioNode,
  midi: number,
  velocity: number,
): LiveVoice {
  const osc = ctx.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.value = midiToHz(midi);
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 1800;
  const g = ctx.createGain();
  const now = ctx.currentTime;
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(velocity * 0.22, now + 0.01);
  osc.connect(filter);
  filter.connect(g);
  g.connect(dest);
  osc.start(now);
  return {
    stop(time: number) {
      g.gain.cancelScheduledValues(time);
      g.gain.setValueAtTime(Math.max(0.0001, g.gain.value), time);
      g.gain.exponentialRampToValueAtTime(0.0001, time + 0.08);
      osc.stop(time + 0.1);
    },
  };
}
