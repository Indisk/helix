import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { getEngine } from "@/lib/audio/engine";
import { PIANO_KEY_MAP } from "@/lib/audio/keys";
import { loadPersisted, useStudio, watchPersist } from "@/lib/store";
import { applyAccent } from "@/lib/theme";
import { Gate } from "./Gate";
import { HelpDialog } from "./HelpDialog";
import { Mixer } from "./Mixer";
import { Pads } from "./Pads";
import { PianoRoll } from "./PianoRoll";
import { Sequencer } from "./Sequencer";
import { SettingsPanel } from "./SettingsPanel";
import { Transport } from "./Transport";

function isTypingTarget(target: EventTarget | null) {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || el.isContentEditable;
}

function StudioShell() {
  const view = useStudio((s) => s.view);
  const accent = useStudio((s) => s.accent);
  const channels = useStudio((s) => s.channels);
  const masterVolume = useStudio((s) => s.masterVolume);
  const [help, setHelp] = useState(false);
  const [settings, setSettings] = useState(false);

  useEffect(() => {
    applyAccent(accent);
  }, [accent]);

  useEffect(() => {
    getEngine().syncMixer(channels, masterVolume);
  }, [channels, masterVolume]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target)) return;
      if (e.code === "Space") {
        e.preventDefault();
        const engine = getEngine();
        if (useStudio.getState().playing) engine.stop();
        else engine.start();
        return;
      }
      const midi = PIANO_KEY_MAP[e.key.toLowerCase()];
      if (midi !== undefined && !e.repeat) {
        e.preventDefault();
        getEngine().noteOn(midi);
        useStudio.getState().holdKey(String(midi), true);
      }
    };
    const up = (e: KeyboardEvent) => {
      const midi = PIANO_KEY_MAP[e.key.toLowerCase()];
      if (midi !== undefined) {
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

  return (
    <div className="relative flex h-dvh min-h-0 flex-col overflow-hidden bg-bg text-fg">
      <Transport onHelp={() => setHelp(true)} onSettings={() => setSettings((v) => !v)} />
      <SettingsPanel open={settings} onClose={() => setSettings(false)} />
      <main className="min-h-0 flex-1 overflow-hidden">
        {view === "rack" ? <Sequencer /> : null}
        {view === "piano" ? <PianoRoll /> : null}
        {view === "pads" ? <Pads /> : null}
        {view === "mix" ? <Mixer /> : null}
      </main>
      <HelpDialog open={help} onClose={() => setHelp(false)} />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--color-elevated)",
            color: "var(--color-fg)",
            border: "1px solid var(--color-border)",
          },
        }}
      />
    </div>
  );
}

export function StudioApp() {
  const onboarded = useStudio((s) => s.onboarded);

  useEffect(() => {
    loadPersisted();
    watchPersist();
    applyAccent(useStudio.getState().accent);
  }, []);

  if (!onboarded) return <Gate />;
  return <StudioShell />;
}
