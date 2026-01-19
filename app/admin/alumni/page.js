'use client';
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Trash2, Mail, Briefcase, Calendar, Linkedin, Plus, Upload, X } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient'; // Ensure you have this client-side supabase client

export default function AdminAlumni() {
    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, approved
    const [showAddModal, setShowAddModal] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        batch: '',
        currentRole: '', // API expects 'currentRole' then maps to db 'current_role' or 'role' depending on implementation. Let's check api.
        company: '',
        email: '',
        linkedin: '',
        quote: '',
        image: null
    });
    const [uploading, setUploading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        fetchAlumni();
    }, []);

    const fetchAlumni = async () => {
        try {
            const res = await fetch('/api/admin/alumni');
            if (!res.ok) throw new Error('Failed to fetch');
            const data = await res.json();
            setAlumni(Array.isArray(data) ? data : []);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleApproval = async (id, status) => {
        try {
            const res = await fetch('/api/admin/alumni', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isApproved: status })
            });

            if (!res.ok) {
                alert('Failed to update alumni status');
                return;
            }

            fetchAlumni();
        } catch (error) {
            console.error('Approval error:', error);
            alert('An error occurred while updating alumni status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this alumni record?')) return;

        try {
            const res = await fetch(`/api/admin/alumni?id=${id}`, { method: 'DELETE' });
            if (!res.ok) {
                alert('Failed to delete alumni');
                return;
            }
            fetchAlumni();
        } catch (error) {
            console.error('Delete error:', error);
            alert('An error occurred while deleting alumni');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData(prev => ({ ...prev, image: file }));

            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleCreateAlumni = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            let imageUrl = '';

            // 1. Upload Image if present
            if (formData.image) {
                const file = formData.image;

                // Validate file is actually a File object
                if (!(file instanceof File)) {
                    throw new Error('Invalid file object');
                }

                // Validate file type
                if (!file.type.startsWith('image/')) {
                    throw new Error('Please select a valid image file (JPG, PNG, or WebP)');
                }

                console.log('Uploading file:', {
                    name: file.name,
                    type: file.type,
                    size: file.size
                });

                const fileExt = file.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `alumni/${fileName}`;

                // Use supabase client for storage
                const { error: uploadError } = await supabase.storage
                    .from('alumni-images')
                    .upload(filePath, file, {
                        cacheControl: '3600',
                        upsert: false,
                        contentType: file.type
                    });

                if (uploadError) {
                    console.error('Upload error:', uploadError);
                    throw uploadError;
                }

                const { data } = supabase.storage
                    .from('alumni-images')
                    .getPublicUrl(filePath);

                imageUrl = data.publicUrl;

                console.log('Upload successful:', {
                    path: filePath,
                    url: imageUrl
                });
            }

            // 2. Submit Data
            const payload = {
                ...formData,
                image: imageUrl,
                isApproved: true // Admin created, so approved by default
            };

            // Reuse the admin POST route we will create/modify
            const res = await fetch('/api/admin/alumni', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || 'Failed to create');
            }

            // Reset and refresh
            setShowAddModal(false);
            setImagePreview(null);
            setFormData({
                name: '', batch: '', currentRole: '', company: '',
                email: '', linkedin: '', quote: '', image: null
            });
            fetchAlumni();
            alert('Alumni added successfully!');

        } catch (error) {
            console.error('Create error:', error);
            alert('Error creating alumni: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const filteredAlumni = alumni.filter(a => {
        if (filter === 'pending') return !a.is_approved;
        if (filter === 'approved') return a.is_approved;
        return true;
    });

    if (loading) return <div className="p-8 text-center">Loading alumni...</div>;

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">Alumni Management</h1>
                    <p className="text-slate-600">Review, approve, and add alumni</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="flex items-center gap-2 bg-iis-navy text-white px-4 py-2 rounded-lg hover:bg-iis-maroon transition-colors"
                >
                    <Plus size={20} /> Add Alumni
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-6 border-b border-slate-200">
                <button onClick={() => setFilter('all')} className={`pb-3 px-4 font-medium transition-colors ${filter === 'all' ? 'border-b-2 border-iis-maroon text-iis-maroon' : 'text-slate-500'}`}>
                    All ({alumni.length})
                </button>
                <button onClick={() => setFilter('pending')} className={`pb-3 px-4 font-medium transition-colors ${filter === 'pending' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-slate-500'}`}>
                    Pending ({alumni.filter(a => !a.is_approved).length})
                </button>
                <button onClick={() => setFilter('approved')} className={`pb-3 px-4 font-medium transition-colors ${filter === 'approved' ? 'border-b-2 border-green-500 text-green-500' : 'text-slate-500'}`}>
                    Approved ({alumni.filter(a => a.is_approved).length})
                </button>
            </div>

            {/* Alumni Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="text-left p-4 font-semibold text-slate-700">Name</th>
                            <th className="text-left p-4 font-semibold text-slate-700">Batch</th>
                            <th className="text-left p-4 font-semibold text-slate-700">Role</th>
                            <th className="text-left p-4 font-semibold text-slate-700">Status</th>
                            <th className="text-left p-4 font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAlumni.map((alum) => (
                            <tr key={alum.id} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        {alum.image && <img src={alum.image} alt="" className="w-10 h-10 rounded-full object-cover bg-slate-100" />}
                                        <div>
                                            <div className="font-medium text-slate-800">{alum.name}</div>
                                            <div className="text-xs text-slate-500">{alum.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-slate-600">{alum.batch}</td>
                                <td className="p-4 text-slate-600">
                                    <div className="font-medium">{alum.current_role}</div>
                                    <div className="text-xs text-slate-500">{alum.company}</div>
                                </td>
                                <td className="p-4">
                                    {alum.is_approved ? (
                                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium"><CheckCircle size={14} /> Approved</span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium"><XCircle size={14} /> Pending</span>
                                    )}
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        <button onClick={() => handleDelete(alum.id)} className="bg-red-100 text-red-600 p-2 rounded hover:bg-red-200 transition">
                                            <Trash2 size={16} />
                                        </button>
                                        {!alum.is_approved && (
                                            <button onClick={() => handleApproval(alum.id, true)} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700">Approve</button>
                                        )}
                                        {alum.is_approved && (
                                            <button onClick={() => handleApproval(alum.id, false)} className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700">Revoke</button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredAlumni.length === 0 && <div className="p-8 text-center text-slate-500">No alumni found</div>}
            </div>

            {/* Add Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-xl font-bold text-slate-800">Add New Alumni</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleCreateAlumni} className="p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                    <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full border rounded-lg p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Batch (e.g. Class of 2015)</label>
                                    <input required type="text" name="batch" value={formData.batch} onChange={handleInputChange} className="w-full border rounded-lg p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Current Role</label>
                                    <input required type="text" name="currentRole" value={formData.currentRole} onChange={handleInputChange} className="w-full border rounded-lg p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                                    <input required type="text" name="company" value={formData.company} onChange={handleInputChange} className="w-full border rounded-lg p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full border rounded-lg p-2" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">LinkedIn URL (Optional)</label>
                                    <input type="url" name="linkedin" value={formData.linkedin} onChange={handleInputChange} className="w-full border rounded-lg p-2" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Success Quote</label>
                                <textarea required name="quote" value={formData.quote} onChange={handleInputChange} rows={3} className="w-full border rounded-lg p-2"></textarea>
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Profile Photo</label>
                                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-iis-blue transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        accept=".jpg,.jpeg,.png,.webp"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    {imagePreview ? (
                                        <div className="space-y-2">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="w-32 h-32 object-cover rounded-lg mx-auto border-2 border-green-500"
                                            />
                                            <div className="flex items-center justify-center gap-2 text-green-600">
                                                <CheckCircle size={16} />
                                                <span className="text-sm font-medium">{formData.image.name}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-slate-500 flex flex-col items-center">
                                            <Upload size={24} className="mb-2" />
                                            <span>Click to upload or drag and drop</span>
                                            <span className="text-xs text-slate-400 mt-1">JPG, PNG, WebP up to 5MB</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">Cancel</button>
                                <button type="submit" disabled={uploading} className="px-5 py-2 bg-iis-navy text-white rounded-lg hover:bg-iis-maroon transition-colors disabled:opacity-50">
                                    {uploading ? 'Creating...' : 'Create Alumni'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
