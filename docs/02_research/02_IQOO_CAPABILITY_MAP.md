# 02_IQOO_CAPABILITY_MAP.md
## iQOO Flagship Hardware & Software Capability Matrix

**Document Version**: 1.0  
**Device Target**: iQOO 15 Flagship Architecture (Snapdragon 8 Elite Gen 5 / SM8750 + Supercomputing Chip Q3)  
**Operating System**: OriginOS 6 (Android 16 API Level 36 / 35 backwards-compatible)  
**Date**: September 25, 2026

---

### Executive Overview & Classification System

Every capability on the iQOO flagship is evaluated and classified into one of four operational categories to prevent architectural blind alleys during hackathon development:

* **Category A: High-impact, fully accessible, primary differentiator**  
  Direct, unprivileged Android SDK/NDK access available. High sensor fidelity or specialized compute acceleration. Enables defensible, winning prototypes that cannot be replicated on generic devices.
* **Category B: High-impact, partially accessible, requires validated workaround**  
  Powerful hardware component whose lowest-level vendor driver is proprietary or OEM-restricted, but can be fully utilized via public Android abstraction layers, Camera2 vendor tags, NDK bindings, or Qualcomm AI Engine delegates.
* **Category C: Standard capability, common to all smartphones**  
  Standard commodity Android features (e.g. basic GPS, generic touchscreen gestures, standard Bluetooth audio). Feasible, but carries zero competitive differentiation if used alone without sensor fusion.
* **Category D: Inaccessible or restricted; DO NOT RELY ON**  
  Requires root permissions, proprietary Vivo internal signing keys, NDA-restricted firmware interfaces, or carrier provisioning. Any hackathon architecture depending on Category D will fail.

---

### Detailed Subsystem Analysis

#### 1. Compute & AI Subsystem
* **Qualcomm Oryon CPU**: TSMC 3nm N3E process. 2x Prime cores running up to 4.32 GHz + 6x Performance cores running up to 3.53 GHz. Full 64-bit ARMv9.2-A with ARM NEON and FP16 vector pipelines. Unrestricted native multithreading via Android NDK C++ (`pthreads`, OpenMP).
* **Qualcomm Hexagon NPU V79**: Fused scalar, vector (Hexagon Vector eXtensions - HVX), and tensor (Hexagon Tensor Processor - HTP) micro-tile architecture delivering 80+ TOPS. Native support for INT4, INT8, and FP16 mixed precision.
* **Qualcomm Adreno 830 GPU**: Sliced architecture with dedicated compute units, supporting OpenCL 3.0 Full Profile, Vulkan 1.3, and Android NNAPI/GPU delegates.
* **vivo Supercomputing Chip Q3**: Dedicated display co-processor for real-time frame generation, dual-core display acceleration, and low-latency super-resolution.

#### 2. Display & Visual Subsystem
* **Panel**: 6.82-inch 2K (3168 x 1440) Samsung E7 / BOE Q10 LTPO AMOLED.
* **Refresh Rate**: 1 Hz – 144 Hz dynamic variable refresh rate.
* **Brightness & Color**: 1800 nits HBM (High Brightness Mode), up to 4500 nits local peak brightness; 10-bit color (1.07 billion colors), 100% DCI-P3 color gamut, HDR10+, Dolby Vision.
* **Touch Sampling**: 300 Hz normal touch sampling, 2000 Hz instantaneous gaming touch sampling rate.
* **PWM Dimming**: 2160 Hz high-frequency PWM + DC-like dimming for zero eye fatigue.

#### 3. Camera System Subsystem
* **Primary Wide Camera**: 50 MP Sony IMX921 VCS Bionic (1/1.56" sensor size, f/1.68 aperture, 23mm equivalent focal length, 1.0 µm pixel size binning to 2.0 µm, OIS + EIS, dual-pixel PDAF).
* **Periscope Telephoto Camera**: 50 MP Sony IMX882 (1/1.95" sensor size, f/2.57 aperture, 73mm equivalent 3x optical zoom, 100x digital zoom, sensor-shift OIS, minimum focus distance 15 cm for telephoto macro).
* **Ultra-Wide Camera**: 50 MP Samsung S5KJN1 (1/2.76" sensor size, f/2.05 aperture, 119° ultra-wide field of view, 15mm equivalent, macro autofocus up to 2.5 cm).
* **Front Camera**: 32 MP (1/2.74", f/2.45, 21mm equivalent).
* **Video Capabilities**: 8K @ 30fps, 4K @ 30/60fps, 1080p @ 30/60/120/240fps slow-motion; 10-bit Log video profile support.

#### 4. Sensor Suite Subsystem
* **6-Axis IMU (Inertial Measurement Unit)**: STMicroelectronics / Bosch Sensortec combo (3-axis Accelerometer $\pm 16g$ + 3-axis Gyroscope $\pm 2000^\circ/\text{s}$). Polling rates up to 200 Hz via standard API, up to 400–800 Hz via `SensorDirectChannel` (ashmem / hardware buffer).
* **3-Axis Magnetometer / E-Compass**: Asahi Kasei AK09918 (range $\pm 4900\,\mu\text{T}$, resolution $0.15\,\mu\text{T/LSB}$).
* **Color Spectrum Sensor**: Dedicated multi-channel spectral sensor measuring ambient color temperature (CCT in Kelvin), spectral distribution, and flicker frequency (50/60 Hz and PWM).
* **Triple Ambient Light Sensors (ALS)**: 360-degree ambient illuminance detection (front display, rear camera module, lateral frame) measuring 0 to 100,000+ lux.
* **3D Ultrasonic In-Display Fingerprint Sensor**: Qualcomm 3D Sonic Gen 2 ultrasonic sensor. Emits acoustic ultrasound pulses (up to 18 MHz) to map epidermis acoustic impedance and papillary ridges.
* **Dual-Frequency Multi-GNSS**: Qualcomm FastConnect / GNSS engine supporting GPS (L1+L5), NavIC (L5 carrier band native), GLONASS (G1), Galileo (E1+E5a), BeiDou (B1I+B1c+B2a), QZSS (L1+L5).
* **Optical Proximity Sensor**: In-display under-screen optical proximity sensor.

#### 5. Audio & Acoustics Subsystem
* **Microphone Array**: Triple high-SNR MEMS microphones (bottom, top, rear camera housing). Capable of directional beamforming, acoustic noise cancellation, and high-SPL recording up to 130 dB without clipping. Sampling rates: 48 kHz standard, 96 kHz / 24-bit PCM supported via Android `AudioRecord`.
* **Stereo Loudspeakers**: Symmetrical dual stereo speakers with dedicated smart PA amplifiers. Extended frequency response down to 180 Hz, high-frequency output into the near-ultrasound spectrum (up to 22.5 kHz).
* **Haptics**: Large-displacement X-axis linear vibration motor (RichTap / AAC Technology), sub-10 ms transient response, ultra-wide resonant frequency bandwidth (150–220 Hz).

#### 6. Connectivity & Peripherals Subsystem
* **Infrared (IR) Blaster**: Top-frame mounted consumer infrared LED. Controllable via Android `ConsumerIrManager` for 36 kHz to 56 kHz pulse trains (NEC, RC5, RC6, Sony SIRC protocols).
* **Near Field Communication (NFC)**: NXP NFC controller supporting ISO/IEC 14443 Type A/B, ISO/IEC 15693 (NFC-V), FeliCa (NFC-F), and Android Host Card Emulation (HCE) via `HostApduService`. Supports dynamic energy harvesting reading.
* **USB-C 3.2 Gen 1**: 5 Gbps high-speed data bus, USB OTG Host mode (supporting USB Audio Class, USB Video Class UVC, CDC-ACM serial adapters), DisplayPort 1.4 Alternate Mode outputting up to 4K @ 60Hz.
* **Wi-Fi 7 (802.11be)**: Qualcomm FastConnect 7900 subsystem. Supports 320 MHz channels, 4K-QAM, Multi-Link Operation (MLO), peak throughput up to 5.8 Gbps.
* **Bluetooth 6.0**: High-accuracy Channel Sounding (sub-10 cm phase-based ranging), LE Audio, LC3 codec, Auracast broadcast audio.

#### 7. Battery & Thermal Subsystem
* **Battery**: 7000 mAh Silicon-Carbon (Si-C) ultra-high energy density dual-cell battery.
* **Charging**: 100W wired FlashCharge (supercapacitor-assisted flash charge), 40W Qi-compatible wireless charging, 10W reverse wireless charging.
* **Thermal Dissipation**: 8K-class 7000+ $\text{mm}^2$ dual-layer vapor chamber (VC) with superconducting graphite sheets, sustaining 15W+ thermal dissipation under continuous compute loads.

#### 8. Software & OS Subsystem
* **OS**: OriginOS 6 based on Android 16.
* **AI Runtimes**: Google LiteRT (Runtime v2 CompiledModel API), Qualcomm Neural Processing SDK (QNN / QAIRT v2.34+), ONNX Runtime Mobile (with QNN Execution Provider), MediaPipe Tasks (LLM Inference API, Vision, Audio), PyTorch ExecuTorch (Qualcomm backend).
* **OEM APIs**: vivo VCAP (vivo Computing Acceleration Platform), BlueLM open-source weights (1B / 7B), Jovi InCar SDK, OriginOS Intent Framework.

#### 9. Ecosystem & Interoperability Subsystem
* **vivo / iQOO Office Kit**: Cross-platform bridge between OriginOS and Windows/macOS. Supports zero-latency screen mirroring, bi-directional wireless drag-and-drop file transfer, unified shared clipboard, and virtual multi-window app projection.
* **BlueOS / BlueXLink**: Distributed IoT communication protocol for wearable and appliance synchronization.

---

### Comprehensive iQOO Capability Matrix

| Subsystem | Component / Feature | Hardware Spec | Software / API Access | Sensor Data Available | On-Device vs Cloud | Category | Hackathon Use Potential |
| :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| **Compute & AI** | Hexagon NPU V79 | 80+ TOPS, INT4/INT8/FP16, Micro Tile | LiteRT CompiledModel, QNN SDK, ONNX-ORT QNN EP | Internal NPU profiling counters via QNN System | 100% On-Device | **A** | **Massive**: Sub-millisecond vision models (YOLO11n in 0.63 ms), real-time SLMs (Llama 3.2 1B at 50 tok/s). |
| **Compute & AI** | Supercomputing Chip Q3 | Dedicated dual-core display co-processor | Vendor graphics pipeline / Display HAL (indirect) | Display frame timing, interpolated vs real frames | 100% On-Device | **B** | **High**: Zero-latency 144 Hz rendering for real-time 3D digital twins and low-overhead UI without stealing NPU cycles. |
| **Compute & AI** | Oryon CPU (8-Core) | 2x Prime @ 4.32GHz + 6x Perf @ 3.53GHz | Standard Java/Kotlin multithreading, NDK C++ pthreads | `proc/stat`, CPU governor, thread affinity masks | 100% On-Device | **A** | **High**: Heavy DSP preprocessing (FFT, Kalman filtering, wavelets) without throttling. |
| **Compute & AI** | Adreno 830 GPU | Sliced architecture, Ray Tracing, Vulkan 1.3 | Android Vulkan API, OpenCL 3.0 via NDK, LiteRT GPU | GPU load, rendering timings | 100% On-Device | **A** | **High**: FP16 floating-point neural operators, spatial rendering, point cloud rendering. |
| **Camera System** | Sony IMX921 Main (50MP) | 1/1.56", f/1.68, VCS, OIS | Android `Camera2` API, `ImageReader` RAW10 / YUV | Uncompressed pixel matrices, manual exposure, ISP metadata | 100% On-Device | **A** | **Massive**: High-speed real-time optical inspection, visual odometry, crack/distress detection. |
| **Camera System** | Sony IMX882 Telephoto (50MP) | 1/1.95", 3x optical, 100x digital, OIS, Macro 15cm | Android `Camera2` multi-camera physical stream | High-magnification optical crops, depth metadata | 100% On-Device | **A** | **Massive**: Distant infrastructure inspection (power lines, railway tracks, bridge joints, high signage). |
| **Camera System** | Samsung JN1 Ultrawide (50MP) | 1/2.76", 119° FoV, f/2.05, Macro 2.5cm | Android `Camera2` API | Wide spatial context, ultra-close microscopic texture | 100% On-Device | **A** | **High**: Pavement crack scanning, chemical test strip macro imaging, wide scene context. |
| **Sensor Suite** | 6-Axis IMU (Acc + Gyro) | $\pm 16g$, $\pm 2000^\circ/\text{s}$, high-rate | `SensorManager`, `SensorDirectChannel` (ashmem) | 3-axis linear acceleration, angular velocity (up to 400Hz) | 100% On-Device | **A** | **Massive**: Machine vibration harmonics (BPFI/BPFO), road roughness (IRI), pedestrian dead-reckoning. |
| **Sensor Suite** | NavIC + Multi-GNSS | Dual freq (L1+L5), native India NavIC L5 | `GnssMeasurementsEvent.Callback`, `LocationManager` | Raw pseudoranges, carrier frequency, satellite C/N0, Doppler | 100% On-Device | **A** | **Massive (India specific)**: Jamming detection, spoofing mitigation, sub-meter positioning in urban canyons. |
| **Sensor Suite** | Color Spectrum Sensor | Multi-channel spectral irradiance + flicker | Camera2 vendor metadata or native HAL sensor tag | Ambient CCT (Kelvin), Lux, light flicker frequency | 100% On-Device | **B** | **High**: Material colorimetry, chemical dipstick verification, ambient light classification. |
| **Sensor Suite** | Triple ALS (360° Light) | Front, rear, lateral silicon photodiodes | Android `Sensor.TYPE_LIGHT` (multiple sensors) | Multidirectional ambient illuminance in lux | 100% On-Device | **A** | **Medium**: Indoor/tunnel transition detection, vehicle headlight glare sensing. |
| **Sensor Suite** | 3D Ultrasonic Fingerprint | Qualcomm Sonic Gen 2 acoustic transducer | Android BiometricPrompt API (Raw echo restricted) | Pass/Fail authentication token, sub-epidermal match | On-Device Secure | **D** | **Restricted**: Raw ultrasound echo frames are locked inside Secure Processing Unit (SPU). |
| **Sensor Suite** | 3-Axis Magnetometer | Asahi Kasei AK09918, $\pm 4900\,\mu\text{T}$ | Android `Sensor.TYPE_MAGNETIC_FIELD` | 3-axis magnetic flux density ($\mu\text{T}$) | 100% On-Device | **A** | **High**: Magnetic anomaly detection, indoor structural beam detection, electrical conduit tracing. |
| **Audio & Acoustics** | Triple MEMS Mics | High-SNR, directional beamforming, 96 kHz | Android `AudioRecord` (audio source `UNPROCESSED`) | Raw 16/24-bit PCM acoustic time series | 100% On-Device | **A** | **Massive**: Acoustic bearing diagnostics, active ultrasound sonar (18–22.5 kHz), leak detection. |
| **Audio & Acoustics** | Stereo Loudspeakers | Extended passband up to 22.5 kHz near-ultrasound | Android `AudioTrack` (low-latency OpenSL ES / AAudio) | Transmitted acoustic pressure waves | 100% On-Device | **A** | **High**: FMCW sonar chirp emission for batteryless sonar ranging and acoustic echo sensing. |
| **Audio & Acoustics** | X-Axis Linear Haptic Motor | RichTap ultra-wideband (150–220 Hz) | Android `Vibrator` / `VibrationEffect.Composition` | Haptic waveform tactile feedback | 100% On-Device | **A** | **High**: Sensory substitution for visually impaired, tactile guidance, mechanical feedback cues. |
| **Peripherals** | Consumer IR Blaster | Top-frame emitter, 36–56 kHz carrier | Android `ConsumerIrManager` | Transmit arbitrary pulse train timing arrays | 100% On-Device | **A** | **Massive**: Universal legacy appliance bridge (AC, HVAC, TV, lab meters) without Wi-Fi/Zigbee gateways. |
| **Peripherals** | NFC Controller | ISO 14443-A/B, ISO 15693, FeliCa, HCE | `NfcAdapter`, `IsoDep`, `NfcV`, `HostApduService` | Raw APDU bytes, NDEF records, dynamic tag SRAM | 100% On-Device | **A** | **Massive**: Batteryless sensor interrogation (harvesting 3.3V/15mW from phone NFC field), physical tokens. |
| **Peripherals** | USB-C 3.2 Gen 1 (5 Gbps) | OTG Host + DisplayPort 1.4 Alt Mode | Android USB Host API (`UsbManager`, `UsbDeviceConnection`) | CDC-ACM serial data streams, UVC raw video matrices | 100% On-Device | **A** | **Massive**: Hardware expansion (thermal cameras, external microcontrollers, oscilloscopes, direct 4K monitor). |
| **Peripherals** | Bluetooth 6.0 Channel Sounding| Phase-Based Ranging (PBR) + RTT | Android 15/16 Bluetooth LE Ranging Manager | Multi-tone carrier phase, sub-10 cm distance estimates | 100% On-Device | **B** | **High**: Micro-ranging, anti-theft tagging, precision vehicle/docking proximity without UWB tag costs. |
| **Peripherals** | Wi-Fi 7 (802.11be) | FastConnect 7900, 320MHz, MLO | Android `WifiManager`, `WifiRttManager` (802.11az) | Fine Timing Measurement (FTM) RTT, CSI (via NDK/firmware) | 100% On-Device | **B** | **High**: Sub-meter indoor positioning, crowd RF density estimation, multi-gigabit mesh sharing. |
| **Ecosystem** | vivo / iQOO Office Kit | Cross-device screen mirroring & file sync | System-level preinstalled application & virtual bus | Multi-screen state, shared clipboard events, drag-and-drop | Hybrid Local | **A** | **Formal Requirement**: Seamless integration into live judging demo (dual-screen phone-to-PC dashboard). |
| **Ecosystem** | OriginOS Intent Framework | Jovi Smart Services, negative-one screen cards | OriginOS Atomic Services SDK | Contextual intent triggers, lock-screen interactive cards | 100% On-Device | **B** | **High**: Native OS-level widget integration showing real-time background sensor intelligence. |

---

### Hardware Synergies (Sensor Combinations for Unfair Advantage)

1. **Acoustic Radar & Sonar (Stereo Speakers + Mic Array)**:
   * Emitting 18–22 kHz FMCW chirps while capturing reflection echoes via triple mics.
   * Enables: Zero-camera, zero-light proximity ranging, liquid level detection in tanks, and structural void mapping.
2. **Precision Bearing & Kinematic Triangulation (NavIC L5 + E-Compass + 3x Periscope)**:
   * Cross-referencing India’s NavIC satellite constellation with high-rate magnetometer orientation and 3x optical periscope crops.
   * Enables: Sub-meter infrastructure geodetic surveying, power transmission line sag measurement, and railway track misalignment detection from a safe distance.
3. **Closed-Loop Visual-Infrared Automation (Main Camera + IR Blaster)**:
   * Vision model on Hexagon NPU observes an analog meter, physical thermostat, or machine display status; dynamically generates and transmits 38 kHz NEC/RC5 pulses via IR Blaster.
   * Enables: Zero-cloud, zero-hardware retrofitting of industrial and residential legacy equipment.
4. **Batteryless Field Sensing (NFC Energy Harvesting + Local SLM)**:
   * Phone's NFC coil induces 3.3V power into passive dynamic sensor tags (e.g. ST25DV) embedded in structures or soil; reads sensor memory in $< 15\text{ ms}$; on-device SLM explains findings immediately.
