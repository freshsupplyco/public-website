import { HUES, INK, NEUTRAL, Pen, clamp01, easeInOut, easeOut, lerp, mix, pointOn, ramp, routeLength, slice, type Hue, type V3 } from './iso';

export type Scene = {
  bounds: readonly [number, number, number, number];
  still: number;
  draw: (pen: Pen, t: number) => void;
};

const SPEED = 3.2;
const RAIL = 'oklch(0.21 0.012 268 / 0.24)';
const SLOTS: V3[] = [[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0], [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1]];
const CUBELET: V3 = [0.92, 0.92, 0.92];

const tile = (pen: Pen, [x, y]: readonly [number, number], hue: Hue, alpha = 1) =>
  pen.box([x - 0.8, y - 0.8, 0], [1.6, 1.6, 0.3], HUES[hue], alpha, true);

const packet = (pen: Pen, route: readonly V3[], distance: number, hue: Hue, alpha = 1) => {
  const [x, y, z] = pointOn(route, distance);
  pen.line(slice(route, Math.max(0, distance - 1.2), distance), HUES[hue].left, pen.u * 0.07, alpha * 0.45);
  pen.box([x - 0.18, y - 0.18, z], [0.36, 0.36, 0.36], HUES[hue], alpha);
};

const cubelet = (pen: Pen, base: V3, slot: V3, hue: Hue, k = 1, alpha = 1) =>
  pen.scaled([base[0] + slot[0] + 0.04, base[1] + slot[1] + 0.04, base[2] + slot[2] + 0.04], CUBELET, k, HUES[hue], alpha);

const PITCH = 4.6;
const CYCLE = 5.4;
const ORDER = [0, 1, 2, 0, 2, 1, 0, 2];
const SOURCES: { label: string; hue: Hue; route: V3[] }[] = [
  { label: 'Move money', hue: 'money', route: [[-8, 0, 0], [0, 0, 0]] },
  { label: 'Digital investment', hue: 'invest', route: [[-4.5, -3.8, 0], [-4.5, 0, 0], [0, 0, 0]] },
  { label: 'Tokenized assets', hue: 'assets', route: [[-4.5, 3.8, 0], [-4.5, 0, 0], [0, 0, 0]] },
];
const arrival = (slot: number) => 0.5 + slot * 0.42;

const sealedBlock = (pen: Pen, x: number, alpha: number) => {
  pen.box([x, -1, 0], [2, 2, 2], NEUTRAL, alpha, true);
  const seams: V3[][] = [
    [[x + 1, -1, 2], [x + 1, 1, 2]], [[x, 0, 2], [x + 2, 0, 2]],
    [[x + 2, 0, 0], [x + 2, 0, 2]], [[x + 2, -1, 1], [x + 2, 1, 1]],
    [[x + 1, 1, 0], [x + 1, 1, 2]], [[x, 1, 1], [x + 2, 1, 1]],
  ];
  for (const seam of seams) pen.line(seam, INK, pen.hair, alpha * 0.16);
};

const chain: Scene = {
  bounds: [-9.6, -5.9, 11.2, 6.5],
  still: 2.75,
  draw(pen, t) {
    const cycle = Math.floor(t / CYCLE);
    const tau = t - cycle * CYCLE;
    const seal = easeInOut(ramp(tau, 3.7, 4.3));
    const shift = easeInOut(ramp(tau, 4.4, 5.4));

    for (const source of SOURCES) pen.line(source.route, RAIL, pen.hair * 1.4);
    for (const source of SOURCES) {
      const [x, y] = source.route[0];
      tile(pen, [x, y], source.hue);
      pen.label(source.label, [x, y, 0.3], -1.15);
    }

    for (const c of [cycle, cycle + 1]) {
      for (let slot = 0; slot < 8; slot++) {
        const source = SOURCES[ORDER[(slot + c) % 8]];
        const length = routeLength(source.route);
        const distance = length - (c * CYCLE + arrival(slot) - t) * SPEED;
        if (distance > 0 && distance < length) packet(pen, source.route, distance, source.hue);
      }
    }

    const ghost = tau < 3.7 ? 1 : tau < 4.4 ? 1 - seal : ramp(tau, 4.7, 5.4);
    pen.frame([0, -1, 0], [2, 2, 2], INK, ghost * 0.3, true);

    if (tau < 4.4) {
      for (let slot = 0; slot < 8; slot++) {
        if (tau < arrival(slot)) break;
        const k = easeOut(ramp(tau, arrival(slot), arrival(slot) + 0.4));
        cubelet(pen, [0, -1, 0], SLOTS[slot], SOURCES[ORDER[(slot + cycle) % 8]].hue, lerp(0.4, 1, k), k);
      }
    }

    for (let block = 0; block <= 2; block++) {
      const place = block + shift;
      const alpha = block === 0 ? seal : clamp01((2.7 - place) / 0.9);
      const x = place * PITCH;
      if (block > 0 || seal > 0) sealedBlock(pen, x, alpha);
      if (block < 2) {
        const next = clamp01((1.7 - place) / 0.9);
        const drawn = block === 0 ? ramp(tau, 4.0, 4.4) : 1;
        pen.line([[x + 2, 0, 1], [lerp(x + 2, x + PITCH, drawn), 0, 1]], INK, pen.u * 0.07, Math.min(alpha, next) * (drawn > 0 ? 1 : 0));
      }
    }
  },
};

const HOPS: V3[] = [[-4.6, 0, 0], [-3, 0, 1.4], [0, 0, 1.4], [3, 0, 1.4], [4.6, 0, 0]];
const MOVE_CYCLE = 4.8;

const move: Scene = {
  bounds: [-8.3, -5.9, 8.3, 5.1],
  still: 2.0,
  draw(pen, t) {
    pen.line([[-7.5, 0, 0], [7.5, 0, 0]], RAIL, pen.hair * 1.4);
    tile(pen, [-7.5, 0], 'money');
    pen.label('Sender', [-7.5, 0, 0.3], -1.15);

    const phases = [0, MOVE_CYCLE / 2].map(offset => (((t + offset) % MOVE_CYCLE) + MOVE_CYCLE) % MOVE_CYCLE);
    const flash = [0, 0, 0];
    const packets: { at: V3; trail: V3 }[] = [];
    let pulse = 0;
    for (const phase of phases) {
      if (phase < 0.9) {
        const x = lerp(-7.5, -4.6, phase / 0.9);
        packets.push({ at: [x, 0, 0], trail: [Math.max(-7.5, x - 1.2), 0, 0] });
      } else if (phase < 2.9) {
        const hop = Math.min(3, Math.floor((phase - 0.9) / 0.5));
        const q = (phase - 0.9 - hop * 0.5) / 0.5;
        const [x, y, z] = mix(HOPS[hop], HOPS[hop + 1], easeInOut(q));
        packets.push({ at: [x, y, z + Math.sin(Math.PI * q) * 0.7], trail: [x, y, z + Math.sin(Math.PI * q) * 0.7] });
      } else if (phase < 3.8) {
        const x = lerp(4.6, 7.5, (phase - 2.9) / 0.9);
        packets.push({ at: [x, 0, 0], trail: [Math.max(4.6, x - 1.2), 0, 0] });
      } else {
        pulse = Math.max(pulse, 1 - ramp(phase, 3.8, 4.7));
      }
      for (let cube = 0; cube < 3; cube++) {
        const landed = 1.4 + cube * 0.5;
        if (phase >= landed) flash[cube] = Math.max(flash[cube], 1 - easeOut(ramp(phase, landed, landed + 1.1)));
      }
    }

    const behind = packets.filter(p => p.at[0] < -3.7 && p.at[2] < 0.05);
    const front = packets.filter(p => !behind.includes(p));
    const drawPacket = (p: { at: V3; trail: V3 }) => {
      pen.line([p.trail, p.at], HUES.money.left, pen.u * 0.07, 0.45);
      pen.box([p.at[0] - 0.18, p.at[1] - 0.18, p.at[2]], [0.36, 0.36, 0.36], HUES.money);
    };
    behind.forEach(drawPacket);

    [-3.7, -0.7, 2.3].forEach((x, cube) => {
      pen.box([x, -0.7, 0], [1.4, 1.4, 1.4], NEUTRAL, 1, true);
      pen.box([x, -0.7, 0], [1.4, 1.4, 1.4], HUES.money, flash[cube] * 0.85);
      if (cube < 2) pen.line([[x + 1.4, 0, 0.7], [x + 3, 0, 0.7]], INK, pen.u * 0.07);
    });

    const grow = 1 - pulse;
    if (pulse > 0) pen.frame([7.5 - 0.8 - grow, -0.8 - grow, 0], [1.6 + grow * 2, 1.6 + grow * 2, 0], HUES.money.left, pulse * 0.8);
    tile(pen, [7.5, 0], 'money');
    pen.label('Recipient', [7.5, 0, 0.3], -1.15);
    front.forEach(drawPacket);
  },
};

const VAULT_ROUTE: V3[] = [[-6, 0, 0], [-1.5, 0, 0]];
const INVEST_CYCLE = 9;
const TRAVEL = routeLength(VAULT_ROUTE) / SPEED;

const invest: Scene = {
  bounds: [-7.5, -6, 3.5, 2.4],
  still: 3.4,
  draw(pen, t) {
    const tau = ((t % INVEST_CYCLE) + INVEST_CYCLE) % INVEST_CYCLE;
    pen.line(VAULT_ROUTE, RAIL, pen.hair * 1.4);
    tile(pen, [-6, 0], 'invest');
    pen.label('Wallet', [-6, 0, 0.3], -1.15);

    let level = 0.1;
    for (let i = 0; i < 4; i++) {
      const arrives = 1.4 + i * 0.6;
      const leaves = 5.2 + i * 0.6;
      level += 0.2 * easeOut(ramp(tau, arrives, arrives + 0.6));
      level -= 0.2 * easeOut(ramp(tau, leaves - 0.2, leaves + 0.4));
      const inbound = (tau - (arrives - TRAVEL)) * SPEED;
      const outbound = (tau - leaves) * SPEED;
      if (inbound > 0 && inbound < routeLength(VAULT_ROUTE)) packet(pen, VAULT_ROUTE, inbound, 'invest');
      if (outbound > 0 && outbound < routeLength(VAULT_ROUTE)) packet(pen, [...VAULT_ROUTE].reverse(), outbound, 'invest');
    }

    pen.box([-1.5, -1.5, 0], [3, 3, 3 * level], HUES.invest, 1, true);
    pen.frame([-1.5, -1.5, 0], [3, 3, 3], INK, 0.5);
    pen.label('Savings provider', [0, 0, 3], -2.05);
  },
};

const ASSET_ROUTE: V3[] = [[-6, 0, 0], [-1, 0, 0]];
const ASSET_CYCLE = 9;

const assets: Scene = {
  bounds: [-7.3, -5.3, 7.6, 5.5],
  still: 5.9,
  draw(pen, t) {
    const tau = ((t % ASSET_CYCLE) + ASSET_CYCLE) % ASSET_CYCLE;
    const fade = 1 - ramp(tau, 8.1, 8.7);
    const issued = (slot: number) => 0.9 + slot * 0.3;

    pen.line([[-6, 0, 0], [5.5, 0, 0]], RAIL, pen.hair * 1.4);
    tile(pen, [-6, 0], 'assets');
    pen.label('Project', [-6, 0, 0.3], -1.15);

    for (let slot = 0; slot < 8; slot++) {
      const distance = routeLength(ASSET_ROUTE) - (issued(slot) - tau) * SPEED;
      if (distance > 0 && distance < routeLength(ASSET_ROUTE)) packet(pen, ASSET_ROUTE, distance, 'assets');
    }

    pen.frame([-1, -1, 0], [2, 2, 2], INK, 0.3 * (1 - ramp(tau, 3.4, 3.8)) + 0.3 * ramp(tau, 8.4, 9), true);
    const pop = (slot: number) => easeOut(ramp(tau, issued(slot), issued(slot) + 0.4));
    for (let slot = 0; slot < 4; slot++) {
      if (tau >= issued(slot)) cubelet(pen, [-1, -1, 0], SLOTS[slot], 'assets', lerp(0.4, 1, pop(slot)), pop(slot) * fade);
    }

    pen.box([4.2, -1.2, 0], [2.6, 2.6, 0.2], NEUTRAL, 1, true);
    pen.label('Holder', [5.5, 0, 0], 2.35);

    const lift = easeInOut(ramp(tau, 3.6, 4.0));
    const travel = easeInOut(ramp(tau, 4.0, 5.2));
    const land = easeInOut(ramp(tau, 5.2, 5.6));
    const base: V3 = [lerp(-1, 4.5, travel), -1, lerp(0, 0.6, lift) - land * 1.4];
    for (let slot = 4; slot < 8; slot++) {
      if (tau < issued(slot)) continue;
      const retired = slot > 5 ? easeOut(ramp(tau, 6.2 + (slot - 6) * 0.5, 6.8 + (slot - 6) * 0.5)) : 0;
      cubelet(pen, base, SLOTS[slot], 'assets', lerp(0.4, 1, pop(slot)), pop(slot) * fade * (1 - retired));
      pen.frame(
        [base[0] + SLOTS[slot][0] + 0.04, base[1] + SLOTS[slot][1] + 0.04, base[2] + SLOTS[slot][2] + 0.04],
        CUBELET,
        HUES.assets.edge,
        retired * fade,
        true,
      );
    }
  },
};

const LAYERS = 4;

const stack: Scene = {
  bounds: [-4.4, -5.6, 4.4, 3.4],
  still: 6,
  draw(pen, t) {
    const tau = ((t % 9) + 9) % 9;
    const leave = 1 - ramp(tau, 8.2, 8.8);
    for (let layer = 0; layer < LAYERS; layer++) {
      pen.box([-2, -2, layer * 0.8], [4, 4, 0.5], NEUTRAL, 1, layer === 0);
    }
    const top = (LAYERS - 1) * 0.8 + 0.5;
    (['money', 'invest', 'assets'] as const).forEach((hue, i) => {
      const land = easeOut(ramp(tau, 0.6 + i * 0.7, 1.5 + i * 0.7));
      pen.box([[-1.6, 0.6, -0.5][i], [-0.5, -1.6, 0.6][i], top + (1 - land) * 2.2], [1, 1, 1], HUES[hue], land * leave);
    });
  },
};

export const SCENES = { chain, move, invest, assets, stack };
export type SceneName = keyof typeof SCENES;
