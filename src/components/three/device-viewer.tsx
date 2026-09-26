"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/device-menu.glb";

const MATERIAL_OVERRIDES: Record<string, () => THREE.Material> = {
  DompetGaruda_Body: () =>
    new THREE.MeshStandardMaterial({ color: "#17181c", roughness: 0.55, metalness: 0.2 }),
  Screen_Bezel: () =>
    new THREE.MeshStandardMaterial({ color: "#0a0a0c", roughness: 0.4, metalness: 0.1 }),
  Sensor: () =>
    new THREE.MeshStandardMaterial({ color: "#0a0a0c", roughness: 0.5, metalness: 0.1 }),
};

function createStatusStripTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 16;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 256, 0);
    gradient.addColorStop(0, "#e2483d");
    gradient.addColorStop(0.5, "#4caf50");
    gradient.addColorStop(1, "#f5a623");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 16);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function DeviceModel({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const rotationRef = useRef({ x: -Math.PI / 2, y: 0 });
  const { scene } = useGLTF(MODEL_URL);
  const { camera } = useThree();

  const model = useMemo(() => {
    const cloned = scene.clone(true);
    const statusStripTexture = createStatusStripTexture();

    cloned.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      if (!child.geometry.attributes.normal) {
        child.geometry.computeVertexNormals();
      }

      if (child.name === "Status_Strip") {
        child.material = new THREE.MeshStandardMaterial({
          map: statusStripTexture,
          roughness: 0.4,
          metalness: 0.1,
        });
        return;
      }

      const override = MATERIAL_OVERRIDES[child.name];
      if (override) {
        child.material = override();
        return;
      }

      const material = child.material as THREE.MeshStandardMaterial | undefined;
      if (material?.map) {
        const uv = child.geometry.attributes.uv;
        if (uv) {
          for (let i = 0; i < uv.count; i++) {
            uv.setY(i, 1 - uv.getY(i));
          }
          uv.needsUpdate = true;
        }
        material.map.colorSpace = THREE.SRGBColorSpace;
      }
    });

    return cloned;
  }, [scene]);

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(model);
    const sphere = new THREE.Sphere();
    box.getBoundingSphere(sphere);
    model.position.sub(sphere.center);

    /* eslint-disable react-hooks/immutability -- imperative three.js camera framing is the standard r3f pattern */
    const perspective = camera as THREE.PerspectiveCamera;
    const distance = (sphere.radius / Math.sin((perspective.fov * Math.PI) / 360)) * 1.35;
    perspective.position.set(0, 0, distance);
    perspective.near = Math.max(distance - sphere.radius * 3, 0.01);
    perspective.far = distance + sphere.radius * 3;
    perspective.updateProjectionMatrix();
    perspective.lookAt(0, 0, 0);
    /* eslint-enable react-hooks/immutability */
  }, [model, camera]);

  useFrame((state) => {
    if (!groupRef.current) return;

    if (reducedMotion) {
      groupRef.current.rotation.set(-Math.PI / 2, 0, 0);
      groupRef.current.position.y = 0;
      return;
    }

    const t = state.clock.elapsedTime;
    const targetX = -Math.PI / 2 + state.pointer.y * 0.2;
    const targetY = state.pointer.x * 0.4 + Math.sin(t * 0.4) * 0.05;
    rotationRef.current.x += (targetX - rotationRef.current.x) * 0.08;
    rotationRef.current.y += (targetY - rotationRef.current.y) * 0.08;
    groupRef.current.rotation.set(rotationRef.current.x, rotationRef.current.y, 0);
    groupRef.current.position.y = Math.sin(t * 0.8) * 0.12;
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}

export function DeviceViewer() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the current media query state on mount
    setReducedMotion(query.matches);
    const listener = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }}
      camera={{ fov: 32, position: [0, 0, 5] }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#bfd4ff" />
      <Suspense fallback={null}>
        <DeviceModel reducedMotion={reducedMotion} />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload(MODEL_URL);
