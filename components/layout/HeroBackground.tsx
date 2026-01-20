"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Custom Shader Material for Organic Movement
const ParticleShaderMaterial = {
    uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color("#6B8E78") },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: 1 },
    },
    vertexShader: `
    uniform float uTime;
    uniform float uPixelRatio;
    uniform vec2 uMouse;
    attribute float aScale;
    
    varying float vAlpha;

    void main() {
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      // Organic "Floating" Movement (Sine waves based on position + time)
      modelPosition.x += sin(modelPosition.y * 0.5 + uTime * 0.3) * 0.2;
      modelPosition.y += cos(modelPosition.x * 0.3 + uTime * 0.2) * 0.2;
      modelPosition.z += sin(modelPosition.x * 0.5 + uTime * 0.4) * 0.2;

      // Mouse Interaction (Push effect)
      float dist = distance(modelPosition.xy, uMouse * 10.0); // Simple mapping
      float influence = 1.0 - smoothstep(0.0, 3.0, dist);
      vec2 direction = normalize(modelPosition.xy - uMouse * 10.0);
      modelPosition.xy += direction * influence * 1.5;

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;
      
      // Size attenuation
      gl_PointSize = aScale * uPixelRatio * 30.0;
      gl_PointSize *= (1.0 / -viewPosition.z);

      // Fade out based on depth/influence
      vAlpha = 0.6 + influence * 0.4; 
    }
  `,
    fragmentShader: `
    uniform vec3 uColor;
    varying float vAlpha;

    void main() {
      // Circular particle
      vec2 uv = gl_PointCoord - 0.5;
      float d = length(uv);
      if(d > 0.5) discard;

      // Soft edge
      float alpha = (0.5 - d) * 2.0 * vAlpha;
      
      gl_FragColor = vec4(uColor, alpha);
    }
  `
};

function OrganicParticles() {
    const shaderRef = useRef<THREE.ShaderMaterial>(null!);
    const count = 4000;

    const [positions, scales] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // Spread particles in a wide volume
            positions[i * 3] = (Math.random() - 0.5) * 25;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            scales[i] = Math.random();
        }
        return [positions, scales];
    }, []);

    useFrame((state) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
            shaderRef.current.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);

            // Map mouse -1 to 1 to world space approx
            const x = state.mouse.x * 12; // Aspect ratio compensation rough
            const y = state.mouse.y * 7;

            // Smooth lerp for mouse uniform
            shaderRef.current.uniforms.uMouse.value.lerp(new THREE.Vector2(x, y), 0.1);
        }
    });

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
                <bufferAttribute
                    attach="attributes-aScale"
                    count={scales.length}
                    array={scales}
                    itemSize={1}
                    args={[scales, 1]}
                />
            </bufferGeometry>
            <shaderMaterial
                ref={shaderRef}
                args={[ParticleShaderMaterial]}
                transparent={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export function HeroBackground() {
    return (
        <div className="absolute inset-0 -z-10 opacity-70">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]} // Handle high DPI screens
            >
                <OrganicParticles />
            </Canvas>
            {/* Vignette/Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80 pointer-events-none" />
        </div>
    );
}
