'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function NoticeBoard() {
    const [notices, setNotices] = useState([]);

    const categorizeNotice = (title) => {
        const lower = title.toLowerCase();
        if (lower.includes('admission') || lower.includes('enroll')) return 'Admissions';
        if (lower.includes('holiday') || lower.includes('vacation')) return 'Holiday';
        if (lower.includes('event') || lower.includes('celebration') || lower.includes('day')) return 'Events';
        if (lower.includes('exam') || lower.includes('result') || lower.includes('academic')) return 'Academic';
        if (lower.includes('sport') || lower.includes('competition')) return 'Sports';
        if (lower.includes('fee') || lower.includes('payment')) return 'Fees';
        return 'General';
    };

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const { data, error } = await supabase
                    .from('notices')
                    .select('*')
                    .eq('active', true)
                    .order('created_at', { ascending: false })
                    .limit(6);

                if (error) {
                    console.error('Supabase notices error:', error);
                    return;
                }

                if (data) {
                    const enhancedNotices = data.map(notice => {
                        const daysOld = Math.floor((Date.now() - new Date(notice.created_at).getTime()) / (1000 * 60 * 60 * 24));
                        return {
                            ...notice,
                            isNew: daysOld <= 3,
                            category: categorizeNotice(notice.title),
                        };
                    });
                    setNotices(enhancedNotices);
                }
            } catch (err) {
                console.error('Failed to fetch notices:', err);
            }
        };
        fetchNotices();
    }, []);

    const categoryColors = {
        Admissions: 'bg-teal-100 text-teal-700',
        Holiday: 'bg-iis-gold/20 text-iis-navy',
        Events: 'bg-blue-100 text-blue-700',
        Academic: 'bg-purple-100 text-purple-700',
        Sports: 'bg-orange-100 text-orange-700',
        Fees: 'bg-iis-maroon/10 text-iis-maroon',
        General: 'bg-slate-100 text-slate-700',
    };

    if (notices.length === 0) return null;

    return (
        <section className="py-16 bg-iis-cream">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h2 className="font-serif text-3xl font-bold text-iis-navy">Notices & Announcements</h2>
                        <p className="text-slate-600 mt-2">Stay updated with the latest news and important information</p>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="text-sm font-medium">{notices.filter(n => n.isNew).length} new updates</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {notices.map((notice) => (
                        <div
                            key={notice.id}
                            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group"
                        >
                            {/* Top Row: Badges, Date, and Download */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${categoryColors[notice.category]}`}>
                                        {notice.category}
                                    </span>
                                    {notice.isNew && (
                                        <span className="px-3 py-1 bg-iis-gold text-iis-navy rounded-lg text-xs font-bold">
                                            NEW
                                        </span>
                                    )}
                                    <div className="flex items-center gap-1.5 text-slate-400 text-sm">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{new Date(notice.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                </div>
                                <button className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors group/btn">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download
                                    <svg className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-iis-navy mb-2 group-hover:text-iis-maroon transition-colors">
                                {notice.title}
                            </h3>

                            {/* Description */}
                            {notice.description && (
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    {notice.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-center mt-10">
                    <a
                        href="/notices"
                        className="inline-flex items-center gap-2 bg-iis-maroon text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-900 transition-all shadow-lg hover:shadow-xl"
                    >
                        View All Notices
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
