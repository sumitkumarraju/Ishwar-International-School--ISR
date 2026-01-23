'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Quote, Briefcase, GraduationCap, UserPlus } from 'lucide-react';

const AlumniCard = ({ alum }) => {
    const [hasError, setHasError] = useState(false);

    const getInitials = (name) => {
        return name
            ?.split(' ')
            .map(word => word[0])
            .slice(0, 2)
            .join('')
            .toUpperCase() || 'AL';
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-slate-100">
            {/* Image Area */}
            <div className="relative h-48 overflow-hidden bg-slate-200">
                {!hasError && alum.image ? (
                    <Image
                        src={alum.image}
                        alt={alum.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={() => setHasError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-iis-navy bg-opacity-5 group-hover:bg-opacity-10 transition-colors">
                        <span className="text-4xl font-serif font-bold text-iis-navy opacity-30">
                            {getInitials(alum.name)}
                        </span>
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-bold bg-iis-gold px-2 py-1 rounded-sm">
                        {alum.batch}
                    </span>
                </div>
            </div>

            {/* Content Area */}
            <div className="p-6">
                <h3 className="font-serif text-lg font-bold text-iis-navy mb-1">{alum.name}</h3>
                <div className="flex items-center gap-2 text-iis-maroon text-sm font-medium mb-4">
                    <Briefcase size={14} />
                    <span>{alum.current_role || alum.role}</span>
                </div>
                <div className="relative">
                    <Quote size={24} className="text-slate-200 absolute -top-2 -left-2 transform -scale-x-100" />
                    <p className="text-slate-600 text-sm italic leading-relaxed pl-4 relative z-10">
                        &quot;{alum.quote}&quot;
                    </p>
                </div>
            </div>
        </div>
    );
};

export default function Alumni() {
    const [alumniList, setAlumniList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/alumni')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setAlumniList(data);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch alumni:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return null; // Or a loading spinner

    // If no alumni, show nothing (or a minimized section) per user request
    if (alumniList.length === 0) {
        return (
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="bg-iis-navy rounded-2xl p-8 lg:p-12 relative overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                            <div>
                                <h3 className="font-serif text-3xl font-bold text-white mb-2">Are you an Ishwarian?</h3>
                                <p className="text-slate-300 text-lg">Join our exclusive alumni network. Reconnect, mentor, and grow.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/alumni/register" className="flex items-center justify-center gap-2 bg-iis-gold text-iis-navy px-8 py-4 rounded-lg font-bold hover:bg-white transition-colors shadow-lg">
                                    <UserPlus size={20} /> Register as Alumni
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-iis-gold/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-iis-maroon/5 rounded-full blur-3xl -ml-20 -mb-20"></div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="text-iis-gold font-bold tracking-widest uppercase text-sm flex items-center justify-center gap-2">
                        <GraduationCap size={18} /> Our Pride
                    </span>
                    <h2 className="font-serif text-4xl lg:text-5xl font-bold text-iis-navy mt-3 mb-6">Alumni Success Stories</h2>
                    <div className="w-24 h-1 bg-iis-maroon mx-auto rounded-full"></div>
                    <p className="text-slate-600 max-w-2xl mx-auto mt-6 text-lg">
                        Our graduates are making their mark across the globe. From defense to technology, medicine to entrepreneurship, Ishwarians lead the way.
                    </p>
                </div>

                {/* Alumni Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {alumniList.slice(0, 4).map((alum, index) => (
                        <AlumniCard key={alum.id || index} alum={alum} />
                    ))}
                </div>

                {/* Registration CTA Bar */}
                <div className="bg-iis-navy rounded-2xl p-8 lg:p-12 relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                        <div>
                            <h3 className="font-serif text-3xl font-bold text-white mb-2">Are you an Ishwarian?</h3>
                            <p className="text-slate-300 text-lg">Join our exclusive alumni network. Reconnect, mentor, and grow.</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/alumni/register" className="flex items-center justify-center gap-2 bg-iis-gold text-iis-navy px-8 py-4 rounded-lg font-bold hover:bg-white transition-colors shadow-lg">
                                <UserPlus size={20} /> Register as Alumni
                            </Link>
                            <Link href="/alumni/directory" className="flex items-center justify-center gap-2 border border-slate-500 text-slate-300 px-8 py-4 rounded-lg font-bold hover:text-white hover:border-white transition-colors">
                                View Alumni Directory
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
