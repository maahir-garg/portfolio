"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

function BinaryParticles() {
    const groupRef = useRef<THREE.Group>(null!);
    const particlesRef = useRef<{ mesh: THREE.Mesh; velocity: THREE.Vector3; char: string }[]>([]);
    const count = 80;

    useEffect(() => {
        if (!groupRef.current) return;

        // Clear existing particles
        while (groupRef.current.children.length > 0) {
            groupRef.current.remove(groupRef.current.children[0]);
        }
        particlesRef.current = [];
    }, []);

    useFrame((state) => {
        if (!groupRef.current) return;

        // Initialize particles if needed
        if (particlesRef.current.length === 0 && groupRef.current.children.length === 0) {
            // We'll handle this through the JSX instead
        }

        // Animate existing text meshes
        groupRef.current.children.forEach((child, i) => {
            if (child instanceof THREE.Mesh) {
                child.position.y += 0.003;
                child.position.x += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.001;

                // Reset position when out of view
                if (child.position.y > 10) {
                    child.position.y = -10;
                    child.position.x = (Math.random() - 0.5) * 20;
                }
            }
        });

        // Gentle rotation
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    });

    // Generate static binary characters
    const particles = Array.from({ length: count }).map((_, i) => ({
        id: i,
        char: Math.random() > 0.5 ? "1" : "0",
        position: [
            (Math.random() - 0.5) * 25,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10
        ] as [number, number, number],
        opacity: Math.random() * 0.3 + 0.1,
    }));

    return (
        <group ref={groupRef}>
            {particles.map((p) => (
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
