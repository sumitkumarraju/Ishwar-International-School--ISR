'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaPlus, FaCloudUploadAlt, FaTrash, FaFilePdf, FaLink } from 'react-icons/fa';
import Modal from '@/components/ui/Modal';

export default function StudentCornerPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({ title: '', type: 'syllabus', link: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
            const { data, error } = await supabase.from('student_corner').select('*').order('created_at', { ascending: false });
            if (!error) setItems(data || []);
            setLoading(false);
        };
        fetchItems();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        const { data, error } = await supabase
            .from('student_corner')
            .insert([{
                title: newItem.title,
                type: newItem.type,
                link_url: newItem.link
            }])
            .select();

        if (!error && data) {
            setItems([data[0], ...items]);
            setIsModalOpen(false);
            setNewItem({ title: '', type: 'syllabus', link: '' });
        } else {
            alert("Failed to add item");
        }
        setSubmitting(false);
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete?")) return;
        const { error } = await supabase.from('student_corner').delete().eq('id', id);
        if (!error) setItems(items.filter(i => i.id !== id));
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-slate-800">Student Corner</h2>
                    <p className="text-sm text-slate-500">Upload syllabi, timetables, and results</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition-colors"
                >
                    <FaCloudUploadAlt /> Upload New
                </button>
            </div>

            <div className="bg-white rounded shadow-sm border overflow-hidden">
                {items.map(item => (
                    <div key={item.id} className="p-4 border-b flex justify-between items-center hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded flex items-center justify-center">
                                {item.type === 'link' ? <FaLink /> : <FaFilePdf />}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-700">{item.title}</h4>
                                <span className="text-xs uppercase font-bold tracking-wider text-gray-400">{item.type}</span>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <a href={item.link_url} target="_blank" className="text-blue-500 hover:underline text-sm">View File</a>
                            <button onClick={() => handleDelete(item.id)} className="text-red-300 hover:text-red-500"><FaTrash /></button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Student Resource">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
                        <input
                            required
                            type="text"
                            value={newItem.title}
                            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="e.g. Class X Syllabus"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
                        <select
                            value={newItem.type}
                            onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                        >
                            <option value="syllabus">Syllabus</option>
                            <option value="timetable">Timetable</option>
                            <option value="result">Result</option>
                            <option value="circular">Circular</option>
                            <option value="link">Other Link</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">File/Link URL</label>
                        <input
                            required
                            type="url"
                            value={newItem.link}
                            onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="https://..."
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-slate-900 text-white font-bold py-2 rounded hover:bg-slate-700 disabled:opacity-50"
                    >
                        {submitting ? 'Uploading...' : 'Upload Resource'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
