"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

// Generate particles at module scope (runs once on import, not during render)
const count = 80;
const PARTICLES = Array.from({ length: count }).map((_, i) => ({
    id: i,
    char: i % 2 === 0 ? "1" : "0", // Deterministic instead of random
    position: [
        ((i * 7) % 25) - 12.5,          // Pseudo-random spread
        ((i * 13) % 20) - 10,
        ((i * 3) % 10) - 5
    ] as [number, number, number],
    opacity: 0.1 + (i % 4) * 0.1,
}));

function BinaryParticles() {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (!groupRef.current) return;

        // Animate existing text meshes
        groupRef.current.children.forEach((child, i) => {
            if (child instanceof THREE.Mesh) {
                child.position.y += 0.003;
                child.position.x += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001;

                // Reset position when out of view
                if (child.position.y > 10) {
                    child.position.y = -10;
                    child.position.x = ((i * 7) % 25) - 12.5;
                }
            }
        });

        // Gentle rotation
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    });

    return (
        <group ref={groupRef}>
            {PARTICLES.map((p) => (
                <Text
                    key={p.id}
                    position={p.position}
                    fontSize={0.5}
                    color="#6B8E78"
                    anchorX="center"
                    anchorY="middle"
                    fillOpacity={p.opacity}
                >
                    {p.char}
                </Text>
            ))}
        </group>
    );
}

export function HeroBackground() {
    return (
        <div className="absolute inset-0 -z-10 opacity-60">
            <Canvas
                camera={{ position: [0, 0, 12], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                <BinaryParticles />
            </Canvas>
            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80 pointer-events-none" />
        </div>
    );
}
