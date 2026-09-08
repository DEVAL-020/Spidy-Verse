import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreePortal() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const webGroup = new THREE.Group();
    scene.add(webGroup);

    const ringCount = 7;
    const radialSpokes = 16;
    const ringMaterials = [
      new THREE.LineBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.45 }),
      new THREE.LineBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.35 }),
      new THREE.LineBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.35 }),
    ];

    for (let i = 0; i < radialSpokes; i++) {
      const angle = (i / radialSpokes) * Math.PI * 2;
      const points = [];
      points.push(new THREE.Vector3(0, 0, 0));
      points.push(
        new THREE.Vector3(
          Math.cos(angle) * 8.5,
          Math.sin(angle) * 8.5,
          Math.sin(angle * 3) * 1.5
        )
      );
      const spokeGeo = new THREE.BufferGeometry().setFromPoints(points);
      const spokeMat = ringMaterials[i % ringMaterials.length];
      const spokeLine = new THREE.Line(spokeGeo, spokeMat);
      webGroup.add(spokeLine);
    }

    for (let r = 1; r <= ringCount; r++) {
      const radius = (r / ringCount) * 7.5;
      const points = [];
      for (let s = 0; s <= radialSpokes; s++) {
        const angle = (s / radialSpokes) * Math.PI * 2;
        const zOffset = Math.sin(angle * 4 + r) * 0.4;
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            zOffset
          )
        );
      }
      const ringGeo = new THREE.BufferGeometry().setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color: r % 2 === 0 ? 0xef4444 : 0x38bdf8,
        transparent: true,
        opacity: 0.25 + (r / ringCount) * 0.35,
      });
      const ringLine = new THREE.Line(ringGeo, ringMat);
      webGroup.add(ringLine);
    }

    const particleCount = 700;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color(0xef4444),
      new THREE.Color(0x0ea5e9),
      new THREE.Color(0xf59e0b),
      new THREE.Color(0xa855f7),
      new THREE.Color(0xffffff),
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const dist = 1.5 + Math.random() * 8.5;

      positions[i3] = dist * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = (Math.random() - 0.5) * 8;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.3, 'rgba(255,255,255,0.8)');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const coreGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreMesh);

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      targetY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      camera.position.x = currentX * 1.2;
      camera.position.y = -currentY * 1.2;
      camera.lookAt(0, 0, 0);

      webGroup.rotation.z = elapsed * 0.08;
      webGroup.rotation.y = Math.sin(elapsed * 0.2) * 0.15;

      coreMesh.rotation.x = elapsed * 0.25;
      coreMesh.rotation.y = elapsed * 0.35;
      const pulseScale = 1 + Math.sin(elapsed * 2) * 0.08;
      coreMesh.scale.set(pulseScale, pulseScale, pulseScale);

      particles.rotation.y = elapsed * 0.03;
      particles.rotation.z = -elapsed * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      particleGeo.dispose();
      particleMat.dispose();
      particleTexture.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringMaterials.forEach(m => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
