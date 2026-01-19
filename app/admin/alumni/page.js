'use client';
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Trash2, Mail, Briefcase, Calendar, Linkedin } from 'lucide-react';

export default function AdminAlumni() {
    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, approved

    useEffect(() => {
        fetchAlumni();
    }, []);

    const fetchAlumni = async () => {
        const res = await fetch('/api/admin/alumni');
        const data = await res.json();
        setAlumni(data);
        setLoading(false);
    };

    const handleApproval = async (id, status) => {
        try {
            console.log('Approving alumni:', id, status);
            const res = await fetch('/api/admin/alumni', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, isApproved: status })
            });

            if (!res.ok) {
                const error = await res.json();
                console.error('Approval failed:', error);
                alert('Failed to update alumni status');
                return;
            }

            console.log('Alumni approved successfully');
            fetchAlumni();
        } catch (error) {
            console.error('Approval error:', error);
            alert('An error occurred while updating alumni status');
        }
    };

    const handleDelete = async (id) => {
        console.log('Delete clicked for:', id);
        if (!window.confirm('Are you sure you want to delete this alumni record?')) {
            console.log('Delete cancelled by user');
            return;
        }

        try {
            console.log('Deleting alumni:', id);
            const res = await fetch(`/api/admin/alumni?id=${id}`, { method: 'DELETE' });

            if (!res.ok) {
                const error = await res.json();
                console.error('Delete failed:', error);
                alert('Failed to delete alumni');
                return;
            }

            console.log('Alumni deleted successfully');
            fetchAlumni();
        } catch (error) {
            console.error('Delete error:', error);
            alert('An error occurred while deleting alumni');
        }
    };

    const filteredAlumni = alumni.filter(a => {
        if (filter === 'pending') return !a.is_approved;
        if (filter === 'approved') return a.is_approved;
        return true;
    });

    if (loading) {
        return <div className="p-8 text-center">Loading alumni...</div>;
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Alumni Management</h1>
                <p className="text-slate-600">Review and approve alumni registrations</p>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-4 mb-6 border-b border-slate-200">
                <button
                    onClick={() => setFilter('all')}
                    className={`pb-3 px-4 font-medium transition-colors ${filter === 'all' ? 'border-b-2 border-iis-maroon text-iis-maroon' : 'text-slate-500'
                        }`}
                >
                    All ({alumni.length})
                </button>
                <button
                    onClick={() => setFilter('pending')}
                    className={`pb-3 px-4 font-medium transition-colors ${filter === 'pending' ? 'border-b-2 border-orange-500 text-orange-500' : 'text-slate-500'
                        }`}
                >
                    Pending ({alumni.filter(a => !a.is_approved).length})
                </button>
                <button
                    onClick={() => setFilter('approved')}
                    className={`pb-3 px-4 font-medium transition-colors ${filter === 'approved' ? 'border-b-2 border-green-500 text-green-500' : 'text-slate-500'
                        }`}
                >
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
                            <th className="text-left p-4 font-semibold text-slate-700">Current Role</th>
                            <th className="text-left p-4 font-semibold text-slate-700">Email</th>
                            <th className="text-left p-4 font-semibold text-slate-700">Status</th>
                            <th className="text-left p-4 font-semibold text-slate-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAlumni.map((alum) => (
                            <tr key={alum.id} className="border-b border-slate-100 hover:bg-slate-50">
                                <td className="p-4">
                                    <div className="font-medium text-slate-800">{alum.name}</div>
                                    {alum.linkedin && (
                                        <a href={alum.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline flex items-center gap-1 mt-1">
                                            <Linkedin size={12} /> LinkedIn
                                        </a>
                                    )}
                                </td>
                                <td className="p-4 text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} />
                                        {alum.batch}
                                    </div>
                                </td>
                                <td className="p-4 text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <Briefcase size={14} />
                                        <div>
                                            <div className="font-medium">{alum.current_role}</div>
                                            <div className="text-xs text-slate-500">{alum.company}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-slate-600">
                                    <div className="flex items-center gap-2">
                                        <Mail size={14} />
                                        {alum.email}
                                    </div>
                                </td>
                                <td className="p-4">
                                    {alum.is_approved ? (
                                        <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                                            <CheckCircle size={14} /> Approved
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-medium">
                                            <XCircle size={14} /> Pending
                                        </span>
                                    )}
                                </td>
                                <td className="p-4">
                                    <div className="flex gap-2">
                                        {!alum.is_approved ? (
                                            <button
                                                onClick={() => handleApproval(alum.id, true)}
                                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition"
                                            >
                                                Approve
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleApproval(alum.id, false)}
                                                className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 transition"
                                            >
                                                Revoke
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(alum.id)}
                                            className="bg-red-600 text-white p-1 rounded hover:bg-red-700 transition"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredAlumni.length === 0 && (
                    <div className="p-8 text-center text-slate-500">
                        No alumni found in this category
                    </div>
                )}
            </div>
        </div>
    );
}
