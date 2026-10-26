/**
 * EigenTech seal geometry (royal blue & white colourway).
 * A full circle holds the mark. The calligraphic hilal opens like a C and the arrow is its middle bar: the E.
 * A neural network drawn as the letter T sends the arrow: two fully connected layers form the crossbar,
 * and the output neuron sits on the stem.
 * In the hero, the network turns about its vertical axis (the stem). Every point on that axis stays where it is:
 * the axis of a rotation is its eigenvector. The T stays upright, so it always reads as a T.
 */

export type MarkVariant = 'dark' | 'light';

const S = 100;
const DEG = Math.PI / 180;
const LOGO_F = 6; // perspective of the original mark, which fixes where the output neuron sits
const F = 6; // the hero's perspective: the same as the logo's

type P3 = [number, number, number];
type Node = { p: P3; r: number };
type Edge = [number, number, boolean];

const MOON = { R: 1, r: 0.82, d: 0.25, sx: 0.75 };
const ARROW = { h0: 0.035, h1: 0.075, ah: 0.19, len: 0.24, back: 0.05 };
const TIP_X = (MOON.d - MOON.r) * MOON.sx - 0.012; // arrow tip just touches the hilal
const GAP = 0.1; // between the arrow's tail and the output neuron
const RING = { cx: 39, r: 134, w: 7 };
const T = {
  xs: [-2, -1, 0, 1, 2],
  dx: 0.26, // a wide crossbar: the same five neurons per row, spaced apart
  rows: [0.42, 0.255], // the top row sits a little lower than in the logo, so it clears the hilal's tip as it turns
  stem: [0, -0.3, -0.6, -0.9], // four stem neurons, larger than the crossbar's
  r: 0.066,
  rStem: 0.09,
  rOut: 0.135,
  zOut: 0.18, // depth of the stem, and of the axis the network turns about
  depth: [-0.1, 0.1], // the crossbar's two layers sit one behind the other
  back: 0.24, // a third crossbar row sits this far behind the crossbar's lower row
  teeth: [0.26, 0.14, 0.2], // how far each neuron of the back column sits behind the stem: a key's cuts
  edgeW: 0.016,
  strokeW: 0.04,
};
// The output neuron sits where the original mark placed it (x 0.9, seen in a 10° view).
const T_CX = (() => {
  const c = Math.cos(10 * DEG), s = Math.sin(10 * DEG);
  const X = 0.9 * c + T.zOut * s, Z = -0.9 * s + T.zOut * c;
  return X * (LOGO_F / (LOGO_F - Z)) * ((F - T.zOut) / F);
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
    faint: light ? 0.42 : 0.38, // opacity of the thin, fully connecting links
    glow: !light,
    e: light ? ['#2F5BD0', '#142C7A'] : ['#FFFFFF', '#DCE6F7'],
  };
}

/**
 * The T network in its resting pose (same structure for every frame; only positions change).
 * Seen from the front it is the T. Behind the crossbar's lower row sits a third row, and behind the stem a column of
 * neurons at different depths: turned side-on, the T becomes a key, its head the crossbar and its teeth that column.
 */
const NET = (() => {
  const nodes: Node[] = [], edges: Edge[] = [];
  const add = (x: number, y: number, z: number, r: number) => { nodes.push({ p: [x, y, z], r }); return nodes.length - 1; };
  // the crossbar curves gently toward the viewer; kept shallow so its ends clear the hilal's tips and the ring as it turns
  const bulge = (x: number) => 0.18 - 0.05 * Math.pow((x - T_CX) / (2 * T.dx + 0.06), 2);
  const xs = T.xs.map((k) => T_CX + k * T.dx);
  const [top, lower] = T.rows.map((y, li) => xs.map((x) => add(x, y, bulge(x) + T.depth[li], T.r)));
  const behind = xs.map((x) => add(x, T.rows[1], bulge(x) + T.depth[1] - T.back, T.r)); // behind the lower row
  const stem = T.stem.map((y) => add(T_CX, y, T.zOut, y === 0 ? T.rOut : T.rStem)); // on the axis, so the stem never moves
  // behind the stem, each at its own depth like the cuts of a key, starting one step below the arrow so it never
  // crosses the arrow or the hilal's tips as it turns. Side-on, the crossbar is the key's head and the stem its blade.
  const stemBack = T.stem.slice(1).map((y, i) => add(T_CX, y, T.zOut - T.teeth[i], T.r));
  const link = (a: number, b: number, strong: boolean) => edges.push([a, b, strong]);
  const chain = (ids: number[]) => ids.slice(1).forEach((b, i) => link(ids[i], b, true));
  [top, lower, behind, stem, stemBack].forEach(chain);
  top.forEach((a) => lower.forEach((b) => link(a, b, false))); // the top two layers, fully connected
  lower.forEach((a, i) => link(a, behind[i], true)); // rungs into depth
  stemBack.forEach((b, i) => link(stem[i + 1], b, true));
  for (const row of [lower, behind]) row.forEach((a, i) => link(a, stem[0], i === 2)); // both rows feed the output neuron
  return { nodes, edges, outIndex: stem[0] };
})();

function project(p: P3) {
  const k = F / (F - p[2]);
  return { x: p[0] * k, y: p[1] * k, z: p[2], k };
}

// Parts turning away from the viewer fade a little: the same colour, seen through more depth.
const fade = (z: number) => Math.max(0.4, Math.min(1, 0.95 + 0.6 * (z - T.zOut)));

export type NetworkFrame = {
  colour: string;
  lines: { x1: number; y1: number; x2: number; y2: number; w: number; op: number; strong: boolean }[];
  dots: { cx: number; cy: number; r: number; op: number; z: number }[];
};

/** Positions of every link and neuron with the network turned by theta about its vertical axis (the stem). */
export function networkFrame(theta: number, v: MarkVariant): NetworkFrame {
  const pal = palette(v), c = Math.cos(theta), s = Math.sin(theta);
  const P = NET.nodes.map(({ p: [x, y, z] }) => {
    const dx = x - T_CX, dz = z - T.zOut;
    return project([T_CX + dx * c + dz * s, y, T.zOut - dx * s + dz * c]);
  });
  const lines = NET.edges.map(([i, j, strong]) => {
    const a = P[i], b = P[j], z = (a.z + b.z) / 2;
    return {
      x1: a.x * S, y1: -a.y * S, x2: b.x * S, y2: -b.y * S,
      w: (strong ? T.strokeW : T.edgeW) * S * (a.k + b.k) / 2,
      op: (strong ? 1 : pal.faint) * fade(z),
      strong,
    };
  });
  const dots = P.map((p, i) => ({ cx: p.x * S, cy: -p.y * S, r: NET.nodes[i].r * S * p.k, op: fade(p.z), z: p.z }));
  return { colour: pal.t, lines, dots };
}

const sphereGrad = (id: string, c: string[]) =>
  `<radialGradient id="${id}" cx=".5" cy=".5" r=".5" fx=".36" fy=".32"><stop offset="0" stop-color="${c[0]}"/><stop offset=".32" stop-color="${c[1]}"/><stop offset=".78" stop-color="${c[2]}"/><stop offset="1" stop-color="${c[3]}"/></radialGradient>`;

/** Network markup at rotation theta (first paint, and the still image for reduced motion). Uses markStatic()'s gradients. */
export function renderNetwork(theta: number, v: MarkVariant, id: string) {
  const fr = networkFrame(theta, v);
  const line = (l: NetworkFrame['lines'][number]) =>
    `<line x1="${f(l.x1)}" y1="${f(l.y1)}" x2="${f(l.x2)}" y2="${f(l.y2)}" stroke="${fr.colour}" stroke-opacity="${f(l.op)}" stroke-width="${f(l.w)}" stroke-linecap="round"/>`;
  return (
    fr.lines.filter((l) => !l.strong).map(line).join('') +
    fr.lines.filter((l) => l.strong).map(line).join('') +
    [...fr.dots].sort((a, b) => a.z - b.z).map((d) => `<circle cx="${f(d.cx)}" cy="${f(d.cy)}" r="${f(d.r)}" fill="url(#${id}k)" opacity="${f(d.op)}"/>`).join('')
  );
}

function moonGeometry() {
  const k = MOON.sx, R = MOON.R * S, r = MOON.r * S, D = MOON.d * S;
  const a = (R * R - r * r + D * D) / (2 * D), h = Math.sqrt(R * R - a * a);
  const d = `M${f(a * k)} ${f(h)} A${f(R * k)} ${f(R)} 0 1 1 ${f(a * k)} ${f(-h)} A${f(r * k)} ${f(r)} 0 ${a - D > 0 ? 1 : 0} 0 ${f(a * k)} ${f(h)} Z`;
  return { d, tips: [[a * k, -h], [a * k, h]] as [number, number][] };
}

function arrowPath() {
  const op = project(NET.nodes[NET.outIndex].p);
  const x0 = op.x - (T.rOut * op.k + GAP), xt = TIP_X, dir = Math.sign(xt - x0);
  const xb = xt - dir * ARROW.len, xw = xb - dir * ARROW.back;
  const pts: [number, number][] = [[x0, ARROW.h0], [xb, ARROW.h1], [xw, ARROW.ah], [xt, 0], [xw, -ARROW.ah], [xb, -ARROW.h1], [x0, -ARROW.h0]];
  return { d: 'M' + pts.map(([x, y]) => `${f(x * S)} ${f(-y * S)}`).join(' L') + ' Z', out: op };
}

/** Where the T sits in the figure, as fractions of the viewBox, so decorations can line up with it. */
export const markLayout = (() => {
  const half = RING.r + RING.w / 2, side = 2 * half * 1.04, vx = RING.cx - side / 2, vy = -side / 2;
  const k = F / (F - T.zOut);
  const fx = (x: number) => (x * k * S - vx) / side, fy = (y: number) => (-y * k * S - vy) / side;
  return {
    side,
    vx,
    tx: fx(T_CX), // the vertical axis (the stem)
    barY: fy((T.rows[0] + T.rows[1]) / 2), // middle of the crossbar
    barHalf: ((2 * T.dx + T.r) * k * S) / side, // half the crossbar's width
    stemY: fy(-0.5), // lower part of the stem
  };
})();

/** Everything that does not move: viewBox, gradients, glows (under everything), and the ring, hilal and arrow. */
export function markStatic(v: MarkVariant, id: string) {
  const pal = palette(v), moon = moonGeometry(), arrow = arrowPath();
  const mR = MOON.R * S, mRx = mR * MOON.sx;
  const e = `url(#${id}e)`;
  const defs =
    sphereGrad(`${id}k`, pal.sphere) +
    `<linearGradient id="${id}e" gradientUnits="userSpaceOnUse" x1="${f(-mRx)}" y1="${f(-mR)}" x2="${f(mRx)}" y2="${f(mR)}"><stop offset="0" stop-color="${pal.e[0]}"/><stop offset="1" stop-color="${pal.e[1]}"/></linearGradient>` +
    `<radialGradient id="${id}r"><stop offset="0" stop-color="${pal.e[0]}" stop-opacity=".16"/><stop offset="1" stop-color="${pal.e[0]}" stop-opacity="0"/></radialGradient>` +
    `<radialGradient id="${id}q"><stop offset="0" stop-color="${pal.t}" stop-opacity=".35"/><stop offset="1" stop-color="${pal.t}" stop-opacity="0"/></radialGradient>`;
  let glow = '';
  if (pal.glow) {
    glow += `<circle cx="${RING.cx}" cy="0" r="${RING.r - 7.5}" fill="url(#${id}r)"/>`;
    glow += `<circle cx="${f(arrow.out.x * S)}" cy="0" r="${f(T.rOut * S * 1.7)}" fill="url(#${id}q)"/>`;
  }
  let body = `<circle cx="${RING.cx}" cy="0" r="${RING.r}" fill="none" stroke="${e}" stroke-width="${RING.w}"/>`;
  body += `<path d="${moon.d}" fill="${e}" stroke="${e}" stroke-width="2.5" stroke-linejoin="round"/>`;
  body += moon.tips.map(([x, y]) => `<circle cx="${f(x)}" cy="${f(y)}" r="4.5" fill="${e}"/>`).join('');
  body += `<path d="${arrow.d}" fill="${e}" stroke="${e}" stroke-width="2.5" stroke-linejoin="round"/>`;
  const { side, vx } = markLayout;
  return { viewBox: `${f(vx)} ${f(-side / 2)} ${f(side)} ${f(side)}`, defs, glow, body };
}
