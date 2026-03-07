import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';
import './Hero3D.css';

const IETE_BLUE = 0x1F3C88;
const IETE_ACCENT = 0x2E5AAC;

function Model({ mousePositionRef, scrollProgressRef, centerCardRef, footerLogoRef, footerMorphRef }) {
  const modelRef = useRef();
  const { scene } = useGLTF('/white_mesh.glb');
  const meshesRef = useRef([]);

  // Polished physical material with clearcoat — cache mesh refs for useFrame
  useEffect(() => {
    const meshes = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          metalness: 0.8,
          roughness: 0.05,
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

  useFrame((state) => {
    if (modelRef.current) {
      const mousePosition = mousePositionRef.current;
      const scrollProgress = scrollProgressRef.current;
      const evMorph = window.__evMorphProgress || 0;

      // Always rotate regardless of scroll
      const autoRotationY = state.clock.elapsedTime * 0.3;
      const autoRotationX = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;

      // Combine mouse position with auto rotation (reduce mouse effect on scroll)
      modelRef.current.rotation.y = mousePosition.x * Math.PI * 0.5 * (1 - scrollProgress) + autoRotationY;
      modelRef.current.rotation.x = mousePosition.y * Math.PI * 0.3 * (1 - scrollProgress) + autoRotationX;
      modelRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.1;

      // Floating only when at hero, stop near navbar
      const floatingOffset = Math.sin(state.clock.elapsedTime * 0.5) * 0.3 * (1 - scrollProgress);

      // Phase 1 target: top-left corner of the viewport
      const topLeftX = -(state.viewport.width / 2 - 0.5);
      const topLeftY = (state.viewport.height / 2 - 0.5);

      // Phase 2 target: center of the morphing card
      let finalX = scrollProgress * topLeftX;
      let finalY = floatingOffset + scrollProgress * topLeftY;
      let finalScale = Math.max(1 - scrollProgress * 0.72, 0.28);

      if (evMorph > 0 && centerCardRef && centerCardRef.current) {
        const cardRect = centerCardRef.current.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;

        // Convert screen coords to Three.js world coords
        const ndcX = (cardCenterX / window.innerWidth) * 2 - 1;
        const ndcY = -(cardCenterY / window.innerHeight) * 2 + 1;
        const worldX = ndcX * (state.viewport.width / 2);
        const worldY = ndcY * (state.viewport.height / 2);

        // Lerp from phase-1 position to card center
        const p1X = scrollProgress * topLeftX;
        const p1Y = scrollProgress * topLeftY;
        finalX = p1X + evMorph * (worldX - p1X);
        finalY = p1Y + evMorph * (worldY - p1Y);

        // Scale to fit inside the circle: use the circle radius in world units
        // cardRect dimensions already reflect CSS scale transform
        const circleRadius = Math.min(cardRect.width, cardRect.height) / 2;
        const worldUnitsPerPixel = state.viewport.width / window.innerWidth;
        // 0.75 fills ~75% of the circle radius — adjust if needed
        const targetScale = circleRadius * worldUnitsPerPixel * 0.89;
        finalScale = finalScale + evMorph * (targetScale - finalScale);
      }

      modelRef.current.position.x = finalX;
      modelRef.current.position.y = finalY;
      modelRef.current.scale.set(finalScale, finalScale, finalScale);

      const emissiveIntensity = 0.06 + Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
      for (const mesh of meshesRef.current) {
        mesh.material.emissiveIntensity = emissiveIntensity;
      }

      // ── Phase 3: footer logo morph ──────────────────────────
      const footerMorph = footerMorphRef ? footerMorphRef.current : 0;
      if (footerMorph > 0 && footerLogoRef && footerLogoRef.current) {
        const fRect = footerLogoRef.current.getBoundingClientRect();
        const fCenterX = fRect.left + fRect.width / 2;
        const fCenterY = fRect.top  + fRect.height / 2;

        const fNdcX = (fCenterX / window.innerWidth)  * 2 - 1;
        const fNdcY = -(fCenterY / window.innerHeight) * 2 + 1;
        const fWorldX = fNdcX * (state.viewport.width  / 2);
        const fWorldY = fNdcY * (state.viewport.height / 2);

        // Lerp position toward footer logo center
        finalX = finalX + footerMorph * (fWorldX - finalX);
        finalY = finalY + footerMorph * (fWorldY - finalY);

        // Scale to fit inside the footer logo circle
        const fRadius = Math.min(fRect.width, fRect.height) / 2;
        const worldUnitsPerPixel = state.viewport.width / window.innerWidth;
        const fTargetScale = fRadius * worldUnitsPerPixel * 0.82;
        finalScale = finalScale + footerMorph * (fTargetScale - finalScale);

        // Apply the footer-adjusted position
        modelRef.current.position.x = finalX;
        modelRef.current.position.y = finalY;
        modelRef.current.scale.set(finalScale, finalScale, finalScale);
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

const Hero3D = ({ centerCardRef, footerLogoRef }) => {
  // useRef instead of useState: mouse/scroll updates no longer trigger re-renders
  const mousePositionRef  = useRef({ x: 0, y: 0 });
  const scrollProgressRef = useRef(0);
  const footerMorphRef    = useRef(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePositionRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = window.innerHeight;
      scrollProgressRef.current = Math.min(scrolled / maxScroll, 1);

      // Footer logo morph (Phase 3)
      if (footerLogoRef && footerLogoRef.current) {
        const fRect = footerLogoRef.current.getBoundingClientRect();
        const vh    = window.innerHeight;
        const fStart = vh * 0.9;   // footer logo starts entering viewport
        const fEnd   = vh * 0.35;  // footer logo settled in viewport
        const pos    = fRect.top;
        if      (pos >= fStart) footerMorphRef.current = 0;
        else if (pos <= fEnd)   footerMorphRef.current = 1;
        else                    footerMorphRef.current = (fStart - pos) / (fStart - fEnd);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={heroRef} className="hero-section">
      <div className="canvas-container">
        <Canvas style={{ pointerEvents: 'none', display: 'block' }} dpr={[1, 1]} performance={{ min: 0.5 }}>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

          {/* Polished lighting rig */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[8, 10, 6]} intensity={3} color="#ffffff" />
          <directionalLight position={[-8, 2, -4]} intensity={1.5} color="#08CB00" />
          <directionalLight position={[4, -6, -8]} intensity={2} color="#aaffaa" />
          <pointLight position={[0, -8, 4]} intensity={1.2} color="#08CB00" />
          <pointLight position={[0, 4, 10]} intensity={1.0} color="#ffffff" />
          <Environment preset="city" />


          <Model
            mousePositionRef={mousePositionRef}
            scrollProgressRef={scrollProgressRef}
            centerCardRef={centerCardRef}
            footerLogoRef={footerLogoRef}
            footerMorphRef={footerMorphRef}
          />
        </Canvas>
      </div>

      {/* Left side floating text content */}
      <div className="hero-left-content">
        <h1 className="left-title">IETE Student Forum</h1>
        <h2 className="left-subtitle">Innovating Electronics & Communication</h2>
        <p className="left-tagline">Connecting Students • Events • Technology</p>
        <button className="explore-btn interactive">
          <span className="btn-text btn-text-top">Explore Events</span>
          <span className="btn-text btn-text-bottom ">Register Now</span>
        </button>
      </div>


    </section>
  );
};

export default Hero3D;
