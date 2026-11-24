'use client';

import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface RibbonPose {
  // Lower / Inner 3D Rolled Edge Bot(u) (v = 0)
  Bot0: Point;
  Bot1: Point;
  Bot2: Point;
  Bot3: Point;
  // Upper / Outer 3D Rolled Edge Top(u) (v = 1)
  Top0: Point;
  Top1: Point;
  Top2: Point;
  Top3: Point;
  // Center u-coordinate of the 2D multi-dimensional prismatic light wave along the 3D tube
  colorCenterU: number;
  // How strongly the upper edge (v=1) acts as a crisp 3D rolled tube edge vs soft outer halo
  topEdgeCrispness: number;
}

declare global {
  interface Window {
    __setHeroRibbonTime?: (seconds: number | null) => void;
  }
}

const MESH_SEGMENTS = 260;

/**
 * 5 Sculpted 3D Keyframe Poses matching the reference video and image_324f5e49.png:
 * - Pose 0 (image_324f5e49.png / 00:54 / 01:23): Sculpted 3D Pearl-to-Prismatic Flared Wave
 *   Sleek 3D translucent pearl-glass tube on the left sweeping up and flaring into a wide,
 *   voluptuous 3D bell on the right with a curved bottom 3D fold + white inner specular channel
 *   and 2D multi-dimensional Violet / Hot-Pink / Coral-Terracotta / Emerald-Mint color lobes.
 * - Pose 1 (00:00 / 00:28 / 01:00): Grand 3D Volumetric Arch flowing behind the top header
 * - Pose 2 (00:06 / 00:36): Upper-Right 3D Fold & Left Pearl-Glass Sweep
 * - Pose 3 (00:13 / 00:42 / 01:42): Full 3D Twisted S-Wave (3D crossover twist in the center)
 * - Pose 4 (00:18 / 00:48 / 01:48): Electric Cobalt-Violet 3D Horn transitioning back to Pose 0
 */
const KEYFRAME_POSES: RibbonPose[] = [
  // Pose 0: Exact 3D Sculpted Flared Wave from image_324f5e49.png (00:54 / 01:23 / 01:52)
  {
    Bot0: { x: -0.02, y: 0.87 },
    Bot1: { x: 0.30, y: 0.43 },
    Bot2: { x: 0.66, y: 0.31 },
    Bot3: { x: 1.02, y: 0.44 },
    Top0: { x: -0.02, y: 0.65 },
    Top1: { x: 0.28, y: 0.25 },
    Top2: { x: 0.64, y: 0.06 },
    Top3: { x: 1.02, y: 0.075 },
    colorCenterU: 0.78,
    topEdgeCrispness: 0.82,
  },
  // Pose 1: Grand 3D Volumetric Arch (00:00 / 00:28 / 01:00 — flows right behind the transparent top header)
  {
    Bot0: { x: -0.015, y: 0.99 },
    Bot1: { x: 0.08, y: -0.15 },
    Bot2: { x: 0.92, y: -0.15 },
    Bot3: { x: 1.015, y: 0.99 },
    Top0: { x: -0.19, y: 1.03 },
    Top1: { x: -0.04, y: -0.44 },
    Top2: { x: 1.04, y: -0.44 },
    Top3: { x: 1.19, y: 1.03 },
    colorCenterU: 0.52,
    topEdgeCrispness: 0.35,
  },
  // Pose 2: Upper-Right 3D Fold & Left Pearl Sweep (00:05 - 00:08 / 00:35 - 00:38)
  {
    Bot0: { x: -0.02, y: 0.78 },
    Bot1: { x: 0.26, y: 0.22 },
    Bot2: { x: 0.68, y: 0.20 },
    Bot3: { x: 1.03, y: 0.36 },
    Top0: { x: -0.04, y: 0.56 },
    Top1: { x: 0.22, y: 0.02 },
    Top2: { x: 0.72, y: -0.18 },
    Top3: { x: 1.06, y: -0.04 },
    colorCenterU: 0.82,
    topEdgeCrispness: 0.65,
  },
  // Pose 3: Full 3D Twisted S-Wave (00:13 / 00:42 / 01:13 / 01:42 — 3D ribbon crossover twist at center)
  {
    Bot0: { x: -0.02, y: 0.92 },
    Bot1: { x: 0.26, y: 0.42 },
    Bot2: { x: 0.65, y: 0.52 },
    Bot3: { x: 1.03, y: 0.16 },
    Top0: { x: -0.06, y: 1.15 },
    Top1: { x: 0.38, y: 1.18 },
    Top2: { x: 0.73, y: -0.04 },
    Top3: { x: 1.06, y: -0.18 },
    colorCenterU: 0.48,
    topEdgeCrispness: 0.58,
  },
  // Pose 4: Sculpted 3D Diagonal Tube & Upper-Right Horn (00:18 / 00:48 / 01:48)
  {
    Bot0: { x: -0.02, y: 0.94 },
    Bot1: { x: 0.28, y: 0.52 },
    Bot2: { x: 0.67, y: 0.28 },
    Bot3: { x: 1.03, y: 0.22 },
    Top0: { x: -0.03, y: 0.78 },
    Top1: { x: 0.26, y: 0.36 },
    Top2: { x: 0.65, y: 0.05 },
    Top3: { x: 1.03, y: -0.05 },
    colorCenterU: 0.74,
    topEdgeCrispness: 0.85,
  },
];

function catmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number {
  const t2 = t * t;
  const t3 = t2 * t;
  return (
    0.5 *
    (2 * p1 +
      (-p0 + p2) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
      (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
  );
}

function catmullRomPoint(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
  return {
    x: catmullRom(p0.x, p1.x, p2.x, p3.x, t),
    y: catmullRom(p0.y, p1.y, p2.y, p3.y, t),
  };
}

function evalBezier(p0: Point, p1: Point, p2: Point, p3: Point, u: number): Point {
  const inv = 1 - u;
  const inv2 = inv * inv;
  const inv3 = inv2 * inv;
  const u2 = u * u;
  const u3 = u2 * u;
  return {
    x: inv3 * p0.x + 3 * inv2 * u * p1.x + 3 * inv * u2 * p2.x + u3 * p3.x,
    y: inv3 * p0.y + 3 * inv2 * u * p1.y + 3 * inv * u2 * p2.y + u3 * p3.y,
  };
}

export function computeControlPoints(elapsed: number) {
  const cyclePeriod = 28.0;
  const norm = (((elapsed / cyclePeriod) % 1) + 1) % 1;
  const n = KEYFRAME_POSES.length;
  const scaled = norm * n;
  const i1 = Math.floor(scaled) % n;
  const i0 = (i1 - 1 + n) % n;
  const i2 = (i1 + 1) % n;
  const i3 = (i1 + 2) % n;
  const localT = scaled - Math.floor(scaled);
  const s = localT * localT * (3 - 2 * localT);
  const t = 0.32 * localT + 0.68 * s;

  const P0 = KEYFRAME_POSES[i0];
  const P1 = KEYFRAME_POSES[i1];
  const P2 = KEYFRAME_POSES[i2];
  const P3 = KEYFRAME_POSES[i3];

  const breath1 = Math.sin(elapsed * 0.52) * 0.006;
  const breath2 = Math.cos(elapsed * 0.44) * 0.006;

  const Bot0 = catmullRomPoint(P0.Bot0, P1.Bot0, P2.Bot0, P3.Bot0, t);
  const Bot1 = catmullRomPoint(P0.Bot1, P1.Bot1, P2.Bot1, P3.Bot1, t);
  const Bot2 = catmullRomPoint(P0.Bot2, P1.Bot2, P2.Bot2, P3.Bot2, t);
  const Bot3 = catmullRomPoint(P0.Bot3, P1.Bot3, P2.Bot3, P3.Bot3, t);

  const Top0 = catmullRomPoint(P0.Top0, P1.Top0, P2.Top0, P3.Top0, t);
  const Top1 = catmullRomPoint(P0.Top1, P1.Top1, P2.Top1, P3.Top1, t);
  const Top2 = catmullRomPoint(P0.Top2, P1.Top2, P2.Top2, P3.Top2, t);
  const Top3 = catmullRomPoint(P0.Top3, P1.Top3, P2.Top3, P3.Top3, t);

  const colorCenterU = catmullRom(
    P0.colorCenterU,
    P1.colorCenterU,
    P2.colorCenterU,
    P3.colorCenterU,
    t
  );
  const topEdgeCrispness = catmullRom(
    P0.topEdgeCrispness,
    P1.topEdgeCrispness,
    P2.topEdgeCrispness,
    P3.topEdgeCrispness,
    t
  );

  return {
    Bot0,
    Bot1: { x: Bot1.x + breath1, y: Bot1.y + breath2 },
    Bot2: { x: Bot2.x - breath1, y: Bot2.y - breath2 },
    Bot3,
    Top0,
    Top1: { x: Top1.x + breath2, y: Top1.y - breath1 },
    Top2: { x: Top2.x - breath2, y: Top2.y + breath1 },
    Top3,
    colorCenterU,
    topEdgeCrispness: Math.max(0.2, Math.min(1.0, topEdgeCrispness)),
  };
}

const VERTEX_SHADER_SRC = `
attribute vec2 a_pos;
attribute vec2 a_uv;
varying vec2 v_uv;

void main() {
  v_uv = a_uv;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

/**
 * True 3D Tubular / Folded Silk-Glass Surface Fragment Shader (Zero SVG Borders).
 * - Models a 3D curved ribbon surface across v in [0..1] with authentic 3D cylindrical
 *   Fresnel rolled lips at the boundaries and creamy white 3D specular highlight channels
 *   immediately inside the rolled lips (matching image_324f5e49.png).
 * - Combines a translucent frosted pearl-silver 3D glass body with a 2D multi-dimensional
 *   volumetric color field (Electric Violet, Hot Silk Magenta, Burnt Coral-Terracotta Orange,
 *   Warm Sunset Amber, Luminous Emerald Mint, and Cobalt Azure) positioned at distinct (u, v)
 *   coordinates so colors vary richly across BOTH height (v) and length (u).
 * - Adds the subtle optical micro-dot matrix shimmer inside the high-chroma wave zones.
 */
const FRAGMENT_SHADER_SRC = `
precision highp float;
varying vec2 v_uv;
uniform float u_time;
uniform float u_colorCenter;
uniform float u_topCrisp;
uniform vec2 u_res;

float gauss2D(vec2 p, vec2 center, vec2 radii, float angle) {
  vec2 d = p - center;
  float c = cos(angle);
  float s = sin(angle);
  vec2 r = vec2(d.x * c - d.y * s, d.x * s + d.y * c) / radii;
  return exp(-dot(r, r));
}

void main() {
  float u = clamp(v_uv.x, 0.0, 1.0);
  float v = clamp(v_uv.y, 0.0, 1.0);

  // --- 1. 2D MULTI-DIMENSIONAL VOLUMETRIC COLOR FIELD IN (u, v) SPACE ---
  // Notice how each color lobe occupies a distinct 2D (u, v) position & tilt angle:
  // - Violet sits along the upper-leading ridge (v ~ 0.74)
  // - Hot Magenta-Pink sits along the lower folded belly (v ~ 0.20)
  // - Coral-Terracotta Orange fills the central-right heart (v ~ 0.48)
  // - Emerald Mint glows in the upper-right crest above the orange core (v ~ 0.80)
  // - Cobalt Azure sweeps through the trailing fold
  float uc = u_colorCenter + sin(u_time * 0.35) * 0.04;
  vec2 uv = vec2(u, v);

  float wViolet = gauss2D(uv, vec2(uc - 0.13, 0.72), vec2(0.18, 0.32), -0.35);
  float wMagenta = gauss2D(uv, vec2(uc - 0.01, 0.22), vec2(0.22, 0.34), 0.25);
  float wTerracotta = gauss2D(uv, vec2(uc + 0.14, 0.46), vec2(0.18, 0.38), -0.20);
  float wAmber = gauss2D(uv, vec2(uc + 0.19, 0.26), vec2(0.15, 0.28), 0.30);
  float wEmerald = gauss2D(uv, vec2(uc + 0.23, 0.82), vec2(0.15, 0.30), -0.40);
  float wAzure = gauss2D(uv, vec2(uc - 0.25, 0.42), vec2(0.17, 0.34), 0.35);

  // Secondary harmonic wave so the opposite end of the arch also shimmers when in full-arch mode
  float uc2 = fract(uc + 0.52);
  float secondWaveMask = 1.0 - u_topCrisp; // Stronger during Grand Arch, subtle during image_324f5e49 pose
  wAzure += secondWaveMask * 0.65 * gauss2D(uv, vec2(uc2 - 0.08, 0.45), vec2(0.20, 0.42), 0.20);
  wEmerald += secondWaveMask * 0.55 * gauss2D(uv, vec2(uc2 + 0.06, 0.55), vec2(0.18, 0.40), -0.25);
  wViolet += secondWaveMask * 0.60 * gauss2D(uv, vec2(uc2 - 0.20, 0.50), vec2(0.18, 0.40), 0.15);

  vec3 cViolet = vec3(0.56, 0.33, 0.98);     // Electric Amethyst Violet
  vec3 cMagenta = vec3(0.98, 0.24, 0.62);    // Hot Silk Magenta-Pink
  vec3 cTerracotta = vec3(0.94, 0.38, 0.16); // Luminous Coral-Terracotta Orange
  vec3 cAmber = vec3(0.99, 0.62, 0.14);      // Warm Sunset Amber
  vec3 cEmerald = vec3(0.10, 0.84, 0.58);    // Emerald Mint Green
  vec3 cAzure = vec3(0.22, 0.58, 1.00);      // Prismatic Cobalt Azure

  float totalChromaWeight = wViolet + wMagenta + wTerracotta + wAmber + wEmerald + wAzure + 0.0001;
  vec3 chromaCol = (
    cViolet * wViolet +
    cMagenta * wMagenta +
    cTerracotta * wTerracotta +
    cAmber * wAmber +
    cEmerald * wEmerald +
    cAzure * wAzure
  ) / totalChromaWeight;

  // Overall chromatic intensity at this (u, v) point (0 = frosted pearl-silver 3D glass, 1 = full prismatic glow)
  float chromaPresence = clamp(
    pow(max(max(wViolet, wMagenta), max(max(wTerracotta, wEmerald), max(wAmber, wAzure))), 0.72) * 1.22,
    0.0,
    1.0
  );

  // --- 2. FROSTED PEARL-SILVER 3D GLASS BASE MATERIAL (Left side of image_324f5e49.png) ---
  // Cool architectural silver-lavender pearl shade that contrasts delicately against #F8F6F1
  vec3 pearlShadow = vec3(0.76, 0.77, 0.82);
  vec3 pearlBody = vec3(0.88, 0.89, 0.92);
  vec3 pearlHighlight = vec3(1.00, 1.00, 1.00);
  vec3 glassCol = mix(pearlShadow, pearlBody, sin(v * 3.14159));

  // Blend frosted 3D pearl-glass with the 2D multi-dimensional prismatic color field
  vec3 surfaceCol = mix(glassCol, chromaCol, chromaPresence);

  // --- 3. TRUE 3D TUBULAR ROLLED EDGES & INNER WHITE SPECULAR CHANNELS (ZERO SVG BORDERS) ---
  // Distance from lower/inner folded edge (d0 = v) and upper/outer folded edge (d1 = 1.0 - v)
  float d0 = v;
  float d1 = 1.0 - v;

  // Soft anti-aliased outer boundaries of the 3D tube
  float aa0 = smoothstep(0.0, 0.016, d0);
  float aa1 = mix(smoothstep(0.0, 0.18, d1), smoothstep(0.0, 0.022, d1), u_topCrisp);

  // 3D Fresnel Rolled Lip (concentrated pigment density right where the 3D surface rolls away at v ~ 0.024 and v ~ 0.974)
  float rim0 = exp(-pow((d0 - 0.024) / 0.015, 2.0));
  float rim1 = exp(-pow((d1 - 0.026) / 0.018, 2.0)) * u_topCrisp;

  // 3D Cylindrical Inner Specular Highlight Ridge (creamy white light channel at d ~ 0.072 right inside the rolled lip!)
  float spec0 = exp(-pow((d0 - 0.074) / 0.030, 2.0));
  float spec1 = exp(-pow((d1 - 0.078) / 0.034, 2.0)) * u_topCrisp;

  // Deepen and enrich the color along the 3D rolled Fresnel lips
  vec3 rimTint0 = mix(vec3(0.68, 0.70, 0.76), chromaCol * 0.86, chromaPresence);
  vec3 rimTint1 = mix(vec3(0.70, 0.72, 0.78), chromaCol * 0.88, chromaPresence);
  surfaceCol = mix(surfaceCol, rimTint0, rim0 * 0.72);
  surfaceCol = mix(surfaceCol, rimTint1, rim1 * 0.65);

  // Add the creamy 3D white specular highlight channel inside the rolled edges
  float totalSpec = clamp(spec0 * 0.68 + spec1 * 0.54, 0.0, 0.88);
  surfaceCol = mix(surfaceCol, pearlHighlight, totalSpec);

  // --- 4. SUBTLE OPTICAL MICRO-DOT HALFTONE SHIMMER (Right side of image_324f5e49.png) ---
  vec2 pix = gl_FragCoord.xy;
  float dotGrid = 0.5 + 0.5 * (sin(pix.x * 1.45) * sin(pix.y * 1.45));
  float halftone = smoothstep(0.35, 0.85, dotGrid);
  // Subtle micro-dot texture visible in the warm/mint outer bell just like image_324f5e49.png
  float dotStrength = chromaPresence * smoothstep(0.25, 0.85, u) * 0.11;
  surfaceCol = mix(surfaceCol, vec3(1.0, 0.99, 0.97), halftone * dotStrength);

  // --- 5. VOLUMETRIC 3D OPACITY PROFILE ---
  // Rounded 3D tube belly + crisp Fresnel rolled lips + soft outer feather when in arch mode
  float bellyProfile = pow(sin(v * 3.14159), 0.55);
  float archFeather = pow(1.0 - v, 1.35);
  float crossAlpha = mix(archFeather, bellyProfile, 0.35 + 0.65 * u_topCrisp);

  // Base alpha: frosted glass is delicately translucent (~0.34), prismatic wave is lush & vibrant (~0.84)
  float baseDensity = mix(0.32, 0.84, chromaPresence);
  float rimDensity = rim0 * mix(0.36, 0.78, chromaPresence) + rim1 * mix(0.32, 0.64, chromaPresence);
  float specDensity = (spec0 + spec1) * 0.26;

  float rawAlpha = (crossAlpha * baseDensity + rimDensity + specDensity) * aa0 * aa1;

  // Soft taper only at extreme offscreen ends
  float endFade = smoothstep(0.0, 0.02, u) * smoothstep(1.0, 0.98, u);
  float alpha = clamp(rawAlpha * (0.92 + 0.08 * endFade), 0.0, 0.94);

  // Premultiplied alpha output for 100% pure, luminous blending over #F8F6F1
  gl_FragColor = vec4(surfaceCol * alpha, alpha);
}
`;

export default function HeroGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const gl =
      (canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        premultipliedAlpha: true,
      }) as WebGLRenderingContext | null) || null;

    let program: WebGLProgram | null = null;
    let posBuffer: WebGLBuffer | null = null;
    let uvBuffer: WebGLBuffer | null = null;
    let posLoc = -1;
    let uvLoc = -1;
    let timeLoc: WebGLUniformLocation | null = null;
    let colorCenterLoc: WebGLUniformLocation | null = null;
    let topCrispLoc: WebGLUniformLocation | null = null;
    let resLoc: WebGLUniformLocation | null = null;

    const numVerts = (MESH_SEGMENTS + 1) * 2;
    const positions = new Float32Array(numVerts * 2);
    const uvs = new Float32Array(numVerts * 2);

    for (let i = 0; i <= MESH_SEGMENTS; i++) {
      const u = i / MESH_SEGMENTS;
      const idx = i * 4;
      uvs[idx] = u;
      uvs[idx + 1] = 0.0; // v = 0 (Lower / Inner 3D Rolled Edge Bot)
      uvs[idx + 2] = u;
      uvs[idx + 3] = 1.0; // v = 1 (Upper / Outer 3D Rolled Edge Top)
    }

    if (gl) {
      const compileShader = (type: number, src: string) => {
        const shader = gl.createShader(type);
        if (!shader) return null;
        gl.shaderSource(shader, src);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      };

      const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
      const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
      if (vs && fs) {
        const prog = gl.createProgram();
        if (prog) {
          gl.attachShader(prog, vs);
          gl.attachShader(prog, fs);
          gl.linkProgram(prog);
          if (gl.getProgramParameter(prog, gl.LINK_STATUS)) {
            program = prog;
            gl.useProgram(program);
            posLoc = gl.getAttribLocation(program, 'a_pos');
            uvLoc = gl.getAttribLocation(program, 'a_uv');
            timeLoc = gl.getUniformLocation(program, 'u_time');
            colorCenterLoc = gl.getUniformLocation(program, 'u_colorCenter');
            topCrispLoc = gl.getUniformLocation(program, 'u_topCrisp');
            resLoc = gl.getUniformLocation(program, 'u_res');

            posBuffer = gl.createBuffer();
            uvBuffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);
            gl.enableVertexAttribArray(uvLoc);
            gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
          }
        }
      }
    }

    const syncCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.max(640, Math.round((rect.width || 1440) * dpr));
      const targetH = Math.max(400, Math.round((rect.height || 900) * dpr));
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        if (gl) {
          gl.viewport(0, 0, targetW, targetH);
        }
      }
    };

    syncCanvasSize();
    window.addEventListener('resize', syncCanvasSize);

    let rafId = 0;
    let manualTimeSeconds: number | null = null;
    const startTime = performance.now();

    const drawFrameAt = (elapsed: number) => {
      syncCanvasSize();

      const pts = computeControlPoints(elapsed);

      if (gl && program && posBuffer) {
        for (let i = 0; i <= MESH_SEGMENTS; i++) {
          const u = i / MESH_SEGMENTS;
          const ptBot = evalBezier(pts.Bot0, pts.Bot1, pts.Bot2, pts.Bot3, u);
          const ptTop = evalBezier(pts.Top0, pts.Top1, pts.Top2, pts.Top3, u);

          const idx = i * 4;
          positions[idx] = ptBot.x * 2.0 - 1.0;
          positions[idx + 1] = 1.0 - ptBot.y * 2.0;
          positions[idx + 2] = ptTop.x * 2.0 - 1.0;
          positions[idx + 3] = 1.0 - ptTop.y * 2.0;
        }

        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.useProgram(program);
        if (timeLoc) gl.uniform1f(timeLoc, elapsed);
        if (colorCenterLoc) gl.uniform1f(colorCenterLoc, pts.colorCenterU);
        if (topCrispLoc) gl.uniform1f(topCrispLoc, pts.topEdgeCrispness);
        if (resLoc) gl.uniform2f(resLoc, canvas.width, canvas.height);

        gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
        gl.enableVertexAttribArray(uvLoc);
        gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
        gl.enableVertexAttribArray(posLoc);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, numVerts);
      }
    };

    const tick = (now: number) => {
      if (manualTimeSeconds !== null) {
        drawFrameAt(manualTimeSeconds);
        return;
      }
      const elapsed = prefersReducedMotion ? 0 : (now - startTime) * 0.001;
      drawFrameAt(elapsed);
      if (!prefersReducedMotion) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    window.__setHeroRibbonTime = (seconds: number | null) => {
      manualTimeSeconds = seconds;
      window.cancelAnimationFrame(rafId);
      if (seconds !== null) {
        drawFrameAt(seconds);
      } else {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    drawFrameAt(0);
    if (!prefersReducedMotion) {
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      delete window.__setHeroRibbonTime;
      window.removeEventListener('resize', syncCanvasSize);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      data-testid="hero-gradient-background"
      style={{ contain: 'strict' }}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/* Subtle Architectural Editorial Grid Backdrop (Matching image_324f5e49.png) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(18, 22, 31, 0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(18, 22, 31, 0.035) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* True 3D Tubular Silk-Glass WebGL Surface Shader Canvas (Zero SVG Border Lines) */}
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
      />

      {/* Soft Bottom Dissolve into #F8F6F1 so the ribbon never terminates with a hard horizontal cut */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#F8F6F1] via-[#F8F6F1]/75 to-transparent" />
    </div>
  );
}
