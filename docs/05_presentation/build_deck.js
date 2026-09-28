const pptxgen = require("pptxgenjs");
const React = require("react");
const RDS = require("react-dom/server");
const sharp = require("sharp");
const path = require("path");
const fa = require("react-icons/fa6");
const lu = require("react-icons/lu");

const IMG = (f) => path.join(__dirname, "img", f);

// ---- palette (from frontend/css/style.css + prototype) ----
const INK = "0B0C0E", OBS = "151618", CARD = "1C1D21", CARD2 = "24262B";
const LIME = "D4F639", ORANGE = "FF5722", EGG = "F4F4F0", TEXT = "ECEDE6";
const MUTED = "8C8F88", RED = "EF4444", WHITE = "FFFFFF", AMBER = "F0B31C";
const HEAD = "Arial Black", BODY = "Arial";

async function icon(Comp, color, size = 256) {
  const svg = RDS.renderToStaticMarkup(React.createElement(Comp, { color: "#" + color, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE"; // 13.333 x 7.5
  pres.title = "Chaukas · iQOO Hackathon 2026 · Team HoloTrio";
  pres.author = "Team HoloTrio";
  const W = 13.333, H = 7.5;

  const IQOO_W = 1280 / 303; // logo aspect

  // shared chrome: iQOO logo top-right + footer text
  function chrome(s, n, { light = false } = {}) {
    s.background = { color: light ? EGG : INK };
    s.addImage({ path: IMG(light ? "iqoo_black.png" : "iqoo_white.png"), x: W - 0.6 - 0.26 * IQOO_W, y: 0.42, w: 0.26 * IQOO_W, h: 0.26 });
    s.addText("iQOO HACKATHON 2026  ·  TEAM HOLOTRIO  ·  CHAUKAS", {
      x: 0.6, y: H - 0.5, w: 8, h: 0.3, fontFace: BODY, fontSize: 9, bold: true, charSpacing: 2,
      color: light ? "6B6E68" : MUTED, margin: 0, isTextBox: true,
    });
    s.addText(String(n).padStart(2, "0"), {
      x: W - 1.1, y: H - 0.5, w: 0.5, h: 0.3, fontFace: BODY, fontSize: 9, bold: true,
      color: light ? "6B6E68" : MUTED, align: "right", margin: 0, isTextBox: true,
    });
  }
  function kicker(s, text, color, y = 0.45) {
    s.addText(text, { x: 0.6, y, w: 8, h: 0.3, fontFace: BODY, fontSize: 11, bold: true, charSpacing: 3, color, margin: 0, isTextBox: true });
  }
  function title(s, text, color = WHITE, y = 0.8, size = 34, w = 11) {
    s.addText(text, { x: 0.6, y, w, h: 0.9, fontFace: HEAD, fontSize: size, color, margin: 0, valign: "top", isTextBox: true });
  }
  function phone(s, file, x, y, h) {
    const w = h * (464 / 960);
    s.addImage({ path: IMG(file), x, y, w, h,
      shadow: { type: "outer", color: "000000", blur: 18, offset: 6, angle: 90, opacity: 0.45 } });
    return w;
  }
  function pill(s, text, x, y, w, fill, color) {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: 0.34, fill: { color: fill }, line: { color: fill }, rectRadius: 0.17 });
    s.addText(text, { x, y, w, h: 0.34, fontFace: BODY, fontSize: 10, bold: true, color, align: "center", valign: "middle", margin: 0, charSpacing: 1, isTextBox: true });
  }

  // ================= 1. TITLE =================
  {
    const s = pres.addSlide();
    s.background = { color: INK };
    const MK = 520 / 159;
    s.addImage({ path: IMG("hk_mark_white.png"), x: 0.5, y: 0.4, w: 0.95 * MK, h: 0.95 });
    s.addShape(pres.shapes.LINE, { x: 0.5 + 0.95 * MK + 0.3, y: 0.55, w: 0, h: 0.65, line: { color: "3A3C40", width: 1 } });
    s.addText([
      { text: "2026 · GRAND FINALE", options: { bold: true, color: AMBER, charSpacing: 2, breakLine: true } },
      { text: "Bengaluru · 9–11 October", options: { color: TEXT, breakLine: true } },
      { text: "Great ideas don't need desks.", options: { color: MUTED, italic: true } },
    ], { x: 0.5 + 0.95 * MK + 0.55, y: 0.45, w: 3.6, h: 0.85, fontFace: BODY, fontSize: 11, margin: 0, valign: "middle", isTextBox: true });

    s.addImage({ path: IMG("app_icon.png"), x: 0.6, y: 1.8, w: 1.25, h: 1.25 });
    s.addText("CHAUKAS", { x: 0.6, y: 3.6, w: 7.5, h: 1.2, fontFace: HEAD, fontSize: 72, color: LIME, margin: 0, isTextBox: true });
    s.addText("Offline AI loss-prevention for India's shops, godowns and factory stores — powered entirely by the iQOO 15.", {
      x: 0.6, y: 5.1, w: 6.8, h: 0.7, fontFace: BODY, fontSize: 16, color: TEXT, margin: 0, isTextBox: true,
    });
    // team card
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 6.05, w: 6.8, h: 0.9, fill: { color: CARD }, line: { color: "2C2E33", width: 1 }, rectRadius: 0.15 });
    s.addText([
      { text: "TEAM", options: { color: MUTED, fontSize: 9, bold: true, charSpacing: 3, breakLine: true } },
      { text: "HoloTrio", options: { color: LIME, fontSize: 20, fontFace: HEAD } },
    ], { x: 0.85, y: 6.1, w: 2.2, h: 0.8, fontFace: BODY, margin: 0, valign: "middle", isTextBox: true });
    s.addText([
      { text: "Sanskar Tiwari  ·  Team Leader", options: { breakLine: true } },
      { text: "Shambhavi Patil  ·  Member", options: { breakLine: true } },
      { text: "Kanishka Salgude  ·  Member" },
    ], { x: 3.1, y: 6.1, w: 4.2, h: 0.8, fontFace: BODY, fontSize: 12, color: TEXT, margin: 0, valign: "middle", isTextBox: true });

    // right: orange glow disk + phones
    s.addShape(pres.shapes.OVAL, { x: 7.9, y: 0.9, w: 5.4, h: 5.4, fill: { color: ORANGE, transparency: 82 }, line: { color: ORANGE, transparency: 60, width: 1 } });
    s.addShape(pres.shapes.OVAL, { x: 8.6, y: 1.6, w: 4.0, h: 4.0, fill: { color: LIME, transparency: 88 }, line: { color: LIME, transparency: 70, width: 1 } });
    phone(s, "vendor-bill.png", 8.05, 1.55, 5.2);
    phone(s, "home.png", 10.35, 0.95, 5.9);
    pill(s, "TRACK · PRODUCTIVITY", 8.3, 6.95 - 0.1, 2.3, ORANGE, WHITE);
    pill(s, "100% ON-DEVICE", 10.75, 6.95 - 0.1, 1.9, LIME, OBS);
    s.addNotes("Chaukas by Team HoloTrio for the iQOO Hackathon 2026 Grand Finale, Bengaluru. Primary track: Productivity; technical anchor: Open Innovation (local models, zero cloud).");
  }

  // ================= 2. PROBLEM =================
  {
    const s = pres.addSlide(); chrome(s, 2);
    kicker(s, "THE PROBLEM", ORANGE);
    title(s, "Stock leaks money every morning.");
    s.addText("A distributor drops 30–50 crates during the rush. The bill says 24 Maggi; only 20 arrived. Ramesh finds out days later — or never.", {
      x: 0.6, y: 1.75, w: 7.2, h: 0.8, fontFace: BODY, fontSize: 15, color: TEXT, margin: 0, isTextBox: true });

    const stats = [
      ["63M+", "small businesses (MSMEs) in India", WHITE],
      ["₹8–15K", "lost per shop / month to short deliveries", ORANGE],
      ["₹5–10K", "lost per shop / month to expired stock", ORANGE],
    ];
    stats.forEach(([big, lbl, c], i) => {
      const x = 0.6 + i * 2.55, y = 2.95;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 2.35, h: 2.1, fill: { color: CARD }, line: { color: "2C2E33", width: 1 }, rectRadius: 0.18 });
      s.addText(big, { x: x + 0.2, y: y + 0.25, w: 2.0, h: 0.8, fontFace: HEAD, fontSize: 30, color: c, margin: 0, isTextBox: true });
      s.addText(lbl, { x: x + 0.2, y: y + 1.1, w: 1.95, h: 0.8, fontFace: BODY, fontSize: 12, color: TEXT, margin: 0, valign: "top", isTextBox: true });
    });
    s.addText([
      { text: "Existing apps record only what the shopkeeper types. ", options: { color: TEXT } },
      { text: "Nobody verifies what physically arrived.", options: { color: LIME, bold: true } },
    ], { x: 0.6, y: 5.4, w: 7.4, h: 0.9, fontFace: BODY, fontSize: 16, margin: 0, isTextBox: true });

    // right: pain list
    const pains = [
      [lu.LuTruck, "Short deliveries", "No time to count every packet while serving customers"],
      [lu.LuCalendarX, "Expired sales", "Old stock hides at the back; return window passes"],
      [lu.LuSnowflake, "Cold-chain spoilage", "Freezers fail during power cuts; dairy curdles"],
      [lu.LuLanguages, "Language & typing barrier", "SaaS apps need English, typing and internet"],
    ];
    for (let i = 0; i < pains.length; i++) {
      const [ic, h, d] = pains[i]; const y = 1.8 + i * 1.18;
      s.addShape(pres.shapes.OVAL, { x: 8.55, y, w: 0.72, h: 0.72, fill: { color: "2A1510" }, line: { color: ORANGE, width: 1 } });
      s.addImage({ data: await icon(ic, ORANGE), x: 8.73, y: y + 0.18, w: 0.36, h: 0.36 });
      s.addText(h, { x: 9.45, y: y - 0.02, w: 3.3, h: 0.35, fontFace: BODY, fontSize: 14, bold: true, color: WHITE, margin: 0, isTextBox: true });
      s.addText(d, { x: 9.45, y: y + 0.33, w: 3.3, h: 0.55, fontFace: BODY, fontSize: 11, color: MUTED, margin: 0, valign: "top", isTextBox: true });
    }
    s.addNotes("Figures from our research docs (docs/01_pitch/master.md). Combined leakage ₹13K–25K per shop per month.");
  }

  // ================= 3. SOLUTION: 4 CATCHES =================
  {
    const s = pres.addSlide(); chrome(s, 3);
    kicker(s, "THE SOLUTION", LIME);
    title(s, "One phone. Four catches. Zero internet.");
    const cards = [
      [lu.LuPackageCheck, "Delivery Catch", "NFC vendor check-in, one ultrawide photo, on-device YOLO counts every packet and matches it against the OCR'd bill.", "Bill 24 · Got 20 · Vendor owes ₹56"],
      [lu.LuSnowflake, "Cold-Chain Guardian", "When dairy or ice-cream is logged, the IR blaster pulses the counter freezer into super-freeze.", "Physical actuation, no smart plug"],
      [lu.LuShieldAlert, "Expiry Guard", "Periscope macro reads dot-matrix expiry stamps at intake; an expired scan at checkout is blocked with a haptic buzz.", "RED · SALE BLOCKED"],
      [lu.LuMic, "Hindi Voice Soundbox", "Ask “Rajesh ne kitna kam maal diya?” — on-device speech AI answers aloud through the stereo speakers.", "Speaks Hindi & English"],
    ];
    for (let i = 0; i < 4; i++) {
      const [ic, h, d, tag] = cards[i];
      const x = 0.6 + (i % 2) * 6.1, y = 1.95 + Math.floor(i / 2) * 2.55, w = 5.9, hh = 2.35;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: hh, fill: { color: i === 0 ? LIME : CARD }, line: { color: i === 0 ? LIME : "2C2E33", width: 1 }, rectRadius: 0.2 });
      const fg = i === 0 ? OBS : WHITE, sub = i === 0 ? "2E3312" : "B9BBB4";
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.3, y: y + 0.3, w: 0.7, h: 0.7, fill: { color: i === 0 ? OBS : LIME }, line: { color: i === 0 ? OBS : LIME }, rectRadius: 0.14 });
      s.addImage({ data: await icon(ic, i === 0 ? LIME : OBS), x: x + 0.47, y: y + 0.47, w: 0.36, h: 0.36 });
      s.addText(h, { x: x + 1.2, y: y + 0.3, w: w - 1.5, h: 0.7, fontFace: HEAD, fontSize: 20, color: fg, margin: 0, valign: "middle", isTextBox: true });
      s.addText(d, { x: x + 0.3, y: y + 1.12, w: w - 0.6, h: 0.75, fontFace: BODY, fontSize: 12, color: sub, margin: 0, valign: "top", isTextBox: true });
      s.addText(tag, { x: x + 0.3, y: y + 1.88, w: w - 0.6, h: 0.3, fontFace: BODY, fontSize: 11, bold: true, color: i === 0 ? OBS : LIME, margin: 0, isTextBox: true });
    }
  }

  // ================= 4. APP FLOW (prototype screens) =================
  {
    const s = pres.addSlide(); chrome(s, 4, { light: true });
    kicker(s, "THE APP · LIVE PROTOTYPE", "5B6B00");
    title(s, "Receive stock in three taps.", OBS);
    const steps = [
      ["home.png", "01", "Pick a job", "Two giant buttons: Receive Stock or Sell Item. Built for owners who don't type."],
      ["vendor-scan.png", "02", "Count the delivery", "Camera counts boxes, reads expiry dates and flags perishables for the freezer."],
      ["vendor-bill.png", "03", "Check the bill", "OCR reads the invoice; shortages are priced and stamped with NavIC proof-of-delivery."],
    ];
    steps.forEach(([f, n, h, d], i) => {
      const x0 = 0.6 + i * 4.2;
      phone(s, f, x0, 1.85, 4.1);
      const tx = x0 + 2.1;
      s.addText(n, { x: tx, y: 2.0, w: 1.8, h: 0.6, fontFace: HEAD, fontSize: 28, color: ORANGE, margin: 0, isTextBox: true });
      s.addText(h, { x: tx, y: 2.65, w: 1.85, h: 0.75, fontFace: BODY, fontSize: 15, bold: true, color: OBS, margin: 0, valign: "top", isTextBox: true });
      s.addText(d, { x: tx, y: 3.25, w: 1.85, h: 2.2, fontFace: BODY, fontSize: 11, color: "45474A", margin: 0, valign: "top", isTextBox: true });
    });
    s.addText("Screens captured from prototype/chaukas_ui.html", { x: 0.6, y: 6.25, w: 8, h: 0.3, fontFace: BODY, fontSize: 10, italic: true, color: "6B6E68", margin: 0, isTextBox: true });
  }

  // ================= 5. SELL + VOICE =================
  {
    const s = pres.addSlide(); chrome(s, 5);
    kicker(s, "AT THE COUNTER", LIME);
    title(s, "Sell safely. Ask in Hindi.", WHITE, 0.8, 34, 6.5);
    phone(s, "sell.png", 7.05, 1.1, 5.55);
    phone(s, "assistant.png", 9.95, 1.1, 5.55);
    const pts = [
      [lu.LuScanLine, "Multi-item scan billing", "YOLO11n on the NPU identifies several items in one frame; the WhatsApp bill goes to the customer."],
      [lu.LuVibrate, "Expired item? Sale blocked", "Distinct X-axis haptic pattern cuts through an 80 dB bazaar where beeps get lost."],
      [lu.LuAudioLines, "Built-in Chaukas Soundbox", "Answers are read aloud on the stereo speakers — replaces a ₹125/month rented soundbox."],
      [lu.LuWifiOff, "Everything stays on the phone", "Works in Airplane Mode. Vendor margins and khata never leave the device."],
    ];
    for (let i = 0; i < pts.length; i++) {
      const [ic, h, d] = pts[i]; const y = 1.95 + i * 1.12;
      s.addShape(pres.shapes.OVAL, { x: 0.6, y, w: 0.62, h: 0.62, fill: { color: LIME }, line: { color: LIME } });
      s.addImage({ data: await icon(ic, OBS), x: 0.75, y: y + 0.15, w: 0.32, h: 0.32 });
      s.addText(h, { x: 1.45, y: y - 0.03, w: 5.2, h: 0.35, fontFace: BODY, fontSize: 14, bold: true, color: WHITE, margin: 0, isTextBox: true });
      s.addText(d, { x: 1.45, y: y + 0.32, w: 5.2, h: 0.6, fontFace: BODY, fontSize: 11, color: MUTED, margin: 0, valign: "top", isTextBox: true });
    }
  }

  // ================= 6. iQOO 15 HARDWARE =================
  {
    const s = pres.addSlide(); chrome(s, 6);
    kicker(s, "HARDWARE WE USE · iQOO 15", ORANGE);
    title(s, "Every sensor has a job.");
    const hw = [
      [lu.LuCpu, "Snapdragon 8 Elite Gen 5", "Hexagon NPU runs vision, OCR, speech and intent models in parallel"],
      [lu.LuMonitorPlay, "Supercomputing Chip Q3", "144 Hz AR bounding-box HUD without stealing NPU time"],
      [lu.LuAperture, "50 MP Ultrawide", "Whole delivery counter in one frame for counting"],
      [lu.LuZoomIn, "50 MP 3x Periscope", "Telemacro reads tiny dot-matrix expiry dates"],
      [lu.LuSunMedium, "Color Spectrum Sensor", "Kills 50 Hz tube-light banding & foil glare"],
      [lu.LuRadio, "IR Blaster", "Pulses freezers / ACs via ConsumerIrManager"],
      [lu.LuNfc, "NFC", "One-tap vendor check-in with a card or badge"],
      [lu.LuMapPin, "NavIC L5 GNSS", "Geo-stamped proof-of-delivery receipts"],
      [lu.LuVibrate, "X-axis Linear Haptics", "Distinct buzz patterns for shortage & expiry"],
      [lu.LuVolume2, "Dual Stereo Speakers", "Loud Hindi answers — a built-in soundbox"],
      [lu.LuBatteryCharging, "7000 mAh + Vapour Chamber", "12-hour counter shift through power cuts"],
      [lu.LuFingerprint, "3D Ultrasonic Fingerprint", "Locks margins & vendor ledgers; works with wet hands"],
    ];
    const cw = 2.9, ch = 1.28, gx = 0.17, gy = 0.14;
    for (let i = 0; i < hw.length; i++) {
      const [ic, h, d] = hw[i];
      const x = 0.6 + (i % 4) * (cw + gx), y = 1.75 + Math.floor(i / 4) * (ch + gy);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: cw, h: ch, fill: { color: CARD }, line: { color: "2C2E33", width: 1 }, rectRadius: 0.14 });
      s.addImage({ data: await icon(ic, ORANGE), x: x + 0.2, y: y + 0.2, w: 0.34, h: 0.34 });
      s.addText(h, { x: x + 0.65, y: y + 0.14, w: cw - 0.8, h: 0.46, fontFace: BODY, fontSize: 12, bold: true, color: WHITE, margin: 0, valign: "middle", isTextBox: true });
      s.addText(d, { x: x + 0.2, y: y + 0.65, w: cw - 0.35, h: 0.55, fontFace: BODY, fontSize: 10, color: MUTED, margin: 0, valign: "top", isTextBox: true });
    }
    s.addText([
      { text: "Why iQOO 15? ", options: { bold: true, color: ORANGE } },
      { text: "IR blaster, periscope telemacro, NavIC L5 and the Q3 chip together are what make this impossible on a generic phone or in the cloud.", options: { color: TEXT } },
    ], { x: 0.6, y: 6.1, w: 12.1, h: 0.4, fontFace: BODY, fontSize: 12, margin: 0, isTextBox: true });
  }

  // ================= 7. DEMO HARDWARE KIT =================
  {
    const s = pres.addSlide(); chrome(s, 7, { light: true });
    kicker(s, "HARDWARE WE USE · DEMO KIT", "C23A0E");
    title(s, "What we bring to the finale.", OBS);
    s.addImage({ path: IMG("iqoo_black.png"), x: 0.6, y: 2.0, w: 0.5 * IQOO_W, h: 0.5 });
    s.addText("15", { x: 0.6 + 0.5 * IQOO_W + 0.15, y: 1.93, w: 1.2, h: 0.62, fontFace: HEAD, fontSize: 34, color: ORANGE, margin: 0, isTextBox: true });
    s.addText("The only compute device in the Red Light phase. All AI runs here.", { x: 0.6, y: 2.75, w: 4.3, h: 0.6, fontFace: BODY, fontSize: 13, color: "45474A", margin: 0, isTextBox: true });
    const specs = [["SoC", "Snapdragon 8 Elite Gen 5 + Q3"], ["Memory", "12 / 16 GB RAM"], ["OS", "OriginOS 6 · Android 16"], ["Display", "6.85\" 2K AMOLED · 144 Hz"], ["Cameras", "50 MP main · ultrawide · 3x periscope"], ["Battery", "7000 mAh · 100 W"]];
    specs.forEach(([k, v], i) => {
      const y = 3.5 + i * 0.42;
      s.addText(k, { x: 0.6, y, w: 1.2, h: 0.36, fontFace: BODY, fontSize: 11, bold: true, color: "6B6E68", margin: 0, valign: "middle", isTextBox: true });
      s.addText(v, { x: 1.8, y, w: 3.2, h: 0.36, fontFace: BODY, fontSize: 12, color: OBS, margin: 0, valign: "middle", isTextBox: true });
    });
    const kit = [
      [lu.LuLaptop, "Laptop + iQOO Office Kit", "Green Light phase: customer-facing bill screen, loss dashboard, Excel/Tally export"],
      [lu.LuNfc, "NFC tags (NTAG215 cards)", "One card per mock distributor for tap-to-check-in"],
      [lu.LuRadio, "IR receiver + LED board", "Benchtop stand-in for a freezer — lights up when the phone pulses it"],
      [lu.LuPackage, "Real FMCG props", "Maggi, chips, chocolates & a dairy pack with one expired batch"],
      [lu.LuReceipt, "Printed vendor invoices", "Deliberately over-billed (24 vs 20) to trigger the shortage catch"],
      [lu.LuLamp, "Tube-light / LED lamp", "Shows flicker-free capture under real shop lighting"],
    ];
    for (let i = 0; i < kit.length; i++) {
      const [ic, h, d] = kit[i];
      const x = 5.55 + (i % 2) * 3.65, y = 1.95 + Math.floor(i / 2) * 1.45;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 3.5, h: 1.3, fill: { color: WHITE }, line: { color: "E2E2DC", width: 1 }, rectRadius: 0.14,
        shadow: { type: "outer", color: "000000", blur: 6, offset: 2, angle: 90, opacity: 0.08 } });
      s.addShape(pres.shapes.OVAL, { x: x + 0.2, y: y + 0.2, w: 0.5, h: 0.5, fill: { color: OBS }, line: { color: OBS } });
      s.addImage({ data: await icon(ic, LIME), x: x + 0.32, y: y + 0.32, w: 0.26, h: 0.26 });
      s.addText(h, { x: x + 0.82, y: y + 0.18, w: 2.6, h: 0.52, fontFace: BODY, fontSize: 12, bold: true, color: OBS, margin: 0, valign: "middle", isTextBox: true });
      s.addText(d, { x: x + 0.2, y: y + 0.75, w: 3.15, h: 0.5, fontFace: BODY, fontSize: 10, color: "55585C", margin: 0, valign: "top", isTextBox: true });
    }
  }

  // ================= 8. ARCHITECTURE =================
  {
    const s = pres.addSlide(); chrome(s, 8);
    kicker(s, "ON-DEVICE AI STACK", LIME);
    title(s, "Photo in, verdict out — in under 250 ms.");
    // pipeline row
    const pipe = [
      ["NFC tap", "vendor check-in", ORANGE],
      ["Photo ×2", "ultrawide + bill", ORANGE],
      ["YOLO11n", "INT8 · ~22 ms", LIME],
      ["PaddleOCR", "mobile v4 · ~65 ms", LIME],
      ["Reconcile", "fuzzy match > 0.82", LIME],
      ["Verdict", "haptic + voice + IR", ORANGE],
    ];
    const pw = 1.8, pg = 0.26;
    pipe.forEach(([h, d, c], i) => {
      const x = 0.6 + i * (pw + pg), y = 1.95;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: pw, h: 1.1, fill: { color: CARD }, line: { color: c, width: 1.25 }, rectRadius: 0.14 });
      s.addText(h, { x: x + 0.1, y: y + 0.15, w: pw - 0.2, h: 0.4, fontFace: BODY, fontSize: 14, bold: true, color: c, align: "center", margin: 0, isTextBox: true });
      s.addText(d, { x: x + 0.1, y: y + 0.58, w: pw - 0.2, h: 0.35, fontFace: BODY, fontSize: 10, color: TEXT, align: "center", margin: 0, isTextBox: true });
      if (i < pipe.length - 1) s.addText("›", { x: x + pw, y: y + 0.3, w: pg, h: 0.45, fontFace: BODY, fontSize: 20, bold: true, color: MUTED, align: "center", valign: "middle", margin: 0, isTextBox: true });
    });
    // layers
    const layers = [
      ["INPUTS", "50 MP Ultrawide · 3x Telemacro · Color Spectrum · Mic · NFC · NavIC L5", ORANGE],
      ["HEXAGON NPU", "YOLO11n detection · PaddleOCR / ML Kit · Whisper-small STT · Laya 322M intent", LIME],
      ["Q3 CHIP", "144 Hz AR overlay of bounding boxes on the live camera feed", ORANGE],
      ["CORE ENGINE", "Kotlin + Jetpack Compose + C++ NDK · Room/SQLite ledger · ConsumerIrManager", LIME],
      ["OFFICE KIT", "Presentation API customer screen · ledger sync · .xlsx export", ORANGE],
    ];
    layers.forEach(([k, v, c], i) => {
      const y = 3.35 + i * 0.52;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y, w: 12.1, h: 0.44, fill: { color: i % 2 ? CARD : CARD2 }, line: { color: i % 2 ? CARD : CARD2 }, rectRadius: 0.1 });
      s.addText(k, { x: 0.8, y, w: 2.1, h: 0.44, fontFace: BODY, fontSize: 11, bold: true, charSpacing: 2, color: c, valign: "middle", margin: 0, isTextBox: true });
      s.addText(v, { x: 2.95, y, w: 9.6, h: 0.44, fontFace: BODY, fontSize: 12, color: TEXT, valign: "middle", margin: 0, isTextBox: true });
    });
    s.addText("Lime = our software · Orange = iQOO 15 hardware", { x: 0.6, y: 6.1, w: 8, h: 0.3, fontFace: BODY, fontSize: 10, italic: true, color: MUTED, margin: 0, isTextBox: true });
  }

  // ================= 9. RED LIGHT / GREEN LIGHT =================
  {
    const s = pres.addSlide(); chrome(s, 9);
    kicker(s, "HACKATHON FORMAT FIT", AMBER);
    title(s, "Phone-first. Laptop when it helps.");
    const cols = [
      [RED, "RED LIGHT", "Phone only", lu.LuSmartphone, [
        "Full audit, counting and OCR on the iQOO 15",
        "SQLite ledger, haptics, IR and voice agent",
        "Runs in Airplane Mode — Wi-Fi and cellular off",
      ]],
      ["22C55E", "GREEN LIGHT", "Phone + laptop via Office Kit", lu.LuLaptop, [
        "Customer-facing bill on the laptop screen; cost margins stay hidden",
        "Loss-prevention dashboard with vendor reliability scores",
        "One-click day-end Excel / Tally export for GST",
      ]],
    ];
    for (let i = 0; i < 2; i++) {
      const [c, h, sub, ic, items] = cols[i];
      const x = 0.6 + i * 6.15, y = 1.95, w = 5.95, hh = 3.2;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w, h: hh, fill: { color: CARD }, line: { color: "2C2E33", width: 1 }, rectRadius: 0.2 });
      s.addShape(pres.shapes.OVAL, { x: x + 0.35, y: y + 0.35, w: 0.8, h: 0.8, fill: { color: c }, line: { color: c } });
      s.addImage({ data: await icon(ic, WHITE), x: x + 0.55, y: y + 0.55, w: 0.4, h: 0.4 });
      s.addText(h, { x: x + 1.35, y: y + 0.35, w: 4.2, h: 0.45, fontFace: HEAD, fontSize: 20, color: WHITE, margin: 0, isTextBox: true });
      s.addText(sub, { x: x + 1.35, y: y + 0.8, w: 4.4, h: 0.35, fontFace: BODY, fontSize: 12, color: MUTED, margin: 0, isTextBox: true });
      s.addText(items.map((t, j) => ({ text: t, options: { bullet: true, breakLine: j < items.length - 1 } })), {
        x: x + 0.35, y: y + 1.5, w: w - 0.7, h: 2.2, fontFace: BODY, fontSize: 14, color: TEXT, paraSpaceAfter: 10, valign: "top", margin: 0, isTextBox: true });
    }
  }

  // ================= 10. JUDGING RUBRIC FIT =================
  {
    const s = pres.addSlide(); chrome(s, 10);
    kicker(s, "HOW WE SCORE AGAINST THE RUBRIC", AMBER);
    title(s, "Built for how the jury judges.");
    const rows = [
      [30, "End product quality", "JURY", "Works end-to-end offline; a two-button UI a shopkeeper keeps using daily"],
      [20, "Novelty & impact", "JURY", "Verifies physical deliveries, not typed ones — ₹13–25K/month back per shop"],
      [15, "Creative phone use", "DEVICE DATA", "Two camera lenses, voice, NPU, IR, NFC, NavIC and haptics in the core loop"],
      [15, "Technical depth", "JURY", "Parallel INT8 models on Hexagon NPU + Q3 HUD; Kotlin / C++ NDK, Room DB"],
      [10, "Office Kit usage", "DEVICE DATA", "Customer bill screen, dashboard sync and Excel export on the laptop"],
      [10, "Demo & presentation", "JURY", "Live Airplane-Mode demo with real props: shortage, IR, blocked sale, voice"],
    ];
    rows.forEach(([pct, h, who, d], i) => {
      const y = 1.9 + i * 0.7;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y, w: 12.1, h: 0.6, fill: { color: CARD }, line: { color: "2C2E33", width: 1 }, rectRadius: 0.1 });
      s.addText(pct + "%", { x: 0.8, y, w: 0.9, h: 0.6, fontFace: HEAD, fontSize: 18, color: AMBER, valign: "middle", margin: 0, isTextBox: true });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 1.75, y: y + 0.25, w: 1.5, h: 0.1, fill: { color: "34363B" }, line: { color: "34363B" }, rectRadius: 0.05 });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 1.75, y: y + 0.25, w: 1.5 * pct / 30, h: 0.1, fill: { color: AMBER }, line: { color: AMBER }, rectRadius: 0.05 });
      s.addText(h, { x: 3.5, y, w: 2.5, h: 0.6, fontFace: BODY, fontSize: 13, bold: true, color: WHITE, valign: "middle", margin: 0, isTextBox: true });
      s.addText(who, { x: 6.0, y, w: 1.3, h: 0.6, fontFace: BODY, fontSize: 9, bold: true, charSpacing: 1, color: who === "JURY" ? MUTED : ORANGE, valign: "middle", margin: 0, isTextBox: true });
      s.addText(d, { x: 7.3, y, w: 5.25, h: 0.6, fontFace: BODY, fontSize: 11, color: TEXT, valign: "middle", margin: 0, isTextBox: true });
    });
    s.addText("Rubric from iqoo.reskilll.com: 75% jury panel · 25% HackTracker device data.", { x: 0.6, y: 6.2, w: 10, h: 0.3, fontFace: BODY, fontSize: 10, italic: true, color: MUTED, margin: 0, isTextBox: true });
  }

  // ================= 11. IMPACT =================
  {
    const s = pres.addSlide(); chrome(s, 11, { light: true });
    kicker(s, "IMPACT", "C23A0E");
    title(s, "Money back in Ramesh's pocket.", OBS);
    const big = [
      ["₹13–25K", "leakage we target per shop, per month", ORANGE],
      ["< 250 ms", "photo-to-verdict, fully offline", OBS],
      ["₹0", "cloud cost — no API calls, no data plan", OBS],
      ["₹125", "saved monthly by replacing a rented soundbox", OBS],
    ];
    big.forEach(([n, l, c], i) => {
      const x = 0.6 + i * 3.07;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.95, w: 2.85, h: 2.1, fill: { color: i === 0 ? OBS : WHITE }, line: { color: i === 0 ? OBS : "E2E2DC", width: 1 }, rectRadius: 0.18 });
      s.addText(n, { x: x + 0.25, y: 2.15, w: 2.5, h: 0.9, fontFace: HEAD, fontSize: 30, color: i === 0 ? LIME : c, margin: 0, valign: "middle", isTextBox: true });
      s.addText(l, { x: x + 0.25, y: 3.1, w: 2.45, h: 0.8, fontFace: BODY, fontSize: 12, color: i === 0 ? TEXT : "45474A", margin: 0, valign: "top", isTextBox: true });
    });
    // native bar chart: monthly leakage before/after (illustrative midpoints)
    s.addChart(pres.charts.BAR, [{ name: "₹ lost / month", labels: ["Short deliveries", "Expired stock"], values: [11500, 7500] },
                                 { name: "With Chaukas (target)", labels: ["Short deliveries", "Expired stock"], values: [1500, 1500] }], {
      x: 0.6, y: 4.3, w: 7.2, h: 2.2, barDir: "bar", barGrouping: "clustered", chartColors: ["FF5722", "151618"],
      showValue: true, dataLabelPosition: "outEnd", dataLabelFontSize: 9, dataLabelColor: "45474A", dataLabelFormatCode: "₹#,##0",
      catAxisLabelColor: "45474A", catAxisLabelFontSize: 10, valAxisHidden: true, valGridLine: { style: "none" }, catGridLine: { style: "none" },
      showLegend: true, legendPos: "b", legendFontSize: 9, legendColor: "45474A",
    });
    s.addText([
      { text: "Midpoints of our researched ranges; the “after” bars are our target, to be validated in pilot shops.", options: { breakLine: true } },
    ], { x: 8.2, y: 4.5, w: 4.5, h: 0.9, fontFace: BODY, fontSize: 11, italic: true, color: "6B6E68", margin: 0, isTextBox: true });
    s.addText("Built for owners with basic literacy: icons, Hindi voice, one-photo workflows.", { x: 8.2, y: 5.45, w: 4.5, h: 0.9, fontFace: BODY, fontSize: 13, bold: true, color: OBS, margin: 0, isTextBox: true });
  }

  // ================= 11. BUILD PLAN =================
  {
    const s = pres.addSlide(); chrome(s, 12);
    kicker(s, "48-HOUR EXECUTION PLAN · FRI EVENING → SUN EVENING", LIME);
    title(s, "How we build it at the finale.");
    const plan = [
      ["0–12 h", "Core app", "Android scaffold, Camera2 dual-lens, SQLite schema, YOLO11n + OCR on device"],
      ["12–22 h", "Sensors", "Colour-spectrum anti-banding, IR transmitter, NFC tap-in, NavIC geotag"],
      ["22–32 h", "Voice & haptics", "Whisper STT, Laya intent → SQL, custom haptic waveforms"],
      ["32–40 h", "Office Kit", "Customer display via Presentation API, dashboard, Excel export"],
      ["40–48 h", "Demo polish", "Props, lighting calibration, 3–5 minute pitch rehearsal"],
    ];
    const lineY = 2.55;
    s.addShape(pres.shapes.LINE, { x: 0.9, y: lineY, w: 11.5, h: 0, line: { color: "3A3C40", width: 2 } });
    plan.forEach(([t, h, d], i) => {
      const x = 0.6 + i * 2.45, c = i % 2 ? ORANGE : LIME;
      s.addShape(pres.shapes.OVAL, { x: x + 0.15, y: lineY - 0.2, w: 0.4, h: 0.4, fill: { color: c }, line: { color: INK, width: 3 } });
      s.addText(t, { x, y: 1.75, w: 2.2, h: 0.4, fontFace: HEAD, fontSize: 16, color: c, margin: 0, isTextBox: true });
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 3.0, w: 2.25, h: 2.0, fill: { color: CARD }, line: { color: "2C2E33", width: 1 }, rectRadius: 0.14 });
      s.addText(h, { x: x + 0.2, y: 3.15, w: 1.9, h: 0.45, fontFace: BODY, fontSize: 14, bold: true, color: WHITE, margin: 0, isTextBox: true });
      s.addText(d, { x: x + 0.2, y: 3.65, w: 1.9, h: 1.8, fontFace: BODY, fontSize: 11, color: MUTED, margin: 0, valign: "top", isTextBox: true });
    });
    s.addText("Already done: clickable prototype of every screen + showcase website.", { x: 0.6, y: 5.45, w: 12, h: 0.35, fontFace: BODY, fontSize: 13, bold: true, color: LIME, margin: 0, isTextBox: true });
  }

  // ================= 12. CLOSING =================
  {
    const s = pres.addSlide();
    s.background = { color: INK };
    s.addShape(pres.shapes.OVAL, { x: 7.9, y: 0.6, w: 5.8, h: 5.8, fill: { color: ORANGE, transparency: 85 }, line: { color: ORANGE, transparency: 60, width: 1 } });
    s.addImage({ path: IMG("hk_mark_white.png"), x: 0.5, y: 0.45, w: 0.85 * 520 / 159, h: 0.85 });
    s.addText("CHAUKAS", { x: 0.6, y: 1.9, w: 8, h: 0.5, fontFace: BODY, fontSize: 14, bold: true, charSpacing: 4, color: LIME, margin: 0, isTextBox: true });
    s.addText("Every delivery counted.\nEvery rupee protected.", { x: 0.6, y: 2.45, w: 8.0, h: 1.9, fontFace: HEAD, fontSize: 36, color: WHITE, margin: 0, valign: "top", isTextBox: true });
    s.addText("Offline. On-device. Built on the iQOO 15.", { x: 0.6, y: 4.4, w: 8, h: 0.5, fontFace: BODY, fontSize: 16, color: TEXT, margin: 0, isTextBox: true });
    s.addText([
      { text: "TEAM HOLOTRIO", options: { bold: true, color: LIME, charSpacing: 3, breakLine: true } },
      { text: "Sanskar Tiwari (Leader)  ·  Shambhavi Patil  ·  Kanishka Salgude", options: { color: TEXT } },
    ], { x: 0.6, y: 5.5, w: 7, h: 0.8, fontFace: BODY, fontSize: 13, margin: 0, isTextBox: true });
    s.addText("iQOO Hackathon 2026 · Grand Finale · Bengaluru · 9–11 Oct", { x: 0.6, y: 6.4, w: 7, h: 0.35, fontFace: BODY, fontSize: 11, color: MUTED, margin: 0, isTextBox: true });
    s.addImage({ path: IMG("app_icon.png"), x: 9.35, y: 1.75, w: 2.9, h: 2.9 });
    s.addText("Thank you", { x: 9.0, y: 4.95, w: 3.6, h: 0.6, fontFace: HEAD, fontSize: 24, color: WHITE, align: "center", margin: 0, isTextBox: true });
  }

  const out = path.join(__dirname, "Chaukas_iQOO_Hackathon_2026.pptx");
  await pres.writeFile({ fileName: out });
  console.log("wrote", out);
})();
