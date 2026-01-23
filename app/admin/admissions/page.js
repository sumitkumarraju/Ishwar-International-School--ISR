'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Search, Eye, Trash2, FileDown } from 'lucide-react';

export default function AdmissionsPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedApp, setSelectedApp] = useState(null); // For detail view modal

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const { data, error } = await supabase
                .from('admissions')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setApplications(data || []);
        } catch (error) {
            console.error('Failed to fetch applications:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this application?')) return;
        try {
            const { error } = await supabase
                .from('admissions')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setApplications(applications.filter(app => app.id !== id));
        } catch (error) {
            alert('Delete failed');
        }
    };

    const updateStatus = async (id, newStatus) => {
        try {
            console.log('Attempting to update status:', { id, newStatus });

            const { data, error } = await supabase
                .from('admissions')
                .update({ status: newStatus })
                .eq('id', id)
                .select();

            if (error) {
                console.error('Status update error:', {
                    message: error.message,
                    details: error.details,
                    hint: error.hint,
                    code: error.code,
                    fullError: error
                });
                throw error;
            }

            console.log('Update successful:', data);
            setApplications(applications.map(app => app.id === id ? { ...app, status: newStatus } : app));
            if (selectedApp) setSelectedApp({ ...selectedApp, status: newStatus });
        } catch (error) {
            console.error('Full error:', error);
            const errorMsg = error.message || error.hint || error.details || 'Unknown error';
            alert('Status update failed: ' + errorMsg);
        }
    };

    const filteredData = applications.filter(item =>
        item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mobile.includes(searchTerm)
    );

    return (
        <div>
            {/* Header Toolbar */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-iis-navy">Admissions Management</h2>
                    <p className="text-sm text-slate-500">Review and manage student admission applications.</p>
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search name or mobile..."
                            className="pl-10 pr-4 py-2 border rounded-full text-sm focus:ring-2 focus:ring-iis-navy outline-none w-64 shadow-sm"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-600 font-bold uppercase text-xs border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Applied Date</th>
                                <th className="px-6 py-4">Student Name</th>
                                <th className="px-6 py-4">Class</th>
                                <th className="px-6 py-4">Parent Info</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? <tr><td colSpan="6" className="p-8 text-center text-slate-400">Loading applications...</td></tr> : filteredData.map((row) => (
                                <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">{new Date(row.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-medium text-slate-900">
                                        {row.first_name} {row.last_name}
                                        <div className="text-xs text-slate-400">{row.gender}, {row.dob}</div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-iis-navy">{row.class_applying_for}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium">{row.father_name}</div>
                                        <div className="text-xs text-slate-400">{row.mobile}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select
                                            value={row.status || 'New'}
                                            onChange={(e) => updateStatus(row.id, e.target.value)}
                                            className={`px-3 py-1 rounded-full text-xs font-bold border-none outline-none cursor-pointer shadow-sm ${row.status === 'New' ? 'bg-blue-100 text-blue-700' :
                                                row.status === 'Accepted' ? 'bg-green-100 text-green-700' :
                                                    row.status === 'Rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                        >
                                            <option value="New">New</option>
                                            <option value="Under Review">Under Review</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <button
                                            onClick={() => setSelectedApp(row)}
                                            className="p-2 text-iis-navy hover:bg-slate-200 rounded transition"
                                            title="View Details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(row.id)}
                                            className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {!loading && filteredData.length === 0 && (
                    <div className="p-12 text-center text-slate-400 italic">
                        No applications found.
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedApp && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fadeIn">
                        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
                            <div>
                                <h3 className="text-xl font-serif font-bold text-iis-navy">Application Details</h3>
                                <p className="text-xs text-slate-500 uppercase tracking-widest">ID: {String(selectedApp.id).substring(0, 8)}</p>
                            </div>
                            <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600 text-2xl">&times;</button>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Student Name</h4>
                                    <p className="font-semibold text-lg text-slate-800">{selectedApp.first_name} {selectedApp.last_name}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Applying For</h4>
                                    <p className="font-semibold text-lg text-iis-navy">{selectedApp.class_applying_for}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Gender / DOB</h4>
                                    <p className="text-slate-700">{selectedApp.gender} / {selectedApp.dob}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Previous School</h4>
                                    <p className="text-slate-700">{selectedApp.previous_school || 'N/A'} <span className="text-slate-400 text-sm">({selectedApp.last_grade_percentage || 'N/A'})</span></p>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Father&apos;s Name</h4>
                                    <p className="font-semibold text-slate-800">{selectedApp.father_name}</p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Contact Details</h4>
                                    <p className="font-medium text-slate-800">{selectedApp.mobile}</p>
                                    <p className="text-sm text-slate-500">{selectedApp.email}</p>
                                </div>
                                <div className="col-span-2">
                                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Address</h4>
                                    <p className="text-slate-700 bg-slate-50 p-3 rounded border border-slate-100">{selectedApp.address || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t bg-slate-50 flex justify-end">
                            <button
                                onClick={() => setSelectedApp(null)}
                                className="bg-iis-navy text-white px-6 py-2 rounded hover:bg-slate-800 transition shadow-lg font-bold"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
