import * as THREE from 'three';
import { CHAPTERS, LEDGER_METRICS } from '../data/portfolioData';

export interface SceneCallbacks {
  onChapterChange?: (chapterIndex: number) => void;
  onProgressUpdate?: (progress: number) => void;
}

export class CorridorScene {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private renderer: THREE.WebGLRenderer;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private curve: THREE.CatmullRomCurve3;

  private reqId: number | null = null;
  private isDestroyed = false;

  // Camera & Scroll State
  private scrollProgress = 0;
  private targetScrollProgress = 0;
  private currentChapterIndex = 0;

  // Parallax cursor
  private mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

  // Lighting & Atmosphere
  private fog: THREE.FogExp2;
  private ambientLight: THREE.AmbientLight;
  private exitLight: THREE.DirectionalLight;
  private currentAccentColor = new THREE.Color(CHAPTERS[0].accentColor);
  private targetAccentColor = new THREE.Color(CHAPTERS[0].accentColor);

  // Tech Corridor Infrastructure
  private serverBlinkers: { mesh: THREE.Mesh; phase: number; freq: number }[] = [];
  private dataPackets: { mesh: THREE.Mesh; speed: number; startZ: number; rangeZ: number }[] = [];
  private floatingHoloPlates: THREE.Group[] = [];

  // Chapter 1: Silicon Die / CPU Wafer
  private cpuDieGroup: THREE.Group | null = null;
  private cpuCoreMesh: THREE.Mesh | null = null;
  private logicTraces: THREE.LineSegments | null = null;

  // Chapter 2: Hardware Telemetry Towers
  private ledgerColumns: {
    group: THREE.Group;
    columnMesh: THREE.Mesh;
    segments: THREE.Mesh[];
    glowMesh: THREE.Mesh;
    targetHeight: number;
    currentHeight: number;
    baseY: number;
    targetZ: number;
  }[] = [];

  // Chapter 3: Futuristic Terminal Consoles
  private archiveConsoles: {
    group: THREE.Group;
    light: THREE.SpotLight;
    holoRing: THREE.Mesh;
    screenGlass: THREE.Mesh;
    targetZ: number;
  }[] = [];

  // Chapter 4: Circuit PCB & 3D AI Neural Processing Unit
  private aiClusterNodes: THREE.Mesh[] = [];
  private neuralCoreGroup: THREE.Group | null = null;
  private neuralCoreInner: THREE.Mesh | null = null;
  private neuralRing1: THREE.Mesh | null = null;
  private neuralRing2: THREE.Mesh | null = null;

  // Chapter 5: Quantum Tech Gyroscope
  private gyroscopeGroup: THREE.Group | null = null;
  private gyroRingOuter: THREE.Mesh | null = null;
  private gyroRingMid: THREE.Mesh | null = null;
  private gyroRingInner: THREE.Mesh | null = null;
  private gyroSatellites: THREE.Mesh[] = [];

  // Chapter 6: Fiber Optic Laser Pipeline
  private timelineGeometry: THREE.BufferGeometry | null = null;
  private timelineLine: THREE.Line | null = null;
  private markerSpheres: THREE.Mesh[] = [];
  private photonPacket: THREE.Mesh | null = null;

  // Chapter 7: Hyperlight Aperture & Comms Beacon
  private exitAirlockGroup: THREE.Group | null = null;
  private commsBeaconMesh: THREE.Mesh | null = null;

  private callbacks: SceneCallbacks;

  constructor(container: HTMLElement, canvas: HTMLCanvasElement, callbacks: SceneCallbacks = {}) {
    this.container = container;
    this.canvas = canvas;
    this.callbacks = callbacks;

    // 1. Initialize Scene & Atmosphere
    this.scene = new THREE.Scene();
    this.fog = new THREE.FogExp2(0x07070a, 0.022);
    this.scene.fog = this.fog;
    this.scene.background = null; // Transparent scene to allow section-specific backdrops to blend

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(54, width / height, 0.1, 320);

    // 2. Camera Spline through Gallery
    const points = [
      new THREE.Vector3(0, 1.7, 12),      // Approach
      new THREE.Vector3(0, 1.7, 0),       // Ch 0: Threshold
      new THREE.Vector3(-0.6, 1.75, -25), // Ch 1: Foundation (Silicon CPU)
      new THREE.Vector3(0.7, 1.7, -54),   // Ch 2: Ledger (Telemetry Racks)
      new THREE.Vector3(-0.5, 1.7, -88),  // Ch 3: Archive (Holo Consoles)
      new THREE.Vector3(0.5, 1.75, -122), // Ch 4: Grid (AI Tensor Core)
      new THREE.Vector3(-0.4, 1.7, -154), // Ch 5: Circle (Quantum Gyroscope)
      new THREE.Vector3(0.3, 1.7, -182),  // Ch 6: Marker (Fiber Laser)
      new THREE.Vector3(0, 1.75, -215),   // Ch 7: Exit (Hyperlight Beacon)
    ];
    this.curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.2);

    // 3. Renderer Setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;

    // 4. Lights
    this.ambientLight = new THREE.AmbientLight(0x181416, 1.3);
    this.scene.add(this.ambientLight);

    this.exitLight = new THREE.DirectionalLight(0xffedd5, 0.6);
    this.exitLight.position.set(0, 5, -230);
    this.exitLight.target.position.set(0, 1.7, -210);
    this.scene.add(this.exitLight);
    this.scene.add(this.exitLight.target);

    // 5. Build Tech Environments
    this.buildTechCorridorShell();
    this.buildServerRacksAndConduits();
    this.buildChapterPortals();
    this.buildSiliconCpuFoundation();
    this.buildTelemetryTowersLedger();
    this.buildHoloConsolesArchive();
    this.buildCircuitGridAndAiCore();
    this.buildQuantumGyroscopeCircle();
    this.buildFiberOpticMarker();
    this.buildExitApertureAndBeacon();

    // 6. Bind Events
    this.onResize = this.onResize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    window.addEventListener('resize', this.onResize);
    window.addEventListener('mousemove', this.onMouseMove, { passive: true });

    // 7. Initial camera setup
    this.updateCamera(0);

    // 8. Start Loop
    this.animate = this.animate.bind(this);
    this.reqId = requestAnimationFrame(this.animate);
  }

  /**
   * Builds the tech architectural corridor: dark titanium floor panels with illuminated PCB circuit bus traces
   */
  private buildTechCorridorShell() {
    // Floor: Dark brushed titanium / server room raised flooring
    const floorGeo = new THREE.PlaneGeometry(16, 260, 1, 60);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x09090d,
      roughness: 0.28,
      metalness: 0.7,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, -100);
    this.scene.add(floor);

    // Ceiling: High server-hall ceiling with acoustic baffles & cabling trays
    const ceilingGeo = new THREE.PlaneGeometry(16, 260, 1, 30);
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0x08080b,
      roughness: 0.75,
      metalness: 0.3,
    });
    const ceiling = new THREE.Mesh(ceilingGeo, ceilingMat);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 4.6, -100);
    this.scene.add(ceiling);

    // Left and Right Server Hall Walls
    const wallGeo = new THREE.PlaneGeometry(260, 4.6, 60, 1);
    const wallMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c11,
      roughness: 0.55,
      metalness: 0.4,
    });

    const leftWall = new THREE.Mesh(wallGeo, wallMat);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-6, 2.3, -100);
    this.scene.add(leftWall);

    const rightWall = new THREE.Mesh(wallGeo, wallMat);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(6, 2.3, -100);
    this.scene.add(rightWall);

    // Optical floor bus lines (dual running data tracks on floor)
    const traceGeo = new THREE.BoxGeometry(0.06, 0.02, 260);
    const traceMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(0xd4794a).multiplyScalar(0.85),
      transparent: true,
      opacity: 0.6,
    });

    const leftTrack = new THREE.Mesh(traceGeo, traceMat);
    leftTrack.position.set(-4.2, 0.015, -100);
    this.scene.add(leftTrack);

    const rightTrack = new THREE.Mesh(traceGeo, traceMat);
    rightTrack.position.set(4.2, 0.015, -100);
    this.scene.add(rightTrack);

    // Overhead Cable Trays & Transverse Cyber Beams
    const beamGeo = new THREE.BoxGeometry(12, 0.28, 0.35);
    const beamMat = new THREE.MeshStandardMaterial({
      color: 0x14141c,
      roughness: 0.3,
      metalness: 0.8,
    });

    for (let z = 6; z >= -220; z -= 8) {
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(0, 4.45, z);
      this.scene.add(beam);

      // Fluorescent downlight strip on beam underside
      const stripMat = new THREE.MeshBasicMaterial({
        color: 0xffeedd,
        transparent: true,
        opacity: 0.25,
      });
      const strip = new THREE.Mesh(new THREE.BoxGeometry(8, 0.02, 0.05), stripMat);
      strip.position.set(0, 4.3, z);
      this.scene.add(strip);
    }
  }

  /**
   * Recessed Server Racks with Blinking Activity LEDs and Overhead Glass Fiber Conduits
   */
  private buildServerRacksAndConduits() {
    // 1. Recessed Server Cabinets along left & right walls
    const rackGeo = new THREE.BoxGeometry(0.8, 3.4, 2.2);
    const rackMat = new THREE.MeshStandardMaterial({
      color: 0x111118,
      roughness: 0.4,
      metalness: 0.7,
    });

    const ledColors = [0x22c55e, 0xf59e0b, 0x06b6d4, 0xef4444];
    const ledGeo = new THREE.BoxGeometry(0.04, 0.04, 0.04);

    for (let z = 2; z >= -215; z -= 14) {
      // Left rack
      const leftRack = new THREE.Mesh(rackGeo, rackMat);
      leftRack.position.set(-5.6, 1.7, z);
      this.scene.add(leftRack);

      // Right rack
      const rightRack = new THREE.Mesh(rackGeo, rackMat);
      rightRack.position.set(5.6, 1.7, z);
      this.scene.add(rightRack);

      // Activity LEDs on rack face
      for (let row = 0; row < 5; row++) {
        const col = ledColors[Math.floor(Math.random() * ledColors.length)];
        const ledMat = new THREE.MeshBasicMaterial({ color: col });
        
        const leftLed = new THREE.Mesh(ledGeo, ledMat);
        leftLed.position.set(-5.18, 0.8 + row * 0.45, z + (Math.random() * 0.8 - 0.4));
        this.scene.add(leftLed);
        this.serverBlinkers.push({
          mesh: leftLed,
          phase: Math.random() * Math.PI * 2,
          freq: 2 + Math.random() * 5,
        });

        const rightLed = new THREE.Mesh(ledGeo, ledMat);
        rightLed.position.set(5.18, 0.8 + row * 0.45, z + (Math.random() * 0.8 - 0.4));
        this.scene.add(rightLed);
        this.serverBlinkers.push({
          mesh: rightLed,
          phase: Math.random() * Math.PI * 2,
          freq: 2 + Math.random() * 5,
        });
      }
    }

    // 2. Optical Fiber Data Packets streaming along ceiling tracks
    const packetGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0xffa066,
      transparent: true,
      opacity: 0.85,
    });

    for (let i = 0; i < 18; i++) {
      const pkt = new THREE.Mesh(packetGeo, packetMat);
      const isLeft = i % 2 === 0;
      pkt.position.set(isLeft ? -4.2 : 4.2, 4.3, 0);
      this.scene.add(pkt);
      this.dataPackets.push({
        mesh: pkt,
        speed: 12 + Math.random() * 15,
        startZ: 10,
        rangeZ: 240,
      });
    }

    // 3. Floating Architectural Glass HUD Plates with UI wireframes along corridor
    const holoPositions = [
      { x: -3.8, y: 2.2, z: -12, text: 'INIT: ROUTER_VITE' },
      { x: 3.8, y: 2.4, z: -38, text: 'SYS: NEXT_RSC' },
      { x: -3.8, y: 2.3, z: -68, text: 'TELEMETRY: OPTIMIZED' },
      { x: 3.8, y: 2.1, z: -108, text: 'STACK: MICRO_FE' },
      { x: -3.8, y: 2.5, z: -140, text: 'NODE: AGENT_PIPELINE' },
    ];

    holoPositions.forEach((pos) => {
      const holoGroup = new THREE.Group();
      holoGroup.position.set(pos.x, pos.y, pos.z);
      holoGroup.rotation.y = pos.x < 0 ? Math.PI / 10 : -Math.PI / 10;

      // Translucent glass plate
      const plateGeo = new THREE.PlaneGeometry(1.6, 1.0);
      const plateMat = new THREE.MeshBasicMaterial({
        color: 0x1e293b,
        transparent: true,
        opacity: 0.35,
        side: THREE.DoubleSide,
      });
      const plate = new THREE.Mesh(plateGeo, plateMat);
      holoGroup.add(plate);

      // Neon outline frame
      const frameGeo = new THREE.EdgesGeometry(plateGeo);
      const frameMat = new THREE.LineBasicMaterial({
        color: 0xd4794a,
        transparent: true,
        opacity: 0.5,
      });
      const frame = new THREE.LineSegments(frameGeo, frameMat);
      holoGroup.add(frame);

      // Grid wireframe lines inside glass plate
      const gridMat = new THREE.LineBasicMaterial({ color: 0x64748b, transparent: true, opacity: 0.3 });
      const pts = [
        new THREE.Vector3(-0.7, 0.2, 0.01), new THREE.Vector3(0.7, 0.2, 0.01),
        new THREE.Vector3(-0.7, -0.2, 0.01), new THREE.Vector3(0.7, -0.2, 0.01),
      ];
      const lines = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), gridMat);
      holoGroup.add(lines);

      this.scene.add(holoGroup);
      this.floatingHoloPlates.push(holoGroup);
    });
  }

  /**
   * Chapter Portal Frames: Precision laser-cut architectural portals with neon LED edging
   */
  private buildChapterPortals() {
    const portalZPositions = [0, -18, -42, -72, -105, -138, -168, -200];

    portalZPositions.forEach((zPos, idx) => {
      const chapter = CHAPTERS[idx] || CHAPTERS[CHAPTERS.length - 1];
      const portalGroup = new THREE.Group();
      portalGroup.position.set(0, 0, zPos);

      // Heavy industrial anodized titanium frame
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x15151e,
        roughness: 0.3,
        metalness: 0.85,
      });

      // Left post
      const leftPost = new THREE.Mesh(new THREE.BoxGeometry(0.24, 4.4, 0.24), frameMat);
      leftPost.position.set(-4.2, 2.2, 0);
      portalGroup.add(leftPost);

      // Right post
      const rightPost = new THREE.Mesh(new THREE.BoxGeometry(0.24, 4.4, 0.24), frameMat);
      rightPost.position.set(4.2, 2.2, 0);
      portalGroup.add(rightPost);

      // Top lintel
      const lintel = new THREE.Mesh(new THREE.BoxGeometry(8.64, 0.24, 0.24), frameMat);
      lintel.position.set(0, 4.4, 0);
      portalGroup.add(lintel);

      // Glowing inner laser strip
      const glowMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(chapter.accentColor),
        transparent: true,
        opacity: 0.9,
      });

      const glowLineGeo = new THREE.BoxGeometry(0.05, 4.38, 0.05);
      const glowLeft = new THREE.Mesh(glowLineGeo, glowMat);
      glowLeft.position.set(-4.08, 2.2, 0.02);
      portalGroup.add(glowLeft);

      const glowRight = new THREE.Mesh(glowLineGeo, glowMat);
      glowRight.position.set(4.08, 2.2, 0.02);
      portalGroup.add(glowRight);

      const glowTop = new THREE.Mesh(new THREE.BoxGeometry(8.2, 0.05, 0.05), glowMat);
      glowTop.position.set(0, 4.28, 0.02);
      portalGroup.add(glowTop);

      // Threshold floor light spill
      const pointLight = new THREE.PointLight(new THREE.Color(chapter.accentColor), 1.5, 9);
      pointLight.position.set(0, 0.4, 0);
      portalGroup.add(pointLight);

      this.scene.add(portalGroup);
    });
  }

  /**
   * Chapter 1: The Foundation — Silicon Micro-Architecture Die / CPU Processor Wafer
   */
  private buildSiliconCpuFoundation() {
    this.cpuDieGroup = new THREE.Group();
    this.cpuDieGroup.position.set(-0.6, 2.1, -28);

    // Silicon Substrate Carrier (Dark polished silicon ceramic with macro chip texture)
    const textureLoader = new THREE.TextureLoader();
    const cpuTexture = textureLoader.load('/src/assets/images/bg_silicon_processor_1790503978294.jpg');
    cpuTexture.wrapS = THREE.RepeatWrapping;
    cpuTexture.wrapT = THREE.RepeatWrapping;

    const carrierGeo = new THREE.BoxGeometry(4.8, 2.2, 0.18);
    const carrierMat = new THREE.MeshStandardMaterial({
      map: cpuTexture,
      roughness: 0.25,
      metalness: 0.85,
    });
    const carrier = new THREE.Mesh(carrierGeo, carrierMat);
    this.cpuDieGroup.add(carrier);

    // Central Monolithic Processor Die (Luminous copper-amber silicon)
    const coreGeo = new THREE.BoxGeometry(2.4, 1.2, 0.22);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x22130e,
      emissive: new THREE.Color(CHAPTERS[1].accentColor),
      emissiveIntensity: 0.65,
      roughness: 0.25,
      metalness: 0.8,
    });
    this.cpuCoreMesh = new THREE.Mesh(coreGeo, coreMat);
    this.cpuDieGroup.add(this.cpuCoreMesh);

    // Etched Gold & Copper Logic Bus Traces across the wafer
    const tracePoints: THREE.Vector3[] = [];
    for (let i = -2.2; i <= 2.2; i += 0.4) {
      tracePoints.push(new THREE.Vector3(i, -0.9, 0.12), new THREE.Vector3(i, 0.9, 0.12));
    }
    for (let j = -0.9; j <= 0.9; j += 0.3) {
      tracePoints.push(new THREE.Vector3(-2.2, j, 0.12), new THREE.Vector3(2.2, j, 0.12));
    }
    const traceGeo = new THREE.BufferGeometry().setFromPoints(tracePoints);
    const traceLineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(0xf59e0b),
      transparent: true,
      opacity: 0.45,
    });
    this.logicTraces = new THREE.LineSegments(traceGeo, traceLineMat);
    this.cpuDieGroup.add(this.logicTraces);

    // Gold Pin Contacts along the edge perimeter
    const pinGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.12, 8);
    const pinMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 1.0, roughness: 0.2 });
    for (let p = -2.3; p <= 2.3; p += 0.2) {
      const pinTop = new THREE.Mesh(pinGeo, pinMat);
      pinTop.position.set(p, 1.15, 0);
      this.cpuDieGroup.add(pinTop);

      const pinBottom = new THREE.Mesh(pinGeo, pinMat);
      pinBottom.position.set(p, -1.15, 0);
      this.cpuDieGroup.add(pinBottom);
    }

    // Suspension Steel Rods from ceiling
    const rodGeo = new THREE.CylinderGeometry(0.015, 0.015, 2.4, 8);
    const rodMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9, roughness: 0.2 });
    const rodL = new THREE.Mesh(rodGeo, rodMat);
    rodL.position.set(-2.2, 1.3, 0);
    this.cpuDieGroup.add(rodL);

    const rodR = new THREE.Mesh(rodGeo, rodMat);
    rodR.position.set(2.2, 1.3, 0);
    this.cpuDieGroup.add(rodR);

    // Under-light spotlight casting warm glow up through the silicon die
    const uplight = new THREE.SpotLight(new THREE.Color(CHAPTERS[1].accentColor), 3.0, 7, Math.PI / 4, 0.4);
    uplight.position.set(0, -1.8, 1.2);
    uplight.target = this.cpuCoreMesh;
    this.cpuDieGroup.add(uplight);

    this.scene.add(this.cpuDieGroup);
  }

  /**
   * Chapter 2: The Ledger — Hardware Telemetry Towers & Segmented LED Gauge Columns
   */
  private buildTelemetryTowersLedger() {
    const startZ = -48;
    const spacing = 4.2;
    const xOffsets = [-2.2, -0.8, 0.8, 2.2];

    LEDGER_METRICS.forEach((metric, i) => {
      const targetHeight = (metric.numericTarget / 100) * 3.4;
      const targetZ = startZ - i * spacing;
      const xPos = xOffsets[i];

      const towerGroup = new THREE.Group();
      towerGroup.position.set(xPos, 0, targetZ);

      // Heavy industrial anodized base plinth with cooling vents
      const plinthGeo = new THREE.BoxGeometry(0.9, 0.15, 0.9);
      const plinthMat = new THREE.MeshStandardMaterial({
        color: 0x13131c,
        roughness: 0.4,
        metalness: 0.8,
      });
      const plinth = new THREE.Mesh(plinthGeo, plinthMat);
      plinth.position.y = 0.075;
      towerGroup.add(plinth);

      // Telemetry Gauge Tower Chassis (dark server column)
      const columnGeo = new THREE.BoxGeometry(0.5, 1, 0.5);
      const columnMat = new THREE.MeshStandardMaterial({
        color: 0x18100e,
        emissive: new THREE.Color(CHAPTERS[2].accentColor),
        emissiveIntensity: 0.25,
        roughness: 0.3,
        metalness: 0.5,
      });
      const columnMesh = new THREE.Mesh(columnGeo, columnMat);
      columnMesh.position.y = 0.15;
      columnMesh.scale.set(1, 0.01, 1);
      towerGroup.add(columnMesh);

      // Segmented LED Level Bars (Stack of 8 glowing level indicator ribs)
      const segments: THREE.Mesh[] = [];
      const numSegments = 8;
      const segGeo = new THREE.BoxGeometry(0.54, 0.05, 0.1);
      const segMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(CHAPTERS[2].accentColor),
        transparent: true,
        opacity: 0.85,
      });

      for (let s = 0; s < numSegments; s++) {
        const seg = new THREE.Mesh(segGeo, segMat);
        seg.position.set(0, 0.2 + s * 0.4, 0.26);
        seg.visible = false;
        towerGroup.add(seg);
        segments.push(seg);
      }

      // Top Heat-Sink Fin & Optical Crown
      const glowGeo = new THREE.BoxGeometry(0.56, 0.06, 0.56);
      const glowMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(CHAPTERS[2].accentColor),
        transparent: true,
        opacity: 0.95,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      glowMesh.position.y = 0.2;
      towerGroup.add(glowMesh);

      this.scene.add(towerGroup);

      this.ledgerColumns.push({
        group: towerGroup,
        columnMesh,
        segments,
        glowMesh,
        targetHeight,
        currentHeight: 0.01,
        baseY: 0.15,
        targetZ,
      });
    });

    // Modern Metrics Operations Observatory Backdrop
    const observatoryTex = new THREE.TextureLoader().load('/src/assets/images/bg_metrics_observatory_1790506155187.jpg');
    const obsGeo = new THREE.PlaneGeometry(8.2, 4.0);
    const obsMat = new THREE.MeshBasicMaterial({
      map: observatoryTex,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide,
    });
    const obsMesh = new THREE.Mesh(obsGeo, obsMat);
    obsMesh.position.set(0, 2.2, startZ - 17);
    this.scene.add(obsMesh);
  }

  /**
   * Chapter 3: The Archive — Futuristic Terminal Consoles with Holographic Projection Cones
   */
  private buildHoloConsolesArchive() {
    const rolesZ = [-76, -84, -92, -100];
    const xPositions = [-3.4, 3.4, -3.4, 3.4];

    rolesZ.forEach((zPos, idx) => {
      const group = new THREE.Group();
      group.position.set(xPositions[idx], 0, zPos);

      // Developer Workstation Console Pylon (Brushed titanium angled pedestal)
      const pedestalGeo = new THREE.CylinderGeometry(0.45, 0.65, 2.2, 8);
      const pedestalMat = new THREE.MeshStandardMaterial({
        color: 0x161622,
        roughness: 0.35,
        metalness: 0.8,
      });
      const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
      pedestal.position.y = 1.1;
      group.add(pedestal);

      // Slanted Glass Interface Tablet on top with tech company engineering team texture
      const screenTex = new THREE.TextureLoader().load('/src/assets/images/bg_tech_office_team_1790506095726.jpg');
      const screenGeo = new THREE.BoxGeometry(0.7, 0.04, 0.5);
      const screenMat = new THREE.MeshStandardMaterial({
        map: screenTex,
        emissive: new THREE.Color(CHAPTERS[3].accentColor),
        emissiveIntensity: 0.35,
        roughness: 0.1,
        metalness: 0.8,
      });
      const screenGlass = new THREE.Mesh(screenGeo, screenMat);
      screenGlass.rotation.x = -Math.PI / 6;
      screenGlass.position.set(0, 2.25, 0.05);
      group.add(screenGlass);

      // Holographic Ring Emitter hovering above console
      const ringGeo = new THREE.TorusGeometry(0.55, 0.02, 12, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(CHAPTERS[3].accentColor),
        transparent: true,
        opacity: 0.25,
      });
      const holoRing = new THREE.Mesh(ringGeo, ringMat);
      holoRing.rotation.x = Math.PI / 2;
      holoRing.position.y = 2.7;
      group.add(holoRing);

      // Laser Scan Projection Cone
      const coneGeo = new THREE.ConeGeometry(0.55, 0.7, 16, 1, true);
      const coneMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(CHAPTERS[3].accentColor),
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
      });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.position.y = 2.4;
      group.add(cone);

      // Overhead Spotlight
      const spotLight = new THREE.SpotLight(
        new THREE.Color(CHAPTERS[3].accentColor),
        0.1,
        10,
        Math.PI / 4,
        0.5
      );
      spotLight.position.set(0, 4.3, 0);
      spotLight.target = screenGlass;
      group.add(spotLight);

      this.scene.add(group);
      this.archiveConsoles.push({
        group,
        light: spotLight,
        holoRing,
        screenGlass,
        targetZ: zPos,
      });
    });

    // Collaborative Tech Office Company Backdrop Plane
    const officeTex = new THREE.TextureLoader().load('/src/assets/images/bg_tech_office_team_1790506095726.jpg');
    const officeGeo = new THREE.PlaneGeometry(8.4, 4.2);
    const officeMat = new THREE.MeshBasicMaterial({
      map: officeTex,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide,
    });
    const officeMesh = new THREE.Mesh(officeGeo, officeMat);
    officeMesh.position.set(0, 2.3, -104);
    this.scene.add(officeMesh);
  }

  /**
   * Chapter 4: The Grid — Silicon PCB Matrix with Floating 3D AI Neural Processing Unit (NPU)
   */
  private buildCircuitGridAndAiCore() {
    const startZ = -112;
    const gridGroup = new THREE.Group();

    // 1. PCB Matrix Nodes
    const rows = 6;
    const cols = 7;
    const padGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.04, 16);

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - (cols - 1) / 2) * 1.1;
        const z = startZ - r * 3.3;

        const isAiCluster = r >= 2 && r <= 4 && c >= 2 && c <= 4;

        const padMat = new THREE.MeshStandardMaterial({
          color: isAiCluster ? 0x22120b : 0x14141c,
          emissive: new THREE.Color(isAiCluster ? CHAPTERS[4].accentColor : 0x3b4252),
          emissiveIntensity: isAiCluster ? 1.0 : 0.25,
          roughness: 0.3,
          metalness: 0.8,
        });

        const pad = new THREE.Mesh(padGeo, padMat);
        pad.position.set(x, 0.02, z);
        gridGroup.add(pad);

        if (isAiCluster) {
          this.aiClusterNodes.push(pad);
        }
      }
    }

    // 2. Copper PCB circuit traces
    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(CHAPTERS[4].accentColor).multiplyScalar(0.4),
      transparent: true,
      opacity: 0.4,
    });
    for (let r = 0; r < rows; r++) {
      const z = startZ - r * 3.3;
      const pts = [new THREE.Vector3(-3.8, 0.015, z), new THREE.Vector3(3.8, 0.015, z)];
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat);
      gridGroup.add(line);
    }

    // 3. Floating 3D AI Neural Processing Unit (NPU Gadget) hovering at center
    this.neuralCoreGroup = new THREE.Group();
    this.neuralCoreGroup.position.set(0, 1.8, startZ - 10);

    // Inner Silicon Tensor Octahedron Core
    const octaGeo = new THREE.OctahedronGeometry(0.55, 0);
    const octaMat = new THREE.MeshStandardMaterial({
      color: 0x1a0f0a,
      emissive: new THREE.Color(CHAPTERS[4].accentColor),
      emissiveIntensity: 1.2,
      roughness: 0.15,
      metalness: 0.9,
    });
    this.neuralCoreInner = new THREE.Mesh(octaGeo, octaMat);
    this.neuralCoreGroup.add(this.neuralCoreInner);

    // Outer Gyroscopic Orbital Ring 1
    const ring1Geo = new THREE.TorusGeometry(0.95, 0.025, 8, 36);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(CHAPTERS[4].accentColor),
      transparent: true,
      opacity: 0.85,
    });
    this.neuralRing1 = new THREE.Mesh(ring1Geo, ring1Mat);
    this.neuralCoreGroup.add(this.neuralRing1);

    // Outer Gyroscopic Orbital Ring 2 (Tilted)
    const ring2Geo = new THREE.TorusGeometry(1.2, 0.02, 8, 36);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xffedd5,
      transparent: true,
      opacity: 0.6,
    });
    this.neuralRing2 = new THREE.Mesh(ring2Geo, ring2Mat);
    this.neuralRing2.rotation.x = Math.PI / 3;
    this.neuralCoreGroup.add(this.neuralRing2);

    // Developer Code Matrix Backdrop Plane
    const devTex = new THREE.TextureLoader().load('/src/assets/images/bg_developer_workspace_1790506144191.jpg');
    const backdropGeo = new THREE.PlaneGeometry(5.4, 3.4);
    const backdropMat = new THREE.MeshBasicMaterial({
      map: devTex,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
    });
    const backdropMesh = new THREE.Mesh(backdropGeo, backdropMat);
    backdropMesh.position.set(0, 0, -1.8);
    this.neuralCoreGroup.add(backdropMesh);

    gridGroup.add(this.neuralCoreGroup);
    this.scene.add(gridGroup);
  }

  /**
   * Chapter 5: The Circle — Quantum Tech Gyroscope Gadget
   */
  private buildQuantumGyroscopeCircle() {
    this.gyroscopeGroup = new THREE.Group();
    this.gyroscopeGroup.position.set(-0.4, 0.04, -154);

    // Outer Heavy Titanium Gyro Ring
    const outerGeo = new THREE.RingGeometry(2.5, 2.65, 48);
    const outerMat = new THREE.MeshStandardMaterial({
      color: 0x161624,
      emissive: new THREE.Color(CHAPTERS[5].accentColor),
      emissiveIntensity: 0.35,
      side: THREE.DoubleSide,
      metalness: 0.8,
      roughness: 0.3,
    });
    this.gyroRingOuter = new THREE.Mesh(outerGeo, outerMat);
    this.gyroRingOuter.rotation.x = Math.PI / 2;
    this.gyroscopeGroup.add(this.gyroRingOuter);

    // Mid Concentric Laser Ring
    const midGeo = new THREE.RingGeometry(1.8, 1.88, 40);
    const midMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(CHAPTERS[5].accentColor),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.7,
    });
    this.gyroRingMid = new THREE.Mesh(midGeo, midMat);
    this.gyroRingMid.rotation.x = Math.PI / 2;
    this.gyroscopeGroup.add(this.gyroRingMid);

    // Inner Concentric Ring
    const innerGeo = new THREE.RingGeometry(1.1, 1.15, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xffedd5,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5,
    });
    this.gyroRingInner = new THREE.Mesh(innerGeo, innerMat);
    this.gyroRingInner.rotation.x = Math.PI / 2;
    this.gyroscopeGroup.add(this.gyroRingInner);

    // 4 Levitating Tech Pods with vertical energy beam guides
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const podGroup = new THREE.Group();
      podGroup.position.set(Math.cos(angle) * 2.58, 0.2, Math.sin(angle) * 2.58);

      // Pod Gadget Housing
      const podGeo = new THREE.CylinderGeometry(0.2, 0.24, 0.15, 16);
      const podMat = new THREE.MeshStandardMaterial({
        color: 0x181014,
        emissive: new THREE.Color(CHAPTERS[5].accentColor),
        emissiveIntensity: 0.8,
        metalness: 0.85,
        roughness: 0.2,
      });
      const podMesh = new THREE.Mesh(podGeo, podMat);
      podGroup.add(podMesh);

      // Vertical holographic beacon line
      const beamLineGeo = new THREE.CylinderGeometry(0.015, 0.015, 1.2, 8);
      const beamLineMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(CHAPTERS[5].accentColor),
        transparent: true,
        opacity: 0.6,
      });
      const beam = new THREE.Mesh(beamLineGeo, beamLineMat);
      beam.position.y = 0.65;
      podGroup.add(beam);

      this.gyroscopeGroup.add(podGroup);
      this.gyroSatellites.push(podMesh);
    }

    // Leadership Conference Review Backdrop Plane
    const leadershipTex = new THREE.TextureLoader().load('/src/assets/images/bg_leadership_standup_1790506132904.jpg');
    const leadGeo = new THREE.PlaneGeometry(8.2, 4.2);
    const leadMat = new THREE.MeshBasicMaterial({
      map: leadershipTex,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide,
    });
    const leadMesh = new THREE.Mesh(leadGeo, leadMat);
    leadMesh.position.set(0, 2.3, -162);
    this.scene.add(leadMesh);

    this.scene.add(this.gyroscopeGroup);
  }

  /**
   * Chapter 6: The Marker — High-Speed Fiber Optic Laser Pipeline & Quantum Milestone Cells
   */
  private buildFiberOpticMarker() {
    const markerGroup = new THREE.Group();
    markerGroup.position.set(0.3, 0, -182);

    // Academic University Library Sanctuary Backdrop Plane (Books, Reading Desks & Study Lamps)
    const libraryTex = new THREE.TextureLoader().load('/src/assets/images/bg_education_library_1790506106671.jpg');
    const libGeo = new THREE.PlaneGeometry(8.6, 4.4);
    const libMat = new THREE.MeshBasicMaterial({
      map: libraryTex,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
    });
    const libMesh = new THREE.Mesh(libGeo, libMat);
    libMesh.position.set(0, 2.4, -4.5);
    markerGroup.add(libMesh);

    const p1 = new THREE.Vector3(-2.2, 1.2, 0);
    const p2 = new THREE.Vector3(2.2, 1.2, 0);

    // High-Tech Quantum Memory Cylinders (Pedestals)
    const cylGeo = new THREE.CylinderGeometry(0.35, 0.45, 1.2, 16);
    const cylMat = new THREE.MeshStandardMaterial({
      color: 0x151522,
      roughness: 0.3,
      metalness: 0.8,
    });

    const pedL = new THREE.Mesh(cylGeo, cylMat);
    pedL.position.set(-2.2, 0.6, 0);
    markerGroup.add(pedL);

    const pedR = new THREE.Mesh(cylGeo, cylMat);
    pedR.position.set(2.2, 0.6, 0);
    markerGroup.add(pedR);

    // Glowing Optical Milestone Spheres
    const sphereGeo = new THREE.SphereGeometry(0.2, 24, 24);
    const sphereMat1 = new THREE.MeshStandardMaterial({
      color: 0x221111,
      emissive: new THREE.Color(CHAPTERS[6].accentColor),
      emissiveIntensity: 0.3,
      metalness: 0.9,
      roughness: 0.1,
    });
    const sphere1 = new THREE.Mesh(sphereGeo, sphereMat1);
    sphere1.position.copy(p1);
    markerGroup.add(sphere1);
    this.markerSpheres.push(sphere1);

    const sphereMat2 = new THREE.MeshStandardMaterial({
      color: 0x221111,
      emissive: new THREE.Color(CHAPTERS[6].accentColor),
      emissiveIntensity: 0.3,
      metalness: 0.9,
      roughness: 0.1,
    });
    const sphere2 = new THREE.Mesh(sphereGeo, sphereMat2);
    sphere2.position.copy(p2);
    markerGroup.add(sphere2);
    this.markerSpheres.push(sphere2);

    // Active Fiber Optic Laser Conduit (Dynamic line)
    this.timelineGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array([p1.x, p1.y, p1.z, p1.x, p1.y, p1.z]);
    this.timelineGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const lineMat = new THREE.LineBasicMaterial({
      color: new THREE.Color(CHAPTERS[6].accentColor),
      linewidth: 3,
    });
    this.timelineLine = new THREE.Line(this.timelineGeometry, lineMat);
    markerGroup.add(this.timelineLine);

    // Photon Data Packet traveling along line
    const photonGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const photonMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.photonPacket = new THREE.Mesh(photonGeo, photonMat);
    this.photonPacket.position.copy(p1);
    markerGroup.add(this.photonPacket);

    this.scene.add(markerGroup);
  }

  /**
   * Chapter 7: The Exit — Hyperlight Aperture Airlock & Holographic Comms Beacon
   */
  private buildExitApertureAndBeacon() {
    this.exitAirlockGroup = new THREE.Group();
    this.exitAirlockGroup.position.set(0, 0, -218);

    // Heavy Industrial Airlock Frame
    const archMat = new THREE.MeshStandardMaterial({
      color: 0x181824,
      roughness: 0.3,
      metalness: 0.9,
    });

    const leftAirlock = new THREE.Mesh(new THREE.BoxGeometry(0.8, 4.8, 0.8), archMat);
    leftAirlock.position.set(-4.4, 2.4, 0);
    this.exitAirlockGroup.add(leftAirlock);

    const rightAirlock = new THREE.Mesh(new THREE.BoxGeometry(0.8, 4.8, 0.8), archMat);
    rightAirlock.position.set(4.4, 2.4, 0);
    this.exitAirlockGroup.add(rightAirlock);

    // Luminous Aperture Light Gate with photorealistic architectural gateway texture
    const apertureTex = new THREE.TextureLoader().load('/src/assets/images/bg_hyperlight_aperture_1790504009615.jpg');
    const gateGeo = new THREE.PlaneGeometry(8, 4.8);
    const gateMat = new THREE.MeshBasicMaterial({
      map: apertureTex,
      transparent: true,
      opacity: 0.95,
      side: THREE.DoubleSide,
    });
    const gate = new THREE.Mesh(gateGeo, gateMat);
    gate.position.set(0, 2.4, 0);
    this.exitAirlockGroup.add(gate);

    // Holographic Communications Beacon Console hovering before the exit
    const beaconGeo = new THREE.TorusGeometry(0.65, 0.03, 16, 32);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(CHAPTERS[7].accentColor),
      transparent: true,
      opacity: 0.9,
    });
    this.commsBeaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
    this.commsBeaconMesh.position.set(0, 1.8, 4);
    this.exitAirlockGroup.add(this.commsBeaconMesh);

    // Powerful directional bloom light
    const exitSpot = new THREE.SpotLight(0xffedd5, 4.5, 40, Math.PI / 3, 0.7);
    exitSpot.position.set(0, 3.2, 0);
    exitSpot.target.position.set(0, 1.7, 25);
    this.exitAirlockGroup.add(exitSpot);
    this.exitAirlockGroup.add(exitSpot.target);

    this.scene.add(this.exitAirlockGroup);
  }

  private onResize() {
    if (this.isDestroyed) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  private onMouseMove(e: MouseEvent) {
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = -(e.clientY / window.innerHeight) * 2 + 1;
    this.mouse.targetX = normX * 0.45;
    this.mouse.targetY = normY * 0.25;
  }

  public setScrollProgress(progress: number) {
    this.targetScrollProgress = Math.max(0, Math.min(1, progress));
  }

  private updateCamera(progress: number) {
    const clampedProgress = Math.max(0, Math.min(0.999, progress));
    const camPos = this.curve.getPointAt(clampedProgress);

    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    this.camera.position.set(
      camPos.x + this.mouse.x,
      camPos.y + this.mouse.y,
      camPos.z
    );

    const lookAheadProgress = Math.min(1.0, clampedProgress + 0.035);
    const lookTarget = this.curve.getPointAt(lookAheadProgress);
    lookTarget.x += this.mouse.x * 0.6;
    lookTarget.y += this.mouse.y * 0.4;
    this.camera.lookAt(lookTarget);

    let activeIdx = 0;
    for (let i = 0; i < CHAPTERS.length; i++) {
      const [start, end] = CHAPTERS[i].scrollRange;
      if (progress >= start && progress <= end) {
        activeIdx = i;
        break;
      }
    }

    if (activeIdx !== this.currentChapterIndex) {
      this.currentChapterIndex = activeIdx;
      this.targetAccentColor.set(CHAPTERS[activeIdx].accentColor);
      this.callbacks.onChapterChange?.(activeIdx);
    }

    this.callbacks.onProgressUpdate?.(progress);
  }

  /**
   * Main render loop with animations for all tech and gadget spatial effects
   */
  private animate(timestamp: number) {
    if (this.isDestroyed) return;
    this.reqId = requestAnimationFrame(this.animate);

    // Camera smoothing
    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.09;
    this.updateCamera(this.scrollProgress);

    // 1. Atmosphere & Fog Lerping
    this.currentAccentColor.lerp(this.targetAccentColor, 0.05);
    const fogColor = new THREE.Color(0x060609).lerp(this.currentAccentColor, 0.12);
    this.fog.color.copy(fogColor);

    // Exit fog thinning
    if (this.scrollProgress > 0.88) {
      const exitFactor = (this.scrollProgress - 0.88) / 0.12;
      this.fog.density = THREE.MathUtils.lerp(0.026, 0.005, exitFactor);
      this.renderer.toneMappingExposure = THREE.MathUtils.lerp(1.05, 1.85, exitFactor);
      this.exitLight.intensity = THREE.MathUtils.lerp(0.6, 4.5, exitFactor);
    } else {
      this.fog.density = 0.026;
      this.renderer.toneMappingExposure = 1.05;
      this.exitLight.intensity = 0.6;
    }

    // 2. Server Racks Blinking Activity LEDs
    this.serverBlinkers.forEach((item) => {
      const blink = Math.sin(timestamp * 0.001 * item.freq + item.phase);
      item.mesh.visible = blink > 0.2;
    });

    // 3. Overhead Optical Data Packets
    this.dataPackets.forEach((pkt) => {
      pkt.mesh.position.z -= pkt.speed * 0.02;
      if (pkt.mesh.position.z < -220) {
        pkt.mesh.position.z = pkt.startZ;
      }
    });

    // 4. Floating Holographic Wireframe Plates gentle float
    this.floatingHoloPlates.forEach((plate, i) => {
      plate.position.y += Math.sin(timestamp * 0.002 + i) * 0.0015;
    });

    // 5. Chapter 1: Silicon CPU Die core breathing
    if (this.cpuDieGroup && this.cpuCoreMesh) {
      this.cpuDieGroup.position.y = 2.1 + Math.sin(timestamp * 0.0015) * 0.04;
      const coreMat = this.cpuCoreMesh.material as THREE.MeshStandardMaterial;
      coreMat.emissiveIntensity = 0.5 + Math.sin(timestamp * 0.003) * 0.25;
    }

    // 6. Chapter 2: Telemetry Towers LED Segment Meter Rise
    const ledgerRange = CHAPTERS[2].scrollRange;
    const ledgerProgress = THREE.MathUtils.clamp(
      (this.scrollProgress - ledgerRange[0]) / (ledgerRange[1] - ledgerRange[0]),
      0,
      1
    );

    this.ledgerColumns.forEach((col, idx) => {
      const stepStart = idx * 0.2;
      const stepProgress = THREE.MathUtils.clamp((ledgerProgress - stepStart) / 0.35, 0, 1);
      const easedProgress = 1 - Math.pow(1 - stepProgress, 3);

      col.currentHeight = THREE.MathUtils.lerp(0.02, col.targetHeight, easedProgress);
      col.columnMesh.scale.y = col.currentHeight;
      col.columnMesh.position.y = col.baseY + col.currentHeight / 2;
      col.glowMesh.position.y = col.baseY + col.currentHeight;

      // Light up LED segment ribs based on current height
      col.segments.forEach((seg, sIdx) => {
        const segThreshold = (sIdx + 1) / col.segments.length;
        seg.visible = easedProgress >= segThreshold * 0.9;
      });
    });

    // 7. Chapter 3: Archive Console Hologram Rings rotation & proximity spotlights
    const camZ = this.camera.position.z;
    this.archiveConsoles.forEach((consoleItem) => {
      consoleItem.holoRing.rotation.z = timestamp * 0.001;
      const dist = Math.abs(camZ - consoleItem.targetZ);
      const proximity = THREE.MathUtils.clamp(1 - dist / 14, 0, 1);
      consoleItem.light.intensity = THREE.MathUtils.lerp(0.1, 3.5, Math.pow(proximity, 2));
      const ringMat = consoleItem.holoRing.material as THREE.MeshBasicMaterial;
      ringMat.opacity = THREE.MathUtils.lerp(0.2, 0.9, proximity);
    });

    // 8. Chapter 4: 3D AI Neural Core Gyro Gadget Rotation & Pulse
    if (this.neuralCoreInner && this.neuralRing1 && this.neuralRing2) {
      this.neuralCoreInner.rotation.x = timestamp * 0.0012;
      this.neuralCoreInner.rotation.y = timestamp * 0.0016;

      this.neuralRing1.rotation.z = timestamp * 0.002;
      this.neuralRing2.rotation.y = -timestamp * 0.0015;

      const pulse = (Math.sin(timestamp * 0.005) + 1) * 0.5;
      const coreMat = this.neuralCoreInner.material as THREE.MeshStandardMaterial;
      coreMat.emissiveIntensity = 0.9 + pulse * 1.4;

      this.aiClusterNodes.forEach((node) => {
        const mat = node.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 0.8 + pulse * 1.1;
      });
    }

    // 9. Chapter 5: Quantum Gyroscope Ring Rotations
    if (this.gyroRingMid && this.gyroRingInner && this.gyroscopeGroup) {
      this.gyroRingMid.rotation.z = timestamp * 0.001;
      this.gyroRingInner.rotation.z = -timestamp * 0.0018;
      this.gyroSatellites.forEach((sat, sIdx) => {
        sat.position.y = 0.08 + Math.sin(timestamp * 0.003 + sIdx) * 0.04;
      });
    }

    // 10. Chapter 6: Fiber Optic Laser Timeline & Photon Packet
    const markerRange = CHAPTERS[6].scrollRange;
    const markerProgress = THREE.MathUtils.clamp(
      (this.scrollProgress - markerRange[0]) / (markerRange[1] - markerRange[0]),
      0,
      1
    );

    if (this.timelineGeometry) {
      const p1 = new THREE.Vector3(-2.2, 1.2, 0);
      const p2 = new THREE.Vector3(2.2, 1.2, 0);
      const currentEnd = new THREE.Vector3().lerpVectors(p1, p2, markerProgress);

      const positions = this.timelineGeometry.attributes.position.array as Float32Array;
      positions[3] = currentEnd.x;
      positions[4] = currentEnd.y;
      positions[5] = currentEnd.z;
      this.timelineGeometry.attributes.position.needsUpdate = true;

      // Animate photon packet along line
      if (this.photonPacket) {
        if (markerProgress > 0.05) {
          const photonT = (timestamp * 0.0015) % 1;
          this.photonPacket.position.lerpVectors(p1, currentEnd, photonT);
          this.photonPacket.visible = true;
        } else {
          this.photonPacket.visible = false;
        }
      }

      if (this.markerSpheres.length >= 2) {
        const mat1 = this.markerSpheres[0].material as THREE.MeshStandardMaterial;
        mat1.emissiveIntensity = markerProgress > 0.1 ? 1.2 : 0.3;
        const mat2 = this.markerSpheres[1].material as THREE.MeshStandardMaterial;
        mat2.emissiveIntensity = markerProgress >= 0.95 ? 1.6 : 0.3;
      }
    }

    // 11. Chapter 7: Comms Beacon rotation
    if (this.commsBeaconMesh) {
      this.commsBeaconMesh.rotation.z = timestamp * 0.0015;
      this.commsBeaconMesh.rotation.y = timestamp * 0.001;
    }

    // Render
    this.renderer.render(this.scene, this.camera);
  }

  public destroy() {
    this.isDestroyed = true;
    if (this.reqId !== null) {
      cancelAnimationFrame(this.reqId);
    }
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('mousemove', this.onMouseMove);

    try {
      this.renderer.dispose();
      this.scene.clear();
    } catch {
      // Ignore dispose errors
    }
  }
}
