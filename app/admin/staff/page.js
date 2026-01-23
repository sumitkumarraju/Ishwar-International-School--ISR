'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Plus, UserCog, Trash2, Edit } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import Image from 'next/image';

export default function StaffPage() {
    const [staff, setStaff] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [newStaff, setNewStaff] = useState({ name: '', designation: '', image_url: '' });
    const [submitting, setSubmitting] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const { data, error } = await supabase
                .from('staff')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            setStaff(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const fileName = `staff/${Date.now()}-${file.name.replace(/\s/g, '-')}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from('gallery')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('gallery')
                .getPublicUrl(fileName);

            setNewStaff(prev => ({ ...prev, image_url: publicUrl }));
        } catch (error) {
            alert('Upload failed: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            if (editingStaff) {
                // Update existing staff
                const { data, error } = await supabase
                    .from('staff')
                    .update({
                        name: newStaff.name,
                        designation: newStaff.designation,
                        image_url: newStaff.image_url || ''
                    })
                    .eq('id', editingStaff.id)
                    .select();

                if (error) throw error;
                if (data) {
                    setStaff(staff.map(s => s.id === editingStaff.id ? data[0] : s));
                    setIsModalOpen(false);
                    setEditingStaff(null);
                    setNewStaff({ name: '', designation: '', image_url: '' });
                }
            } else {
                // Insert new staff
                const { data, error } = await supabase
                    .from('staff')
                    .insert([{
                        name: newStaff.name,
                        designation: newStaff.designation,
                        image_url: newStaff.image_url || '',
                        active: true
                    }])
                    .select();

                if (error) throw error;
                if (data) {
                    setStaff([...staff, data[0]]);
                    setIsModalOpen(false);
                    setNewStaff({ name: '', designation: '', image_url: '' });
                }
            }
        } catch (error) {
            alert("Failed to save staff: " + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (teacher) => {
        setEditingStaff(teacher);
        setNewStaff({
            name: teacher.name,
            designation: teacher.designation,
            image_url: teacher.image_url || ''
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this staff member?")) return;
        try {
            const { error } = await supabase.from('staff').delete().eq('id', id);
            if (error) throw error;
            setStaff(staff.filter(s => s.id !== id));
        } catch (error) {
            alert("Failed to delete");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-iis-navy">Faculty Management</h2>
                    <p className="text-sm text-slate-500">Manage teaching staff profiles.</p>
                </div>
                <button
                    onClick={() => { setEditingStaff(null); setNewStaff({ name: '', designation: '', image_url: '' }); setIsModalOpen(true); }}
                    className="flex items-center gap-2 bg-iis-maroon text-white px-5 py-2 rounded shadow hover:bg-red-900 transition">
                    <Plus size={18} /> Add New Teacher
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-gray-200 text-slate-600 font-bold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">Profile</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Designation</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {staff.map((teacher) => (
                            <tr key={teacher.id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0 relative">
                                        {teacher.image_url ? (
                                            <Image
                                                src={teacher.image_url}
                                                alt={teacher.name}
                                                fill
                                                className="object-cover"
                                                sizes="40px"
                                            />
                                        ) : (
                                            <UserCog className="text-gray-400" size={20} />
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-3 font-medium text-slate-800">{teacher.name}</td>
                                <td className="px-6 py-3 text-sm text-slate-600">{teacher.designation}</td>
                                <td className="px-6 py-3 text-right flex justify-end gap-3">
                                    <button onClick={() => handleEdit(teacher)} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                                    <button onClick={() => handleDelete(teacher.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                        {staff.length === 0 && !loading && (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-slate-400 italic">No faculty members found. Add one above.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                {loading && <div className="p-8 text-center text-slate-500">Loading faculty...</div>}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingStaff(null); setNewStaff({ name: '', designation: '', image_url: '' }); }} title={editingStaff ? "Edit Staff Member" : "Add New Staff Member"}>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                        <input
                            required
                            type="text"
                            value={newStaff.name}
                            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Dr. John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Designation</label>
                        <input
                            required
                            type="text"
                            value={newStaff.designation}
                            onChange={(e) => setNewStaff({ ...newStaff, designation: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Principal"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Profile Photo</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full"
                        />
                        {uploading && <p className="text-xs text-blue-500 mt-1">Uploading...</p>}
                        {newStaff.image_url && <p className="text-xs text-green-600 mt-1">✓ Photo uploaded</p>}
                    </div>
                    <button
                        type="submit"
                        disabled={submitting || uploading}
                        className="w-full bg-iis-maroon text-white font-bold py-2 rounded hover:bg-red-900 disabled:opacity-50"
                    >
                        {submitting ? 'Adding...' : uploading ? 'Uploading Photo...' : 'Add Staff'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
