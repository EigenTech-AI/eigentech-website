/**
 * EigenTech mark geometry (royal blue & white colourway).
 * The hilal opens like a C, the arrow is the E's middle bar, and a 3D neural network sends the arrow.
 * The network can rotate about the arrow's axis (x): that axis is the rotation's eigenvector.
 * Output is plain SVG markup so it can be animated without re-rendering React on every frame.
 */

export type MarkVariant = 'dark' | 'light';

const S = 100;
const DEG = Math.PI / 180;
const VIEW = { yaw: 25 * DEG, F: 6 };

type P3 = [number, number, number];
type Node = { p: P3; r: number; out: boolean };
type Edge = [number, number, boolean];

const MODEL = {
  layers: [
    { x: 1.16, ys: [-0.78, -0.26, 0.26, 0.78], nr: 0.08 },
    { x: 0.84, ys: [-0.92, -0.46, 0, 0.46, 0.92], nr: 0.085 },
    { x: 0.36, ys: [0], nr: 0.14 },
  ],
  path: [2, 2, 0],
  bulge: 0.24,
  edgeW: 0.018,
  strokeW: 0.032,
  arrow: { h0: 0.065, h1: 0.07, ah: 0.19, len: 0.24, back: 0.05 },
  moon: { c: [0, 0] as [number, number], R: 1, r: 0.88, d: 0.16, sx: 0.75 },
  tipX: -0.55,
  gap: 0.1,
};

const f = (n: number) => (Math.round(n * 100) / 100).toString();
const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const A = rgb(a), B = rgb(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('');
};
const lt = (h: string, t: number) => mix(h, '#ffffff', t);
const dk = (h: string, t: number) => mix(h, '#000000', t);

function palette(v: MarkVariant) {
  const light = v === 'light';
  const far = light ? '#2F5BD0' : '#4F7FD6';
  const near = light ? '#5FA9E0' : '#A8D8F5';
  return {
    far, near,
    sFar: lt(far, 0.12),
    sNear: light ? dk(near, 0.1) : lt(near, 0.55),
    eMin: light ? 0.25 : 0.22,
    eMax: light ? 0.6 : 0.55,
    gFar: [lt(far, 0.65), lt(far, 0.18), far, dk(far, 0.5)],
    gNear: [lt(near, 0.88), lt(near, 0.45), near, dk(near, 0.5)],
    gOut: ['#FFFFFF', lt(near, 0.6), lt(near, 0.12), dk(near, 0.5)],
    glowNear: lt(near, 0.2),
    glow: !light,
    e: light ? ['#2F5BD0', '#142C7A'] : ['#FFFFFF', '#DCE6F7'],
  };
}

function project(p: P3) {
  const c = Math.cos(VIEW.yaw), s = Math.sin(VIEW.yaw);
  const X = p[0] * c + p[2] * s, Z = -p[0] * s + p[2] * c, k = VIEW.F / (VIEW.F - Z);
  return { x: X * k, y: p[1] * k, z: Z, k };
}

function network(theta: number) {
  const nodes: Node[] = [], edges: Edge[] = [], idx: number[][] = [];
  const c = Math.cos(theta), s = Math.sin(theta);
  MODEL.layers.forEach((L, li) => {
    const ids: number[] = [];
    L.ys.forEach((y) => {
      const z = MODEL.bulge * (1 - y * y);
      ids.push(nodes.length);
      nodes.push({ p: [L.x, y * c - z * s, y * s + z * c], r: L.nr, out: li === MODEL.layers.length - 1 });
    });
    idx.push(ids);
  });
  for (let li = 0; li < idx.length - 1; li++)
    idx[li].forEach((i, a) => idx[li + 1].forEach((j, b) => edges.push([i, j, MODEL.path[li] === a && MODEL.path[li + 1] === b])));
  return { nodes, edges, outIndex: nodes.length - 1 };
}

const sphereGrad = (id: string, c: string[]) =>
  `<radialGradient id="${id}" cx=".5" cy=".5" r=".5" fx=".36" fy=".32"><stop offset="0" stop-color="${c[0]}"/><stop offset=".32" stop-color="${c[1]}"/><stop offset=".78" stop-color="${c[2]}"/><stop offset="1" stop-color="${c[3]}"/></radialGradient>`;

/** Network markup (edges + neurons) at rotation theta. Uses gradients defined by markStatic(). */
export function renderNetwork(theta: number, v: MarkVariant, id: string) {
  const pal = palette(v), net = network(theta);
  const P = net.nodes.map((n) => project(n.p));
  const zs = P.map((p) => p.z), zmin = Math.min(...zs), zmax = Math.max(...zs);
  const dn = (z: number) => (zmax - zmin < 1e-6 ? 1 : (z - zmin) / (zmax - zmin));
  let o = '';
  net.edges
    .map(([i, j, st]) => ({ i, j, st, z: (P[i].z + P[j].z) / 2 }))
    .sort((a, b) => Number(a.st) - Number(b.st) || a.z - b.z)
    .forEach((e) => {
      const a = P[e.i], b = P[e.j], t = dn(e.z);
      const col = e.st ? mix(pal.sFar, pal.sNear, t) : mix(pal.far, pal.near, t);
      const op = e.st ? 1 : pal.eMin + (pal.eMax - pal.eMin) * t;
      const w = (e.st ? MODEL.strokeW : MODEL.edgeW) * S * (a.k + b.k) / 2;
      o += `<line x1="${f(a.x * S)}" y1="${f(-a.y * S)}" x2="${f(b.x * S)}" y2="${f(-b.y * S)}" stroke="${col}" stroke-opacity="${f(op)}" stroke-width="${f(w)}" stroke-linecap="round"/>`;
    });
  P.map((p, i) => ({ p, i }))
    .sort((a, b) => a.p.z - b.p.z)
    .forEach(({ p, i }) => {
      const n = net.nodes[i], r = f(n.r * S * p.k), cx = f(p.x * S), cy = f(-p.y * S);
      if (n.out) o += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id}o)"/>`;
      else o += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id}f)"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id}n)" opacity="${f(dn(p.z))}"/>`;
    });
  return o;
}

function moonPath() {
  const mo = MODEL.moon, k = mo.sx;
  const R = mo.R * S, r = mo.r * S, D = mo.d * S;
  const a = (R * R - r * r + D * D) / (2 * D), h = Math.sqrt(R * R - a * a);
  const P1 = [a * k, h], P2 = [a * k, -h];
  return `M${f(P1[0])} ${f(P1[1])} A${f(R * k)} ${f(R)} 0 1 1 ${f(P2[0])} ${f(P2[1])} A${f(r * k)} ${f(r)} 0 ${a - D > 0 ? 1 : 0} 0 ${f(P1[0])} ${f(P1[1])} Z`;
}

function arrowPath() {
  const net = network(0), op = project(net.nodes[net.outIndex].p), nr = MODEL.layers[2].nr;
  const A = MODEL.arrow, xt = MODEL.tipX;
  const x0 = op.x - (nr * op.k + MODEL.gap), dir = Math.sign(xt - x0);
  const xb = xt - dir * A.len, xw = xb - dir * A.back;
  const pts: [number, number][] = [[x0, A.h0], [xb, A.h1], [xw, A.ah], [xt, 0], [xw, -A.ah], [xb, -A.h1], [x0, -A.h0]];
  return { d: 'M' + pts.map(([x, y]) => `${f(x * S)} ${f(-y * S)}`).join(' L') + ' Z', out: op };
}

/** Everything that does not move: viewBox, gradients, glows, hilal and arrow. */
export function markStatic(v: MarkVariant, id: string) {
  const pal = palette(v);
  const mR = MODEL.moon.R * S, mRx = mR * MODEL.moon.sx;
  const arrow = arrowPath();
  // Fixed square frame with room for the network while it turns.
  const left = -mRx, right = 1.42 * S, top = -1.06 * S, bottom = 1.06 * S;
  const side = Math.max(right - left, bottom - top) * 1.06;
  const vx = (left + right) / 2 - side / 2, vy = (top + bottom) / 2 - side / 2;
  const defs =
    sphereGrad(`${id}f`, pal.gFar) + sphereGrad(`${id}n`, pal.gNear) + sphereGrad(`${id}o`, pal.gOut) +
    `<linearGradient id="${id}e" gradientUnits="userSpaceOnUse" x1="${f(-mRx)}" y1="${f(-mR)}" x2="${f(mRx)}" y2="${f(mR)}"><stop offset="0" stop-color="${pal.e[0]}"/><stop offset="1" stop-color="${pal.e[1]}"/></linearGradient>` +
    `<radialGradient id="${id}r"><stop offset="0" stop-color="${pal.e[0]}" stop-opacity=".18"/><stop offset="1" stop-color="${pal.e[0]}" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="${id}q"><stop offset="0" stop-color="${pal.glowNear}" stop-opacity=".35"/><stop offset="1" stop-color="${pal.glowNear}" stop-opacity="0"/></radialGradient>`;
  let under = '';
  if (pal.glow) {
    under += `<ellipse cx="0" cy="0" rx="${f(mRx * 1.35)}" ry="${f(mR * 1.3)}" fill="url(#${id}r)"/>`;
    under += `<circle cx="${f(arrow.out.x * S)}" cy="0" r="${f(MODEL.layers[2].nr * S * 1.7)}" fill="url(#${id}q)"/>`;
  }
  under += `<path d="${moonPath()}" fill="url(#${id}e)"/><path d="${arrow.d}" fill="url(#${id}e)"/>`;
  return { viewBox: `${f(vx)} ${f(vy)} ${f(side)} ${f(side)}`, defs, under };
}
