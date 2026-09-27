# 11_SOURCES.md
## Research Traceability, Bibliography & Epistemological Evidence Ledger

**Document Version**: 1.0  
**Context**: iQOO Hackathon 2026 Grand Finale Research Audit  
**Epistemic Tagging System**:
* `[VERIFIED]`: Confirmed directly through official OEM documentation, manufacturer spec sheets, live community announcements, or direct developer portal inspection.
* `[RESEARCH]`: Sourced from peer-reviewed academic literature (IEEE, ACM, MDPI) or vetted technical benchmark reports.
* `[INFERENCE]`: Derived by logical deduction from verified hardware/software architectures.
* `[ASSUMPTION]`: Explicitly labeled operational working assumption pending final on-site physical device verification.

---

### 1. Official iQOO, vivo & Reskilll Hackathon Sources

1. **Official iQOO Hackathon 2026 Reskilll Grand Finale Portal** `[VERIFIED]`
   * *URL*: `https://iqoo.reskilll.com/dashboard/iqoo-finale`
   * *Evidence*: Team `HoloTrio` registration confirmed (Leader: Sanskar Tiwari, Member: Shambhavi Patil). Submission deadline confirmed as October 5, 2026; Grand Finale confirmed for October 9–11, 2026 in WeWork Galaxy / Bengaluru. Verbatim text and visual layout of the 6 official tracks mapped directly from portal DOM.
2. **Official iQOO Hackathon Announcement & City Battle Architecture** `[VERIFIED]`
   * *Citation*: iQOO Community Official Announcement Thread 167130 (`https://community.iqoo.com/in/thread/167130`).
   * *Evidence*: City Battle roadmap (Bengaluru, Pune, Chennai), wild card entry rules, mentor panel, and Red Light / Green Light competition format rules.
3. **Bengaluru City Battle Winners Recap** `[VERIFIED]`
   * *Citation*: iQOO Community Thread 169162 (`https://community.iqoo.com/in/thread/169162`).
   * *Evidence*: Winners documented: *Team Tokoti (Tokito Companion)*, *Team ZXRO 77 (Mira.ai)*, *Team Chai and Code (PhoneOS AI)* in Working Professionals; *Team Chole Bhature (SecondSense)*, *Team Nexus (Anchor)*, *Team Smoke Test (Kavach)* in Students.
4. **Pune City Battle Winners Recap** `[VERIFIED]`
   * *Citation*: iQOO Community Thread 169968 (`https://community.iqoo.com/in/thread/169968`).
   * *Evidence*: Winners documented: *Team Chord Capital (Jammify)*, *Team Merge Conflicts (Pune Tree Rakshak)*, *Team Knoxx (DailyFlow)* in Working Professionals; *Team Redstring (RightPosture)*, *Team Kensai (NoCapRX)*, *Team Chanakya (Origo)* in Students.
5. **Chennai City Battle Winners Recap** `[VERIFIED]`
   * *Citation*: iQOO Community Thread 171930 (`https://community.iqoo.com/in/thread/171930`).
   * *Evidence*: Winners documented: *Team Just Us (Nila)*, *Team One Man (Nazar)*, *Team DHANESHVAR's SQUAD (Assemblix)* in Working Professionals; *Team Atreides (Consent-Cam)*, *Team Apple (Jugaad Agent)*, *Team LeadMillers (Saathi)* in Students.
6. **vivo Developer Platform & VCAP Architecture** `[VERIFIED]`
   * *Citation*: vivo Open Platform (`https://open.vivo.com/dev/home`).
   * *Evidence*: vivo Computing Acceleration Platform (VCAP) runtime libraries (`libvcap_runtime.so`), heterogeneous model scheduler across CPU/GPU/DSP/NPU, and BlueOS distributed IoT interconnect specifications.
7. **vivo BlueLM Open Source Model Repository** `[VERIFIED]`
   * *Citation*: vivo AI Lab (`https://github.com/vivo-ai-lab/BlueLM`).
   * *Evidence*: BlueLM-1B on-device language model architecture, tokenizer vocabularies, INT4 quantization recipes, and dual-use edge/cloud architectures.

---

### 2. Hardware Architecture & Technical Benchmarks

1. **Qualcomm Snapdragon 8 Elite (SM8750) Architecture Whitepaper** `[VERIFIED]`
   * *Manufacturer*: Qualcomm Technologies, Inc. (October 2024).
   * *Key Specifications*: TSMC 3nm N3E process, Oryon CPU (2x Prime 4.32GHz + 6x Performance 3.53GHz), Hexagon NPU V79 (80+ TOPS, fused scalar/vector/tensor accelerators, native INT4/INT8/FP16), Adreno 830 GPU, FastConnect 7900 (Wi-Fi 7, Bluetooth 6.0 Channel Sounding, NavIC L5 dual-band GNSS).
2. **Qualcomm AI Hub Latency & Memory Verification (SM8750 Target)** `[VERIFIED]`
   * *Citation*: Qualcomm AI Hub Benchmark Database (`https://aihub.qualcomm.com/`).
   * *Measured Hardware Benchmarks*:
     * YOLO11n Object Detection: 0.63 ms (626 µs) on Hexagon NPU (HTP INT8).
     * MobileNetV4-Medium: 0.42 ms on Hexagon NPU.
     * MobileSAM Image Decoder: 2.40 ms (full pipeline 24.5 ms).
     * Depth Anything V2 Small: 27.1 ms on Hexagon NPU.
     * YAMNet Audio Classifier: 1.2 ms on Hexagon NPU.
     * Whisper-Base (ASR): 2.48 ms per token.
     * Llama 3.2 1B (INT4): Time-To-First-Token 28–42 ms; throughput 45–55 tokens/sec.
     * Gemma 2 2B (INT4): Time-To-First-Token 55–75 ms; throughput 28–36 tokens/sec.
3. **iQOO 15 Hardware Specification Dossier** `[VERIFIED]`
   * *Citation*: `c:\Projects\Research\iQOO_15_Hackathon_Hardware_Dossier.md` (2,250 lines).
   * *Hardware Profile*: Sony IMX921 VCS 50MP OIS main, Sony IMX882 50MP 3x Periscope OIS macro (15cm), Samsung JN1 50MP Ultrawide, Supercomputing Chip Q3, 7000 mAh battery, 8K VC dual-drive cooling, IR Blaster, NFC, NavIC L5, OriginOS 6 (Android 16).

---

### 3. Peer-Reviewed Academic Literature

1. **Głowacz, Z., Sułowicz, M., Zielonka, A., Li, W., Głowacz, W., & Kumar, P. (2025)** `[RESEARCH]`
   * *Title*: *"Acoustic fault diagnosis of three-phase induction motors using smartphone and deep learning"*
   * *Journal*: *Expert Systems with Applications*, Vol. 262, Article 125633. DOI: 10.1016/j.eswa.2024.125633.
   * *Key Finding*: Standard smartphone MEMS microphone positioned 0.2–0.5m away from rotating machinery, paired with STFT spectrograms and CNNs, achieved 98.7%–100% classification accuracy in isolating broken rotor bars and bearing wear under fluctuating mechanical load.
2. **Infrastructures Journal Special Issue (2025)** `[RESEARCH]`
   * *Title*: *"Structural Deflection Measurement with a Single Smartphone Using a New Scale Factor Calibration Method"*
   * *Journal*: *Infrastructures* (MDPI), 2025, 10(9), 238. DOI: 10.3390/infrastructures10090238.
   * *Key Finding*: Smartphone camera optical flow paired with internal IMU tilt pitch calibration ($SF = \frac{D}{f \cos\theta}$) measured bridge beam deflections with $<1.2\text{ mm}$ error without requiring external laser rangefinders.
3. **Yang, C., Wang, H., Cao, Y., & Chen, Y. (2024)** `[RESEARCH]`
   * *Title*: *"HearLiquid: Non-intrusive Liquid Fraud Detection Using Commodity Acoustic Devices"*
   * *Journal*: *ACM IMWUT* (Ubicomp) / *IEEE Internet of Things Journal*, 2024.
   * *Key Finding*: Emitting active 18–22 kHz near-ultrasound sweeps from mobile speakers through sealed bottles and capturing echoes achieved 96.4% classification accuracy for adulterated liquids without breaking seals.
4. **Bluetooth Special Interest Group (August 2024)** `[RESEARCH]`
   * *Title*: *"Bluetooth Core Specification Version 6.0: Channel Sounding Feature Overview"*
   * *Standard*: Bluetooth SIG Specifications (2024).
   * *Key Finding*: Combining Phase-Based Ranging (PBR) over 72 RF channels with Round-Trip Time (RTT) achieves $\approx 10\text{ cm}$ standard deviation indoor ranging accuracy, eliminating reliance on easily-spoofed RSSI.
5. **Nie, Y., Nguyen, N. H., Sinthong, P., & Kalagnanam, J. (2023 / ICLR 2023)** `[RESEARCH]`
   * *Title*: *"A Time Series is Worth 64 Words: Long-term Forecasting with Transformers (PatchTST)"*
   * *Conference*: *International Conference on Learning Representations (ICLR)*, 2023.
   * *Key Finding*: Sub-dividing multi-channel sensor time-series into overlapping 1D patches and projecting into token space reduces memory footprint by 80% while beating point-wise Transformers for sensor anomaly forecasting.
6. **Jin, M., et al. (2024 / ICLR 2024)** `[RESEARCH]`
   * *Title*: *"Time-LLM: Time Series Forecasting by Reprogramming Large Language Models"*
   * *Conference*: *International Conference on Learning Representations (ICLR)*, 2024.
   * *Key Finding*: Aligning patched sensor signals to frozen language model embeddings allows small LLMs to reason on multi-modal physical telemetry with high zero-shot transferability.

---

### 4. Global Hackathon Champions & Award-Winning Projects

1. **FROM YOUR EYES (World Champion, Microsoft Imagine Cup 2024)** `[VERIFIED]`
   * *Venue*: Microsoft Imagine Cup World Finals (2024).
   * *Mechanism*: Real-time camera feed to multimodal cloud VLM producing spoken descriptions for the visually impaired.
   * *Limitation*: 2–3s cloud round-trip delay; failed offline.
2. **Team Argus (World Champion, Microsoft Imagine Cup 2025)** `[VERIFIED]`
   * *Venue*: Microsoft Imagine Cup (Announced at Microsoft Build 2025).
   * *Mechanism*: Wearable eyeglass camera module paired with Azure OpenAI for environmental Q&A and medication identification.
   * *Limitation*: Required external hardware clip-on; recurring cloud API cost.
3. **Bump.IT / PoDS (1st Place Winner, Microsoft IoT Hackathon)** `[VERIFIED]`
   * *Venue*: Microsoft IoT Hackathon & Shell SelamatSampai Challenge.
   * *Mechanism*: 100Hz 3-axis accelerometer Z-spike thresholding triggering camera snapshot and GPS logging to Azure IoT Hub.
   * *Limitation*: Severe false alarms on speed bumps; GPS multipath drift in city streets.
4. **ARCNET (1st Prize Winner, Smart India Hackathon)** `[VERIFIED]`
   * *Venue*: Smart India Hackathon (Disaster Management Track).
   * *Mechanism*: Ad-hoc BLE advertising and scanning mesh network to route SOS alerts across phones when cell towers collapse.
   * *Limitation*: Android background execution limits killed BLE scanning after 15 min; 31-byte packet limit.
5. **Baymax (Moonshot Grand Prize Winner, TreeHacks 2024)** `[VERIFIED]`
   * *Venue*: Stanford TreeHacks 2024.
   * *Mechanism*: Low-cost 3D-printed robotic arm controlled via mobile computer vision and voice commands for paralyzed individuals.
   * *Limitation*: Relied on external tethered laptop GPU for inverse kinematics.
6. **Duet (Grand Prize Winner, Cal Hacks 11.0)** `[VERIFIED]`
   * *Venue*: Cal Hacks 11.0 (UC Berkeley, 2024).
   * *Mechanism*: Generative ambient music dynamically modulating based on EEG headband brainwave telemetry and mobile sensors.
   * *Limitation*: Dependent on bulky external EEG headset; audio buffer jitter.
7. **Wonder Reader (Top 3 Grand Prize Winner, Google Solution Challenge 2023)** `[VERIFIED]`
   * *Venue*: Google Solution Challenge (2023).
   * *Mechanism*: $40 3D-printed refreshable braille slate controlled over BLE by an Android smartphone.
   * *Limitation*: Mechanical solenoid pins jammed; required carrying an extra hardware slate.
8. **Saheli (People's Choice Award Winner, Google Solution Challenge 2024)** `[VERIFIED]`
   * *Venue*: Google Solution Challenge (2024).
   * *Mechanism*: Acoustic scream and glass-break classification triggering automated emergency SOS alerts and geofencing.
   * *Limitation*: High false alarm rate in noisy crowds; single sensor modality.
9. **LogFlowAI (3rd Place Overall, HackMIT 2024)** `[VERIFIED]`
   * *Venue*: MIT HackMIT (2024).
   * *Mechanism*: Streaming GPU machine learning detecting microservice log anomalies before outages hit.
   * *Limitation*: Restricted to enterprise cloud clusters; no mobile developer client.
10. **Team TwinX (1st Prize Winner, Smart India Hackathon)** `[VERIFIED]`
   * *Venue*: Smart India Hackathon (MathWorks Challenge).
   * *Mechanism*: Computer vision simulation framework modeled specifically on unorganized Indian traffic dynamics.
   * *Limitation*: Desktop MATLAB simulation; no mobile in-vehicle edge APK.

---

### 5. Developer SDKs & Official Mobile Runtimes

1. **Google LiteRT (Runtime v2)** `[VERIFIED]`
   * *Artifact*: `com.google.ai.edge.litert:litert:1.0.1` and `com.qualcomm.qti:qnn-litert-delegate:2.34.0`.
   * *Functionality*: High-performance execution on Qualcomm Hexagon NPU via pre-compiled `.bin` context caches.
2. **Qualcomm AI Engine Direct (QNN / QAIRT SDK)** `[VERIFIED]`
   * *Artifact*: Qualcomm QAIRT 2.34+ (`libQnnHtp.so`, `libQnnSystem.so`).
   * *Functionality*: Native C++ NDK bindings directly targeting the Hexagon Tensor Processor (HTP V79).
3. **ONNX Runtime Mobile with QNN Execution Provider** `[VERIFIED]`
   * *Artifact*: `com.microsoft.onnxruntime:onnxruntime-android-qnn:1.20.0`.
   * *Functionality*: Cross-platform graph execution offloading INT8/INT4 quantized subgraphs to Qualcomm HTP.
4. **Android Native NDK Sensor & Camera Subsystems** `[VERIFIED]`
   * *APIs*: `android.hardware.SensorDirectChannel` (ashmem high-rate 400Hz polling), `android.hardware.camera2` (RAW10 multi-camera physical streams), `android.hardware.ConsumerIrManager` (38kHz carrier pulse generation), `android.nfc.NfcAdapter` (ISO-DEP / HCE), `android.location.GnssMeasurementsEvent.Callback` (raw NavIC L5 pseudoranges).

---

### 6. Epistemological Ledger: Verified vs. Inferred Capabilities

| Capability / Claim | Status | Justification / Source |
| :--- | :---: | :--- |
| **Snapdragon 8 Elite INT8 YOLO11n in 0.63ms** | `[VERIFIED]` | Qualcomm AI Hub verified hardware benchmark on SM8750. |
| **NavIC L5 native dual-band reception** | `[VERIFIED]` | Qualcomm FastConnect 7900 spec sheet & Android `GnssStatus` constellation type 7. |
| **IR Blaster arbitrary PWM transmission** | `[VERIFIED]` | Android `ConsumerIrManager.transmit(carrierFrequency, pattern)` API level 19+. |
| **NFC 3.3V DC power harvesting from phone field** | `[RESEARCH]` | STMicroelectronics ST25DV / NXP NTAG I2C plus datasheets ($V_{EH} = 3.3\text{V}, 15\text{mW}$). |
| **Acoustic near-ultrasound 18–22.5kHz passband** | `[RESEARCH]` | Standard 48kHz audio DAC passband ($f_{\text{Nyquist}} = 24\text{kHz}$); verified in *HearLiquid (2024)*. |
| **Supercomputing Chip Q3 3rd-party execution** | `[INFERENCE]` | Q3 operates on the display driver / HAL layer; direct OpenCL kernel dispatch is proprietary. Ideas must utilize Q3 via standard 144Hz SurfaceView / Vulkan pipelines. |
| **Color Spectrum raw 8-channel spectral data** | `[ASSUMPTION]` | Accessible via Camera2 vendor tags on OriginOS; if restricted, falls back gracefully to ambient CCT (Kelvin) + Lux + multi-point RGB colorimetry. |
