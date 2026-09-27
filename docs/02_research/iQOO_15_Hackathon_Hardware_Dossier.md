# iQOO 15 --- Hackathon Hardware & AI Capability Dossier

**Purpose:** A practical technical reference for designing an iQOO
Hackathon 2026 project around the actual capabilities of the iQOO 15.

**Scope:** Hardware, sensors, cameras, compute, AI, connectivity,
battery, thermal system, display, I/O, software capabilities, hackathon
use cases, and the highest-value capabilities to exploit.

> **Important:** This document distinguishes between (1) specifications
> publicly documented by iQOO, Qualcomm, or iQOO Community documentation
> and (2) engineering opportunities inferred from those capabilities. It
> does **not** invent undisclosed PCB-level component numbers, sensor
> part numbers, kernel support, or NPU access APIs.

------------------------------------------------------------------------

## 1. Executive Summary

The iQOO Hackathon 2026 is explicitly a **phone-first** competition
built around the **iQOO 15**. The official hackathon announcement says
participants use the iQOO 15 during the Red Light phase, can combine
phone and laptop workflows during the Green Light phase, and are
evaluated on phone-first execution, AI integration, Office Kit usage,
real-world relevance, and final pitch quality.

The iQOO 15 is therefore best treated as a **portable multimodal
computing and sensing platform**, not merely as an Android screen.

### The most important capabilities for a hackathon

1.  **Snapdragon 8 Elite Gen 5** --- flagship CPU/GPU/NPU platform for
    demanding local computation.
2.  **Supercomputing Chip Q3** --- dedicated graphics/AI-oriented
    companion chip with rendering and ray-tracing capabilities.
3.  **Triple 50 MP rear cameras** --- main + ultrawide + 3x periscope,
    enabling visual AI across different distances and fields of view.
4.  **Microphone/audio input** --- enables acoustic intelligence and
    multimodal audio + vision systems.
5.  **Accelerometer + gyroscope** --- physical movement, vibration and
    orientation sensing.
6.  **E-compass** --- heading/direction context.
7.  **GNSS including NavIC** --- location and geospatial context.
8.  **Color-spectrum sensor + triple ambient-light sensors** ---
    environmental/light sensing.
9.  **NFC + IR blaster** --- interaction with physical objects and
    appliances.
10. **USB-C 3.2 Gen 1 + Bluetooth 6.0** --- possible bridge to external
    peripherals/sensor hardware, subject to hackathon rules and Android
    access.
11. **7000 mAh battery + 100 W wired + 40 W wireless charging** ---
    supports long field demonstrations and sustained use.
12. **Large vapor-chamber cooling system** --- important for sustained
    AI/computer-vision workloads.
13. **IP68/IP69 protection** --- useful for controlled
    outdoor/field-oriented concepts, while avoiding exposure beyond the
    device's rated conditions.
14. **OriginOS 6 based on Android 16** --- modern Android software
    environment.

------------------------------------------------------------------------

# 2. Hackathon Context

The official iQOO Hackathon 2026 announcement describes the event as
India's phone-first hackathon series and specifically states that the
challenge uses the iQOO 15.

### Red Light

Build primarily using the iQOO smartphone.

### Green Light

Combine smartphone and laptop workflows.

### Official evaluation themes

The official announcement identifies:

-   Phone-first execution
-   AI integration
-   Office Kit usage
-   Real-world relevance
-   Final pitch quality

### Design implication

A strong project should answer:

> **Why does this solution need the iQOO 15?**

A weak implementation merely runs an ordinary app on the phone.

A stronger implementation makes the iQOO 15 itself part of the sensing,
inference, computation, interaction, or field-deployment architecture.

------------------------------------------------------------------------

# 3. iQOO 15 at a Glance

  -----------------------------------------------------------------------
  Category                            iQOO 15 capability
  ----------------------------------- -----------------------------------
  Processor                           Qualcomm Snapdragon 8 Elite Gen 5

  Dedicated companion chip            Supercomputing Chip Q3

  CPU/GPU/NPU                         Oryon CPU / Adreno GPU / Hexagon
                                      NPU platform through Snapdragon
                                      architecture

  RAM                                 12 GB or 16 GB

  Storage                             256 GB or 512 GB in Indian retail
                                      configurations documented by iQOO

  Operating system                    OriginOS 6 based on Android 16

  Display                             6.85-inch Samsung 2K M14 LEAD
                                      AMOLED

  Resolution                          3168 × 1440

  Refresh rate                        Up to 144 Hz

  Main camera                         50 MP Sony IMX921

  Main sensor size                    1/1.56-inch

  Main stabilization                  OIS / iQOO VCS-related
                                      stabilization

  Ultra-wide camera                   50 MP

  Ultra-wide sensor size              1/2.76-inch

  Periscope                           50 MP Sony IMX882

  Periscope sensor size               1/1.95-inch

  Optical zoom                        3x

  Maximum advertised zoom             Up to 100x

  Front camera                        32 MP

  Battery                             7000 mAh typical

  Wired charging                      100 W

  Wireless charging                   40 W

  Fingerprint                         3D ultrasonic

  Motion sensors                      Accelerometer + gyroscope

  Direction                           E-compass

  Proximity                           Proximity sensor

  Environmental/light                 Color-spectrum sensor + triple
                                      ambient-light sensors

  Navigation                          GPS, GLONASS, BeiDou, Galileo,
                                      QZSS, GNSS, NavIC

  Wi-Fi                               Wi-Fi 7

  Bluetooth                           Bluetooth 6.0

  NFC                                 Yes

  IR blaster                          Yes

  USB                                 USB-C 3.2 Gen 1; display output
                                      supported

  SIM                                 Dual nano-SIM; eSIM support
                                      documented by iQOO Community

  Audio                               Stereo speakers + microphones

  Protection                          IP68 + IP69

  Antenna system                      iQOO Community documentation
                                      reports 23 antennas in a 360°
                                      arrangement

  Thickness                           8.14 mm Alpha / 8.17 mm Legend

  Weight                              216.2 g Alpha / 220 g Legend
  -----------------------------------------------------------------------

------------------------------------------------------------------------

# 4. Compute Architecture

## 4.1 Snapdragon 8 Elite Gen 5

The iQOO 15 is built around Qualcomm's Snapdragon 8 Elite Gen 5 mobile
platform.

For hackathon purposes, the important architectural blocks are:

``` text
                 Snapdragon 8 Elite Gen 5
                           |
        +------------------+------------------+
        |                  |                  |
       CPU                GPU                NPU
   Oryon CPU           Adreno GPU       Hexagon NPU
        |                  |                  |
        +------------------+------------------+
                           |
                    Qualcomm AI Engine
                           |
             +-------------+-------------+
             |                           |
      Multimodal AI                Computer Vision
      Sensor processing            Local inference
      Speech/audio                 Image processing
```

Qualcomm's AI architecture includes:

-   Qualcomm AI Engine
-   Oryon CPU
-   Adreno GPU
-   Hexagon NPU
-   Fused AI accelerator architecture
-   Scalar, vector and tensor accelerators
-   Direct Link
-   Micro Tile Inferencing
-   Support for INT4, INT8, INT16 and FP16 precision
-   Qualcomm Sensing Hub with dedicated micro-NPUs for audio and sensor
    workloads

### Hackathon use

Potential uses include:

-   On-device LLM inference
-   Small/quantized vision models
-   Speech/audio classification
-   Image classification
-   Object detection
-   OCR/document understanding
-   Pose estimation
-   Sensor fusion
-   Real-time multimodal inference
-   Offline AI
-   Edge AI with reduced cloud dependency
-   Long-running AI workloads when combined with thermal management

### Important engineering note

Do not assume that an arbitrary AI model can automatically run directly
on the Hexagon NPU.

Your implementation must use supported Android/Qualcomm/Google AI
frameworks and model runtimes available to the event environment.
Validate the exact runtime/API access on the provided device before
committing to an NPU-specific architecture.

------------------------------------------------------------------------

# 5. Supercomputing Chip Q3

iQOO positions the Q3 as a dedicated mobile graphics/computing chip.

Official iQOO material describes it as supporting:

-   Rendering
-   Ray tracing
-   AI-related graphics processing
-   Gaming-oriented frame processing
-   Cooperation with the Snapdragon platform

### Hackathon potential

The Q3 is relevant when your project needs:

-   Real-time graphics
-   3D visualization
-   AR-style overlays
-   Simulation
-   Visualization of sensor data
-   GPU-heavy rendering
-   Real-time image effects
-   Interactive 3D demonstrations

### High-value project opportunity

Instead of building a normal dashboard:

``` text
Sensor → Numbers → Dashboard
```

you can build:

``` text
Sensor + Camera
       ↓
3D / spatial reconstruction
       ↓
Real-time visual model
       ↓
Interactive decision interface
```

This makes the phone's compute and graphics capabilities visible during
the demo.

------------------------------------------------------------------------

# 6. RAM and Storage

## RAM

The Indian iQOO 15 is documented with:

-   12 GB RAM
-   16 GB RAM

The memory technology is LPDDR5X/LPDDR5X Ultra depending on the product
documentation/configuration.

### Hackathon use

Large RAM capacity is useful for:

-   Multiple AI models
-   Local vector databases
-   OCR pipelines
-   Image buffers
-   Video frames
-   Sensor buffers
-   Multimodal pipelines
-   Large web applications
-   Local development tools
-   Simultaneous camera + AI + UI processing

------------------------------------------------------------------------

## Storage

iQOO documents 256 GB and 512 GB configurations for the Indian device.

The platform uses UFS 4.1 storage.

### Hackathon use

Useful for:

-   Local model files
-   Embedding databases
-   Sensor recordings
-   Audio datasets
-   Video samples
-   Offline maps
-   RAG knowledge bases
-   Cached AI assets
-   Logs
-   Demo data

------------------------------------------------------------------------

# 7. Camera System

The camera system is one of the most important iQOO 15 capabilities for
an AI hackathon.

## 7.1 Main Camera

### Specifications

-   50 MP
-   Sony IMX921
-   1/1.56-inch sensor
-   OIS
-   iQOO VCS / stabilization technologies
-   Main wide camera

### Hackathon applications

-   Object detection
-   Scene understanding
-   OCR
-   Document analysis
-   Plant analysis
-   Infrastructure inspection
-   Road analysis
-   Product recognition
-   Machine inspection
-   Medical/educational visual assistance where appropriate
-   AR overlays
-   Visual anomaly detection

### Why it matters

The main camera is the general-purpose visual sensor.

------------------------------------------------------------------------

# 8. 7.2 Ultra-Wide Camera

### Specifications

-   50 MP
-   1/2.76-inch sensor

### Hackathon applications

Useful when the system needs:

-   Wide environmental context
-   Room scanning
-   Large machinery
-   Road/environment analysis
-   Group scenes
-   Architecture
-   Indoor mapping
-   Situational awareness

### Important advantage

A normal AI camera system may only see a narrow region.

The ultrawide camera can provide additional context around the target.

------------------------------------------------------------------------

# 9. 7.3 3x Periscope Camera

### Specifications

-   50 MP
-   Sony IMX882
-   1/1.95-inch sensor
-   3x optical zoom
-   Up to 100x advertised zoom
-   CIPA 4.0 stabilization claim in iQOO's product material

### This is one of the most interesting hackathon components.

The periscope camera allows the phone to perform:

> **remote visual inspection**

without physically moving close to the object.

### Potential applications

-   Reading distant signs
-   Infrastructure inspection
-   Electrical equipment inspection
-   Road/traffic observation
-   Wildlife observation
-   Agriculture
-   Building inspection
-   Equipment monitoring
-   Public-space analysis
-   Long-range object detection

### Important distinction

Do not design around "100x zoom" as if all 100x output is equivalent to
native optical information.

The hardware provides 3x optical zoom; higher magnifications rely on
computational/digital processing.

------------------------------------------------------------------------

# 10. Front Camera

### Specifications

-   32 MP
-   f/2.2
-   90° field of view

### Hackathon applications

-   Face presence
-   User interaction
-   Selfie/video input
-   Pose-related interfaces
-   Video communication
-   User-aware UI
-   Accessibility interfaces

For privacy-sensitive applications, process locally whenever feasible
and minimize retention of biometric/face data.

------------------------------------------------------------------------

# 11. Accelerometer

## What it measures

Linear acceleration along device axes.

### It can detect

-   Movement
-   Shaking
-   Impact
-   Vibration
-   Orientation changes
-   Motion patterns
-   Device gestures

### Hackathon applications

#### 1. Vibration sensing

Potentially useful for:

-   Machinery
-   Vehicles
-   Structural vibration
-   Device health
-   Physical interactions

#### 2. Motion classification

Examples:

``` text
Walking
Running
Vehicle
Cycling
Stationary
Impact
Fall-like event
Mechanical vibration
```

#### 3. Gesture interface

The phone itself can become a controller.

------------------------------------------------------------------------

# 12. Gyroscope

## What it measures

Angular velocity / rotational movement.

### Hackathon applications

-   Vehicle movement analysis
-   Rotation detection
-   Gesture recognition
-   Stabilization
-   Orientation-aware interfaces
-   Robotics interfaces
-   AR interactions
-   Equipment movement
-   Motion signatures

### Powerful combination

``` text
Accelerometer
      +
Gyroscope
      ↓
Inertial Motion Profile
      ↓
AI Classification
```

This is much more powerful than either sensor independently.

------------------------------------------------------------------------

# 13. E-Compass

The iQOO 15 includes an electronic compass.

### Provides

-   Heading
-   Direction
-   Orientation relative to Earth's magnetic field

### Hackathon applications

-   Navigation
-   Field inspection
-   Geospatial annotation
-   Direction-aware AI
-   Search-and-rescue concepts
-   Infrastructure mapping
-   Location-aware AR

### Example

``` text
Camera → "What is this?"
GPS → "Where am I?"
Compass → "Which direction am I facing?"
AI → "What should I do?"
```

This creates a useful spatial intelligence system.

------------------------------------------------------------------------

# 14. Proximity Sensor

The proximity sensor detects nearby objects.

### Existing use

-   Detecting when the phone is close to the user's face during calls
-   Screen behavior

### Hackathon potential

Less valuable as a standalone sensor, but useful as a secondary signal
for:

-   Near-field interaction
-   User-presence detection
-   Context-aware interfaces
-   Touchless interactions

------------------------------------------------------------------------

# 15. Color Spectrum Sensor

The iQOO Community documentation lists a color-spectrum sensor.

### Potential information

Environmental light/color characteristics.

### Hackathon applications

-   Lighting analysis
-   Color-aware systems
-   Environmental monitoring
-   Visual calibration
-   Indoor environment classification
-   Lighting-aware camera pipelines

### Important limitation

The public documentation does not provide a complete developer-facing
raw-data specification for this sensor.

Do not assume every spectral channel is exposed through a standard
Android API.

------------------------------------------------------------------------

# 16. Triple Ambient-Light Sensors

iQOO Community documentation identifies triple ambient-light sensors.

### Primary purpose

-   Adaptive brightness
-   Eye-protection / display environment handling

### Hackathon opportunities

Potentially useful for:

-   Ambient-light classification
-   Indoor/outdoor detection
-   Lighting-aware systems
-   Contextual UI
-   Camera/environment experiments

Again, verify whether raw sensor streams are exposed to third-party
Android applications on the event device.

------------------------------------------------------------------------

# 17. Ultrasonic Fingerprint Sensor

The iQOO 15 uses a 3D ultrasonic fingerprint scanner.

### Why ultrasonic matters

Ultrasonic fingerprint sensing works differently from conventional
optical fingerprint imaging.

### Hackathon potential

-   Local authentication
-   Secure app access
-   User verification
-   Privacy-preserving workflows
-   Secure local data vault
-   Physical-device identity

### Interesting architecture

``` text
Fingerprint
    ↓
Local authentication
    ↓
Encrypted local workspace
    ↓
AI analysis
```

This could be useful when designing an AI tool that handles sensitive
information.

------------------------------------------------------------------------

# 18. GPS / GNSS / NavIC

The iQOO 15 supports multiple navigation systems documented by iQOO
Community:

-   GPS
-   GLONASS
-   BeiDou
-   Galileo
-   QZSS
-   GNSS
-   NavIC

### Hackathon applications

-   Geospatial AI
-   Location tagging
-   Route intelligence
-   Field inspection
-   Agriculture
-   Mobility
-   Public infrastructure mapping
-   Emergency response
-   Asset tracking
-   Citizen reporting

### Powerful combination

``` text
GPS
+
Camera
+
Compass
+
AI
```

can turn the phone into a **geospatial intelligence device**.

------------------------------------------------------------------------

# 19. Microphone / Audio Input

The phone provides microphone input and stereo audio output.

For a hackathon, audio is particularly interesting because it is an
information channel independent of the camera.

### Possible acoustic AI applications

-   Machine sound classification
-   Alarm detection
-   Voice commands
-   Environmental sound recognition
-   Mechanical anomaly detection
-   Leak/acoustic experiments
-   Accessibility
-   Speech-to-text
-   Audio event detection

### Very interesting sensor fusion

``` text
Microphone
+
Accelerometer
+
Camera
       ↓
Multimodal physical-world diagnosis
```

This can be much stronger than camera-only AI.

------------------------------------------------------------------------

# 20. NFC

The iQOO 15 supports NFC.

### Hackathon applications

-   NFC identity tags
-   Smart asset tracking
-   Object onboarding
-   Authentication
-   Contactless workflows
-   Physical-to-digital linking
-   Maintenance records

### Example

A technician taps an NFC tag on a machine:

``` text
NFC
 ↓
Machine ID
 ↓
Retrieve maintenance history
 ↓
Camera scans machine
 ↓
AI checks visible condition
 ↓
Sensor/audio data verifies state
```

------------------------------------------------------------------------

# 21. IR Blaster

The iQOO 15 includes an IR blaster.

It can control compatible appliances such as:

-   TVs
-   ACs
-   Set-top boxes
-   Other IR-controlled devices

### Hackathon potential

This is an unusual physical-world output channel.

Instead of:

``` text
AI → recommendation
```

you can create:

``` text
AI
 ↓
Decision
 ↓
IR command
 ↓
Physical appliance changes state
```

### Example

An AI smart-room system could:

-   detect room state
-   infer user intent
-   control AC
-   control TV
-   create energy-saving routines

The IR blaster turns the phone into an **AI controller for legacy
devices**.

------------------------------------------------------------------------

# 22. USB-C 3.2 Gen 1

iQOO Community documentation identifies USB-C 3.2 Gen 1 with display
output support.

### Hackathon importance

USB-C can potentially serve as a bridge between the phone and external
peripherals.

Possible external devices:

-   ESP32
-   Arduino-class controllers
-   USB sensors
-   USB microphones
-   USB serial devices
-   External storage
-   Development boards

### Architecture

``` text
External Sensor
      ↓
USB-C / OTG
      ↓
iQOO 15
      ↓
Local AI
      ↓
Decision
```

### Critical rule

Whether external hardware is permitted during a specific hackathon phase
must be confirmed with the organizers. The official format emphasizes
phone-first execution, so external hardware should be treated as
optional until the event rules explicitly allow it.

------------------------------------------------------------------------

# 23. Bluetooth 6.0

Bluetooth 6.0 provides a wireless interface for compatible peripherals.

### Potential hackathon uses

-   BLE sensors
-   ESP32 sensor nodes
-   Wearables
-   Environmental sensors
-   Robotics
-   External microphones
-   IoT devices
-   Beacon-based systems

### Strong architecture

``` text
BLE Sensor Node
       ↓
Bluetooth
       ↓
iQOO 15
       ↓
Sensor Fusion
       ↓
On-device AI
```

This allows the iQOO to act as the central intelligence hub.

------------------------------------------------------------------------

# 24. Wi-Fi 7

The iQOO 15 supports Wi-Fi 7.

### Hackathon uses

-   High-speed local data transfer
-   Edge-device communication
-   Camera streaming
-   Local server communication
-   IoT networks
-   Device-to-device workflows
-   Large dataset transfer
-   High-bandwidth local AI pipelines

The value is particularly high when the phone communicates with a nearby
device while still keeping the main user interaction on the phone.

------------------------------------------------------------------------

# 25. 5G / Cellular Connectivity

The iQOO 15 is a 5G smartphone.

### Potential uses

-   Cloud fallback
-   Remote monitoring
-   Real-time collaboration
-   Field data upload
-   Emergency communication
-   Distributed sensing

### Recommended architecture

Do not make cloud access mandatory if your idea can work locally.

Prefer:

``` text
LOCAL AI
   ↓
Result immediately
   ↓
Cloud = optional enhancement
```

This makes the solution more robust in low-connectivity environments.

------------------------------------------------------------------------

# 26. 23-Antenna System

iQOO Community documentation reports a 23-antenna 360° omnidirectional
system.

### Hackathon relevance

The antenna system matters indirectly:

-   Connectivity robustness
-   5G communication
-   Wi-Fi
-   Bluetooth
-   Field operation

This is not normally something your application can directly program as
a sensor.

Treat it as an **infrastructure capability**, not a primary project
feature.

------------------------------------------------------------------------

# 27. Display

## Samsung 2K M14 LEAD AMOLED

Official iQOO specifications identify:

-   6.85-inch display
-   3168 × 1440 resolution
-   AMOLED
-   Up to 144 Hz refresh rate

### Hackathon applications

High-quality display is useful for:

-   AR-style interfaces
-   Sensor visualization
-   3D models
-   Real-time dashboards
-   Maps
-   Medical/technical visualizations
-   Multimodal AI feedback
-   Field instructions

### Important project opportunity

Don't only output text.

Use:

``` text
LIVE CAMERA
+
AI OVERLAY
+
MAP
+
SENSOR GRAPH
+
ACTION
```

to make the demo visually understandable.

------------------------------------------------------------------------

# 28. Battery

### Capacity

7000 mAh typical.

### Charging

-   100 W wired
-   40 W wireless

### Hackathon importance

A hackathon prototype may run:

-   Camera
-   microphone
-   sensors
-   AI
-   networking
-   display
-   logging

simultaneously.

Large battery capacity and fast charging make the device suitable for
sustained demonstrations.

------------------------------------------------------------------------

# 29. Thermal System

iQOO highlights an **8K-class vapor-chamber cooling system** on the iQOO
15 product page.

### Why this matters for AI

Continuous:

-   camera inference
-   video processing
-   local AI
-   3D rendering
-   sensor fusion

can create sustained computational load.

Thermal design affects:

-   sustained performance
-   throttling behavior
-   responsiveness
-   battery efficiency

### Hackathon opportunity

A project that continuously processes sensor/video streams is a better
demonstration of the phone's performance hardware than a one-shot AI
query.

------------------------------------------------------------------------

# 30. IP68 / IP69 Protection

The iQOO 15 is documented with IP68 and IP69 protection.

### Potential project domains

-   Outdoor inspection
-   Mobility
-   Field agriculture
-   Infrastructure
-   Rain-exposed environments
-   Emergency response

### Important caution

Water/dust resistance does not mean "indestructible" or that the phone
can be intentionally submerged/pressure-washed during a demo. Follow
iQOO's actual warranty and operating guidance.

------------------------------------------------------------------------

# 31. Software Platform

### Operating system

OriginOS 6 based on Android 16.

### Hackathon implications

The phone provides the normal Android application environment plus
iQOO-specific hardware.

Potential development technologies:

-   Kotlin
-   Java
-   Android SDK
-   CameraX / Camera2 where compatible
-   Android Sensor APIs
-   Location APIs
-   Bluetooth/BLE APIs
-   NFC APIs
-   USB host/OTG APIs
-   TensorFlow Lite / LiteRT where compatible
-   ONNX Runtime where compatible
-   MediaPipe where compatible
-   Qualcomm-supported AI runtimes where available
-   Local/open-source LLM runtimes where compatible with the event
    environment

Always test the exact runtime on the supplied hackathon device.

------------------------------------------------------------------------

# 32. Sensor-to-Problem Mapping

  ------------------------------------------------------------------------
  Sensor / capability     What it tells you       Strong problem domains
  ----------------------- ----------------------- ------------------------
  Camera                  Visual world            Almost everything

  Periscope               Distant visual details  Infrastructure,
                                                  mobility, agriculture

  Ultra-wide              Broad context           Mapping, rooms,
                                                  environment

  Microphone              Acoustic world          Machines, safety,
                                                  accessibility

  Accelerometer           Linear motion/vibration Mobility, machines,
                                                  activity

  Gyroscope               Rotation                Vehicles, equipment, AR

  Compass                 Heading                 Navigation, field work

  GPS/NavIC               Location                Mobility,
                                                  infrastructure,
                                                  agriculture

  Ambient light           Light conditions        Smart living,
                                                  environment

  Color spectrum          Light/color context     Environment, visual
                                                  calibration

  Proximity               Nearness                Context-aware
                                                  interaction

  Fingerprint             Identity                Security/privacy

  NFC                     Tagged object identity  Smart assets,
                                                  maintenance

  IR                      Appliance control       Smart living

  Bluetooth               External sensors        IoT, robotics

  USB-C                   External hardware       Advanced instrumentation

  Camera + audio          Visual + sound          Physical-world AI

  Camera + IMU            Visual + motion         Mobility/AR/inspection

  Audio + IMU             Sound + vibration       Machine diagnosis

  GPS + camera            What + where            Field intelligence

  Camera + audio + IMU    Multimodal physical     High-value AI
                          state                   instrumentation
  ------------------------------------------------------------------------

------------------------------------------------------------------------

# 33. Highest-Value Feature Combinations

## Combination A --- Camera + NPU

``` text
Camera
 ↓
Computer Vision
 ↓
Local AI
 ↓
Result
```

### Use cases

-   Object recognition
-   OCR
-   Inspection
-   Accessibility
-   Agriculture

**Value:** Very high

------------------------------------------------------------------------

## Combination B --- Camera + Microphone + AI

``` text
Visual signal
+
Acoustic signal
       ↓
Multimodal AI
       ↓
Diagnosis
```

### Use cases

-   Machine diagnosis
-   Environment understanding
-   Accessibility
-   Safety
-   Field inspection

**Value:** Very high

------------------------------------------------------------------------

## Combination C --- Accelerometer + Gyroscope + AI

``` text
Motion
+
Rotation
 ↓
Motion signature
 ↓
AI classifier
```

### Use cases

-   Vehicle analysis
-   Human activity
-   Equipment monitoring
-   Gesture control
-   AR

**Value:** High

------------------------------------------------------------------------

## Combination D --- Camera + IMU

``` text
Camera
+
Accelerometer
+
Gyroscope
 ↓
Spatial understanding
```

### Use cases

-   AR
-   Navigation
-   Inspection
-   Robotics
-   Mapping

**Value:** Very high

------------------------------------------------------------------------

## Combination E --- GPS + Camera + Compass

``` text
WHAT?
Camera
  +
WHERE?
GPS
  +
WHICH DIRECTION?
Compass
```

### Use cases

-   Infrastructure mapping
-   Field inspection
-   Search and rescue
-   Mobility
-   Agriculture

**Value:** Very high

------------------------------------------------------------------------

## Combination F --- Phone + External Sensor

``` text
External sensor
      ↓
USB/BLE
      ↓
iQOO 15
      ↓
AI
      ↓
Action
```

### Use cases

-   IoT
-   Machine diagnostics
-   Environmental monitoring
-   Robotics
-   Smart living

**Value:** Extremely high if permitted by the event rules.

------------------------------------------------------------------------

# 34. The Most Interesting Hackathon Sensor

If the goal is **maximum information rather than maximum novelty**, the
camera system is the richest general-purpose input.

But if the goal is **technical differentiation**, the most interesting
combination is:

> **Camera + microphone + accelerometer + gyroscope + local AI**

Why?

Because these channels observe different properties of the same physical
event.

Example:

``` text
Machine
 ├── Camera → visible condition
 ├── Microphone → acoustic signature
 ├── Accelerometer → vibration
 └── Gyroscope → rotational behavior
                    ↓
               iQOO 15
                    ↓
             Multimodal AI
                    ↓
              Diagnosis
```

This is much more difficult to reproduce with a basic phone application.

------------------------------------------------------------------------

# 35. Top UV --- Unique Value Propositions of the iQOO 15

## UV #1 --- Phone as an AI Computer

The iQOO 15 has flagship CPU/GPU/NPU compute.

### Hackathon value

The phone can perform meaningful AI processing locally rather than
acting only as a client for a remote server.

------------------------------------------------------------------------

## UV #2 --- Phone as a Multimodal Sensor

The device combines:

-   Camera
-   Microphone
-   Accelerometer
-   Gyroscope
-   Compass
-   GPS
-   Ambient/light sensors
-   Proximity
-   NFC

### Hackathon value

One physical device can capture multiple forms of real-world
information.

------------------------------------------------------------------------

## UV #3 --- Three Rear Cameras with 3x Periscope

The combination of:

-   Main
-   Ultrawide
-   Periscope

creates different spatial perspectives.

### Hackathon value

The phone can inspect both nearby and distant objects.

------------------------------------------------------------------------

## UV #4 --- Dedicated Q3 Computing Chip

The Q3 expands the device beyond ordinary CPU-only mobile processing.

### Hackathon value

Useful for graphics-heavy, real-time and visualization-intensive
solutions.

------------------------------------------------------------------------

## UV #5 --- Sustained Performance

The combination of:

-   High-end SoC
-   Q3 chip
-   Large cooling system
-   7000 mAh battery

is valuable for continuous workloads.

### Hackathon value

Real-time AI/video processing can be demonstrated for extended periods.

------------------------------------------------------------------------

## UV #6 --- Offline / Edge AI Potential

The Snapdragon platform includes a dedicated NPU and Qualcomm AI
architecture.

### Hackathon value

Solutions can be designed to minimize cloud dependency.

This is particularly useful for:

-   Privacy
-   Low connectivity
-   Rural deployment
-   Emergency response
-   Sensitive data

------------------------------------------------------------------------

## UV #7 --- Physical-World Control

The iQOO 15 isn't only an input device.

It also has:

-   IR
-   NFC
-   Bluetooth
-   USB-C

### Hackathon value

AI can potentially move from:

``` text
Sense → Understand
```

to:

``` text
Sense → Understand → Act
```

------------------------------------------------------------------------

## UV #8 --- Location + Direction

GPS/GNSS + NavIC + compass gives spatial context.

### Hackathon value

A solution can understand:

``` text
What is happening?
Where is it happening?
Which direction am I looking/moving?
```

------------------------------------------------------------------------

## UV #9 --- Field-Ready Design

IP68/IP69 + large battery + fast charging makes the device more suitable
for field demonstrations than a fragile lab-only setup.

------------------------------------------------------------------------

# 36. Potential Hackathon Applications

## A. Smart Infrastructure

### Example

AI infrastructure inspector.

Inputs:

-   Main camera
-   Periscope
-   Microphone
-   Accelerometer
-   GPS

Output:

-   Detected anomaly
-   Location
-   Evidence
-   Severity
-   Suggested action

------------------------------------------------------------------------

## B. Mobility

### Example

AI vehicle/road intelligence.

Inputs:

-   Camera
-   IMU
-   GPS
-   Compass
-   Microphone

Output:

-   Road condition
-   Motion pattern
-   Vehicle event
-   Location-tagged evidence

------------------------------------------------------------------------

## C. Smart Living

### Example

AI home physical-state assistant.

Inputs:

-   Camera
-   Microphone
-   IR
-   NFC
-   Ambient light

Output:

-   Appliance control
-   Environment classification
-   Automation

------------------------------------------------------------------------

## D. Agriculture

### Example

Field intelligence device.

Inputs:

-   Camera
-   Periscope
-   GPS/NavIC
-   Ambient light
-   External sensors if permitted

Output:

-   Plant/field observation
-   Geotagged evidence
-   Field reports
-   Local AI recommendations

------------------------------------------------------------------------

## E. Accessibility

### Example

Multimodal environmental assistant.

Inputs:

-   Camera
-   Audio
-   GPS
-   IMU

Output:

-   Environmental description
-   Direction guidance
-   Audio feedback

Privacy-sensitive data should preferably be processed locally and not
unnecessarily stored.

------------------------------------------------------------------------

## F. Predictive Maintenance

### Example

Portable machine diagnostic device.

Inputs:

-   Camera
-   Microphone
-   Accelerometer
-   Gyroscope

Output:

-   Visual anomaly
-   Acoustic anomaly
-   Vibration anomaly
-   Combined AI diagnosis

This direction has already appeared in a winning Chennai city-battle
project, so a Grand Finale version would need a substantially different
problem, sensing combination, or outcome rather than reproducing the
same concept.

------------------------------------------------------------------------

# 37. Potential Project Architecture

A high-value architecture could be:

``` text
                         PHYSICAL WORLD
                              |
        +---------------------+----------------------+
        |                     |                      |
      CAMERA                AUDIO                  MOTION
        |                     |              +-------+-------+
        |                     |              |               |
   Main/UW/Zoom          Microphone     Accelerometer    Gyroscope
        |                     |              |               |
        +---------------------+--------------+---------------+
                              |
                         iQOO 15
                              |
                +-------------+-------------+
                |                           |
          Signal Processing             Sensor Fusion
                |                           |
                +-------------+-------------+
                              |
                    Local AI / NPU / GPU
                              |
                       Reasoning Layer
                              |
                +-------------+-------------+
                |                           |
             OUTPUT                      ACTION
                |                           |
           Display/Audio            IR/NFC/BLE/USB
```

------------------------------------------------------------------------

# 38. Recommended Design Principle

The most important question for your team should be:

> **What can our solution do because it has access to the iQOO 15's
> physical sensors and compute that an ordinary cloud-only web
> application cannot do?**

A strong answer should contain at least **two or three** of the
following:

-   Real-time camera input
-   Audio input
-   Motion sensing
-   Location
-   Direction
-   Local AI
-   External sensor input
-   Physical-device control
-   Continuous processing
-   Offline operation

------------------------------------------------------------------------

# 39. Feature-to-Track Mapping

Based on the Grand Finale tracks:

## Mobility

Strong capabilities:

-   Camera
-   Periscope
-   GPS/NavIC
-   Compass
-   Accelerometer
-   Gyroscope
-   Microphone
-   5G/Wi-Fi/Bluetooth

Potential areas:

-   Road intelligence
-   Vehicle intelligence
-   Navigation
-   Parking
-   Public transport
-   Travel safety

------------------------------------------------------------------------

## Community App

Strong capabilities:

-   Camera
-   Microphone
-   GPS
-   NFC
-   Local AI
-   5G/Wi-Fi

Potential areas:

-   Community reporting
-   Citizen sensing
-   Local discovery
-   Offline community intelligence

------------------------------------------------------------------------

## Smart Living

Strong capabilities:

-   Camera
-   Microphone
-   Ambient light
-   IR
-   NFC
-   Bluetooth
-   Wi-Fi

Potential areas:

-   Home automation
-   Appliance intelligence
-   Energy efficiency
-   Context-aware environments

------------------------------------------------------------------------

## Productivity

Strong capabilities:

-   NPU
-   CPU/GPU
-   Camera
-   OCR
-   Microphone
-   Local models
-   Large RAM/storage

Potential areas:

-   Offline document intelligence
-   Meeting assistance
-   Workflow automation
-   Developer workflows
-   Multimodal information extraction

------------------------------------------------------------------------

## Developer Tools

Strong capabilities:

-   High compute
-   Large RAM
-   Camera
-   Microphone
-   USB-C
-   Bluetooth
-   Local AI

Potential areas:

-   Mobile debugging tools
-   Hardware inspection
-   AI coding assistants
-   Device testing
-   Field engineering tools

------------------------------------------------------------------------

## Open Innovation

This is the broadest option.

The combination:

``` text
Sensors
+
Camera
+
AI
+
Local model
+
Real-world problem
```

is particularly suitable.

------------------------------------------------------------------------

# 40. What NOT to Assume

Before building, verify these items on the actual hackathon device:

### Do not assume:

1.  Raw color-spectrum sensor data is available through public Android
    APIs.
2.  Raw ambient-light data from every physical ambient-light sensor is
    exposed.
3.  Developers can directly program the Hexagon NPU without an
    appropriate runtime.
4.  The Q3 chip is directly programmable by third-party Android
    applications.
5.  Every camera mode/ISP feature is exposed through Camera2/CameraX.
6.  Every external USB/Bluetooth device is permitted by hackathon rules.
7.  Root access is available.
8.  Bootloader unlocking is allowed.
9.  Arbitrary background services can run indefinitely without OS
    restrictions.
10. Every local LLM framework will automatically use the NPU.

These are engineering validation items.

------------------------------------------------------------------------

# 41. Hardware Validation Checklist for Day 1

Before finalizing the problem statement, run a hardware capability test.

## Sensors

``` text
[ ] Accelerometer
[ ] Gyroscope
[ ] Compass
[ ] Proximity
[ ] Ambient light
[ ] Color spectrum availability
[ ] Fingerprint API
[ ] GPS
[ ] NavIC / GNSS information
```

## Camera

``` text
[ ] Main camera
[ ] Ultrawide
[ ] 3x periscope
[ ] Camera FPS
[ ] Camera2 support
[ ] CameraX compatibility
[ ] Concurrent camera capability
```

## AI

``` text
[ ] Local model runtime
[ ] ONNX / LiteRT compatibility
[ ] Quantized model test
[ ] NPU acceleration availability
[ ] GPU acceleration
[ ] CPU baseline
```

## Connectivity

``` text
[ ] Bluetooth BLE
[ ] Wi-Fi
[ ] NFC
[ ] USB OTG
[ ] External sensor connection
```

## Performance

``` text
[ ] Sustained CPU test
[ ] Sustained GPU test
[ ] Camera + AI test
[ ] Sensor + AI test
[ ] Battery drain measurement
[ ] Thermal behavior
```

------------------------------------------------------------------------

# 42. Suggested Benchmark for Your Prototype

Instead of merely showing:

> "Our model runs."

Measure:

``` text
Metric                         Target to measure
-------------------------------------------------
Camera inference latency       ms/frame
Audio inference latency        ms
Sensor sampling rate           Hz
Model inference latency        ms
CPU utilization                %
GPU utilization                %
NPU utilization                %
RAM usage                      GB
Battery drain                  %/hour
Temperature                    °C
Offline inference success      yes/no
Network dependency             yes/no
```

This lets you demonstrate that the iQOO 15 is not decorative hardware.

------------------------------------------------------------------------

# 43. The Three Most Important Hardware Directions

If the goal is to identify a project that genuinely exploits the phone:

## Direction 1 --- Multimodal Physical AI

``` text
Camera + Audio + IMU + AI
```

Best for:

-   Physical-world diagnosis
-   Infrastructure
-   Machines
-   Accessibility
-   Safety

------------------------------------------------------------------------

## Direction 2 --- Geospatial AI

``` text
Camera + GPS/NavIC + Compass + AI
```

Best for:

-   Mobility
-   Infrastructure
-   Agriculture
-   Disaster response
-   Community mapping

------------------------------------------------------------------------

## Direction 3 --- Phone-as-IoT-Gateway

``` text
External sensor
       ↓
BLE / USB
       ↓
iQOO 15
       ↓
Local AI
       ↓
Action
```

Best for:

-   Smart Living
-   Industry
-   Agriculture
-   Environmental monitoring
-   Robotics

------------------------------------------------------------------------

# 44. Final Strategic Takeaway

The iQOO 15 should be thought of as:

> **A battery-powered, camera-equipped, motion-aware, location-aware,
> connected edge-AI computer with dedicated CPU/GPU/NPU compute and
> multiple physical-world I/O channels.**

The highest-value project architecture is therefore not:

``` text
Android App
+
Chatbot
```

It is:

``` text
                 REAL WORLD
                     ↓
        ┌────────────┼────────────┐
        ↓            ↓            ↓
     VISUAL        AUDIO        MOTION
        ↓            ↓            ↓
        └────────────┼────────────┘
                     ↓
                 iQOO 15
                     ↓
             SENSOR FUSION
                     ↓
              LOCAL AI/NPU
                     ↓
                REASONING
                     ↓
              DECISION/ACTION
                     ↓
       IR / NFC / BLE / USB / UI
```

That architecture gives your team a much larger design space for the
Grand Finale.

------------------------------------------------------------------------

# 45. Top 10 iQOO 15 Capabilities to Consider First

    Priority Capability                       Why it matters for a hackathon
  ---------- -------------------------------- -------------------------------------------
           1 Snapdragon 8 Elite Gen 5 + NPU   Local AI and high compute
           2 Triple-camera system             Rich visual sensing
           3 3x periscope                     Long-distance inspection
           4 Microphone + audio processing    Acoustic intelligence
           5 Accelerometer + gyroscope        Physical motion/vibration
           6 GPS/NavIC + compass              Spatial/geographic intelligence
           7 USB-C + Bluetooth                External sensor integration
           8 Q3 computing chip                Advanced graphics/real-time visualization
           9 7000 mAh + thermal system        Sustained workloads
          10 IR + NFC                         Physical-world interaction

------------------------------------------------------------------------

# 46. Recommended "UV Stack" for Your Team

If you want a single stack to keep in mind while brainstorming:

``` text
                 iQOO 15
                    |
       +------------+------------+
       |            |            |
     SEE          HEAR         FEEL
       |            |            |
   Cameras       Mic        IMU Sensors
       |            |            |
       +------------+------------+
                    |
                LOCATION
                    |
             GPS + Compass
                    |
                    ↓
            SNAPDRAGON AI
                    |
            Local inference
                    |
                    ↓
             Q3 / GPU / CPU
                    |
                    ↓
              AI DECISION
                    |
       +------------+------------+
       |            |            |
      UI          IR/NFC      BLE/USB
       |            |            |
       +------------+------------+
                    ↓
               REAL ACTION
```

**This is the core hardware philosophy I recommend using while selecting
your problem statement.**

------------------------------------------------------------------------

# 47. Sources

### Official iQOO

-   iQOO 15 India product page: https://www.iqoo.com/in/products/iqoo15
-   iQOO 15 India store/specification page:
    https://shop.iqoo.com/in/product/2067
-   iQOO Hackathon 2026 official announcement:
    https://community.iqoo.com/in/thread/167130
-   iQOO 15 sensor/connectivity FAQ:
    https://community.iqoo.com/in/thread/129956

### Qualcomm

-   Snapdragon platform product documentation: https://www.qualcomm.com/
-   Qualcomm Snapdragon AI architecture documentation:
    https://www.qualcomm.com/content/dam/qcomm-martech/dm-assets/documents/Snapdragon-8-Elite-Platform-Product-Brief.pdf

### Hackathon reference

The official iQOO Connect city-battle recaps are useful for
understanding how teams have already used the phone:

-   Bengaluru recap: https://community.iqoo.com/in/thread/169162
-   Pune recap: https://community.iqoo.com/in/thread/169968
-   Chennai recap: https://community.iqoo.com/in/thread/171930

------------------------------------------------------------------------

## Version

**Prepared for:** iQOO Hackathon 2026 Grand Finale\
**Device:** iQOO 15\
**Purpose:** Hardware-driven problem-statement selection and prototype
planning\
**Research status:** Based on publicly available iQOO/Qualcomm
documentation and iQOO Hackathon 2026 material available at the time of
preparation.

