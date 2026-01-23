'use client';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Upload, Trash2, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default function GalleryManager() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const { data, error } = await supabase
                .from('gallery')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setImages(data || []);
        } catch (error) {
            console.error('Failed to fetch images:', error);
        } finally {
            setLoading(false);
        }
    };

    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Upload to Supabase Storage
        const fileName = `${Date.now()}-${file.name.replace(/\s/g, '-')}`;
        const filePath = `uploads/${fileName}`;

        try {
            // 1. Upload File
            const { error: uploadError } = await supabase.storage
                .from('gallery')
                .upload(filePath, file, {
                    contentType: file.type,
                    cacheControl: '3600',
                    upsert: false
                });

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('gallery')
                .getPublicUrl(filePath);

            // 3. Insert into DB
            const { data, error: dbError } = await supabase
                .from('gallery')
                .insert([{
                    title: file.name,
                    image_url: publicUrl
                }])
                .select();

            if (dbError) throw dbError;

            if (data) {
                setImages([data[0], ...images]);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert("Upload failed: " + error.message);
        }
    };

    const handleDelete = async (id, imageUrl) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        try {
            // Optional: Delete from storage if path can be extracted
            if (imageUrl) {
                const pathParts = imageUrl.split('/gallery/');
                // Adjust split based on actual URL structure, usually ends with /gallery/uploads/filename
                // If publicUrl is .../storage/v1/object/public/gallery/uploads/...
                // Easy way: just try to match the filePath we created.
                // For now, let's just delete the record to be safe and simple.
            }

            const { error } = await supabase
                .from('gallery')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setImages(images.filter(img => img.id !== id));
        } catch (error) {
            console.error("Delete error:", error);
            alert("Delete failed");
        }
    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-iis-navy">Gallery & Kids Zone</h2>
                    <p className="text-sm text-slate-500">Manage campus photos and gallery section.</p>
                </div>
                <button onClick={handleUploadClick} className="flex items-center gap-2 bg-iis-gold text-iis-navy px-6 py-2 rounded shadow hover:bg-yellow-500 transition font-bold">
                    <Upload size={20} /> Upload New Photo
                </button>
            </div>

            {loading ? <div className="text-center text-slate-500 p-12">Loading gallery...</div> : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {/* Upload Placeholder Card */}
                    <div onClick={handleUploadClick} className="border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 h-56 bg-slate-50 cursor-pointer hover:bg-white hover:border-iis-gold transition group">
                        <Upload className="text-4xl mb-2 group-hover:text-iis-gold transition-colors" size={40} />
                        <span className="text-sm font-medium group-hover:text-iis-navy">Click to Upload</span>
                    </div>

                    {/* Images */}
                    {images.map((img) => (
                        <div key={img.id} className="relative group rounded-lg overflow-hidden h-56 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                            <Image
                                src={img.image_url}
                                className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                                alt="Gallery"
                                fill
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                            />

                            {/* Overlay Action */}
                            <div className="absolute inset-0 bg-iis-navy/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 backdrop-blur-sm">
                                <span className="text-white text-xs font-bold px-2 text-center">{img.title}</span>
                                <button
                                    onClick={() => handleDelete(img.id, img.image_url)}
                                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition shadow-lg mt-2"
                                    title="Delete Photo"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
