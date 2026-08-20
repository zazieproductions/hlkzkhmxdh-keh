import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = { chaos: number };

type ShardData = {
  radius: number;
  speed: number;
  phase: number;
  yAmp: number;
  spin: number;
};

type SpriteData = {
  phase: number;
  radius: number;
  speed: number;
  scale: number;
};

export default function ThreeVoid({ chaos }: Props) {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const chaosRef = useRef(chaos);

  useEffect(() => {
    chaosRef.current = chaos;
  }, [chaos]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050008, 0.014);

    const camera = new THREE.PerspectiveCamera(
      78,
      window.innerWidth / window.innerHeight,
      0.1,
      500
    );
    camera.position.set(0, 0, 6);

    // ---- starfield warp ----
    const STAR_COUNT = 1500;
    const starPositions = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 160;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 160;
      starPositions[i * 3 + 2] = -Math.random() * 260 + 10;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.4,
      transparent: true,
      opacity: 0.95,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // ---- the great knot ----
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(2.4, 0.62, 200, 20, 2, 3),
      new THREE.MeshBasicMaterial({ wireframe: true, color: 0xff00d4, transparent: true, opacity: 0.85 })
    );
    scene.add(knot);

    const innerCage = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.1, 1),
      new THREE.MeshBasicMaterial({ wireframe: true, color: 0x00ffcc, transparent: true, opacity: 0.9 })
    );
    knot.add(innerCage);

    // ---- orbiting wire shards ----
    const shards: THREE.Mesh[] = [];
    for (let i = 0; i < 16; i++) {
      const geo =
        i % 2 === 0
          ? new THREE.TetrahedronGeometry(0.5 + Math.random() * 0.8)
          : new THREE.OctahedronGeometry(0.4 + Math.random() * 0.7);
      const mesh = new THREE.Mesh(
        geo,
        new THREE.MeshBasicMaterial({ wireframe: true, color: 0xffffff, transparent: true, opacity: 0.8 })
      );
      const data: ShardData = {
        radius: 5 + Math.random() * 9,
        speed: 0.3 + Math.random() * 0.9,
        phase: Math.random() * Math.PI * 2,
        yAmp: 1 + Math.random() * 4,
        spin: 1 + Math.random() * 3,
      };
      mesh.userData = data;
      scene.add(mesh);
      shards.push(mesh);
    }

    // ---- floating eye sprites ----
    const sprites: THREE.Sprite[] = [];
    new THREE.TextureLoader().load("/images/eye.png", (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      for (let i = 0; i < 8; i++) {
        const mat = new THREE.SpriteMaterial({
          map: tex,
          transparent: true,
          opacity: 0.9,
          depthWrite: false,
        });
        const s = new THREE.Sprite(mat);
        const data: SpriteData = {
          phase: (i / 8) * Math.PI * 2,
          radius: 6 + Math.random() * 8,
          speed: 0.25 + Math.random() * 0.5,
          scale: 1.2 + Math.random() * 1.8,
        };
        s.userData = data;
        scene.add(s);
        sprites.push(s);
      }
    });

    const clock = new THREE.Clock();
    let raf = 0;
    const color = new THREE.Color();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const c = chaosRef.current;
      const speed = 0.5 + c * 0.45;

      // stars rushing past the camera
      const pos = starGeo.getAttribute("position") as THREE.BufferAttribute;
      const zSpeed = 0.9 + c * 0.85;
      for (let i = 0; i < STAR_COUNT; i++) {
        let z = pos.getZ(i) + zSpeed;
        if (z > 12) {
          z = -260;
          pos.setX(i, (Math.random() - 0.5) * 160);
          pos.setY(i, (Math.random() - 0.5) * 160);
        }
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;

      knot.rotation.x = t * speed * 0.9;
      knot.rotation.y = t * speed * 1.25;
      knot.rotation.z = t * speed * 0.4;
      knot.scale.setScalar(1 + Math.sin(t * (2 + c)) * 0.12);
      (knot.material as THREE.MeshBasicMaterial).color.copy(color.setHSL((t * 0.3) % 1, 1, 0.55));
      innerCage.rotation.x = -t * speed * 2;
      innerCage.rotation.z = t * speed * 1.6;

      shards.forEach((s, i) => {
        const u = s.userData as ShardData;
        const a = t * u.speed * speed + u.phase;
        s.position.set(Math.cos(a) * u.radius, Math.sin(a * 1.3) * u.yAmp, Math.sin(a) * u.radius - 4);
        s.rotation.x = t * u.spin;
        s.rotation.y = t * u.spin * 0.7;
        (s.material as THREE.MeshBasicMaterial).color.copy(color.setHSL((t * 0.4 + i * 0.11) % 1, 1, 0.6));
      });

      sprites.forEach((s) => {
        const u = s.userData as SpriteData;
        const a = t * u.speed * speed + u.phase;
        s.position.set(Math.cos(a) * u.radius, Math.sin(a * 0.7) * 3.5, Math.sin(a) * u.radius - 2);
        const pulse = u.scale * (1 + 0.35 * Math.sin(t * 3 + u.phase * 5));
        s.scale.set(pulse, pulse, 1);
      });

      camera.position.x = Math.sin(t * 1.7) * 0.35 * (1 + c * 0.2);
      camera.position.y = Math.cos(t * 2.3) * 0.3 * (1 + c * 0.2);
      camera.rotation.z = Math.sin(t * 0.8) * 0.05 * (1 + c * 0.15);

      renderer.setClearColor(color.setHSL((t * 0.07) % 1, 0.85, 0.045 + 0.01 * c));
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none hue-spin" aria-hidden />;
}
