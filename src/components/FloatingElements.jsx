import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FloatingElements = () => {
  const ring1Ref = useRef();
  const ring2Ref = useRef();
  const particlesRef = useRef();
  
  useFrame((state) => {
    // Rotate rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -state.clock.elapsedTime * 0.4;
    }
    
    // Animate particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      {/* Orbiting ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[8, 0.03, 16, 100]} />
        <meshBasicMaterial color="#08CB00" transparent opacity={0.4} />
      </mesh>
      
      {/* Orbiting ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[9, 0.02, 16, 100]} />
        <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
      </mesh>
      
      {/* Small floating particles */}
      <group ref={particlesRef}>
        {[...Array(20)].map((_, i) => {
          const angle = (i / 20) * Math.PI * 2;
          const radius = 10;
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * radius,
                Math.sin(angle * 2) * 2,
                Math.sin(angle) * radius
              ]}
            >
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshBasicMaterial color="#08CB00" transparent opacity={0.6} />
            </mesh>
          );
        })}
      </group>
    </>
  );
};

export default FloatingElements;
