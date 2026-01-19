import React from 'react';
import { supabaseServer } from '@/lib/supabaseServer';
import fs from 'fs';
import path from 'path';
import ClientGallery from '@/components/ClientGallery';

export const metadata = {
    title: 'Gallery',
    description: 'Glimpses of life at Ishwar International School - Campus, Events, Sports, and Cultural Activities.',
};

export const dynamic = 'force-dynamic';

async function getDbImages() {
    try {
        const { data } = await supabaseServer
            .from('gallery')
            .select('*')
            .order('created_at', { ascending: false });
        return data || [];
    } catch (e) {
        console.error('Gallery fetch error:', e);
        return [];
    }
}

async function getLocalImages() {
    try {
        const manifestPath = path.join(process.cwd(), 'public', 'gallery-manifest.json');
        if (fs.existsSync(manifestPath)) {
            const fileContent = fs.readFileSync(manifestPath, 'utf-8');
            return JSON.parse(fileContent);
        }
    } catch (error) {
        console.error('Error reading gallery manifest:', error);
    }
    return [];
}

export default async function GalleryPage() {
    const dbImages = await getDbImages();
    const localImages = await getLocalImages();

    // Normalize data structure
    const normalizedDbImages = dbImages.map(img => ({
        id: `db-${img.id}`,
        src: img.image_url,
        title: img.title,
        category: 'Campus' // Default for DB uploads unless we add a column
    }));

    const normalizedLocalImages = localImages.map((img, idx) => ({
        id: `local-${idx}`,
        src: img.src,
        title: img.category, // Use category as title for now
        category: img.category
    }));

    const allImages = [...normalizedDbImages, ...normalizedLocalImages];

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-iis-maroon text-white py-16 text-center">
                <h1 className="font-serif text-4xl font-bold animate-fade-in-up">Gallery</h1>
                <p className="text-red-100 mt-2 animate-fade-in-up delay-100">Glimpses of life at Ishwar International School.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-6">
                {/* Pass data to a Client Component for filtering/interaction */}
                <ClientGallery initialImages={allImages} />
            </div>
        </div>
    );
}
