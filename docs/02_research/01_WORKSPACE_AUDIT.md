# 01_WORKSPACE_AUDIT.md
## iQOO Hackathon 2026 Grand Finale — Comprehensive Workspace Audit

**Audit Date**: September 25, 2026  
**Auditor**: Senior Hackathon Research Strategist & Hardware-Aware AI Architect  
**Target Workspace**: `c:\Projects\Research`  
**Target Event**: iQOO Hackathon 2026 Grand Finale (Bengaluru, Oct 9–11, 2026)  
**Team**: HoloTrio (Sanskar Tiwari & Shambhavi Patil)

---

### 1. Complete Folder Tree of the Workspace

```text
c:\Projects\Research\
│
├── iQOO_15_Hackathon_Hardware_Dossier.md   [50,199 bytes | 2,250 lines]
├── problem-statement.txt                   [2,309 bytes  | 121 lines]
└── iqoo.jpg                                [144,944 bytes | Binary image]
```

*Note: No hidden dot-directories (`.git`, `.gemini`, `.vscode`) or build artifacts exist in this clean root directory.*

---

### 2. Important Files: Exact Paths, Sizes, and Detailed Purposes

| File Path | File Size | Content Type | Detailed Purpose & Description |
| :--- | :--- | :--- | :--- |
| `c:\Projects\Research\iQOO_15_Hackathon_Hardware_Dossier.md` | 50,199 bytes (2,250 lines) | Markdown Technical Dossier | Exhaustive technical and architectural dossier detailing the target competition smartphone (iQOO 15), Snapdragon 8 Elite Gen 5 architecture, Q3 Supercomputing Chip, camera array, IMU/sensor characteristics, Red Light / Green Light competition mechanics, Office Kit interoperability, sensor-to-problem matrices, and Day-1 validation checklists. |
| `c:\Projects\Research\problem-statement.txt` | 2,309 bytes (121 lines) | Plain Text / UTF-8 | Official dump of the Reskilll Grand Finale portal (`https://iqoo.reskilll.com/dashboard/iqoo-finale`). Details team registration (`HoloTrio`), submission deadlines (Phase 1 Idea Submission: 5 October 2026), member details, and verbatim text for the 6 official Grand Finale tracks. |
| `c:\Projects\Research\iqoo.jpg` | 144,944 bytes | JPEG Image | High-resolution UI screengrab from the Reskilll portal displaying the visual cards and track descriptions for the 6 official Grand Finale tracks. Serves as visual proof of track nomenclature and UI layout. |

---

### 3. Relevant Findings from Reading Existing Files

1. **Specific Hackathon Event & Track Structure**:
   * The team (`HoloTrio`) is officially registered for the **iQOO Hackathon 2026 Grand Finale**, hosted on the Reskilll platform.
   * **Location & Date**: WeWork Galaxy / Bengaluru, October 9–11, 2026.
   * **Phase 1 Submission Deadline**: October 5, 2026.
   * **6 Official Finale Tracks**:
     1. *Mobility*: Solutions for navigation, EVs, public transport, parking, or travel experiences.
     2. *Community App*: Community app connecting developers, professionals, or interest groups, with on-device AI at the core.
     3. *Smart Living*: AI-powered solutions for smart homes, IoT, connected devices, or everyday convenience.
     4. *Productivity*: AI solutions automating repetitive tasks, managing time/information, and improving workflows.
     5. *Developer Tools*: Tools to create, test, deploy, or collaborate faster using AI.
     6. *Open Innovation*: Open domain solutions built with a local or open-source model at the core.

2. **Crucial Competition Format Mechanics Uncovered**:
   * **Phone-First Hybrid Format**:
     * **Red Light Phase**: Strictly phone-first development. Developers must build directly using the provided iQOO 15 smartphone, its native Android environment, and onboard compute/sensors. Laptop development is restricted during this phase to force genuine mobile utility.
     * **Green Light Phase**: Cross-device development is unlocked. Laptops can be linked to cross-compile models, orchestrate backends, and package demo pipelines.
   * **vivo / iQOO Office Kit Scoring Requirement**:
     * The hackathon explicitly evaluates integration with the **vivo/iQOO Office Kit** (screen mirroring, cross-device drag-and-drop file sharing, shared clipboard, DisplayPort over USB-C 3.2 Gen 1). Solutions that seamlessly demonstrate dual-screen phone-to-PC workflows receive dedicated evaluation points.

3. **Core Target Hardware Specification (iQOO 15)**:
   * **SoC**: Qualcomm Snapdragon 8 Elite Gen 5 (3nm TSMC N3E, 2x Oryon Prime cores @ 4.32 GHz + 6x Oryon Performance cores @ 3.53 GHz).
   * **NPU**: Qualcomm Hexagon NPU V79 (fused scalar/vector/tensor accelerators, micro-tile inferencing, native INT4/INT8/FP16, 80+ TOPS).
   * **Display Co-processor**: vivo Supercomputing Chip Q3 (hardware frame interpolation, low-latency 2K/144Hz display driver, real-time super-resolution).
   * **Cameras**:
     * Primary: 50 MP Sony IMX921 (1/1.56", f/1.68, VCS bionic, OIS).
     * Telephoto: 50 MP Sony IMX882 Periscope (1/1.95", 3x optical zoom, 100x digital zoom, OIS, macro capable).
     * Ultra-wide: 50 MP Samsung JN1 (119° FoV, f/2.05, autofocus macro).
     * Front: 32 MP (f/2.45).
   * **Sensors**: 6-axis IMU (Accelerometer + Gyroscope), 3D Magnetometer / E-Compass, 3D Ultrasonic In-Display Fingerprint Sensor, Color Spectrum Sensor, Triple Ambient Light Sensors (360° lux & CCT), Dual-frequency GNSS (GPS L1+L5, NavIC L5, GLONASS, Galileo, BeiDou, QZSS), Optical Proximity sensor.
   * **Connectivity & Peripherals**: IR Blaster (Infrared transmitter for appliance control), NFC (Type A/B/F/V + HCE), Wi-Fi 7 (802.11be, 320MHz, MLO), Bluetooth 6.0 (Channel Sounding, LE Audio), USB-C 3.2 Gen 1 (5 Gbps with DisplayPort 1.4 alt mode).
   * **Battery & Thermals**: 7000 mAh Silicon-Carbon battery, 100W FlashCharge wired, 40W wireless, 8K-class double-layer vapor chamber.
   * **OS & Software**: OriginOS 6 based on Android 16.

---

### 4. Existing Assets, Datasets, Documentation, or Starter Code

* **Assets Present**:
  * Extensive reference documentation in `iQOO_15_Hackathon_Hardware_Dossier.md` covering Android API classes, sensor sampling limits, quantization targets, and evaluation criteria.
  * Official visual assets confirming track descriptions (`iqoo.jpg`).
  * Text dump of user portal metadata (`problem-statement.txt`).
* **Assets Missing / Not Present**:
  * No existing source code, git repository history, Android Studio projects, or Gradle builds.
  * No pre-trained `.tflite`, `.onnx`, or `.bin` model weights stored locally.
  * No sample datasets (e.g. IMU time-series samples, test audio clips, calibration images).

---

### 5. Existing Technologies, Frameworks, and Tools Referenced

From the hardware dossier, the following developer technologies are specifically targeted:
* **Mobile Runtimes**: Google LiteRT (Runtime v2 / CompiledModel API), Qualcomm Neural Processing SDK (QNN / QAIRT), ONNX Runtime Mobile (with QNN Execution Provider), MediaPipe Tasks (LLM Inference, Vision, Audio), ExecuTorch (Qualcomm backend).
* **Quantization & Model Conversion**: Qualcomm AI Hub (`qai-hub`), PyTorch `torchao` / `torch.export`, ONNX QDQ quantizer.
* **Android Native APIs**:
  * `android.hardware.SensorManager` (DIRECT_REPORT mode, sub-millisecond IMU polling up to 200–500 Hz).
  * `android.hardware.camera2` (Multi-camera physical streams, RAW10/RAW12 sensor capture, manual exposure/ISO).
  * `android.hardware.ConsumerIrManager` (IR Blaster carrier frequency transmission at 38 kHz).
  * `android.nfc.NfcAdapter` & `HostApduService` (ISO-DEP / HCE card emulation).
  * `android.location.LocationManager` & `GnssMeasurementsEvent.Callback` (Carrier-phase tracking, raw pseudorange, NavIC SNR monitoring).
  * `android.media.AudioRecord` (Unprocessed 48 kHz / 96 kHz 24-bit PCM acoustic intake).

---

### 6. Existing Ideas, Drafts, or Notes Found in the Workspace

The dossier outlines several initial architectural patterns:
1. **Sensor Fusion Dead-Reckoning (Pedestrian/Vehicle)**: Dual IMU + Barometer + NavIC fusion for GPS-denied indoor/tunnel navigation.
2. **Structural / Pavement Anomaly Detection**: High-rate accelerometer + periscope camera computer vision for pothole and infrastructure inspection.
3. **Acoustic Machine Health Diagnostics**: High-frequency microphone recording + spectrogram CNN inference. *(Caution: Addressed in City Battles; requires high differentiation).*
4. **Appliance Reverse-Engineering via IR/NFC**: Phone-controlled legacy appliance gateway using OriginOS quick shortcuts.

---

### 7. Reusable Components, Scripts, or Configurations

* **Code Templates in Dossier**:
  * Android Camera2 dual-stream preview setup.
  * High-frequency SensorEventListener with circular buffer.
  * AudioRecord raw PCM buffer pipeline.
  * LiteRT CompiledModel initialization snippet.
  * QNN context binary loading C++ template.

---

### 8. Gaps, Missing Elements, and Broken References

1. **Lack of Baseline Android Project Structure**: No `build.gradle.kts`, `AndroidManifest.xml`, or Kotlin/C++ scaffold exists in the repository.
2. **City Battle Winner Counter-Positioning**: The workspace initially lacked a structured record of which concepts won the Bengaluru, Pune, and Chennai City Battles. (Now gathered via live research: *Jugaad Agent*, *Kavach*, *Nazar*, *Nila*, *SecondSense*, *RightPosture*, *Pune Tree Rakshak*, *Tokito Companion*, *DailyFlow*, *Origo*).
3. **No Benchmarked Latency Artifact**: While Snapdragon 8 Elite specs were documented, concrete empirical latency tables for target SLMs (Llama 3.2 1B, Gemma 2 2B) and vision models on the Hexagon NPU were not codified in a dedicated artifact.

---

### 9. Opportunities Already Identified in Existing Notes

* **Unused Peripheral Combinations**:
  * **NavIC L5 + E-Compass + 3x Periscope Camera**: Extremely high-precision spatial bearing and landmark triangulation (ideal for Mobility / Infrastructure).
  * **IR Blaster + On-Device Vision**: Visual inspection of physical HVAC/appliances combined with instant IR protocol firing for zero-bridge smart living automation.
  * **Color Spectrum Sensor + Ultrawide Macro**: Physical surface material verification, chemical/turbidity dipstick testing, or skin lesion spectrometry.
  * **Supercomputing Chip Q3 Display Offloading**: Running real-time 3D digital twins or AR visualizations at 144 Hz without stealing cycles from the Snapdragon 8 Elite Hexagon NPU.
