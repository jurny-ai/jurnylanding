"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  EDGES,
  NODES,
  TONES,
  VIEW_H,
  VIEW_W,
  band,
  clamp01,
  depthAmount,
  easeInOut,
  type ToneName,
} from "@/lib/model-graph-layout";
import { cn } from "@/lib/utils";

/**
 * The point cloud, on the GPU.
 *
 * An orthographic camera framed exactly on the 0..1000 by 0..620 viewBox, so a
 * point at x=500 lands at 50% of the canvas and the DOM overlays in
 * ModelPipeline keep the flat percentage mapping they are positioned with. The
 * depth shows up as parallax rotation, per-point size attenuation, and haze,
 * rather than as perspective, which would break that mapping.
 *
 * Parallax runs during the scatter and graph stages and settles to square by
 * stage 3, because from there on the DOM cards are anchored to specific
 * clusters. See depthAmount().
 */

const VERTEX = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aAlpha;
  varying vec3 vColor;
  varying float vAlpha;
  uniform float uScale;

  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    // Nearer points read larger and more solid. With an orthographic camera the
    // projection will not do this for us, so depth is applied by hand.
    float depth = clamp((mv.z + 320.0) / 640.0, 0.0, 1.0);
    vAlpha = aAlpha * mix(0.42, 1.0, depth);
    gl_PointSize = aSize * uScale * mix(0.72, 1.25, depth);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Round, soft-edged sprite. Discarding outside the disc keeps the points
    // from reading as squares at large sizes.
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;
    float edge = smoothstep(0.5, 0.16, d);
    gl_FragColor = vec4(vColor, vAlpha * edge);
  }
`;

interface ModelGraphGLProps {
  /** 0 -> 1 across the four stages. Ignored in ambient mode. */
  progress?: number;
  mode?: "sequence" | "ambient";
  tone?: ToneName;
  className?: string;
  onReady?: () => void;
}

export default function ModelGraphGL({
  progress = 0,
  mode = "sequence",
  tone = "surface",
  className,
  onReady,
}: ModelGraphGLProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  // Scroll updates land in a ref rather than state, so a scroll frame never
  // re-renders React; the animation loop just reads the latest value.
  const progressRef = useRef(progress);
  const pointerRef = useRef(0);
  const readyRef = useRef(onReady);

  progressRef.current = progress;
  readyRef.current = onReady;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      // No WebGL. The SVG fallback stays on screen because onReady never fires.
      return;
    }

    const ambient = mode === "ambient";
    const colors = TONES[tone];
    const count = NODES.length;

    renderer.setClearAlpha(0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    host.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    // y is flipped so the layout's SVG-style downward y maps straight through.
    const camera = new THREE.OrthographicCamera(0, VIEW_W, 0, VIEW_H, -1000, 1000);
    // Left at the origin on purpose. The near plane is negative, so the whole
    // depth range is visible from here, and view-space z then equals world z,
    // which is what the vertex shader reads for its depth cue. Moving the camera
    // back would offset every mv.z by the same amount and peg that cue.
    camera.position.z = 0;

    const group = new THREE.Group();
    // Rotate about the middle of the viewBox so parallax does not translate the
    // cloud off centre.
    group.position.set(VIEW_W / 2, VIEW_H / 2, 0);
    scene.add(group);

    const positions = new Float32Array(count * 3);
    const colorAttr = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);

    const qualRgb = new THREE.Color(colors.qual);
    const quantRgb = new THREE.Color(colors.quant);
    const densityRgb = new THREE.Color(colors.density);
    const scratch = new THREE.Color();

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colorAttr, 3));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms: { uScale: { value: 1 } },
      transparent: true,
      depthWrite: false,
      // Normal alpha compositing, deliberately.
      //
      // Multiply would be the textbook choice for density on a light ground, but
      // this canvas is transparent, and multiply against an empty framebuffer is
      // `0 * src = 0`, so every point disappears. Making it work would mean
      // clearing the canvas to an opaque colour and hard-coding the section
      // background into the renderer. Additive is worse still here: on white it
      // saturates upward and the densest pools would read as the lightest.
      // Overlapping translucent marks accumulate alpha perfectly well, which is
      // what the flat renderer does too, so both paths agree.
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    group.add(points);

    const edgePositions = new Float32Array(EDGES.length * 6);
    const edgeGeometry = new THREE.BufferGeometry();
    edgeGeometry.setAttribute("position", new THREE.BufferAttribute(edgePositions, 3));
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(colors.edge),
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    group.add(lines);

    const positionAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
    const colorBuffer = geometry.getAttribute("aColor") as THREE.BufferAttribute;
    const sizeBuffer = geometry.getAttribute("aSize") as THREE.BufferAttribute;
    const alphaBuffer = geometry.getAttribute("aAlpha") as THREE.BufferAttribute;
    const edgeAttr = edgeGeometry.getAttribute("position") as THREE.BufferAttribute;

    // Colours only change with `heat`, so they are only rewritten when it moves.
    let lastHeat = -1;

    const writeColors = (heat: number) => {
      for (let i = 0; i < count; i++) {
        scratch.copy(NODES[i].qual ? qualRgb : quantRgb).lerp(densityRgb, heat);
        colorAttr[i * 3] = scratch.r;
        colorAttr[i * 3 + 1] = scratch.g;
        colorAttr[i * 3 + 2] = scratch.b;
      }
      colorBuffer.needsUpdate = true;
    };

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      width = rect.width;
      height = rect.height;
      renderer.setSize(width, height, false);
      // Point sizes are authored in viewBox units, so they track the canvas.
      material.uniforms.uScale.value = (width / VIEW_W) * renderer.getPixelRatio();
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);

    const onPointer = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      pointerRef.current = clamp01((event.clientX - rect.left) / rect.width) * 2 - 1;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let visible = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "120px" }
    );
    intersectionObserver.observe(host);

    let frame = 0;
    let announced = false;
    const start = performance.now();

    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!visible || width === 0) return;

      const elapsed = (performance.now() - start) / 1000;
      const p = ambient ? 1 / 3 : clamp01(progressRef.current);

      const s = p * 3;
      const index = Math.min(2, Math.floor(s));
      const t = easeInOut(clamp01(s - index));
      const heat = ambient ? 0 : band(p, 0.7, 1);
      const depth = ambient ? 1 : depthAmount(p);

      for (let i = 0; i < count; i++) {
        const node = NODES[i];
        const a = node.layouts[index];
        const b = node.layouts[index + 1];

        let x = a.x + (b.x - a.x) * t;
        let y = a.y + (b.y - a.y) * t;
        const z = (a.z + (b.z - a.z) * t) * depth;

        if (ambient) {
          // Slow, per-node breathing so the hero graph is never quite still.
          const phase = elapsed / node.drift.dur + node.drift.delay;
          x += Math.sin(phase * Math.PI) * node.drift.dx * 0.5;
          y += Math.cos(phase * Math.PI) * node.drift.dy * 0.5;
        }

        // Positions are relative to the group, which sits at the viewBox centre.
        positions[i * 3] = x - VIEW_W / 2;
        positions[i * 3 + 1] = y - VIEW_H / 2;
        positions[i * 3 + 2] = z;

        // gl_PointSize is a diameter in device pixels, while node.size is
        // authored as an SVG radius, so it needs doubling plus the 1.4 the flat
        // renderer already applies for the two to match. The heat multiplier is
        // tuned to the journey panels, which are phone-narrow: any larger and a
        // pool covers the button it is pointing at and spills past the device edge.
        sizes[i] = node.size * 2.8 * (1 + heat * 1.6);
        // There are far more points here than the flat renderer draws, so each
        // one carries less alpha or the pools would saturate to flat blocks.
        alphas[i] = 0.85 - heat * 0.68;
      }

      positionAttr.needsUpdate = true;
      sizeBuffer.needsUpdate = true;
      alphaBuffer.needsUpdate = true;

      if (Math.abs(heat - lastHeat) > 0.004) {
        writeColors(heat);
        lastHeat = heat;
      }

      // Edges belong to the model itself: they draw in as the dots converge and
      // are gone before the synthetic users split off.
      const edgeOpacity = ambient
        ? 0.26
        : Math.min(band(p, 0.14, 0.34), 1 - band(p, 0.42, 0.56)) * 0.34;
      edgeMaterial.opacity = edgeOpacity;
      lines.visible = edgeOpacity > 0.002;

      if (lines.visible) {
        for (let e = 0; e < EDGES.length; e++) {
          const [from, to] = EDGES[e];
          for (let end = 0; end < 2; end++) {
            const n = end === 0 ? from : to;
            edgePositions[e * 6 + end * 3] = positions[n * 3];
            edgePositions[e * 6 + end * 3 + 1] = positions[n * 3 + 1];
            edgePositions[e * 6 + end * 3 + 2] = positions[n * 3 + 2];
          }
        }
        edgeAttr.needsUpdate = true;
      }

      // Parallax. Fades to square before the anchored DOM overlays appear.
      const drift = ambient ? Math.sin(elapsed * 0.16) * 0.5 : (p - 0.25) * 1.5;
      group.rotation.y = (drift + pointerRef.current * 0.32) * depth * 0.44;
      group.rotation.x = Math.sin(elapsed * 0.11) * 0.06 * depth;

      renderer.render(scene, camera);

      if (!announced) {
        announced = true;
        readyRef.current?.();
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", onPointer);
      geometry.dispose();
      edgeGeometry.dispose();
      material.dispose();
      edgeMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [mode, tone]);

  return <div ref={hostRef} className={cn("h-full w-full", className)} aria-hidden="true" />;
}
