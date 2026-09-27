# 🎨 Kirana Rakshak App Design System (`design.md`)

This document is the complete UI/UX style guide and design system for **Kirana Rakshak** on the **iQOO 15** (OriginOS 6 / Android 16). 

It establishes a high-contrast, lightning-fast utilitarian design language engineered for everyday Indian kirana store owners. 

All childish emojis have been replaced with **clean vector icons (Lucide Icon standard)**, and all complex technical jargon has been translated into **simple, easy-to-understand English**.

---

## 🎯 1. Design Philosophy: 40–60 Year Old Kirana Shopkeeper Ergonomics

A real Indian kirana shopkeeper (like Ramesh Bhai, age 52) has flour on his hands, presbyopia (+2.0D eyesight without reading glasses on the counter), 5 impatient customers shouting orders across the counter, and zero time or patience to hunt through nested menus, tiny icons, or complicated billing screens.

*(See full research foundation in [`SHOPKEEPER_UX_RESEARCH.md`](../02_research/SHOPKEEPER_UX_RESEARCH.md))*

Kirana Rakshak follows **4 Golden Senior-Ergonomic Rules**:

1. **Strictly 2 Giant Buttons on the Home Screen (Zero Clutter):** The home screen contains ONLY TWO massive, unmistakable action blocks taking up the full screen height:
   * 🟢 **`SELL ITEM (SCAN & BILL)`** — Giant chunky card (`215px` tall) in **Electric Lime (`#D4F639`)** with deep black text, high-contrast shopping cart icon, and direct tap target.
   * ⚫ **`RECEIVE STOCK (FROM VENDOR)`** — Giant chunky card (`215px` tall) in **Deep Obsidian Black (`#151618`)** with lime accent crate icon, diagonal stripe texture, and direct tap target.
   * *No extra cards, no confusing menus, no distracting secondary buttons.* A 50-year-old shopkeeper sees only two giant choices.
2. **Restricted Bilingual System (English Primary + Hindi):**
   * Keep only **English (Primary, active by default)** and **Hindi**.
   * Controlled by a sleek, minimal pill toggle in the top header: `[ English | हिंदी ]`.
   * Single language active at a time; zero bracketed bilingual clutter on buttons.
3. **Editable AI Values (Merchant in Full Control):**
   * Quantity adjustments via prominent `[-]` and `[+]` tactile buttons on every row (e.g. reduce 10 Maggi to 5).
   * 1-tap `[Edit ✏️]` button beside every detected expiry date to manually override camera OCR errors.
   * Automatic invoice reconciliation flagging vendor shortages for bill deductions.
4. **Familiar Behance Hardware Aesthetic:**
   * High-contrast **Electric Lime (`#D4F639`)** + **Deep Obsidian Black (`#151618`)**.
   * Smooth squircle cards (`rounded-[34px]`), tactile drop shadows, and dark floating capsule dock.

---

## 🎨 2. Color Palette (Behance Theme Tokens)

| Color Role | Hex Code | Visual Style | Where It Is Used |
| :--- | :--- | :--- | :--- |
| **Electric Lime** | `#D4F639` | High-energy, ultra-clear lime | Primary `SELL ITEM` giant 215px card, active dock dots, confirm buttons |
| **Deep Obsidian Black** | `#151618` | Rich, solid hardware black | Primary `RECEIVE STOCK` giant 215px card, floating capsule dock, titles |
| **Warm Canvas Eggshell** | `#F4F4F0` | Soft off-white / light cream | Main screen background (anti-glare under bright counter lights) |
| **Card White** | `#FFFFFF` | Crisp pure white | Item cards, vendor lists, modals |
| **Danger / Shortage Red**| `#DC2626` | High-visibility warning red | Bill shortage alert banner, invoice mismatch deduction |
| **Attention Amber** | `#F59E0B` | Warm attention amber | Expiry warnings, low stock highlights |
| **Subtle Border** | `rgba(0,0,0,0.10)` | Crisp tactile border | Sharp separation for aging eyesight |

---

## 🔘 3. Button Shapes and Geometry

### A. The 2 Giant Hero Action Blocks (`215px` Height)
The home screen is dominated exclusively by the 2 core daily actions:
* **`SELL ITEM (SCAN & BILL)` Card:** Giant squircle block (`rounded-[34px]`, `215px` tall) in **Electric Lime (`#D4F639`)**. Features a 56px dark icon box with shopping cart, 24pt extra-bold text, subtext *"Scan customer items & send WhatsApp bill"*, and circular arrow target `↗`.
* **`RECEIVE STOCK (FROM VENDOR)` Card:** Giant squircle block (`rounded-[34px]`, `215px` tall) in **Deep Obsidian Black (`#151618`)** with subtle diagonal stripe texture. Features a 56px lime icon box with wholesale crate, 24pt white bold text, subtext *"Select vendor, count items & check bill"*, and circular arrow target `↗`.

### B. Tactile Quantity Adjusters (`-` / `+`)
On every scanned item row, large `32px x 32px` buttons allow instant quantity reduction or addition:
* `[-]` Button: Decrements count (e.g. from 10 down to 5).
* `[+]` Button: Increments count.
* Centered bold mono counter for immediate visual feedback.

### C. 1-Tap Expiry Date Correction (`[Edit ✏️]`)
Adjacent to every detected expiry date is an active blue underline button that pops up an intuitive date picker/editor if the camera misreads packet text.

### D. The Original Floating Capsule Dock
Deep obsidian black capsule (`#151618`) floating above the bottom edge:
* **Active State:** Pure white circular badge with obsidian icon and an Electric Lime notification dot (`#D4F639`).
* **Inactive State:** Clean slate icons (`text-slate-300 hover:text-white`).


---

## 🔤 4. Easy English Words (No Confusing Tech Jargon)

We replaced all complicated developer terms with simple words that any shopkeeper understands in one second:

| ❌ Complicated Developer Term | ✅ Easy Everyday English | 🇮🇳 Hindi / Hinglish Meaning |
| :--- | :--- | :--- |
| *Intake Audit Ledger* | **Check Delivery** | माल चेक करें |
| *Discrepancy Reconciliation Flagged* | **Missing Items Found** | कम सामान मिला |
| *AI Packet Count* | **Camera Count** | कैमरे की गिनती |
| *Invoiced Bill Quantity* | **Bill Quantity** | पर्ची का हिसाब |
| *Unreceived Shortage* | **Missing Items** | कितना माल कम है |
| *Financial Discrepancy Amount* | **Money to Deduct** | काटने वाले पैसे |
| *Sale Intercepted / Expired Stock* | **Stop: Expired Item** | रुकावट: एक्सपायर्ड माल |
| *Distributor Credit Protection* | **Return for Full Refund** | डिस्ट्रीब्यूटर को वापस करें |
| *Soundbox Broadcast Hub* | **Voice Speaker** | बोलने वाला साउंडबॉक्स |
| *Secondary Customer Mirror* | **Customer Screen** | ग्राहक की स्क्रीन |
| *Daily Loss Prevented Meter* | **Money Saved Today** | आज की बचत |

---

## 📐 5. Icon System: Lucide Vector Outline Icons

Instead of random colored emojis, Kirana Rakshak uses clean 1.5px–2px stroke **Lucide vector icons**:

| Screen / Feature | Old Emoji | Lucide Icon Name | Visual Representation |
| :--- | :---: | :--- | :--- |
| **Delivery Intake** | 📦 | `package` | Clean square box outline |
| **Camera Viewfinder** | 📷 | `camera` | Classic camera outline |
| **Missing Item Alert** | ⚠️ | `alert-triangle` | Triangle with exclamation |
| **Expired Sale Stop** | 🛑 | `shield-alert` / `octagon-x` | Octagon stop shield |
| **Voice Assistant** | 🎙️ | `mic` | Studio microphone outline |
| **Speaker / Soundbox** | 🔊 | `volume-2` | Loudspeaker with sound waves |
| **Store Name** | 🏪 | `store` | Kirana storefront roof |
| **Notification Bell** | 🔔 | `bell` | Bell with alert badge |
| **Arrow Action** | ↗ | `arrow-up-right` | Clean 45-degree arrow |
| **Confirm / Done** | ✓ | `check` | Checkmark |
| **Cancel / Close** | ✕ | `x` | Dismiss cross |
| **Location / GPS** | 📍 | `map-pin` | Geographic pin |
| **Flash / Speed** | ⚡ | `zap` | High-voltage electric bolt |
| **Bill / Receipt** | 📄 | `receipt` / `file-text` | Clean folded bill document |

---

## 📱 6. Screen-by-Screen Layout Guide

### Screen 1: Check Delivery (Audit Dashboard)
* **Top Bar:** Shop name (`store` icon), Shopkeeper name (*Ramesh Bhai*), Quick Add (`plus` icon), Notification Bell (`bell` icon with red dot).
* **Filter Pills:** `Check Delivery` (Active Black Pill), `Customer Billing`, `Cold Storage`, `Vendors`.
* **Featured Action Card:** Dark striped capsule banner:
  * Left: Lime squircle with `zap` icon.
  * Center: *"Missing Items Found: Rajesh Nestle Shortage (-4 Packs | ₹56)"*.
  * Right: White circle button with `arrow-up-right`.
* **Two Bento Cards:**
  * Left Card: *"Camera Count"* $\rightarrow$ `20` / `24 on bill` with `package` icon.
  * Right Card: *"Expiry Risk"* $\rightarrow$ Circular countdown gauge showing `-4d` with `shield-alert` icon.
* **Weekly Savings Card:** Clean capsule bars showing *"Money Saved Today: ₹1,840"* with Friday/Saturday savings.

---

### Screen 2: 144Hz Live Camera Viewfinder
* **Viewfinder Box:** 50MP Ultrawide feed with smooth 32px rounded corners.
* **Floating Status Tags:**
  * Top-Left: `sun` icon $\rightarrow$ *"Light Glare Filter ON"*.
  * Top-Right: `zap` icon $\rightarrow$ *"144 FPS Speed"*.
  * Bottom-Left: `map-pin` icon $\rightarrow$ *"Location: Bangalore Market"*.
* **Tracking Boxes:** Glowing electric lime rectangles around food packets (*"Maggi #1...20: Verified"*).
* **Bill OCR Card:**
  * Left box: *"Bill Quantity: 24"*
  * Right box: *"Camera Count: 20"*
* **Bottom Paired Button:** `[ Flag 4 Missing Items ]` + `[ arrow-up-right ]`.

---

### Screen 3: Missing Items Warning (Short Delivery)
* **Card Style:** Dark Obsidian `#151618` card with subtle diagonal stripes.
* **Header Tag:** Amber badge $\rightarrow$ *"Delivery Shortage Caught"*.
* **Product Title:** *"Maggi 2-Minute Noodles (70g)"*.
* **Simple Summary:**
  * Bill says: **24 packs**
  * Camera saw: **20 packs**
  * Missing: **4 packs**
  * Money to Deduct: **₹56.00**
* **Security Seal:** `shield-check` icon with *"Location & Time Verified (NavIC L5)"*.
* **Action Buttons:**
  * Primary Button: `[ Deduct ₹56 from Bill ]` + `[ check ]` circle button in lime.
  * Secondary Button: `Vendor Gave 4 Missing Packs` (Updates count to 24).

---

### Screen 4: Stop: Expired Item (Checkout Gate)
* **Card Style:** Dark Obsidian card with pulsing red warning border.
* **Header Tag:** Red badge $\rightarrow$ *"Sale Blocked: Expired Item"*.
* **Haptic Signal:** *"Vibrating Phone Alert (500ms)"*.
* **Circular Risk Dial:** Large round gauge with red danger arc showing **"-4 Days Expired"**.
* **Product:** *"Parle-G Gold (100g) · Batch #B26-084"*.
* **Helpful Tip:** *"Zero loss: Return to Parle vendor within 30 days for 100% replacement."*
* **Action Buttons:**
  * Primary: `[ Pull Fresh Pack from Shelf ]` + `[ x ]` circle button.

---

### Screen 5: Voice Speaker (Hindi Soundbox)
* **Card Style:** Clean white bento card with `volume-2` and `mic` icons.
* **Waveform Visualizer:** Animated capsule bars moving to voice pitch.
* **Simple Conversation Box:**
  * **You Asked:** *"Rajesh vendor ne kitna kam maal diya hai?"*
  * **Speaker Replied:** *"Rajesh vendor se 4 packet Maggi kam aaye the, kul ₹56 kaatne baaki hain."*
* **Bottom Action:** `[ mic icon ]  Tap to Speak in Hindi`.

---

## 💻 7. Ready-to-Use Jetpack Compose Kotlin Code

Copy-paste these exact design tokens into your Android Studio project under `ui/theme/`:

### `Color.kt`
```kotlin
package com.kiranarakshak.app.ui.theme

import androidx.compose.ui.graphics.Color

// Primary Brand Colors (High-Contrast Utilitarian)
val ElectricLime = Color(0xFFD4F639)
val DeepCharcoal = Color(0xFF151618)
val WarmEggshell = Color(0xFFF7F7F5)
val CardWhite    = Color(0xFFFFFFFF)

// Status & Alert Colors
val DangerRed    = Color(0xFFEF4444)
val WarningAmber = Color(0xFFF59E0B)
val SuccessGreen = Color(0xFF10B981)
val MutedSlate   = Color(0xFF76787E)
val LightDivider = Color(0x0F000000)
```

### `Shape.kt`
```kotlin
package com.kiranarakshak.app.ui.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Shapes
import androidx.compose.ui.unit.dp

val KiranaRakshakShapes = Shapes(
    small = RoundedCornerShape(16.dp),    // Badges & Filter chips
    medium = RoundedCornerShape(24.dp),   // Sub-cards & dialogs
    large = RoundedCornerShape(32.dp),    // Bento grid cards & Viewfinder
    extraLarge = RoundedCornerShape(9999.dp) // Continuous Pill buttons & Dock
)
```

### `Theme.kt`
```kotlin
package com.kiranarakshak.app.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable

private val KiranaLightColorScheme = lightColorScheme(
    primary = DeepCharcoal,
    onPrimary = CardWhite,
    primaryContainer = ElectricLime,
    onPrimaryContainer = DeepCharcoal,
    secondary = ElectricLime,
    onSecondary = DeepCharcoal,
    background = WarmEggshell,
    onBackground = DeepCharcoal,
    surface = CardWhite,
    onSurface = DeepCharcoal,
    error = DangerRed,
    onError = CardWhite
)

@Composable
fun KiranaRakshakTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = KiranaLightColorScheme,
        shapes = KiranaRakshakShapes,
        typography = KiranaTypography,
        content = content
    )
}
```

---

## 📱 7. Authentic iQOO 15 Flagship Physical Form Factor & Chassis

The UI prototype renders directly inside an accurate **iQOO 15 flagship smartphone frame**:

1. **Outer Chassis & Frame Engineering:**
   * **Dimensions:** 6.85-inch flat panel, 8.14mm ultra-slim profile, aerospace-grade CNC aluminum matte frame (`#1A1D24` / Dark Titanium) with micro-chamfered edges.
   * **Outer Radius:** `rounded-[52px]` on the outer aluminum rail; `rounded-[42px]` active screen border.
   * **Antenna Insulation:** Symmetrical nano-injection antenna slits on the upper and lower aluminum edges.

2. **Physical Hardware Rails:**
   * **Top Rail (Hardware Sensors & Acoustics):**
     * **IR Blaster Diode:** Dedicated circular infrared emitter on the top frame used by Kirana Rakshak to actuate and lock store deep-freezers into super-freeze mode.
     * **Secondary Noise-Canceling Microphone:** Dedicated acoustic pin-hole for hands-free Hindi voice filtering in noisy bazaars.
     * **Top Stereo Speaker Vent:** High-SPL acoustic chamber forming a symmetrical 130dB Soundbox with the bottom speaker.
   * **Right Rail (Physical Tactile Controls):**
     * **Volume Rocker:** Precision metallic volume toggle (`+` / `-`).
     * **Signature iQOO Orange Power Button:** Knurled power button with signature racing orange accent (`#FF5722`).

3. **Display & Front Bezel:**
   * **Screen:** 6.85" Samsung 2K M14 LEAD LTPO AMOLED (3168 × 1440, up to 144Hz, 6,000 nits peak brightness).
   * **Bezel Margin:** Ultra-narrow 1.35mm near-symmetrical bezels (93.8% screen-to-body ratio).
   * **Camera Cutout:** Ultra-compact centered **32MP circular punch-hole** (no iPhone-style Dynamic Island pill).
   * **Earpiece:** Micro-slit speaker grill flush with the top glass seam.

4. **Rear Chassis ("Monster Halo" Camera Module):**
   * Accessible via the 1-tap **`[ 🔄 View iQOO 15 Back (Monster Halo) ]`** toggle:
     * **50MP Sony IMX921 VCS True Color Main Camera** (1/1.56", OIS)
     * **50MP Ultra-Wide Camera** (119° FOV, whole-counter delivery scanning)
     * **50MP Sony IMX882 3x Periscope Telemacro** (inkjet expiry reading from 25cm)
     * **Color Spectrum Sensor** (circular sensor next to flash to defeat 50Hz tube light glare)
     * **Signature Legend BMW M-Motorsport Tri-Color Racing Stripe** (Blue / Black / Red).

---

## 🔗 Related Project Files
* **Grand Master Blueprint:** [master.md](../01_pitch/master.md)
* **Core Proposal:** [Kirana_Rakshak.md](../01_pitch/Kirana_Rakshak.md)
* **Interactive UI Prototype (iQOO 15):** [kiranaguard_behance_ui.html](../../prototype/kirana_rakshak_ui.html)
* **Hardware & Sensor Dossier:** [iQOO_15_Hackathon_Hardware_Dossier.md](../02_research/iQOO_15_Hackathon_Hardware_Dossier.md)
* **Engineering Specs:** [TECHNICAL_SPEC_AND_ROADMAP.md](../04_engineering/TECHNICAL_SPEC_AND_ROADMAP.md)
