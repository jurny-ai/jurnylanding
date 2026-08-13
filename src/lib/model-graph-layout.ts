/* -------------------------------------------------------------------------
   Deterministic layout for the user model graph.

   Shared by two renderers: the SVG fallback in UserModelGraph.tsx and the WebGL
   version in ModelGraphGL.tsx. Both draw the same points in the same places, so
   swapping one for the other is invisible apart from the depth.

   Every position comes from a seeded PRNG at module scope, so the server render
   and the client render agree and React never sees a hydration mismatch.
   Nothing here may call Math.random().

   Coordinates are viewBox units: x in 0..1000, y in 0..440 with y increasing
   downward, matching an SVG. z is depth, only non-zero for the first two stages.
   ------------------------------------------------------------------------- */

import { PHONE_H, PHONE_W } from "@/components/mocks/PhoneMock";
import { JOURNEY } from "@/lib/variant-clicks";

export const VIEW_W = 1000;
export const VIEW_H = 440;

/** The WebGL renderer draws all of these. The SVG fallback draws a subsample. */
const NODE_COUNT = 460;
const SVG_NODE_COUNT = 150;
const AGENT_COUNT = 6;
const TAU = Math.PI * 2;

/** Cluster centres for stage 3, in viewBox units. The pipeline hangs its DOM
 *  trait cards on these same anchors, which is why depth has to be gone by then. */
export const AGENT_ANCHORS = [
  { x: 150, y: 98 },
  { x: 500, y: 98 },
  { x: 850, y: 98 },
  { x: 150, y: 280 },
  { x: 500, y: 280 },
  { x: 850, y: 280 },
];

/** Panel rectangles for stage 4: the three screens of one buying journey, as
 *  phones. Portrait, because that is how a D2C storefront is actually used. The
 *  aspect comes from the real PhoneMock, which renders inside these rects, so the
 *  pooled points land on its buttons. */
const PANEL_H = 356;
const PANEL_W = Math.round((PANEL_H * PHONE_W) / PHONE_H);
const PANEL_GAP = 104;
const PANEL_Y = Math.round((VIEW_H - PANEL_H) / 2) + 14;
const PANEL_X0 = Math.round((VIEW_W - PANEL_W * 3 - PANEL_GAP * 2) / 2);
export const PANELS = [0, 1, 2].map((i) => ({
  x: PANEL_X0 + i * (PANEL_W + PANEL_GAP),
  y: PANEL_Y,
  w: PANEL_W,
  h: PANEL_H,
}));

/* Click clusters inside each panel, taken straight from the measured coordinates
   for the landscape crop each panel renders, so the points pool on the real
   buttons of the real screens. Percentages
   convert to panel-relative units directly, because the panel and the mock frame
   are the same rectangle. Each cluster is picked in proportion to its weight, so
   a hot target collects more points than a cold one. */
const HOTSPOTS = JOURNEY.map(({ clicks }) => {
  let total = 0;
  const spots = clicks.map((click) => {
    total += click.w;
    return {
      x: click.x / 100,
      y: click.y / 100,
      spread: (click.r ?? 9) / 100,
      cumulative: total,
    };
  });
  return { spots, total };
});

const pickSpot = (panel: number, roll: number) => {
  const { spots, total } = HOTSPOTS[panel];
  const target = roll * total;
  for (const spot of spots) if (target <= spot.cumulative) return spot;
  return spots[spots.length - 1];
};

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Rounds a coordinate before it can reach the DOM.
 *
 * The layout runs through Math.cos, Math.sin, and Math.sqrt, and those are not
 * guaranteed to agree to the last bit between Node and the browser's V8. Without
 * this the server writes "253.699420176154" where the client computes
 * "253.69942017615398" for the same node, and React fails hydration on the whole
 * root. Two decimals of a 1000 unit viewBox is far below a rendered pixel.
 */
const q = (v: number) => Math.round(v * 100) / 100;

export type Point3 = { x: number; y: number; z: number };

export type GraphNode = {
  qual: boolean;
  /** scatter, graph, agents, heat */
  layouts: Point3[];
  drift: { dx: number; dy: number; dur: number; delay: number };
  size: number;
};

function buildNodes(count: number): GraphNode[] {
  const rand = mulberry32(20260813);

  return Array.from({ length: count }, (_, i) => {
    // Draw every random value up front so the layout maths can be reordered
    // without changing the sequence the PRNG produces.
    const r = {
      a: rand(), b: rand(), c: rand(), d: rand(), e: rand(),
      f: rand(), g: rand(), h: rand(), i: rand(), j: rand(), k: rand(),
    };
    const qual = i % 2 === 0;
    const agent = i % AGENT_COUNT;
    // Drawn, not derived from the index. Keying this off `i % 2` the way `qual`
    // is would sort the two kinds of evidence into different screens, which
    // would read as if each panel measured something different.
    // Weighted so the journey thins out the way a real funnel does.
    const panel = r.i < 0.46 ? 0 : r.i < 0.79 ? 1 : 2;

    // Stage 1: two loose clouds, qualitative on the left, quantitative on the
    // right. Spherical rather than flat, so the depth is real.
    const cloud = qual ? { x: 258, y: 218 } : { x: 742, y: 218 };
    const cloudTheta = r.a * TAU;
    const cloudPhi = Math.acos(2 * r.j - 1);
    const cloudRadius = 26 + Math.cbrt(r.b) * 116;
    const scatter: Point3 = {
      x: q(cloud.x + Math.sin(cloudPhi) * Math.cos(cloudTheta) * cloudRadius * 1.08),
      y: q(cloud.y + Math.sin(cloudPhi) * Math.sin(cloudTheta) * cloudRadius),
      z: q(Math.cos(cloudPhi) * cloudRadius * 0.9),
    };

    // Stage 2: one graph. A Fibonacci sphere flattened on z gives an even,
    // organic shell that still reads as a disc when it is not rotating.
    const k = i + 0.5;
    const gy = 1 - (k / count) * 2;
    const gr = Math.sqrt(Math.max(0, 1 - gy * gy));
    const gt = k * 2.399963229728653;
    // Pulled in off the shell by a cube-rooted amount, so the cloud is a filled
    // ball rather than a hollow wireframe sphere.
    const gd = 0.55 + 0.45 * Math.cbrt(r.k);
    const graph: Point3 = {
      x: q(500 + Math.cos(gt) * gr * 320 * gd + (r.c - 0.5) * 14),
      y: q(218 + gy * 152 * gd + (r.d - 0.5) * 14),
      z: q(Math.sin(gt) * gr * 150 * gd),
    };

    // Stage 3: the graph splits into synthetic users. Depth collapses here so
    // the DOM trait cards can be anchored in flat percentages.
    const anchor = AGENT_ANCHORS[agent];
    const agentAngle = r.e * TAU;
    const agentRadius = Math.sqrt(r.f) * 34;
    const agents: Point3 = {
      x: q(anchor.x + Math.cos(agentAngle) * agentRadius),
      y: q(anchor.y + Math.sin(agentAngle) * agentRadius),
      z: 0,
    };

    // Stage 4: those users land on two variants, pooling where they clicked.
    const spot = pickSpot(panel, r.g);
    const rect = PANELS[panel];
    const heatAngle = r.h * TAU;
    const heatRadius = Math.sqrt(r.a) * spot.spread * rect.w;
    const heat: Point3 = {
      x: q(rect.x + spot.x * rect.w + Math.cos(heatAngle) * heatRadius),
      y: q(rect.y + spot.y * rect.h + Math.sin(heatAngle) * heatRadius * 0.9),
      z: 0,
    };

    return {
      qual,
      layouts: [scatter, graph, agents, heat],
      // Ambient drift, used by the hero. Small, slow, per-node offset.
      drift: {
        dx: q((r.c - 0.5) * 15),
        dy: q((r.d - 0.5) * 15),
        dur: q(7 + r.e * 6),
        delay: q(-r.f * 10),
      },
      size: q(2.2 + r.b * 2.2),
    };
  });
}

export const NODES = buildNodes(NODE_COUNT);

/** Links each node to its nearest neighbours in the graph layout. */
function buildEdges(nodes: GraphNode[], neighbours: number): [number, number][] {
  const pairs: [number, number][] = [];
  const seen = new Set<string>();

  for (let i = 0; i < nodes.length; i++) {
    const from = nodes[i].layouts[1];
    const ranked = nodes
      .map((node, j) => {
        const dx = node.layouts[1].x - from.x;
        const dy = node.layouts[1].y - from.y;
        const dz = node.layouts[1].z - from.z;
        return { j, d: dx * dx + dy * dy + dz * dz };
      })
      .filter((entry) => entry.j !== i)
      .sort((a, b) => a.d - b.d);

    for (let n = 0; n < neighbours; n++) {
      const j = ranked[n].j;
      const key = i < j ? `${i}:${j}` : `${j}:${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      pairs.push([i, j]);
    }
  }

  return pairs;
}

export const EDGES = buildEdges(NODES, 2);

/* The flat renderer gets its own layout at its own count, not a subsample of the
   WebGL one. Subsampling kept the full disc but thinned the points, so each
   node's nearest neighbours were far away and the graph stage drew as a few long
   strands instead of a network. Built at this count the spacing is right, and a
   third neighbour gives it the density the sparse version was missing. This is
   the no-JS, reduced-motion and narrow-viewport path, drawn up to four times on
   the stacked layout, so it stays well under the full cloud. */
export const SVG_NODES = buildNodes(SVG_NODE_COUNT);
export const SVG_EDGES = buildEdges(SVG_NODES, 3);

export const TONES = {
  // `quant` and `qual` are identity: which kind of evidence a dot came from.
  // `qual` is the brand lime (--highlight) so the visuals match the rest of the
  // site. It only clears 1.3:1 against the white section, well under the 3:1 a
  // mark normally needs; what makes that legal here is that neither cloud is
  // ever identified by colour alone, both carry a direct text label beside them.
  // `density` is magnitude, used only once the dots pool into click heat on the
  // last stage. Mixing two hues there would read as two variables rather than
  // one quantity, so every dot fades to this single step. It is the midpoint of
  // the sequential ramp in HeatmapOverlay.
  surface: { quant: "#3e53ce", qual: "#c3f03d", edge: "#3e53ce", density: "#5468d4" },
  primary: { quant: "#ffffff", qual: "#c3f03d", edge: "#ffffff", density: "#ffffff" },
} as const;

export type ToneName = keyof typeof TONES;

export const toRgb = (hex: string) =>
  [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ] as [number, number, number];

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
export const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
/** Ramps 0 -> 1 across [from, to] and stays there. */
export const band = (v: number, from: number, to: number) => clamp01((v - from) / (to - from));

/**
 * How much of the sequence is allowed to have depth.
 *
 * The trait cards in stage 3 and the variant frames in stage 4 are DOM elements
 * positioned as flat percentages of the canvas box. If the point cloud were
 * still rotating under them they would drift off their clusters, so parallax is
 * faded out before stage 3 begins and the cloud settles square to the camera.
 */
export const depthAmount = (progress: number) => 1 - band(progress, 0.36, 0.52);
