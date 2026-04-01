import { useRef, useEffect, Suspense, useState } from 'react';
import { getSettings } from '../supabase/db';
import { useLocation } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import './Hero3D.css';

const IETE_BLUE = 0x1F3C88;
const IETE_ACCENT = 0x2E5AAC;

function Model({ mousePositionRef, centerCardRef, networkHubRef, footerLogoRef, isHomePage }) {
  const modelRef = useRef();
  const glbPath = `${import.meta.env.BASE_URL}white_mesh.glb`.replace(/\/+/g, '/');
  // fallback for local dev if BASE_URL is just /
  const finalPath = glbPath.startsWith('//') ? glbPath.slice(1) : glbPath;
  const { scene } = useGLTF(finalPath);
  const meshesRef = useRef([]);

  // Polished physical material with clearcoat — cache mesh refs for useFrame
  useEffect(() => {
    const meshes = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0.8,
          roughness: 0.1,
          clearcoat: 1.0,
          clearcoatRoughness: 0.05,
          reflectivity: 1.0,
          envMapIntensity: 2.0,
          emissive: new THREE.Color(0x08CB00),
          emissiveIntensity: 0.08,
        });
        child.castShadow = true;
        child.receiveShadow = true;
        meshes.push(child);
      }
    });
    meshesRef.current = meshes;
  }, [scene]);

  // ── Animation state for dampening ──
  const currentPosRef   = useRef(new THREE.Vector3(0, 0, 0));
  const currentScaleRef = useRef(1);

  useFrame((state, delta) => {
    if (modelRef.current) {
      const mousePosition = mousePositionRef.current;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const scrollProgress = Math.min(scrollY / vh, 1);

      // ── Calculate Target Morph Progresses ──
      const safeDelta = Math.min(delta, 0.1); // Cap delta to 0.1s for stability
      
      let evMorph = 0;
      if (centerCardRef.current) {
        const section = centerCardRef.current.closest('section');
        if (section) {
          const rect = section.getBoundingClientRect();
          // Precise trigger: starts at 85% vh, ends at 35% vh
          const start = vh * 0.85, end = vh * 0.35;
          const range = start - end;
          if (range > 0 && rect.top < start && rect.top > end) {
            const raw = (start - rect.top) / range;
            evMorph = THREE.MathUtils.smoothstep(raw, 0, 1);
          } else if (rect.top <= end) {
            evMorph = 1;
          }
          // Fade out as it leaves
          if (rect.bottom < vh * 0.3 && vh > 0) {
            const fadeRaw = Math.max(0, 1 - (vh * 0.3 - rect.bottom) / (vh * 0.3));
            evMorph *= THREE.MathUtils.smoothstep(fadeRaw, 0, 1);
          }
        }
      }

      let netMorph = 0;
      if (networkHubRef.current) {
        const section = networkHubRef.current.closest('section');
        if (section) {
          const rect = section.getBoundingClientRect();
          const start = vh * 0.9, end = vh * 0.2;
          const range = start - end;
          if (range > 0 && rect.top < start && rect.top > end) {
            const raw = (start - rect.top) / range;
            netMorph = THREE.MathUtils.smoothstep(raw, 0, 1);
          } else if (rect.top <= end) {
            netMorph = 1;
          }
        }
      }

      let footerMorph = 0;
      if (footerLogoRef.current) {
        const fRect = footerLogoRef.current.getBoundingClientRect();
        const fStart = vh * 0.9, fEnd = vh * 0.35, pos = fRect.top;
        const fRange = fStart - fEnd;
        if      (pos >= fStart) footerMorph = 0;
        else if (pos <= fEnd)   footerMorph = 1;
        else if (fRange > 0) {
          const raw = (fStart - pos) / fRange;
          footerMorph = THREE.MathUtils.smoothstep(raw, 0, 1);
        }
      }

      // ── Calculate Target Position & Scale ──
      // Reduce rotation and floating as evMorph increases to make it "steady"
      const stabilityFactor = 1 - evMorph;
      const autoRotationY = state.clock.elapsedTime * 0.3 * stabilityFactor;
      const autoRotationX = Math.sin(state.clock.elapsedTime * 0.2) * 0.2 * stabilityFactor;

      modelRef.current.rotation.y = mousePosition.x * Math.PI * 0.5 * (1 - scrollProgress) * stabilityFactor + autoRotationY;
      modelRef.current.rotation.x = mousePosition.y * Math.PI * 0.3 * (1 - scrollProgress) * stabilityFactor + autoRotationX;
      modelRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.1 * stabilityFactor;

      // Also steadying the floating offset
      const floatingOffset = Math.sin(state.clock.elapsedTime * 0.5) * 0.3 * (1 - scrollProgress) * stabilityFactor;
      const topLeftX = -(state.viewport.width / 2 - 0.5);
      const topLeftY = (state.viewport.height / 2 - 0.5);

      let targetX = scrollProgress * topLeftX;
      let targetY = floatingOffset + scrollProgress * topLeftY;
      
      // Default scale/visibility for non-home pages
      let targetScale = isHomePage ? Math.max(1 - scrollProgress * 0.72, 0.28) : 0;
      
      // On non-home pages, keep it invisible until footer morph starts
      if (!isHomePage && footerMorph <= 0) {
        modelRef.current.visible = false;
      } else {
        modelRef.current.visible = true;
      }

      const winW = Math.max(window.innerWidth, 1);
      const worldUnitsPerPixel = state.viewport.width / winW;

      // Phase 2: Events Card Morph
      if (evMorph > 0 && centerCardRef.current) {
        const cardRect = centerCardRef.current.getBoundingClientRect();
        // Target top-left corner with padding consistent with the section (9vw)
        const paddingX = winW * 0.09;
        const paddingY = 100;
        const targetPosX = cardRect.left + paddingX;
        const targetPosY = cardRect.top + paddingY;
        
        const worldX = ((targetPosX / winW) * 2 - 1) * (state.viewport.width / 2);
        const worldY = (-(targetPosY / Math.max(window.innerHeight, 1)) * 2 + 1) * (state.viewport.height / 2);

        const p1X = scrollProgress * topLeftX, p1Y = scrollProgress * topLeftY;
        targetX = p1X + evMorph * (worldX - p1X);
        targetY = p1Y + evMorph * (worldY - p1Y);

        const circleRadius = Math.min(cardRect.width, cardRect.height) / 2;
        const phaseScale = circleRadius * worldUnitsPerPixel * 0.2;
        targetScale = targetScale + evMorph * (phaseScale - targetScale);
      }

      // Phase 2b: Network Hub Morph
      if (netMorph > 0 && networkHubRef.current) {
        const hubRect = networkHubRef.current.getBoundingClientRect();
        const hubCenterX = hubRect.left + hubRect.width / 2;
        const hubCenterY = hubRect.top + hubRect.height / 2;
        const nwX = ((hubCenterX / winW) * 2 - 1) * (state.viewport.width / 2);
        const nwY = (-(hubCenterY / Math.max(window.innerHeight, 1)) * 2 + 1) * (state.viewport.height / 2);

        targetX = targetX + netMorph * (nwX - targetX);
        targetY = targetY + netMorph * (nwY - targetY);

        const hubRadius = Math.min(hubRect.width, hubRect.height) / 2;
        const phaseScale = hubRadius * worldUnitsPerPixel * 1.0;
        targetScale = targetScale + netMorph * (phaseScale - targetScale);
      }

      // Phase 3: Footer Logo Morph
      if (footerMorph > 0 && footerLogoRef.current) {
        const fRect = footerLogoRef.current.getBoundingClientRect();
        const fCenterX = fRect.left + fRect.width / 2 + 5; // Slight right shift for perfect visual center
        const fCenterY = fRect.top  + fRect.height / 2 + 3; // Slight down shift
        const fWorldX = ((fCenterX / winW) * 2 - 1) * (state.viewport.width / 2);
        const fWorldY = (-(fCenterY / Math.max(window.innerHeight, 1)) * 2 + 1) * (state.viewport.height / 2);

        targetX = targetX + footerMorph * (fWorldX - targetX);
        targetY = targetY + footerMorph * (fWorldY - targetY);

        const fRadius = Math.min(fRect.width, fRect.height) / 2;
        const phaseScale = fRadius * worldUnitsPerPixel * 0.98; // Adjusted for strict 'inside' fit
        targetScale = isHomePage 
          ? targetScale + footerMorph * (phaseScale - targetScale)
          : footerMorph * phaseScale; // Direct scale on non-home pages
      }

      // ── Apply Smoothing (Dampening) ──
      // Use fallback if target calculation failed for some reason (last resort safety)
      if (!Number.isFinite(targetX)) targetX = 0;
      if (!Number.isFinite(targetY)) targetY = 0;
      if (!Number.isFinite(targetScale) || targetScale <= 0) targetScale = 0.5;

      currentPosRef.current.x = THREE.MathUtils.damp(currentPosRef.current.x, targetX, 10, safeDelta);
      currentPosRef.current.y = THREE.MathUtils.damp(currentPosRef.current.y, targetY, 10, safeDelta);
      currentScaleRef.current = THREE.MathUtils.damp(currentScaleRef.current, targetScale, 10, safeDelta);

      // Final sanity check before applying to Three.js
      if (Number.isFinite(currentPosRef.current.x) && Number.isFinite(currentPosRef.current.y) && Number.isFinite(currentScaleRef.current)) {
        modelRef.current.position.set(currentPosRef.current.x, currentPosRef.current.y, 0);
        modelRef.current.scale.set(currentScaleRef.current, currentScaleRef.current, currentScaleRef.current);
      }

      const emissiveIntensity = 0.06 + Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
      for (const mesh of meshesRef.current) {
        if (mesh.material && mesh.material.emissiveIntensity !== undefined) {
           mesh.material.emissiveIntensity = emissiveIntensity;
        }
      }
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      position={[0, 0, 0]}
    />
  );
}

const Hero3D = ({ centerCardRef, networkHubRef, footerLogoRef }) => {
  const mousePositionRef  = useRef({ x: 0, y: 0 });
  const [settings, setSettings] = useState({
    heroTitle: 'IETE Student Forum',
    heroSubtitle: 'Innovating Electronics & Communication Engineering',
  });
  const heroRef = useRef(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/IETE' || location.pathname === '/IETE/';

  useEffect(() => {
    async function load() {
      try {
        const data = await getSettings();
        if (data) setSettings(data);
      } catch (err) {
        console.error("Error loading settings:", err);
      }
    }
    load();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePositionRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div className="canvas-container">
        <Canvas 
          gl={{ 
            antialias: true, 
            alpha: true, 
          }} 
          dpr={window.devicePixelRatio}
          style={{ pointerEvents: 'none', display: 'block', width: '100vw', height: '100vh' }} 
        >
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

          {/* Polished lighting rig */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[8, 10, 6]} intensity={3} color="#ffffff" />
          <directionalLight position={[-8, 2, -4]} intensity={1.5} color="#08CB00" />
          <directionalLight position={[4, -6, -8]} intensity={2} color="#aaffaa" />
          <pointLight position={[0, -8, 4]} intensity={1.2} color="#08CB00" />
          <pointLight position={[0, 4, 10]} intensity={1.0} color="#ffffff" />
          <Environment preset="city" />


          <Suspense fallback={null}>
            <Model
              mousePositionRef={mousePositionRef}
              centerCardRef={centerCardRef}
              networkHubRef={networkHubRef}
              footerLogoRef={footerLogoRef}
              isHomePage={isHomePage}
            />
          </Suspense>
        </Canvas>
      </div>

      {isHomePage && (
        <section ref={heroRef} className="hero-section">
          {/* Left side floating text content */}
          <div className="hero-left-content">
            <h1 className="left-title">{settings.heroTitle}</h1>
            <h2 className="left-subtitle">{settings.heroSubtitle}</h2>
            <p className="left-tagline">Connecting Students • Events • Technology</p>
            <button className="explore-btn interactive">
              <span className="btn-text btn-text-top">Explore Events</span>
              <span className="btn-text btn-text-bottom ">Register Now</span>
            </button>
          </div>
        </section>
      )}
    </>
  );
};

export default Hero3D;
