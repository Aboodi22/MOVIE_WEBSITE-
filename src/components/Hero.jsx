import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Drifting field of thin glass-like shards, lit from one side in cool
 * blue and rim-lit in soft white — evoking scattered film frames
 * floating in the dark rather than a generic starfield.
 */
export default function Hero({ children, theme = 'light' }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const fogColor = theme === 'dark' ? 0x000000 : 0xf5f5f7;
    scene.fog = new THREE.FogExp2(fogColor, 0.05);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // Lighting: one Apple-blue key light, one soft white rim light.
    const key = new THREE.PointLight(0x0071e3, 20, 30);
    key.position.set(-4, 2, 6);
    scene.add(key);

    const rim = new THREE.PointLight(0xf5f5f7, 5, 30);
    rim.position.set(5, -3, -4);
    scene.add(rim);

    scene.add(new THREE.AmbientLight(0x14161c, 1.1));

    // A field of thin shard planes, like scattered frames of film.
    const group = new THREE.Group();
    const shardGeo = new THREE.PlaneGeometry(0.9, 1.3);
    const shardMat = new THREE.MeshStandardMaterial({
      color: 0x1c1d21,
      metalness: 0.55,
      roughness: 0.2,
      emissive: 0x0a3d73,
      emissiveIntensity: 0.3,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88,
    });

    const SHARD_COUNT = 46;
    const shards = [];
    for (let i = 0; i < SHARD_COUNT; i++) {
      const mesh = new THREE.Mesh(shardGeo, shardMat);
      const radius = 4 + Math.random() * 6;
      const angle = Math.random() * Math.PI * 2;
      const depth = (Math.random() - 0.5) * 10;
      mesh.position.set(
        Math.cos(angle) * radius * 0.6,
        (Math.random() - 0.5) * 6,
        depth - 2
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      const scale = 0.4 + Math.random() * 0.9;
      mesh.scale.setScalar(scale);
      mesh.userData.spin = (Math.random() - 0.5) * 0.15;
      mesh.userData.driftSpeed = 0.05 + Math.random() * 0.1;
      mesh.userData.driftOffset = Math.random() * Math.PI * 2;
      mesh.userData.baseY = mesh.position.y;
      group.add(mesh);
      shards.push(mesh);
    }
    scene.add(group);

    let pointerX = 0;
    let pointerY = 0;
    const handlePointerMove = (e) => {
      pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', handlePointerMove);

    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      const t = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        group.rotation.y = t * 0.02 + pointerX * 0.15;
        group.rotation.x = pointerY * 0.08;

        shards.forEach((mesh) => {
          mesh.rotation.x += mesh.userData.spin * 0.01;
          mesh.rotation.y += mesh.userData.spin * 0.006;
          mesh.position.y =
            mesh.userData.baseY +
            Math.sin(t * mesh.userData.driftSpeed + mesh.userData.driftOffset) *
              0.4;
        });
      }

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      shardGeo.dispose();
      shardMat.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      sceneRef.current = null;
    };
  }, []);

  // Update the fog color live when the theme toggles, without
  // rebuilding the whole 3D scene.
  useEffect(() => {
    if (sceneRef.current) {
      const fogColor = theme === 'dark' ? 0x000000 : 0xf5f5f7;
      sceneRef.current.fog.color.set(fogColor);
    }
  }, [theme]);

  return (
    <div className="hero">
      <div className="hero-canvas" ref={mountRef} aria-hidden="true" />
      <div className="hero-content">{children}</div>
    </div>
  );
}