import { useEffect, useRef } from "react";
import { getEngine } from "@/lib/audio/engine";

export function Visualizer() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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
      const bw = (width - gap * (barCount - 1)) / barCount;
      for (let i = 0; i < barCount; i += 1) {
        const idx = Math.floor((i / barCount) * bins.length * 0.6);
        const mag = bins[idx] / 255;
        const h = Math.max(2, mag * height);
        ctx2d.fillStyle = accent;
        ctx2d.globalAlpha = 0.35 + mag * 0.65;
        ctx2d.fillRect(i * (bw + gap), height - h, bw, h);
      }
      ctx2d.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      width={120}
      height={28}
      className="h-7 w-[88px] rounded-[var(--radius-xs)] bg-elevated md:w-[120px]"
      aria-hidden="true"
    />
  );
}
