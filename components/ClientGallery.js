'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function ClientGallery({ initialImages }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [visibleCount, setVisibleCount] = useState(20);
    const [lightboxImage, setLightboxImage] = useState(null);

    const categories = ['All', ...new Set(initialImages.map(img => img.category))].filter(Boolean);

    const filteredImages = selectedCategory === 'All'
        ? initialImages
        : initialImages.filter(img => img.category === selectedCategory);

    const visibleImages = filteredImages.slice(0, visibleCount);

    const loadMore = () => {
        setVisibleCount(prev => prev + 20);
    };

    return (
        <div>
            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-10 animate-fade-in-up delay-200">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => { setSelectedCategory(cat); setVisibleCount(20); }}
                        className={`px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider transition-all shadow-sm ${selectedCategory === cat
                                ? 'bg-iis-maroon text-white shadow-md scale-105'
                                : 'bg-white text-slate-600 hover:bg-gray-100'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Gallery Grid */}
            {visibleImages.length === 0 ? (
                <div className="text-center text-slate-500 py-20">
                    <p>No images found in this category.</p>
                </div>
            ) : (
                <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mx-auto">
                    {visibleImages.map((img, idx) => (
                        <div
                            key={`${img.id}-${idx}`}
                            className="break-inside-avoid relative group rounded-lg overflow-hidden shadow-md bg-gray-100 cursor-pointer"
                            onClick={() => setLightboxImage(img.src)}
                        >
                            <Image
                                src={img.src}
                                alt={img.title || 'Gallery Image'}
                                width={0}
                                height={0}
                                sizes="100vw"
                                style={{ width: '100%', height: 'auto' }}
                                loading="lazy"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                <span className="text-white text-xs font-bold uppercase tracking-wider">{img.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Load More */}
            {visibleCount < filteredImages.length && (
                <div className="text-center mt-12">
                    <button
                        onClick={loadMore}
                        className="bg-white border border-gray-300 text-slate-700 px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-iis-maroon hover:text-white hover:border-iis-maroon transition-all shadow-sm"
                    >
                        Load More
                    </button>
                </div>
            )}

            {/* Simple Lightbox */}
            {lightboxImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                    onClick={() => setLightboxImage(null)}
                >
                    <button className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300">&times;</button>
                    <div className="relative max-w-full max-h-[90vh] w-full h-full">
                         <Image
                            src={lightboxImage}
                            alt="Full View"
                            fill
                            className="object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
