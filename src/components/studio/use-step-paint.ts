import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { getEngine } from "@/lib/audio/engine";
import { useStudio } from "@/lib/store";

type Stroke = {
  place: boolean;
  moved: boolean;
  startOn: boolean;
  startCh: string;
  startStep: number;
  x: number;
  y: number;
  heard: boolean;
};

const SLOP = 6;

export function useStepPaint() {
  const setStep = useStudio((s) => s.setStep);
  const setSelected = useStudio((s) => s.setSelected);
  const stroke = useRef<Stroke | null>(null);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const current = stroke.current;
      if (!current) return;
      if (!current.moved && Math.hypot(e.clientX - current.x, e.clientY - current.y) > SLOP) {
        current.moved = true;
      }
      if (!current.moved) return;
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const cell = el?.closest("[data-step]") as HTMLElement | null;
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
      if (current && !current.moved && current.startOn) {
        setStep(current.startCh, current.startStep, false);
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
  }, [setSelected, setStep]);

  function onStepPointerDown(
    e: ReactPointerEvent<HTMLButtonElement>,
    channelId: string,
    step: number,
    on: boolean,
  ) {
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
      heard: false,
    };
    if (!on) {
      setStep(channelId, step, true);
      getEngine().trigger(channelId);
      stroke.current.heard = true;
    }
  }

  return onStepPointerDown;
}
