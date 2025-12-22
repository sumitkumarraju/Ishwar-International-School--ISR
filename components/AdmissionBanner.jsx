'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdmissionBanner() {
    const [status, setStatus] = useState(null);

    useEffect(() => {
        fetch('/api/admission')
            .then(res => res.json())
            .then(data => setStatus(data));
    }, []);

    if (!status || !status.isOpen) return null;

    return (
        <div className="bg-iis-maroon text-white py-3 text-center px-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white/5"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6">
                <span className="font-bold uppercase tracking-widest text-sm md:text-base text-yellow-300 animate-pulse">
                    <i className="fa-solid fa-bell mr-2"></i> Admissions Open for {status.sessionYear}
                </span>
                <span className="hidden md:inline text-white/50">|</span>
                <span className="text-sm">{status.noticeText || "Limited seats available."}</span>
                <Link href="/admissions" className="bg-white text-iis-maroon px-4 py-1 rounded text-xs font-bold uppercase hover:bg-yellow-300 transition-colors shadow-sm ml-4">
                    Apply Now
                </Link>
            </div>
        </div>
    );
}
