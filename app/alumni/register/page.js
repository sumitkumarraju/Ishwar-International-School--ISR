'use client';
import { useState } from 'react';
import { User, Mail, Briefcase, Linkedin, Calendar, GraduationCap, Upload, CheckCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function AlumniRegister() {
    const [formData, setFormData] = useState({
        name: '', email: '', batch: '', currentRole: '', company: '', linkedin: '', quote: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Validate file type
            if (!file.type.startsWith('image/')) {
                alert('Please select a valid image file (JPG, PNG, or WebP)');
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            let imageUrl = '';

            // Upload image if provided
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `alumni/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('alumni-images')
                    .upload(filePath, imageFile, {
                        contentType: imageFile.type,
                        cacheControl: '3600',
                        upsert: false
                    });

                if (uploadError) {
                    console.error('Upload error:', uploadError);
                    throw new Error('Failed to upload image');
                }

                const { data } = supabase.storage
                    .from('alumni-images')
                    .getPublicUrl(filePath);

                imageUrl = data.publicUrl;
            }

            const res = await fetch('/api/alumni', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, image: imageUrl })
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', batch: '', currentRole: '', company: '', linkedin: '', quote: '' });
                setImageFile(null);
                setImagePreview(null);
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error('Submit error:', err);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Registration Successful!</h2>
                    <p className="text-slate-600">Thank you for joining the network. Your profile will be visible in the directory after admin approval.</p>
                    <button onClick={() => setStatus('idle')} className="mt-6 text-iis-maroon font-bold hover:underline">Register another?</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-iis-navy p-8 text-center">
                    <GraduationCap className="w-12 h-12 text-iis-gold mx-auto mb-4" />
                    <h1 className="text-3xl font-serif font-bold text-white">Alumni Registration</h1>
                    <p className="text-slate-300 mt-2">Join the exclusive network of Ishwarians</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input required type="text" placeholder="Aditya Roy"
                                    className="w-full pl-10 p-3 border rounded-lg focus:border-iis-maroon outline-none"
                                    value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input required type="email" placeholder="aditya@example.com"
                                    className="w-full pl-10 p-3 border rounded-lg focus:border-iis-maroon outline-none"
                                    value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Batch (Year of Passing)</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input required type="number" placeholder="2015"
                                    className="w-full pl-10 p-3 border rounded-lg focus:border-iis-maroon outline-none"
                                    value={formData.batch} onChange={e => setFormData({ ...formData, batch: e.target.value })} />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">LinkedIn Profile URL</label>
                            <div className="relative">
                                <Linkedin className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input type="url" placeholder="https://linkedin.com/in/..."
                                    className="w-full pl-10 p-3 border rounded-lg focus:border-iis-maroon outline-none"
                                    value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Current Role / Designation</label>
                            <div className="relative">
                                <Briefcase className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input required type="text" placeholder="Senior Architect"
                                    className="w-full pl-10 p-3 border rounded-lg focus:border-iis-maroon outline-none"
                                    value={formData.currentRole} onChange={e => setFormData({ ...formData, currentRole: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Current Company / Organization</label>
                            <input required type="text" placeholder="Google / AIIMS"
                                className="w-full p-3 border rounded-lg focus:border-iis-maroon outline-none"
                                value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">A Quote / Memory for the Wall</label>
                        <textarea placeholder="My favorite memory was the annual sports meet..." rows={3}
                            className="w-full p-3 border rounded-lg focus:border-iis-maroon outline-none"
                            value={formData.quote} onChange={e => setFormData({ ...formData, quote: e.target.value })} />
                    </div>

                    {/* Profile Photo Upload */}
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Profile Photo (Optional)</label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-iis-maroon transition-colors cursor-pointer relative">
                            <input
                                type="file"
                                accept=".jpg,.jpeg,.png,.webp"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {imagePreview ? (
                                <div className="space-y-3">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-24 h-24 object-cover rounded-full mx-auto border-4 border-green-500"
                                    />
                                    <div className="flex items-center justify-center gap-2 text-green-600">
                                        <CheckCircle size={16} />
                                        <span className="text-sm font-medium">{imageFile?.name}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null); }}
                                        className="text-xs text-red-500 hover:underline"
                                    >
                                        Remove Photo
                                    </button>
                                </div>
                            ) : (
                                <div className="text-slate-500 flex flex-col items-center">
                                    <Upload size={32} className="mb-2 text-slate-400" />
                                    <span className="font-medium">Click to upload your photo</span>
                                    <span className="text-xs text-slate-400 mt-1">JPG, PNG, WebP up to 5MB</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <button disabled={status === 'loading'} type="submit" className="w-full bg-iis-gold text-iis-navy font-bold py-4 rounded-lg hover:bg-yellow-600 transition shadow-lg">
                        {status === 'loading' ? 'Submitting...' : 'Submit Registration'}
                    </button>

                    {status === 'error' && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-center">
                            Registration failed. Please try again or contact support.
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
