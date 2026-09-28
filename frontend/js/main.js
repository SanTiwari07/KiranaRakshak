/* =====================================================================
   Kounter · scroll story
   Every phone pose is a scrubbed tween tied to scroll position.
   ===================================================================== */
(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = () => window.innerWidth <= 900;

  const Phone = window.Phone;
  const pose = $('#pose');
  const tilt = $('#tilt');
  const body = document.body;
  body.classList.add('loading');

  /* ---------------- loader ---------------- */
  const bar = $('.loader-bar i');
  let loadSteps = 0;
  const step = () => { loadSteps++; bar.style.width = Math.min(100, loadSteps * 34) + '%'; };
  const pageLoaded = new Promise(r => window.addEventListener('load', () => { step(); r(); }, { once: true }));
  const phoneReady = new Promise(r => {
    document.addEventListener('phone:ready', () => { step(); r(); }, { once: true });
    setTimeout(r, 4500); // file:// or slow CDN: don't hold the page hostage
  });
  (document.fonts ? document.fonts.ready : Promise.resolve()).then(step);
  Promise.all([pageLoaded, phoneReady]).then(() => {
    bar.style.width = '100%';
    setTimeout(() => {
      $('#loader').classList.add('done');
      body.classList.remove('loading');
      intro();
      buildPoseTimeline();
      ScrollTrigger.refresh();
    }, 250);
  });

  /* ---------------- smooth scroll ---------------- */
  let lenis = null;
  if (!reduced && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const target = $(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: 0 });
    }));
  }

  /* ---------------- phone fit to viewport ---------------- */
  function fit() {
    const h = window.innerHeight, H = Phone.size.H;
    const f = isMobile() ? Math.min(.62, (h * .5) / H) : Math.min(1.35, (h * .74) / H);
    document.documentElement.style.setProperty('--fit', f.toFixed(3));
  }
  fit();
  window.addEventListener('resize', fit);

  /* ---------------- poses ----------------
     x / y in viewport %, rotations in degrees.  m = mobile override.  */
  const POSES = {
    hero:    { x: 22,  y: 2,  rx: 6,   ry: -24, rz: 4,  s: 1,    m: { x: 26, y: -10, ry: -28, rz: 6, s: .9, o: .28 } },
    leaks:   { x: 25,  y: 0,  rx: 10,  ry: -58, rz: -2, s: .86,  m: { x: 0, y: -16, ry: -40, s: .8 } },
    back:    { x: -22, y: 0,  rx: -4,  ry: 196, rz: -6, s: 1.08, m: { x: 0, y: -15, ry: 185, s: 1 } },
    nfc:     { x: 22,  y: 0,  rx: 4,   ry: -16, rz: -3, s: 1,    m: { x: 0, y: -16, ry: -10 } },
    bill:    { x: -22, y: 0,  rx: 4,   ry: 18,  rz: 3,  s: 1,    m: { x: 0, y: -16, ry: 10 } },
    ir:      { x: 22,  y: 10, rx: -38, ry: -14, rz: 4,  s: .9,   m: { x: 0, y: -11, rx: -30, s: .85 } },
    expired: { x: -21, y: 0,  rx: 0,   ry: 12,  rz: -2, s: 1.04, m: { x: 0, y: -16, ry: 6 } },
    voice:   { x: 22,  y: -6, rx: 30,  ry: -14, rz: -3, s: .92,  m: { x: 0, y: -18, rx: 24, s: .85 } },
    vault:   { x: -22, y: 0,  rx: 3,   ry: 20,  rz: 2,  s: 1,    m: { x: 0, y: -16, ry: 10 } },
    office:  { x: -30, y: 4,  rx: 8,   ry: 30,  rz: 0,  s: .7,   m: { x: 0, y: -17, ry: 20, s: .7 } },
    hidden:  { x: -30, y: -30, rx: 20, ry: 70,  rz: -10, s: .5, o: 0, m: { x: 0, y: -60, s: .4, o: 0 } },
    live:    { x: 20,  y: 0,  rx: 0,   ry: -8,  rz: 0,  s: 1,    m: { x: 0, y: -15, ry: 0, s: 1 } }
  };
  const pick = (name) => {
    const p = POSES[name] || POSES.hero;
    return isMobile() && p.m ? Object.assign({}, p, p.m) : p;
  };
  const vars = (name) => ({
    x: () => pick(name).x * window.innerWidth / 100,
    y: () => pick(name).y * window.innerHeight / 100,
    rotationX: () => pick(name).rx,
    rotationY: () => pick(name).ry,
    rotationZ: () => pick(name).rz,
    scale: () => pick(name).s,
    opacity: () => (pick(name).o ?? 1)
  });

  // One master timeline whose time unit is scroll pixels: each pose change
  // runs while its section travels from the bottom of the viewport to 15% from the top.
  const sections = $$('[data-pose]');
  let poseTl = null;
  function buildPoseTimeline() {
    const progress = poseTl ? poseTl.scrollTrigger.progress : 0;
    if (poseTl) { poseTl.scrollTrigger.kill(); poseTl.kill(); }
    const vh = window.innerHeight;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - vh);
    poseTl = gsap.timeline({
      defaults: { ease: 'power1.inOut', immediateRender: false },
      scrollTrigger: { start: 0, end: maxScroll, scrub: reduced ? true : 1.1 }
    });
    gsap.set(pose, vars(sections[0].dataset.pose));
    sections.forEach((sec, i) => {
      if (i === 0) return;
      const top = sec.getBoundingClientRect().top + window.scrollY;
      const start = Math.max(0, top - vh), end = Math.min(maxScroll, top - vh * .15);
      poseTl.fromTo(pose, vars(sections[i - 1].dataset.pose),
        Object.assign(vars(sec.dataset.pose), { duration: Math.max(1, end - start) }), start);
    });
    poseTl.set({}, {}, maxScroll); // pad timeline so time == scroll px
    poseTl.progress(progress);
  }
  buildPoseTimeline();
  let rebuildT;
  window.addEventListener('resize', () => { clearTimeout(rebuildT); rebuildT = setTimeout(() => { buildPoseTimeline(); ScrollTrigger.refresh(); }, 200); });

  /* ---------------- chapter activation (screens + fx) ---------------- */
  const railLabel = $('#rail-label');
  const freezer = $('#freezer');
  let current = null, fxTimers = [];
  const later = (fn, ms) => fxTimers.push(setTimeout(fn, ms));

  function setShape(n) {
    window.__particleShape = n;
    if (window.Particles) window.Particles.shape(n);
  }

  function activate(sec) {
    if (current === sec) return;
    current = sec;
    fxTimers.forEach(clearTimeout); fxTimers = [];
    ['ir', 'sound', 'fp', 'alarm'].forEach(f => Phone.fx(f, false));
    Phone.el.classList.remove('show-hs');
    body.classList.remove('alarm');
    freezer && freezer.classList.remove('on');
    const wasLive = body.classList.contains('live-mode');
    body.classList.toggle('live-mode', sec.id === 'live');
    if (wasLive && sec.id !== 'live') gsap.to(tilt, { rotationY: 0, duration: .8, ease: 'power3.out' });

    if (railLabel) railLabel.textContent = sec.dataset.label || '';
    if (sec.dataset.shape) setShape(+sec.dataset.shape);

    // drive the real prototype
    const b = Phone.bridge, action = sec.dataset.action, screen = sec.dataset.screen;
    if (action && action !== 'ir') b.action(action);
    else if (screen) { b.screen(screen); if (action === 'ir') b.action('ir'); }

    switch (sec.id) {
      case 'hardware':
        Phone.el.classList.add('show-hs');
        break;
      case 'ch-ir':
        later(() => Phone.fx('ir', true), 350);
        later(() => {
          freezer.classList.add('on');
          $('#freezer-state').textContent = 'IR received · Super-freeze locked';
          const t = { v: -12 };
          gsap.to(t, { v: -18, duration: 1.6, ease: 'power2.out', onUpdate: () => { $('#freezer-temp').textContent = Math.round(t.v) + '°C'; } });
        }, 1100);
        break;
      case 'ch-expired':
        later(() => { Phone.rumble(); Phone.fx('alarm', true); body.classList.add('alarm'); }, 700);
        later(() => body.classList.remove('alarm'), 3200);
        break;
      case 'ch-voice':
        later(() => Phone.fx('sound', true), 600);
        break;
      case 'ch-vault':
        later(() => Phone.fx('fp', true), 500);
        break;
    }
  }

  sections.forEach(sec => {
    ScrollTrigger.create({
      trigger: sec,
      start: 'top 55%',
      end: 'bottom 55%',
      onToggle: self => { if (self.isActive) activate(sec); }
    });
  });
  document.addEventListener('phone:ready', () => {
    const sec = current; current = null;
    activate(sec || sections[0]);
  });

  /* hardware hotspots follow scroll inside the chapter, and hover */
  const hsItems = $$('#hardware [data-hs]');
  const setHs = (id) => {
    Phone.hotspot(id);
    hsItems.forEach(li => li.classList.toggle('on', li.dataset.hs === id));
  };
  ScrollTrigger.create({
    trigger: '#hardware', start: 'top 45%', end: 'bottom 55%',
    onUpdate: self => {
      const i = Math.min(hsItems.length - 1, Math.floor(self.progress * hsItems.length));
      setHs(hsItems[i].dataset.hs);
    },
    onLeave: () => setHs(null), onLeaveBack: () => setHs(null)
  });
  hsItems.forEach(li => li.addEventListener('mouseenter', () => setHs(li.dataset.hs)));

  /* ---------------- counters ---------------- */
  const inr = n => '₹' + Math.round(n).toLocaleString('en-IN');
  function scrubCounter(el, to, trigger) {
    const o = { v: 0 };
    gsap.to(o, {
      v: to, ease: 'none',
      scrollTrigger: { trigger, start: 'top 75%', end: 'top 25%', scrub: true },
      onUpdate: () => { el.textContent = inr(o.v); }
    });
  }
  scrubCounter($('#leak-ticker'), 31000, '#leaks');
  scrubCounter($('#deduct-ticker'), 56, '#ch-bill');

  /* ---------------- reveals ---------------- */
  $$('.chapter:not(.hero) .copy, .block-head, .bento, .flow, .zoo, .pillars, .demo-strip').forEach(el => {
    const kids = el.classList.contains('copy') || el.classList.contains('block-head') ? el.children : [el];
    gsap.from(kids, {
      y: 46, opacity: 0, duration: .9, ease: 'power3.out', stagger: .07,
      scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none reverse' }
    });
  });
  $$('.pillar').forEach(p => ScrollTrigger.create({
    trigger: p, start: 'top 85%', onEnter: () => p.style.setProperty('--grow', 1)
  }));

  /* ---------------- hero intro ---------------- */
  function intro() {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from('.display .line > span', { yPercent: 110, duration: 1.1, stagger: .12 })
      .from('.hero .eyebrow, .hindi, .lede, .cta-row, .hero-stats, .scroll-hint', { y: 30, opacity: 0, duration: .9, stagger: .08 }, '-=.7')
      .from(tilt, { rotationY: -140, y: 260, duration: 1.8, ease: 'expo.out', clearProps: 'y' }, 0.1);
    $$('.hero-stats b[data-count]').forEach(b => {
      const end = +b.dataset.count, o = { v: 0 };
      const pre = b.dataset.prefix ? '<' : '', suf = b.dataset.suffix || '';
      if (end === 0) return;
      tl.to(o, { v: end, duration: 1.4, ease: 'power2.out', onUpdate: () => { b.textContent = pre + Math.round(o.v) + suf; } }, .6);
    });
    tl.add(enablePointerTilt);
  }

  /* ---------------- pointer parallax + live drag ---------------- */
  let dragRY = 0;
  function enablePointerTilt() {
    if (reduced || matchMedia('(hover: none)').matches) return;
    const rx = gsap.quickTo(tilt, 'rotationX', { duration: .8, ease: 'power3.out' });
    const ry = gsap.quickTo(tilt, 'rotationY', { duration: .8, ease: 'power3.out' });
    window.addEventListener('pointermove', e => {
      if (dragging) return;
      const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
      rx(-ny * 8);
      ry(dragRY + nx * 10);
    });
  }
  let dragging = false, lastX = 0;
  const stage = $('#stage');
  stage.addEventListener('pointerdown', e => {
    if (!body.classList.contains('live-mode')) return;
    dragging = true; lastX = e.clientX; stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove', e => {
    if (!dragging) return;
    dragRY += (e.clientX - lastX) * .5; lastX = e.clientX;
    gsap.to(tilt, { rotationY: dragRY, duration: .3, ease: 'power2.out' });
  });
  const endDrag = () => { dragging = false; };
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);
  $('#phone-caption').textContent = 'Drag around the phone to rotate · tap the screen to use the app';
  const style = document.createElement('style');
  style.textContent = 'body.live-mode #stage{pointer-events:auto;cursor:grab} body.live-mode #stage:active{cursor:grabbing}';
  document.head.appendChild(style);

  /* glare follows rotation; iframe layers ignore backface-visibility,
     so we hide whichever face points away from the camera ourselves */
  let facingBack = false;
  gsap.ticker.add(() => {
    const ry = (gsap.getProperty(pose, 'rotationY') || 0) + (gsap.getProperty(tilt, 'rotationY') || 0);
    const rx = (gsap.getProperty(pose, 'rotationX') || 0) + (gsap.getProperty(tilt, 'rotationX') || 0);
    Phone.el.style.setProperty('--glare', (50 + ((ry % 360) * .9)).toFixed(1) + '%');
    const r = (a) => a * Math.PI / 180;
    const back = Math.cos(r(ry)) * Math.cos(r(rx)) < 0;
    if (back !== facingBack) { facingBack = back; Phone.el.classList.toggle('facing-back', back); }
  });

  /* ---------------- live jump buttons ---------------- */
  $$('[data-jump]').forEach(btn => btn.addEventListener('click', () => {
    const j = btn.dataset.jump, b = Phone.bridge;
    if (j === 'legend' || j === 'alpha') {
      Phone.edition(j);
      dragRY = Math.round(dragRY / 360) * 360 + 180;
      gsap.to(tilt, { rotationY: dragRY, duration: 1.2, ease: 'power3.inOut' });
      return;
    }
    if (j === 'flip') {
      dragRY += 180;
      gsap.to(tilt, { rotationY: dragRY, duration: 1.2, ease: 'power3.inOut' });
      return;
    }
    if (Math.abs(dragRY % 360) > 90) { dragRY = Math.round(dragRY / 360) * 360; gsap.to(tilt, { rotationY: dragRY, duration: .8 }); }
    ['ir', 'sound', 'alarm', 'fp'].forEach(f => Phone.fx(f, false));
    switch (j) {
      case 'nfc': b.action('nfc'); break;
      case 'expired':
        b.action('expired');
        setTimeout(() => { Phone.rumble(); Phone.fx('alarm', true); }, 700);
        setTimeout(() => Phone.fx('alarm', false), 3000);
        break;
      case 'ir':
        b.action('ir'); Phone.fx('ir', true);
        setTimeout(() => Phone.fx('ir', false), 2600);
        break;
      case 'assistant':
        b.action('voice'); Phone.fx('sound', true);
        setTimeout(() => Phone.fx('sound', false), 3500);
        break;
      default: b.screen(j);
    }
  }));

  /* ---------------- sound toggle ---------------- */
  const sound = $('#sound-toggle');
  sound.addEventListener('click', () => {
    const on = sound.getAttribute('aria-pressed') !== 'true';
    sound.setAttribute('aria-pressed', on);
    Phone.bridge.setMuted(!on);
  });

  /* ---------------- rail progress ---------------- */
  const railFill = $('#rail-fill');
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: self => { railFill.style.height = (self.progress * 100).toFixed(1) + '%'; }
  });

  /* ---------------- hardware bento ---------------- */
  const ICONS = {
    chip: '<rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 9h6v6H9zM9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
    remote: '<rect x="7" y="2" width="10" height="20" rx="3"/><path d="M12 6v.01M10 10h4M10 14h4"/><path d="M4 4c-1 1-1 3 0 4M20 4c1 1 1 3 0 4"/>',
    sat: '<path d="M13 7 9 3 5 7l4 4M17 11l4 4-4 4-4-4M8 12l4 4M16 8l-4 4"/><path d="M19 21a2 2 0 0 0-2-2M22 21a5 5 0 0 0-5-5"/>',
    cam: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    gauge: '<path d="m12 14 4-4"/><path d="M3.3 19a10 10 0 1 1 17.4 0"/>',
    vib: '<rect x="7" y="4" width="10" height="16" rx="2"/><path d="M3 8v8M21 8v8"/>',
    bat: '<rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2M6 11h6"/>',
    spk: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
    fp: '<path d="M12 10a2 2 0 0 0-2 2c0 1 0 3-1 5M14 13c0 2.5-.5 4.5-1 6M17 11c0 3-.5 6-1.5 8M7 11a5 5 0 0 1 10 0M4 13c0-5 3.5-9 8-9s8 4 8 9"/>',
    laptop: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20"/>',
    nfc: '<path d="M6 8.3a6 6 0 0 1 0 7.4M9.5 5.5a10 10 0 0 1 0 13M13 3a14 14 0 0 1 0 18M17 1a18 18 0 0 1 0 22"/>'
  };
  const HW = [
    { t: 1, i: 'chip', n: 'Snapdragon 8 Elite Gen 5 · Hexagon NPU', r: 'Runs YOLO11n, PaddleOCR, Whisper and Laya side by side in INT8.', w: 'Sub-300 ms end-to-end audit with the radios off.', f: 'Features 1 · 2 · 12', wide: true },
    { t: 1, i: 'remote', n: 'IR blaster', r: 'Sends NEC 38 kHz commands to the shop freezer and AC.', w: 'The phone becomes an IoT bridge with no smart plug.', f: 'Feature 7' },
    { t: 1, i: 'sat', n: 'NavIC', r: 'Geo-stamps every delivery with a hashed proof.', w: "India's own constellation, tuned for Indian streets.", f: 'Feature 8' },
    { t: 2, i: 'cam', n: '50MP UW + 3× periscope', r: 'Ultra-wide counts the whole counter; telemacro reads dot-matrix dates.', w: 'Two lenses, two jobs, one Camera2 session.', f: 'Features 1 · 4', wide: true },
    { t: 2, i: 'sun', n: 'Color Spectrum sensor', r: 'Measures 50 Hz flicker and colour temperature before each shot.', w: 'No banding or glare on shiny Maggi and Kurkure foil.', f: 'Feature 6' },
    { t: 2, i: 'gauge', n: 'Supercomputing Chip Q3', r: 'Keeps the 144 Hz live counting overlay smooth.', w: 'Display work stays off the NPU while it infers.', f: 'Feature 10' },
    { t: 3, i: 'vib', n: 'Dual-axis X+Z motor', r: 'Double-knock for shortage, 500 ms rumble for expired, X and Z axes in one motor.', w: 'Felt in the hand in an 80 dB bazaar.', f: 'Features 3 · 5' },
    { t: 3, i: 'bat', n: '7000 mAh + vapour chamber', r: 'A full trading day on the counter stand.', w: 'Keeps working through power cuts without throttling.', f: 'All features' },
    { t: 3, i: 'spk', n: 'Stereo speakers', r: 'Reads Hindi answers and delivery results out loud.', w: 'A built-in shop soundbox, no rental device.', f: 'Feature 13' },
    { t: 3, i: 'fp', n: '3D ultrasonic fingerprint', r: 'Locks purchase rates and supplier dues.', w: 'Reads through flour, oil and water on fingers.', f: 'Feature 11' },
    { t: 4, i: 'laptop', n: 'iQOO Office Kit', r: 'Customer bill on a second screen, Excel at closing.', w: 'The Green Light cross-device requirement, covered.', f: 'Feature 14', wide: true },
    { t: 4, i: 'nfc', n: 'NFC', r: 'Vendor badge tap opens the right ledger.', w: 'Zero typing during the morning rush.', f: 'Feature 9', wide: true }
  ];
  const TIER = { 1: 'Tier 1 · Exclusive', 2: 'Tier 2 · Optics & sensing', 3: 'Tier 3 · Touch, sound, stamina', 4: 'Tier 4 · Ecosystem' };
  const bento = $('#bento');
  bento.innerHTML = HW.map(h => `
    <article class="card t${h.t}${h.wide ? ' wide' : ''}" data-tier="${h.t}">
      <div class="icon"><svg viewBox="0 0 24 24">${ICONS[h.i]}</svg></div>
      <span class="tier">${TIER[h.t]}</span>
      <h3 class="hw-name">${h.n}</h3>
      <p class="role">${h.r}</p>
      <span class="feat">${h.f}</span>
      <p class="why">${h.w}</p>
    </article>`).join('');
  $$('.filter').forEach(f => f.addEventListener('click', () => {
    $$('.filter').forEach(x => x.classList.toggle('active', x === f));
    const t = f.dataset.tier;
    $$('.card', bento).forEach(c => c.classList.toggle('dim', t !== 'all' && c.dataset.tier !== t));
  }));

  /* ---------------- airplane toggle ---------------- */
  const ap = $('#airplane'), flow = $('.flow'), cloud = $('#cloud-node');
  ap.addEventListener('click', () => {
    const on = !ap.classList.contains('on');
    ap.classList.toggle('on', on);
    ap.setAttribute('aria-pressed', on);
    flow.classList.toggle('net', !on);
    $('.ap-label b', ap).textContent = on ? 'ON' : 'OFF';
    cloud.innerHTML = on ? '<s>Cloud API</s> · 0 bytes sent' : 'Network available · still 0 bytes sent';
  });

  window.addEventListener('resize', () => ScrollTrigger.refresh());
})();
