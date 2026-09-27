/* =====================================================================
   Background: 6k particles that morph between shapes per chapter.
   0 cloud · 1 NPU tile grid · 2 halo ring · 3 wide scatter (India-scale)
   ===================================================================== */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.getElementById('bg');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const COUNT = innerWidth < 900 ? 3200 : 6000;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
renderer.setSize(innerWidth, innerHeight, false);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 0, 14);

const rand = (a, b) => a + Math.random() * (b - a);

function makeShapes() {
  const cloud = new Float32Array(COUNT * 3);
  const grid = new Float32Array(COUNT * 3);
  const ring = new Float32Array(COUNT * 3);
  const wide = new Float32Array(COUNT * 3);
  const side = Math.ceil(Math.sqrt(COUNT));
  for (let i = 0; i < COUNT; i++) {
    const k = i * 3;
    // 0 · soft spherical cloud
    const u = Math.random(), v = Math.random();
    const th = u * Math.PI * 2, ph = Math.acos(2 * v - 1), r = 6 + Math.cbrt(Math.random()) * 7;
    cloud[k] = r * Math.sin(ph) * Math.cos(th);
    cloud[k + 1] = r * Math.sin(ph) * Math.sin(th) * .7;
    cloud[k + 2] = r * Math.cos(ph) - 4;
    // 1 · NPU micro-tile grid (tilted floor)
    const gx = (i % side) / side - .5, gz = Math.floor(i / side) / side - .5;
    const tile = (Math.floor((gx + .5) * 12) + Math.floor((gz + .5) * 12)) % 2;
    grid[k] = gx * 34;
    grid[k + 1] = -5.5 + tile * .25;
    grid[k + 2] = gz * 30 - 6;
    // 2 · halo ring (the camera island light)
    const a = Math.random() * Math.PI * 2, rr = 7.5 + (Math.random() - .5) * 1.4 * Math.random();
    ring[k] = Math.cos(a) * rr;
    ring[k + 1] = Math.sin(a) * rr;
    ring[k + 2] = rand(-1.2, 1.2) - 3;
    // 3 · wide flat scatter (12 million shops)
    wide[k] = rand(-22, 22);
    wide[k + 1] = rand(-11, 11);
    wide[k + 2] = rand(-14, -4);
  }
  return [cloud, grid, ring, wide];
}
const shapes = makeShapes();

const geo = new THREE.BufferGeometry();
const pos = new Float32Array(shapes[0]);
geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
const tone = new Float32Array(COUNT);
const seed = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) {
  const r = Math.random();
  tone[i] = r < .07 ? 2 : r < .45 ? 1 : 0;   // 2 orange (hardware), 1 lime (app), 0 white
  seed[i] = Math.random();
}
geo.setAttribute('tone', new THREE.BufferAttribute(tone, 1));
geo.setAttribute('seed', new THREE.BufferAttribute(seed, 1));

const mat = new THREE.ShaderMaterial({
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  uniforms: {
    uTime: { value: 0 },
    uPx: { value: renderer.getPixelRatio() },
    uWave: { value: 0 }
  },
  vertexShader: /* glsl */`
    attribute float tone;
    attribute float seed;
    uniform float uTime, uPx, uWave;
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
      vec3 p = position;
      p.y += sin(p.x * .35 + uTime * .8) * .35 * uWave;
      p += vec3(sin(uTime * .3 + seed * 30.0), cos(uTime * .25 + seed * 20.0), 0.0) * .12;
      vec4 mv = modelViewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = (1.4 + seed * 2.2) * uPx * (14.0 / -mv.z);
      vColor = tone > 1.5 ? vec3(1.0, .34, .13) : tone > .5 ? vec3(.83, .96, .22) : vec3(.9, .92, .88);
      vAlpha = (.25 + .55 * seed) * (.6 + .4 * sin(uTime * 1.5 + seed * 40.0));
    }`,
  fragmentShader: /* glsl */`
    varying vec3 vColor;
    varying float vAlpha;
    void main() {
      float d = length(gl_PointCoord - .5);
      if (d > .5) discard;
      gl_FragColor = vec4(vColor, vAlpha * smoothstep(.5, .0, d));
    }`
});
const points = new THREE.Points(geo, mat);
scene.add(points);

let target = 0, lastTarget = -1;
let mx = 0, my = 0;
addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });

addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight, false);
});

const clock = new THREE.Clock();
function frame() {
  const t = clock.getElapsedTime();
  mat.uniforms.uTime.value = t;
  mat.uniforms.uWave.value += ((target === 1 ? 1 : 0) - mat.uniforms.uWave.value) * .03;

  const dest = shapes[target];
  const ease = reduced ? 1 : .045;
  if (lastTarget !== target || !reduced) {
    for (let i = 0; i < pos.length; i++) pos[i] += (dest[i] - pos[i]) * ease;
    geo.attributes.position.needsUpdate = true;
    lastTarget = target;
  }
  const scrollY = window.scrollY / Math.max(1, document.body.scrollHeight - innerHeight);
  points.rotation.y = reduced ? 0 : t * .03 + mx * .25;
  points.rotation.x = my * .15;
  points.rotation.z = target === 2 ? t * .08 : 0;
  camera.position.y = -scrollY * 2;
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
frame();

window.Particles = { shape(n) { target = Math.max(0, Math.min(shapes.length - 1, n | 0)); } };
if (typeof window.__particleShape === 'number') window.Particles.shape(window.__particleShape);
