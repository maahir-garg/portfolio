"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";

type Photo = {
    src: string;
    category: string;
    id: string;
};

// Placeholder data since we might not have the manifest populated yet
const PLACEHOLDER_PHOTOS: Photo[] = Array.from({ length: 12 }).map((_, i) => ({
    id: `p-${i}`,
    src: `https://picsum.photos/seed/${i + 130}/800/600`, // High quality random seed
    category: i % 3 === 0 ? "Landscape" : i % 3 === 1 ? "Street" : "Portrait",
}));

export function PhotoScatteredView() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [photos, setPhotos] = useState<Photo[]>(PLACEHOLDER_PHOTOS);
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [constraints, setConstraints] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // In a real implementation, fetch from /api/photos or import JSON
        // For now using placeholders as requested
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            setConstraints({
                width: containerRef.current.offsetWidth,
                height: containerRef.current.offsetHeight
            });
        }
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-[120vh] bg-[#1a1a1a] overflow-hidden cursor-grab active:cursor-grabbing">
            {/* Background Grid / Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />

            {/* Instructions */}
            <div className="absolute top-8 left-8 z-10 text-white/50 pointer-events-none mix-blend-difference font-mono text-sm">
                DRAG TO EXPLORE • CLICK TO EXPAND
            </div>

            {photos.map((photo, index) => {
                // Random scattering positions
                const randomX = Math.random() * (constraints.width || 1000) * 0.6 + (constraints.width * 0.1);
                const randomY = Math.random() * (constraints.height || 800) * 0.6 + (constraints.height * 0.1);
                const randomRotate = (Math.random() - 0.5) * 30;

                return (
                    <motion.div
                        key={photo.id}
                        drag
                        dragConstraints={containerRef}
                        dragElastic={0.1}
                        whileHover={{ scale: 1.1, zIndex: 50, rotate: 0, cursor: "pointer" }}
                        whileTap={{ scale: 0.95 }}
                        initial={{
                            x: randomX,
                            y: randomY,
                            rotate: randomRotate,
                            opacity: 0,
                            scale: 0.5
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            transition: { delay: index * 0.05, duration: 0.5 }
                        }}
                        onClick={() => setSelectedPhoto(photo)}
                        className="absolute shadow-2xl origin-center"
                        style={{
                            width: '240px',
                            aspectRatio: '4/3',
                            zIndex: index
                        }}
                    >
                        <div className="w-full h-full bg-white p-2 pb-8 shadow-sm rotate-1">
                            <div className="w-full h-full relative overflow-hidden bg-gray-200">
                                <Image src={photo.src} alt={photo.category} fill className="object-cover" />
                            </div>
                            <div className="absolute bottom-2 left-3 text-black font-handwriting opacity-60 text-xs">
                                {photo.category} • {index + 1}
                            </div>
                        </div>
                    </motion.div>
                );
            })}

            {/* Lightbox / Fullscreen View */}
            {selectedPhoto && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-default"
                    onClick={() => setSelectedPhoto(null)}
                >
                    <button className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors">
                        <X size={32} />
                    </button>

                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        className="relative w-full max-w-5xl aspect-[3/2] bg-black shadow-2xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image src={selectedPhoto.src} alt={selectedPhoto.category} fill className="object-contain" />
                    </motion.div>

                    <div className="absolute bottom-8 left-0 right-0 text-center text-white/50 font-mono text-sm">
                        {selectedPhoto.category} Collection
                    </div>
                </motion.div>
            )}
        </div>
    );
}
