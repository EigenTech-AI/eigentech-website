/**
 * EigenTech seal geometry (royal blue & white colourway).
 * A full circle holds the mark. The calligraphic hilal opens like a C and the arrow is its middle bar: the E.
 * A neural network drawn as the letter T sends the arrow: two fully connected layers form the crossbar,
 * and the output neuron sits on the stem, on the arrow's axis.
 * The network can turn about that axis (x): the axis of a rotation is its eigenvector, so the arrow never moves.
 * Output is plain SVG markup so it can be animated without re-rendering React on every frame.
 */

export type MarkVariant = 'dark' | 'light';

const S = 100;
const DEG = Math.PI / 180;
const F = 6; // perspective distance; the T is seen face-on

type P3 = [number, number, number];
type Node = { p: P3; r: number; out: boolean };
type Edge = [number, number, boolean];

const MOON = { R: 1, r: 0.82, d: 0.25, sx: 0.75 };
const ARROW = { h0: 0.035, h1: 0.075, ah: 0.19, len: 0.24, back: 0.05 };
const TIP_X = (MOON.d - MOON.r) * MOON.sx - 0.012; // arrow tip just touches the hilal
const GAP = 0.1; // between the arrow's tail and the output neuron
const RING = { cx: 34, r: 128, w: 7 };
const T = {
  xs: [-2, -1, 0, 1, 2],
  dx: 0.18,
  rows: [0.46, 0.255],
  stem: [0, -0.24, -0.48, -0.72],
  r: 0.066,
  rOut: 0.11,
  zOut: 0.18,
  edgeW: 0.016,
  strokeW: 0.034,
};
// The output neuron sits where the original mark placed it (x 0.9, seen in a 10° view).
const T_CX = (() => {
  const c = Math.cos(10 * DEG), s = Math.sin(10 * DEG);
  const X = 0.9 * c + T.zOut * s, Z = -0.9 * s + T.zOut * c;
  return X * (F / (F - Z)) * ((F - T.zOut) / F);
})();

const f = (n: number) => (Math.round(n * 100) / 100).toString();
const rgb = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const A = rgb(a), B = rgb(b);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, '0')).join('');
};
const lt = (h: string, t: number) => mix(h, '#ffffff', t);
const dk = (h: string, t: number) => mix(h, '#000000', t);

/** One colour for every neuron and link: the colour of "Tech". The hilal, arrow and ring share one gradient. */
function palette(v: MarkVariant) {
  const light = v === 'light';
  const t = light ? '#5FA9E0' : '#A8D8F5';
  return {
    t,
    sphere: [lt(t, 0.7), lt(t, 0.2), t, dk(t, 0.3)],
    eMin: light ? 0.25 : 0.22,
    eMax: light ? 0.6 : 0.55,
    glow: !light,
    e: light ? ['#2F5BD0', '#142C7A'] : ['#FFFFFF', '#DCE6F7'],
  };
}

/** The T network, turned by theta about the arrow's axis (the line y = 0 through the output neuron). */
function network(theta: number) {
  const nodes: Node[] = [], edges: Edge[] = [];
  const c = Math.cos(theta), s = Math.sin(theta);
  const add = (x: number, y: number, z: number, r: number, out = false) => {
    const zc = z - T.zOut;
    nodes.push({ p: [x, y * c - zc * s, y * s + zc * c + T.zOut], r, out });
    return nodes.length - 1;
  };
  const bulge = (x: number) => 0.18 * (1 - Math.pow((x - T_CX) / 0.42, 2)); // crossbar curves toward the viewer
  const xs = T.xs.map((k) => T_CX + k * T.dx);
  const layers = T.rows.map((y) => xs.map((x) => add(x, y, bulge(x), T.r)));
  const stem = T.stem.map((y) => add(T_CX, y, T.zOut - 0.08 * Math.abs(y), y === 0 ? T.rOut : T.r, y === 0));
  const link = (a: number, b: number, strong: boolean) => edges.push([a, b, strong]);
  layers.forEach((L) => L.slice(1).forEach((b, i) => link(L[i], b, true)));
  layers[0].forEach((a) => layers[1].forEach((b) => link(a, b, false))); // the two layers, fully connected
  const last = layers[1], mid = last[2];
  link(mid, stem[0], true);
  stem.slice(1).forEach((b, i) => link(stem[i], b, true));
  last.forEach((a) => { if (a !== mid) link(a, stem[0], false); });
  return { nodes, edges, outIndex: stem[0] };
}

function project(p: P3) {
  const k = F / (F - p[2]);
  return { x: p[0] * k, y: p[1] * k, z: p[2], k };
}

const sphereGrad = (id: string, c: string[]) =>
  `<radialGradient id="${id}" cx=".5" cy=".5" r=".5" fx=".36" fy=".32"><stop offset="0" stop-color="${c[0]}"/><stop offset=".32" stop-color="${c[1]}"/><stop offset=".78" stop-color="${c[2]}"/><stop offset="1" stop-color="${c[3]}"/></radialGradient>`;

/** Network markup (links + neurons) at rotation theta. Uses gradients defined by markStatic(). */
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
      const a = P[e.i], b = P[e.j];
      const op = e.st ? 1 : pal.eMin + (pal.eMax - pal.eMin) * dn(e.z);
      const w = (e.st ? T.strokeW : T.edgeW) * S * (a.k + b.k) / 2;
      o += `<line x1="${f(a.x * S)}" y1="${f(-a.y * S)}" x2="${f(b.x * S)}" y2="${f(-b.y * S)}" stroke="${pal.t}" stroke-opacity="${f(op)}" stroke-width="${f(w)}" stroke-linecap="round"/>`;
    });
  P.map((p, i) => ({ p, i }))
    .sort((a, b) => a.p.z - b.p.z)
    .forEach(({ p, i }) => {
      o += `<circle cx="${f(p.x * S)}" cy="${f(-p.y * S)}" r="${f(net.nodes[i].r * S * p.k)}" fill="url(#${id}k)"/>`;
    });
  return o;
}

function moonGeometry() {
  const k = MOON.sx, R = MOON.R * S, r = MOON.r * S, D = MOON.d * S;
  const a = (R * R - r * r + D * D) / (2 * D), h = Math.sqrt(R * R - a * a);
  const d = `M${f(a * k)} ${f(h)} A${f(R * k)} ${f(R)} 0 1 1 ${f(a * k)} ${f(-h)} A${f(r * k)} ${f(r)} 0 ${a - D > 0 ? 1 : 0} 0 ${f(a * k)} ${f(h)} Z`;
  return { d, tips: [[a * k, -h], [a * k, h]] as [number, number][] };
}

function arrowPath() {
  const net = network(0), op = project(net.nodes[net.outIndex].p);
  const x0 = op.x - (T.rOut * op.k + GAP), xt = TIP_X, dir = Math.sign(xt - x0);
  const xb = xt - dir * ARROW.len, xw = xb - dir * ARROW.back;
  const pts: [number, number][] = [[x0, ARROW.h0], [xb, ARROW.h1], [xw, ARROW.ah], [xt, 0], [xw, -ARROW.ah], [xb, -ARROW.h1], [x0, -ARROW.h0]];
  return { d: 'M' + pts.map(([x, y]) => `${f(x * S)} ${f(-y * S)}`).join(' L') + ' Z', out: op };
}

/** Where the figure sits in its viewBox, as fractions, so decorations can line up with the T. */
export const markLayout = (() => {
  const half = RING.r + RING.w / 2, side = 2 * half * 1.04, vx = RING.cx - side / 2;
  const tTop = T.rows[0] + T.r, tBottom = T.stem[T.stem.length - 1] - T.r;
  return {
    side,
    vx,
    tx: (T_CX * (F / (F - T.zOut)) * S - vx) / side, // T's centre on screen, from the left
    tReach: (Math.max(tTop, -tBottom) * S + 8) / side, // farthest neuron from the axis
  };
})();

/** Everything that does not move: viewBox, gradients, glows, ring, hilal and arrow. */
export function markStatic(v: MarkVariant, id: string) {
  const pal = palette(v), moon = moonGeometry(), arrow = arrowPath();
  const mR = MOON.R * S, mRx = mR * MOON.sx;
  const e = `url(#${id}e)`;
  const defs =
    sphereGrad(`${id}k`, pal.sphere) +
    `<linearGradient id="${id}e" gradientUnits="userSpaceOnUse" x1="${f(-mRx)}" y1="${f(-mR)}" x2="${f(mRx)}" y2="${f(mR)}"><stop offset="0" stop-color="${pal.e[0]}"/><stop offset="1" stop-color="${pal.e[1]}"/></linearGradient>` +
    `<radialGradient id="${id}r"><stop offset="0" stop-color="${pal.e[0]}" stop-opacity=".16"/><stop offset="1" stop-color="${pal.e[0]}" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="${id}q"><stop offset="0" stop-color="${pal.t}" stop-opacity=".35"/><stop offset="1" stop-color="${pal.t}" stop-opacity="0"/></radialGradient>`;
  let under = '';
  if (pal.glow) {
    under += `<circle cx="${RING.cx}" cy="0" r="${RING.r - 7.5}" fill="url(#${id}r)"/>`;
    under += `<circle cx="${f(arrow.out.x * S)}" cy="0" r="${f(T.rOut * S * 1.7)}" fill="url(#${id}q)"/>`;
  }
  under += `<circle cx="${RING.cx}" cy="0" r="${RING.r}" fill="none" stroke="${e}" stroke-width="${RING.w}"/>`;
  under += `<path d="${moon.d}" fill="${e}" stroke="${e}" stroke-width="2.5" stroke-linejoin="round"/>`;
  under += moon.tips.map(([x, y]) => `<circle cx="${f(x)}" cy="${f(y)}" r="4.5" fill="${e}"/>`).join('');
  under += `<path d="${arrow.d}" fill="${e}" stroke="${e}" stroke-width="2.5" stroke-linejoin="round"/>`;
  const { side, vx } = markLayout;
  return { viewBox: `${f(vx)} ${f(-side / 2)} ${f(side)} ${f(side)}`, defs, under };
}
