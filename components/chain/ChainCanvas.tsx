'use client';
import { useEffect, useRef } from 'react';
import { Pen } from './iso';
import { SCENES, type SceneName } from './scenes';

export default function ChainCanvas({ scene, label, className }: { scene: SceneName; label: string; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const { bounds, still, draw } = SCENES[scene];
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const font = getComputedStyle(canvas).fontFamily;
    const started = performance.now();
    let frame = 0;
    let inView = false;

    const paint = (now: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      if (!width || !height) return;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
        canvas.width = Math.round(width * ratio);
        canvas.height = Math.round(height * ratio);
      }
      const [x0, y0, x1, y1] = bounds;
      const u = Math.min(width / (x1 - x0), height / (y1 - y0));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.translate(width / 2 - ((x0 + x1) / 2) * u, height / 2 - ((y0 + y1) / 2) * u);
      draw(new Pen(ctx, u, font), reduced.matches ? still : still + (now - started) / 1000);
    };

    const tick = (now: number) => {
      frame = 0;
      paint(now);
      schedule();
    };
    const schedule = () => {
      if (!frame && inView && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
    };
    const refresh = () => {
      paint(performance.now());
      schedule();
    };

    const resize = new ResizeObserver(refresh);
    resize.observe(canvas);
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      schedule();
    });
    observer.observe(canvas);
    document.addEventListener('visibilitychange', schedule);
    reduced.addEventListener('change', refresh);
    document.fonts.ready.then(refresh);
    refresh();

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      document.removeEventListener('visibilitychange', schedule);
      reduced.removeEventListener('change', refresh);
    };
  }, [scene]);

  return <canvas ref={ref} className={className} role="img" aria-label={label} />;
}
