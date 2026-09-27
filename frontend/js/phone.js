/* =====================================================================
   Kirana Rakshak · 3D iQOO 15 (pure CSS 3D) + live prototype bridge
   The screen is the real app: ../prototype/kirana_rakshak_ui.html in an iframe.
   ===================================================================== */
(function () {
  'use strict';

  // Phone geometry in CSS px (iQOO 15: 6.85" 3168×1440 panel, 8.14 mm body)
  const W = 340, H = 718, R = 46, T = 30, SLICES = 14, BEZEL = 8;
  const APP_W = 375;                                  // virtual viewport the prototype is laid out in
  const SCALE = (W - 2 * BEZEL) / APP_W;
  const APP_H = Math.round((H - 2 * BEZEL) / SCALE);
  const APP_URL = '../prototype/kirana_rakshak_ui.html';

  const mount = document.getElementById('phone-mount');
  if (!mount) return;

  const root = document.documentElement.style;
  root.setProperty('--pw', W + 'px');
  root.setProperty('--ph', H + 'px');
  root.setProperty('--pr', R + 'px');
  root.setProperty('--pt', T + 'px');
  root.setProperty('--bezel', BEZEL + 'px');

  let slices = '';
  for (let i = 0; i < SLICES; i++) {
    const z = -T / 2 + (T * (i + 0.5)) / SLICES;
    // lighter in the middle of the rail = machined chamfer highlight
    const k = 1 - Math.abs(i - (SLICES - 1) / 2) / ((SLICES - 1) / 2);
    slices += `<div class="slice" style="transform:translateZ(${z.toFixed(2)}px);--k:${k.toFixed(3)}"></div>`;
  }

  mount.innerHTML = `
  <div id="phone" class="phone">
    ${slices}

    <!-- FRONT: glass + live app -->
    <div class="face front">
      <div class="screen">
        <iframe id="app-frame" title="Kirana Rakshak live prototype" src="${APP_URL}#home"
          width="${APP_W}" height="${APP_H}" loading="eager"
          style="width:${APP_W}px;height:${APP_H}px;transform:scale(${SCALE})"></iframe>
        <div class="fp-scan"><svg viewBox="0 0 48 48"><path d="M14 30c0-6 4-11 10-11s10 5 10 11M18 34c0-4 2-9 6-9s6 4 6 9M24 30v8M10 22c3-6 8-9 14-9s11 3 14 9M16 12c2-1 5-2 8-2s6 1 8 2"/></svg><span>3D Ultrasonic · verified</span></div>
        <div class="screen-boot"><svg viewBox="0 0 64 64"><path d="M32 6l20 8v16c0 14-9 23-20 28C21 53 12 44 12 30V14z"/></svg><span>Kirana Rakshak</span></div>
        <div class="glare"></div>
      </div>
    </div>

    <!-- BACK: iQOO 15 — AG-frosted glass, floating squircle camera module.
         Legend = white + tri-colour racing checkerboard; Alpha = matte black + bronze ring. -->
    <div class="face back">
      <div class="island">
        <div class="island-glass">
          <div class="lens main" data-hs="main"><b></b><i></i></div>
          <div class="lens tele" data-hs="tele"><b></b><i></i></div>
          <div class="lens uw" data-hs="uw"><b></b><i></i></div>
          <div class="flash"></div>
          <div class="spectrum" data-hs="spec"></div>
          <div class="mic-hole"></div>
          <span class="lens-txt t1">50M OIS</span>
          <span class="lens-txt t2">PERISCOPE 3X</span>
        </div>
        <span class="hs" data-for="uw">1</span>
        <span class="hs" data-for="tele">2</span>
        <span class="hs" data-for="main">3</span>
        <span class="hs" data-for="spec">4</span>
      </div>
      <svg class="checker" viewBox="0 0 30 40" aria-hidden="true">
        <path d="M3 4l8 5-8 5 8 5" stroke="#2F7FD8"/>
        <path d="M11 4l8 5-8 5 8 5" stroke="#1B2350"/>
        <path d="M19 4l8 5-8 5 8 5" stroke="#E0282E"/>
        <rect x="4" y="26" width="5" height="5" fill="#2F7FD8"/><rect x="9" y="31" width="5" height="5" fill="#1B2350"/>
        <rect x="14" y="26" width="5" height="5" fill="#E0282E"/><rect x="19" y="31" width="5" height="5" fill="#F07F1E"/>
      </svg>
      <div class="wordmark v">iQOO</div>
      <div class="wordmark h">iQOO</div>
    </div>

    <!-- EDGES -->
    <div class="edge top">
      <span class="ir-diode" title="IR blaster"></span><span class="pin"></span><span class="grill"></span>
    </div>
    <div class="edge bottom">
      <span class="grill"></span><span class="pin"></span><span class="usbc"></span><span class="grill"></span>
    </div>
    <div class="edge right">
      <span class="vol"></span><span class="power"></span>
    </div>
    <div class="edge left"></div>

    <!-- FX -->
    <div class="ir-beam"><i></i><i></i><i></i><span class="mono">IR · 38 kHz</span></div>
    <div class="sound-rings"><i></i><i></i><i></i></div>
    <div class="haptic-ring"></div>
  </div>`;

  const phone = document.getElementById('phone');
  const frame = document.getElementById('app-frame');

  // CSS injected into the prototype so only its screen content fills our 3D glass.
  const INJECT_CSS = `
    html,body{margin:0!important;padding:0!important;min-height:0!important;height:100%!important;overflow:hidden!important;display:block!important;background:#F4F4F0!important}
    #phone-chassis-wrapper{padding:0!important;margin:0!important;width:100%!important;height:100%!important}
    #iqoo-phone-body{width:100%!important;height:100%!important;padding:0!important;border:0!important;border-radius:0!important;box-shadow:none!important;background:#F4F4F0!important;--tw-ring-shadow:0 0 #0000!important;--tw-ring-offset-shadow:0 0 #0000!important}
    #iqoo-phone-body>:not(#phone-front){display:none!important}
    #phone-front{border-radius:0!important;border:0!important}
    body>:not(#phone-chassis-wrapper):not([id^="modal"]):not(#soundbox-toast):not(script):not(style){display:none!important}
  `;

  const MODAL_SELECTOR = '[id^="modal-"], #soundbox-toast';

  const Bridge = {
    muted: true,
    ready: false,
    timers: [],

    win() {
      try {
        const w = frame.contentWindow;
        if (w && w.document && w.document.body) return w;
      } catch (e) { /* cross-origin (file://) → fallback */ }
      return null;
    },

    call(name, ...args) {
      const w = this.win();
      if (w && typeof w[name] === 'function') {
        try { w[name](...args); return true; } catch (e) { console.warn('[bridge]', name, e); }
      }
      return false;
    },

    clearTimers() { this.timers.forEach(clearTimeout); this.timers = []; },
    later(fn, ms) { this.timers.push(setTimeout(fn, ms)); },

    closeModals() {
      const w = this.win();
      if (!w) return;
      w.document.querySelectorAll(MODAL_SELECTOR).forEach(el => el.classList.add('hidden'));
    },

    screen(id) {
      this.clearTimers();
      this.closeModals();
      if (!this.call('switchScreen', id)) {
        // No script access (file://): reload the prototype on that screen instead.
        const want = `${APP_URL}?s=${id}#${id}`;
        if (!frame.src.endsWith(want)) frame.src = want;
        return;
      }
      const w = this.win();
      const scroller = w && w.document.querySelector('#phone-front .overflow-y-auto');
      if (scroller) scroller.scrollTop = 0;
    },

    action(name) {
      switch (name) {
        case 'nfc':
          this.screen('vendor-list');
          this.later(() => this.call('simulateNfcCheckIn'), 900);
          break;
        case 'ir':
          this.later(() => this.call('triggerIrBlasterManual'), 400);
          break;
        case 'expired':
          this.screen('sell');
          this.later(() => this.call('triggerExpiredItemScan'), 700);
          break;
        case 'voice':
          this.screen('assistant');
          this.later(() => this.call('replayVoiceBroadcast'), 900);
          break;
      }
    },

    setMuted(m) {
      this.muted = m;
      const w = this.win();
      if (m && w && w.speechSynthesis) w.speechSynthesis.cancel();
    },

    onLoad() {
      const w = this.win();
      phone.classList.add('booted');
      if (!w) return;
      const style = w.document.createElement('style');
      style.textContent = INJECT_CSS;
      w.document.head.appendChild(style);
      // Soundbox speech stays silent unless the visitor turns sound on.
      if (w.speechSynthesis) {
        const synth = w.speechSynthesis;
        const speak = synth.speak.bind(synth);
        synth.speak = (u) => { if (!Bridge.muted) speak(u); };
      }
      // Chrome logs an error for vibrate() before any tap; only buzz after a real gesture.
      if (w.navigator.vibrate) {
        const vib = w.navigator.vibrate.bind(w.navigator);
        const ua = w.navigator.userActivation;
        w.navigator.vibrate = (p) => (ua && !ua.hasBeenActive ? false : vib(p));
      }
      // Keep wheel/touch scroll on the page while the phone is just a showpiece.
      w.addEventListener('wheel', (e) => {
        if (!document.body.classList.contains('live-mode')) return;
        const sc = w.document.querySelector('#phone-front .overflow-y-auto');
        if (!sc) return;
        const atTop = sc.scrollTop <= 0 && e.deltaY < 0;
        const atEnd = sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 1 && e.deltaY > 0;
        if (atTop || atEnd) window.scrollBy(0, e.deltaY);
      }, { passive: true });
      this.ready = true;
      document.dispatchEvent(new CustomEvent('phone:ready'));
    }
  };

  frame.addEventListener('load', () => Bridge.onLoad());

  window.Phone = {
    el: phone,
    bridge: Bridge,
    size: { W, H, T },
    fx(name, on) { phone.classList.toggle('fx-' + name, !!on); },
    edition(name) {
      phone.classList.toggle('ed-alpha', name === 'alpha');
    },
    hotspot(id) {
      phone.querySelectorAll('.hs').forEach(h => h.classList.toggle('on', h.dataset.for === id));
      phone.querySelectorAll('[data-hs]').forEach(l => l.classList.toggle('on', l.dataset.hs === id));
    },
    rumble() {
      phone.classList.remove('rumble');
      void phone.offsetWidth;
      phone.classList.add('rumble');
    }
  };
})();
