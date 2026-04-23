import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";

import type { RollerBlindViewerProps } from "./types";

type SceneMeasurements = {
  blindWidth: number;
  blindHeight: number;
  rollerRadius: number;
  bracketDepth: number;
  windowWidth: number;
  windowHeight: number;
  roomWidth: number;
  roomHeight: number;
  roomDepth: number;
  wallZ: number;
  windowCenterY: number;
  blindTopY: number;
  blindZ: number;
};

const clampValue = (value: number, min: number, max: number) => {
  if (value < min) {
    return min;
  }

  if (value > max) {
    return max;
  }

  return value;
};

const formatMillimeters = (value: number) => `${Math.round(value)} мм`;

const buildMeasurements = (
  width: number,
  height: number,
  depth: number,
): SceneMeasurements => {
  const blindWidth = clampValue(width, 500, 2600) / 1000;
  const blindHeight = clampValue(height, 700, 2400) / 1000;
  const blindDepth = clampValue(depth, 90, 320) / 1000;
  const visibleBlindHeight = Math.min(blindHeight, 2.15);
  const windowWidth = 1.38;
  const windowHeight = 1.28;
  const roomWidth = Math.max(windowWidth + 2.6, blindWidth + 2.2, 4.6);
  const roomHeight = 3.05;
  const roomDepth = 5.8;
  const wallZ = -2.15;
  const windowCenterY = 1.48;
  const blindTopY = windowCenterY + windowHeight / 2 + 0.26;
  const blindZ = wallZ + 0.2;

  return {
    blindWidth,
    blindHeight: visibleBlindHeight,
    rollerRadius: clampValue(blindDepth * 0.22, 0.03, 0.07),
    bracketDepth: clampValue(blindDepth, 0.12, 0.24),
    windowWidth,
    windowHeight,
    roomWidth,
    roomHeight,
    roomDepth,
    wallZ,
    windowCenterY,
    blindTopY,
    blindZ,
  };
};

const RoomShell = ({
  measurements,
  wallColor,
}: {
  measurements: SceneMeasurements;
  wallColor: string;
}) => {
  const {
    roomWidth,
    roomHeight,
    roomDepth,
    wallZ,
    windowWidth,
    windowHeight,
    windowCenterY,
  } = measurements;
  const wallThickness = 0.12;
  const wallSideWidth = (roomWidth - windowWidth) / 2;
  const windowTop = windowCenterY + windowHeight / 2;
  const windowBottom = windowCenterY - windowHeight / 2;

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color="#d7c4a9" roughness={0.92} />
      </mesh>

      <mesh position={[0, roomHeight, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[roomWidth, roomDepth]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.95} />
      </mesh>

      <mesh position={[-roomWidth / 2, roomHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>

      <mesh position={[roomWidth / 2, roomHeight / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[roomDepth, roomHeight]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>

      <mesh position={[0, roomHeight / 2, roomDepth / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[roomWidth, roomHeight]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>

      <mesh position={[0, roomHeight - wallThickness / 2, wallZ]} castShadow receiveShadow>
        <boxGeometry args={[roomWidth, wallThickness, wallThickness]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>

      <mesh
        position={[0, windowBottom / 2, wallZ]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[roomWidth, windowBottom, wallThickness]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>

      <mesh
        position={[0, windowTop + (roomHeight - windowTop) / 2, wallZ]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[roomWidth, roomHeight - windowTop, wallThickness]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>

      <mesh
        position={[-windowWidth / 2 - wallSideWidth / 2, windowCenterY, wallZ]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[wallSideWidth, windowHeight, wallThickness]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>

      <mesh
        position={[windowWidth / 2 + wallSideWidth / 2, windowCenterY, wallZ]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[wallSideWidth, windowHeight, wallThickness]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>

    </>
  );
};

const ExteriorScene = ({ measurements }: { measurements: SceneMeasurements }) => {
  const { windowWidth, windowHeight, wallZ, windowCenterY } = measurements;

  return (
    <group position={[0, 0, wallZ - 1.6]}>
      <mesh position={[0, windowCenterY + 0.35, -0.4]}>
        <planeGeometry args={[windowWidth + 3.2, windowHeight + 2.1]} />
        <meshStandardMaterial color="#b9dfff" roughness={1} />
      </mesh>

      <mesh position={[0, windowCenterY - 0.85, -1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[windowWidth + 3.2, 4.8]} />
        <meshStandardMaterial color="#8cbc73" roughness={1} />
      </mesh>

      <mesh position={[-1.4, windowCenterY - 0.12, -0.2]}>
        <sphereGeometry args={[0.62, 24, 24]} />
        <meshStandardMaterial color="#7fa56a" roughness={1} />
      </mesh>
      <mesh position={[1.2, windowCenterY - 0.08, -0.1]}>
        <sphereGeometry args={[0.8, 24, 24]} />
        <meshStandardMaterial color="#6e9859" roughness={1} />
      </mesh>

      <mesh position={[-0.75, windowCenterY + 0.58, -0.55]}>
        <sphereGeometry args={[0.24, 24, 24]} />
        <meshStandardMaterial color="#fff4a3" emissive="#ffe28f" emissiveIntensity={0.5} />
      </mesh>

      <group position={[-1.35, windowCenterY - 0.62, 0.1]}>
        <mesh position={[0, 0.28, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.06, 0.55, 12]} />
          <meshStandardMaterial color="#7a553b" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.76, 0]}>
          <coneGeometry args={[0.34, 0.78, 12]} />
          <meshStandardMaterial color="#4f7e47" roughness={1} />
        </mesh>
      </group>

      <group position={[1.45, windowCenterY - 0.66, -0.18]}>
        <mesh position={[0, 0.24, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.05, 0.48, 12]} />
          <meshStandardMaterial color="#7a553b" roughness={0.95} />
        </mesh>
        <mesh position={[0, 0.67, 0]}>
          <coneGeometry args={[0.28, 0.64, 12]} />
          <meshStandardMaterial color="#3f6f3d" roughness={1} />
        </mesh>
      </group>
    </group>
  );
};

const WindowAndBlind = ({
  measurements,
  fabricColor,
  hardwareColor,
}: {
  measurements: SceneMeasurements;
  fabricColor: string;
  hardwareColor: string;
}) => {
  const {
    blindWidth,
    blindHeight,
    rollerRadius,
    bracketDepth,
    windowWidth,
    windowHeight,
    wallZ,
    windowCenterY,
    blindTopY,
    blindZ,
  } = measurements;
  const frameThickness = 0.09;
  const frameDepth = 0.11;
  const frameColor = "#f3f4f6";
  const glassWidth = windowWidth - frameThickness * 1.4;
  const glassHeight = windowHeight - frameThickness * 1.4;

  return (
    <>
      <mesh position={[0, windowCenterY + windowHeight / 2 - frameThickness / 2, wallZ + frameDepth / 2]}>
        <boxGeometry args={[windowWidth, frameThickness, frameDepth]} />
        <meshStandardMaterial color={frameColor} metalness={0.06} roughness={0.42} />
      </mesh>
      <mesh position={[0, windowCenterY - windowHeight / 2 + frameThickness / 2, wallZ + frameDepth / 2]}>
        <boxGeometry args={[windowWidth, frameThickness, frameDepth]} />
        <meshStandardMaterial color={frameColor} metalness={0.06} roughness={0.42} />
      </mesh>
      <mesh position={[-windowWidth / 2 + frameThickness / 2, windowCenterY, wallZ + frameDepth / 2]}>
        <boxGeometry args={[frameThickness, windowHeight, frameDepth]} />
        <meshStandardMaterial color={frameColor} metalness={0.06} roughness={0.42} />
      </mesh>
      <mesh position={[windowWidth / 2 - frameThickness / 2, windowCenterY, wallZ + frameDepth / 2]}>
        <boxGeometry args={[frameThickness, windowHeight, frameDepth]} />
        <meshStandardMaterial color={frameColor} metalness={0.06} roughness={0.42} />
      </mesh>

      <mesh position={[0, windowCenterY, wallZ + 0.02]}>
        <planeGeometry args={[glassWidth, glassHeight]} />
        <meshPhysicalMaterial
          color="#d9eefc"
          transparent
          opacity={0.28}
          roughness={0.05}
          transmission={0.76}
        />
      </mesh>

      <mesh position={[0, windowCenterY, wallZ + 0.025]}>
        <boxGeometry args={[0.035, windowHeight - 0.08, 0.04]} />
        <meshStandardMaterial color="#dde3ea" metalness={0.08} roughness={0.36} />
      </mesh>

      <mesh position={[0, blindTopY, blindZ]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[rollerRadius, rollerRadius, blindWidth + 0.08, 24]} />
        <meshStandardMaterial color={hardwareColor} metalness={0.75} roughness={0.28} />
      </mesh>

      <mesh position={[-blindWidth / 2 - 0.08, blindTopY, blindZ + bracketDepth / 4]} castShadow>
        <boxGeometry args={[0.09, 0.16, bracketDepth]} />
        <meshStandardMaterial color={hardwareColor} metalness={0.72} roughness={0.28} />
      </mesh>
      <mesh position={[blindWidth / 2 + 0.08, blindTopY, blindZ + bracketDepth / 4]} castShadow>
        <boxGeometry args={[0.09, 0.16, bracketDepth]} />
        <meshStandardMaterial color={hardwareColor} metalness={0.72} roughness={0.28} />
      </mesh>

      <mesh position={[0, blindTopY - blindHeight / 2 - rollerRadius, blindZ + 0.02]} castShadow receiveShadow>
        <planeGeometry args={[blindWidth, blindHeight]} />
        <meshStandardMaterial color={fabricColor} roughness={0.92} metalness={0.04} side={2} />
      </mesh>

      <mesh
        position={[0, blindTopY - blindHeight - rollerRadius, blindZ + 0.03]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[blindWidth + 0.05, 0.045, 0.05]} />
        <meshStandardMaterial color={hardwareColor} metalness={0.72} roughness={0.3} />
      </mesh>

      <mesh position={[blindWidth / 2 - 0.04, blindTopY - blindHeight / 2, blindZ + 0.05]}>
        <cylinderGeometry args={[0.008, 0.008, blindHeight * 0.7, 10]} />
        <meshStandardMaterial color="#d8d8d8" roughness={0.84} />
      </mesh>
    </>
  );
};

const ViewerScene = ({
  width,
  height,
  depth,
  fabricColor,
  hardwareColor,
  wallColor,
}: Required<
  Pick<
    RollerBlindViewerProps,
    "width" | "height" | "depth" | "fabricColor" | "hardwareColor" | "wallColor"
  >
>) => {
  const measurements = useMemo(
    () => buildMeasurements(width, height, depth),
    [depth, height, width],
  );

  return (
    <>
      <ambientLight intensity={1.15} />
      <hemisphereLight intensity={0.7} color="#ffffff" groundColor="#b4a58f" />
      <directionalLight
        castShadow
        intensity={1.45}
        position={[2.8, 3.9, 3.1]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <RoomShell measurements={measurements} wallColor={wallColor} />
      <ExteriorScene measurements={measurements} />
      <WindowAndBlind
        measurements={measurements}
        fabricColor={fabricColor}
        hardwareColor={hardwareColor}
      />
    </>
  );
};

export const RollerBlindViewer = ({
  width,
  height,
  depth = 140,
  fabricColor,
  hardwareColor,
  wallColor = "#dce9ff",
  className,
}: RollerBlindViewerProps) => {
  const safeWidth = clampValue(width, 500, 2600);
  const safeHeight = clampValue(height, 700, 2400);
  const safeDepth = clampValue(depth, 90, 320);
  const rootClassName = className
    ? `roller-blind-viewer ${className}`
    : "roller-blind-viewer";

  return (
    <section className={rootClassName}>
      <div className="roller-blind-viewer__summary">
        <p className="roller-blind-viewer__eyebrow">3D preview</p>
        <h2 className="roller-blind-viewer__title">Рулонная штора</h2>
        <p className="roller-blind-viewer__meta">
          {formatMillimeters(safeWidth)} x {formatMillimeters(safeHeight)}
        </p>
        <p className="roller-blind-viewer__meta">
          Глубина системы: {formatMillimeters(safeDepth)}
        </p>
      </div>

      <div
        className="roller-blind-viewer__canvas"
        role="img"
        aria-label={`3D-сцена рулонной шторы ${Math.round(safeWidth)} на ${Math.round(safeHeight)} миллиметров`}
      >
        <Canvas shadows dpr={[1, 2]} style={{ width: "100%", height: "100%" }}>
          <color attach="background" args={["#eaf1ff"]} />
          <PerspectiveCamera makeDefault position={[0, 1.65, 4.9]} fov={36} />
          <ViewerScene
            width={safeWidth}
            height={safeHeight}
            depth={safeDepth}
            fabricColor={fabricColor}
            hardwareColor={hardwareColor}
            wallColor={wallColor}
          />
          <OrbitControls
            enablePan={false}
            enableDamping
            minDistance={3.4}
            maxDistance={7}
            minPolarAngle={0.95}
            maxPolarAngle={1.52}
            target={[0, 1.45, -1.2]}
          />
        </Canvas>
      </div>
    </section>
  );
};
