import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const Model = ({ onHover }) => {
  const { scene } = useGLTF('/landing.glb'); // Ensure the path is correct
  return (
    <primitive 
      object={scene} 
      scale={1} 
      onPointerOver={() => onHover(true)} 
      onPointerOut={() => onHover(false)} 
    />
  );
};

const RotationLogo = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ width: '100%', height: '50vh', background: `radial-gradient(circle, rgba(30,64,175,1) 0%, rgba(79,70,229,1) 100%)`, margin: 'auto' }}>
      <Canvas style={{ width: '100%', height: '100%' }}>
        <React.Suspense fallback={<Html><p>Loading...</p></Html>}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={2} />
          <pointLight position={[-10, -10, 10]} intensity={0.5} />
          <spotLight 
            position={[0, 5, 0]} 
            angle={0.2} 
            penumbra={1} 
            intensity={2} 
            castShadow 
            distance={10} 
            decay={2} 
          />
          
          {/* Model with Hover Detection */}
          <Model onHover={setHovered} />
          
          <OrbitControls autoRotate enableZoom={false} enablePan={false} enableRotate={true} />
          
          {hovered && (
            <EffectComposer>
              <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={7} />
            </EffectComposer>
          )}
        </React.Suspense>
      </Canvas>
    </div>
  );
};

export default RotationLogo;
