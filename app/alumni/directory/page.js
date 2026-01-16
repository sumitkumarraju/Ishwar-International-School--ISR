'use client';
import { useState, useEffect } from 'react';
import { Search, Linkedin, Briefcase } from 'lucide-react';

export default function AlumniDirectory() {
    const [alumni, setAlumni] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/alumni')
            .then(res => res.json())
            .then(data => {
                setAlumni(data);
                setLoading(false);
            });
    }, []);

    const filteredAlumni = alumni.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.company.toLowerCase().includes(search.toLowerCase()) ||
        a.batch.includes(search)
    );

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl font-bold text-iis-navy mb-4">Alumni Directory</h1>
                    <p className="text-slate-600">Connect with the global community of Ishwarians</p>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-12 relative">
                    <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by Name, Batch, or Company..."
                        className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 shadow-sm focus:ring-2 focus:ring-iis-gold outline-none"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Loading State */}
                {loading && <div className="text-center py-20 text-slate-500">Loading directory...</div>}

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAlumni.map((alum) => (
                        <div key={alum.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition border border-slate-100 flex flex-col items-center text-center group">

                            {/* Avatar (Placeholder if no image) */}
                            <div className="w-24 h-24 rounded-full bg-slate-100 mb-4 overflow-hidden border-2 border-slate-50 group-hover:border-iis-gold transition">
                                {alum.image ? (
                                    <img src={alum.image} alt={alum.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-2xl">
                                        {alum.name.charAt(0)}
                                    </div>
                                )}
                            </div>

                            <h3 className="font-bold text-lg text-slate-800">{alum.name}</h3>
                            <span className="bg-iis-navy/5 text-iis-navy text-xs font-bold px-2 py-1 rounded mt-1 mb-3">
                                Batch of {alum.batch}
                            </span>

                            <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                                <Briefcase size={14} />
                                <span>{alum.current_role} at <strong>{alum.company}</strong></span>
                            </div>

                            {alum.quote && (
                                <p className="text-xs text-slate-500 italic mb-4 line-clamp-2">&quot;{alum.quote}&quot;</p>
                            )}

                            {alum.linkedin && (
                                <a href={alum.linkedin} target="_blank" rel="noopener noreferrer" className="mt-auto text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium">
                                    <Linkedin size={16} /> Connect
                                </a>
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {!loading && filteredAlumni.length === 0 && (
                    <div className="text-center py-12 text-slate-500">
                        No alumni found matching &quot;{search}&quot;
                    </div>
                )}

            </div>
        </div>
    );
}
