export type V3 = readonly [number, number, number];
export type Faces = { top: string; left: string; right: string; edge: string };

const COS = Math.cos(Math.PI / 6);

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
export const ramp = (t: number, from: number, to: number) => clamp01((t - from) / (to - from));
export const lerp = (a: number, b: number, n: number) => a + (b - a) * n;
export const easeOut = (n: number) => (n >= 1 ? 1 : 1 - 2 ** (-10 * n));
export const easeInOut = (n: number) => (n < 0.5 ? 4 * n * n * n : 1 - (-2 * n + 2) ** 3 / 2);
export const mix = (a: V3, b: V3, n: number): V3 => [lerp(a[0], b[0], n), lerp(a[1], b[1], n), lerp(a[2], b[2], n)];

const tint = (l: number, c: number, h: number): Faces => ({
  top: `oklch(${l + 0.1} ${c * 0.72} ${h})`,
  left: `oklch(${l} ${c} ${h})`,
  right: `oklch(${l - 0.09} ${c} ${h})`,
  edge: `oklch(${l - 0.24} ${c * 0.8} ${h})`,
});

export const INK = 'oklch(0.21 0.012 268)';
export const NEUTRAL: Faces = {
  top: 'oklch(1 0 0)',
  left: 'oklch(0.95 0.004 268)',
  right: 'oklch(0.905 0.006 268)',
  edge: 'oklch(0.42 0.012 268)',
};
export const HUES = {
  money: tint(0.62, 0.19, 257),
  invest: tint(0.68, 0.16, 157),
  assets: tint(0.77, 0.15, 72),
};
export type Hue = keyof typeof HUES;

export const routeLength = (route: readonly V3[]) =>
  route.slice(1).reduce((sum, p, i) => sum + Math.hypot(p[0] - route[i][0], p[1] - route[i][1], p[2] - route[i][2]), 0);

export const pointOn = (route: readonly V3[], distance: number): V3 => {
  let left = Math.max(0, distance);
  for (let i = 1; i < route.length; i++) {
    const a = route[i - 1];
    const b = route[i];
    const length = Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]);
    if (left <= length) return mix(a, b, length ? left / length : 0);
    left -= length;
  }
  return route[route.length - 1];
};

export const slice = (route: readonly V3[], from: number, to: number): V3[] => {
  const points = [pointOn(route, from)];
  let travelled = 0;
  for (let i = 1; i < route.length - 1; i++) {
    travelled += Math.hypot(route[i][0] - route[i - 1][0], route[i][1] - route[i - 1][1], route[i][2] - route[i - 1][2]);
    if (travelled > from && travelled < to) points.push(route[i]);
  }
  points.push(pointOn(route, to));
  return points;
};

export class Pen {
  readonly hair: number;

  constructor(
    readonly ctx: CanvasRenderingContext2D,
    readonly u: number,
    readonly font: string,
  ) {
    this.hair = Math.max(1, u * 0.024);
  }

  at([x, y, z]: V3): [number, number] {
    return [(x - y) * COS * this.u, ((x + y) * 0.5 - z) * this.u];
  }

  private trace(points: readonly V3[], close = true) {
    const { ctx } = this;
    ctx.beginPath();
    points.forEach((p, i) => {
      const [x, y] = this.at(p);
      if (i) ctx.lineTo(x, y);
      else ctx.moveTo(x, y);
    });
    if (close) ctx.closePath();
  }

  private faces([x, y, z]: V3, [w, d, h]: V3): Record<'top' | 'left' | 'right', V3[]> {
    return {
      top: [[x, y, z + h], [x + w, y, z + h], [x + w, y + d, z + h], [x, y + d, z + h]],
      left: [[x, y + d, z + h], [x + w, y + d, z + h], [x + w, y + d, z], [x, y + d, z]],
      right: [[x + w, y, z + h], [x + w, y + d, z + h], [x + w, y + d, z], [x + w, y, z]],
    };
  }

  box(origin: V3, size: V3, faces: Faces, alpha = 1, shadow = false) {
    if (alpha <= 0.004) return;
    const { ctx } = this;
    const sides = this.faces(origin, size);
    ctx.save();
    ctx.globalAlpha = alpha;
    if (shadow) {
      const [x, y, z] = origin;
      const [w, d] = size;
      ctx.save();
      ctx.shadowColor = 'oklch(0.3 0.03 268 / 0.2)';
      ctx.shadowBlur = this.u * 0.7;
      ctx.shadowOffsetY = this.u * 0.28;
      ctx.fillStyle = faces.right;
      this.trace([[x, y, z], [x + w, y, z], [x + w, y + d, z], [x, y + d, z]]);
      ctx.fill();
      ctx.restore();
    }
    ctx.lineJoin = 'round';
    ctx.lineWidth = this.hair;
    ctx.strokeStyle = faces.edge;
    for (const side of ['left', 'right', 'top'] as const) {
      this.trace(sides[side]);
      ctx.fillStyle = faces[side];
      ctx.fill();
      ctx.stroke();
    }
    ctx.restore();
  }

  scaled(origin: V3, size: V3, k: number, faces: Faces, alpha = 1) {
    const inset = (n: number) => (n * (1 - k)) / 2;
    this.box(
      [origin[0] + inset(size[0]), origin[1] + inset(size[1]), origin[2] + inset(size[2])],
      [size[0] * k, size[1] * k, size[2] * k],
      faces,
      alpha,
    );
  }

  frame(origin: V3, size: V3, color: string, alpha = 1, dash = false) {
    if (alpha <= 0.004) return;
    const { ctx } = this;
    const sides = this.faces(origin, size);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.lineJoin = 'round';
    ctx.lineWidth = this.hair;
    ctx.strokeStyle = color;
    if (dash) ctx.setLineDash([this.u * 0.14, this.u * 0.12]);
    for (const side of ['left', 'right', 'top'] as const) {
      this.trace(sides[side]);
      ctx.stroke();
    }
    ctx.restore();
  }

  line(points: readonly V3[], color: string, width: number, alpha = 1) {
    if (alpha <= 0.004 || points.length < 2) return;
    const { ctx } = this;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    this.trace(points, false);
    ctx.stroke();
    ctx.restore();
  }

  label(text: string, anchor: V3, offsetY: number, alpha = 1) {
    const { ctx } = this;
    const [x, y] = this.at(anchor);
    const size = Math.min(15, Math.max(11, this.u * 0.36));
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.font = `600 ${size}px ${this.font}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = INK;
    ctx.fillText(text, x, y + offsetY * this.u);
    ctx.restore();
  }
}
