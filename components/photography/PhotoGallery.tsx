"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import photosManifest from "@/lib/photos-manifest.json";

type Photo = {
    src: string;
    category: string;
    id: string;
};

// Build photos array from manifest
const PHOTOS: Photo[] = photosManifest.flatMap((cat) =>
    cat.images.map((src, i) => ({
        id: `${cat.category}-${i}`,
        src,
        category: cat.category,
    }))
);

export function PhotoGallery() {
    const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("all");

    const categories = ["all", ...new Set(photosManifest.map(c => c.category).filter(c => photosManifest.find(m => m.category === c)?.images.length))];

    const filteredPhotos = activeCategory === "all"
        ? PHOTOS
        : PHOTOS.filter(p => p.category === activeCategory);

    return (
        <div className="min-h-screen bg-background">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 mb-8">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat
                                ? "bg-accent text-white"
                                : "bg-secondary/20 text-primary/70 hover:bg-secondary/40"
                            }`}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                <AnimatePresence>
                    {filteredPhotos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3, delay: index * 0.02 }}
                            className="break-inside-avoid cursor-pointer group"
                            onClick={() => setSelectedPhoto(photo)}
                        >
                            <div className="relative overflow-hidden rounded-lg bg-secondary/20">
                                <Image
                                    src={photo.src}
                                    alt={photo.category}
                                    width={600}
                                    height={400}
                                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredPhotos.length === 0 && (
                <div className="text-center py-20 text-primary/50">
                    No photos in this category yet.
                </div>
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <button
                            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
                            onClick={() => setSelectedPhoto(null)}
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative max-w-6xl max-h-[85vh] w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={selectedPhoto.src}
                                alt={selectedPhoto.category}
                                width={1920}
                                height={1080}
                                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                            />
                        </motion.div>

                        <div className="absolute bottom-6 left-0 right-0 text-center text-white/50 text-sm font-mono">
                            {selectedPhoto.category}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
