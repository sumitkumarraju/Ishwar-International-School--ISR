'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Quote, Briefcase, GraduationCap, UserPlus } from 'lucide-react';

export default function Alumni() {
    const alumniList = [
        {
            name: "Dr. Anjali Verma",
            batch: "Class of 2012",
            role: "Senior Surgeon, AIIMS",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&fit=crop",
            quote: "The values of discipline and integrity I learned at Ishwar International have guided me through every success in my medical career."
        },
        {
            name: "Capt. Ravi Singh",
            batch: "Class of 2014",
            role: "Officer, Indian Army",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&fit=crop",
            quote: "Service before self. This motto was ingrained in me during my NCC days at school. Forever grateful to my mentors."
        },
        {
            name: "Vikram Malhotra",
            batch: "Class of 2015",
            role: "Tech Lead, Google",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=400&fit=crop",
            quote: "From the computer labs of IIS to the tech giant Google, the foundation was laid here. The coding club was my launchpad."
        },
        {
            name: "Priya Desai",
            batch: "Class of 2018",
            role: "Founder, GreenEarth",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&fit=crop",
            quote: "The entrepreneurial spirit was encouraged by my commerce teachers. They taught me to dream big and take calculated risks."
        }
    ];

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
                    {alumniList.map((alum, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden border border-slate-100">
                            {/* Image Area */}
                            <div className="relative h-48 overflow-hidden bg-slate-200">
                                <img
                                    src={alum.image}
                                    alt={alum.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
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
                                    <span>{alum.role}</span>
                                </div>
                                <div className="relative">
                                    <Quote size={24} className="text-slate-200 absolute -top-2 -left-2 transform -scale-x-100" />
                                    <p className="text-slate-600 text-sm italic leading-relaxed pl-4 relative z-10">
                                        &quot;{alum.quote}&quot;
                                    </p>
                                </div>
                            </div>
                        </div>
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
