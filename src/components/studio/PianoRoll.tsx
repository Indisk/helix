import { useEffect, useMemo, useRef } from "react";
import { getEngine } from "@/lib/audio/engine";
import { useStudio } from "@/lib/store";
import type { PianoNote } from "@/lib/types";
import { STEP_COUNT } from "@/lib/types";
import { cn, isBlackKey, pitchName } from "@/lib/utils";

const SLOP = 6;

function rangeFor(kind: string) {
  if (kind === "bass") return { min: 28, max: 51 };
  if (kind === "pad") return { min: 36, max: 59 };
  return { min: 48, max: 71 };
}

function covering(notes: PianoNote[], step: number, pitch: number) {
  return notes.find(
    (n) => n.pitch === pitch && step >= n.step && step < n.step + n.length,
  );
}

export function PianoRoll() {
  const channels = useStudio((s) => s.channels);
  const selectedId = useStudio((s) => s.selectedId);
  const pianoNotes = useStudio((s) => s.pianoNotes);
  const currentStep = useStudio((s) => s.currentStep);
  const playing = useStudio((s) => s.playing);
  const heldKeys = useStudio((s) => s.heldKeys);
  const addNote = useStudio((s) => s.addNote);
  const removeNote = useStudio((s) => s.removeNote);
  const setSelected = useStudio((s) => s.setSelected);
  const gridRef = useRef<HTMLDivElement>(null);
  const stroke = useRef<{
    channelId: string;
    moved: boolean;
    startNoteId: string | null;
    x: number;
    y: number;
  } | null>(null);

  const selected = channels.find((c) => c.id === selectedId);
  const melodic = channels.filter(
    (c) => c.kind === "bass" || c.kind === "lead" || c.kind === "pad",
  );
  const channel =
    selected && (selected.kind === "bass" || selected.kind === "lead" || selected.kind === "pad")
      ? selected
      : melodic[0];

  const range = rangeFor(channel?.kind ?? "lead");
  const pitches = useMemo(() => {
    const list: number[] = [];
    for (let p = range.max; p >= range.min; p -= 1) list.push(p);
    return list;
  }, [range.max, range.min]);

  const notes = channel ? (pianoNotes[channel.id] ?? []) : [];
  const pitchesRef = useRef(pitches);
  pitchesRef.current = pitches;
  const channelIdRef = useRef(channel?.id);
  channelIdRef.current = channel?.id;

  function cellAt(clientX: number, clientY: number) {
    const grid = gridRef.current;
    const rows = pitchesRef.current;
    if (!grid) return null;
    const rect = grid.getBoundingClientRect();
    const step = Math.floor(((clientX - rect.left) / rect.width) * STEP_COUNT);
    const row = Math.floor(((clientY - rect.top) / rect.height) * rows.length);
    const pitch = rows[row];
    if (pitch === undefined || step < 0 || step >= STEP_COUNT) return null;
    return { step, pitch };
  }

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const current = stroke.current;
      if (!current) return;
      if (
        !current.moved &&
        Math.hypot(e.clientX - current.x, e.clientY - current.y) > SLOP
      ) {
        current.moved = true;
      }
      if (!current.moved) return;
      const cell = cellAt(e.clientX, e.clientY);
      const channelId = channelIdRef.current;
      if (!cell || !channelId) return;
      const existing = covering(
        useStudio.getState().pianoNotes[channelId] ?? [],
        cell.step,
        cell.pitch,
      );
      if (existing) return;
      addNote(channelId, {
        step: cell.step,
        pitch: cell.pitch,
        length: 1,
        velocity: 0.9,
      });
      getEngine().trigger(channelId, cell.pitch);
    };
    const up = () => {
      const current = stroke.current;
      stroke.current = null;
      if (current && !current.moved && current.startNoteId) {
        removeNote(current.channelId, current.startNoteId);
      }
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

  if (!channel) {
    return (
      <div className="grid h-full place-items-center p-6 text-sm text-muted">
        No hay canales melódicos.
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col gap-2 p-3 md:p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="font-display text-lg tracking-tight text-fg">Piano roll</h2>
          <p className="text-xs text-muted">
            Arrastra para colocar notas. Un clic sobre una nota la borra.
          </p>
        </div>
        <div className="flex gap-1">
          {melodic.map((ch) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => setSelected(ch.id)}
              className={cn(
                "h-8 rounded-[var(--radius-sm)] px-3 text-xs",
                channel.id === ch.id
                  ? "bg-accent text-accent-fg"
                  : "bg-elevated text-muted hover:text-fg",
              )}
            >
              {ch.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden rounded-[var(--radius-lg)] border border-border bg-surface">
        <div className="flex w-10 shrink-0 flex-col border-r border-border bg-elevated md:w-12">
          {pitches.map((p) => (
            <div
              key={p}
              className={cn(
                "flex flex-1 items-center justify-center font-mono text-[9px]",
                isBlackKey(p) ? "text-faint" : "text-muted",
              )}
            >
              {pitchName(p).includes("#") ? "" : pitchName(p)}
            </div>
          ))}
        </div>
        <div
          ref={gridRef}
          className="paint-surface relative min-h-[320px] flex-1"
          onPointerDown={(e) => {
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
              y: e.clientY,
            };
            if (!hit) {
              addNote(channel.id, {
                step: cell.step,
                pitch: cell.pitch,
                length: 1,
                velocity: 0.9,
              });
              getEngine().trigger(channel.id, cell.pitch);
            }
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 grid"
            style={{
              gridTemplateColumns: `repeat(${STEP_COUNT}, 1fr)`,
              gridTemplateRows: `repeat(${pitches.length}, 1fr)`,
            }}
          >
            {pitches.map((p) =>
              Array.from({ length: STEP_COUNT }, (_, col) => (
                <div
                  key={`${p}-${col}`}
                  className={cn(
                    "border-b border-r border-border/60",
                    isBlackKey(p) ? "bg-bg/70" : "bg-transparent",
                    col % 4 === 0 && "border-l border-l-border",
                    playing && currentStep === col && "bg-accent/10",
                  )}
                />
              )),
            )}
          </div>
          {notes.map((note) => {
            const row = pitches.indexOf(note.pitch);
            if (row < 0) return null;
            return (
              <div
                key={note.id}
                className="pointer-events-none absolute rounded-[3px] bg-accent shadow-sm"
                style={{
                  left: `${(note.step / STEP_COUNT) * 100}%`,
                  top: `${(row / pitches.length) * 100}%`,
                  width: `${(Math.max(1, note.length) / STEP_COUNT) * 100}%`,
                  height: `${(1 / pitches.length) * 100}%`,
                }}
                aria-hidden
              />
            );
          })}
        </div>
      </div>

      <div className="flex h-12 overflow-hidden rounded-[var(--radius-md)] border border-border">
        {Array.from({ length: 13 }, (_, i) => {
          const midi = 48 + i;
          const black = isBlackKey(midi);
          const held = heldKeys.includes(String(midi));
          return (
            <button
              key={midi}
              type="button"
              onPointerDown={() => {
                getEngine().noteOn(midi);
                useStudio.getState().holdKey(String(midi), true);
              }}
              onPointerUp={() => {
                getEngine().noteOff(midi);
                useStudio.getState().holdKey(String(midi), false);
              }}
              onPointerLeave={() => {
                getEngine().noteOff(midi);
                useStudio.getState().holdKey(String(midi), false);
              }}
              className={cn(
                "flex-1 border-r border-border text-[9px] font-mono",
                black ? "bg-elevated text-faint" : "bg-fg/90 text-bg",
                held && "bg-accent text-accent-fg",
              )}
            >
              {pitchName(midi)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
