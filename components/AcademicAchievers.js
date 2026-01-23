'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';

// Class XII Data (Existing)
const class12TopPerformers = [
    { name: 'Aarushi', percentage: '91.8', img: '/toppers/Screenshot 2025-12-21 182603.png' },
    { name: 'Lokesh', percentage: '90.4', img: '/toppers/Screenshot 2025-12-21 182617.png' },
    { name: 'Lakshay Shuklan', percentage: '88.2', img: '/toppers/Screenshot 2025-12-21 182632.png' },
];

const class12OtherAchievers = [
    { name: 'Sheetal', percentage: '87.8', img: '/toppers/Screenshot 2025-12-21 182637.png' },
    { name: 'Anchal', percentage: '87.2', img: '/toppers/Screenshot 2025-12-21 182641.png' },
    { name: 'Anushika', percentage: '87.2', img: '/toppers/Screenshot 2025-12-21 182647.png' },
    { name: 'Yashika', percentage: '87.2', img: '/toppers/Screenshot 2025-12-21 182653.png' },
    { name: 'Tamanna', percentage: '83.4', img: '/toppers/Screenshot 2025-12-21 182700.png' },
    { name: 'Nishu', percentage: '82', img: '/toppers/Screenshot 2025-12-21 182705.png' },
    { name: 'Ronal', percentage: '81.2', img: '/toppers/Screenshot 2025-12-21 182711.png' },
    { name: 'Vansh', percentage: '80.2', img: '/toppers/Screenshot 2025-12-21 182719.png' },
    { name: 'Tamanna', percentage: '80.2', img: '/toppers/Screenshot 2025-12-21 182728.png' },
    { name: 'Prince', percentage: '80', img: '/toppers/Screenshot 2025-12-21 182735.png' },
];

const class12SubjectToppers = [
    { subject: 'English', score: 100, student: 'Aarushi' },
    { subject: 'Hindi', score: 97, student: 'Aanchal' },
    { subject: 'Chemistry', score: 95, student: 'Tamanna' },
    { subject: 'PHE', score: 94, student: 'Lokesh' },
    { subject: 'Geography', score: 95, student: 'Nishu' },
    { subject: 'Economics', score: 97, student: 'Lokesh' },
    { subject: 'Business Studies', score: 95, student: 'Yashika' },
];

const class12Stats = {
    passResult: '100%',
    distinctions: 32,
    highlights: [
        { label: 'Science Stream', value: '16 Merits' },
        { label: 'Commerce Stream', value: '05 Merits' },
        { label: 'Humanities', value: '11 Merits' }
    ]
};

// Class X Data (New)
const class10TopPerformers = [
    { name: 'Sourabh', percentage: '96.8', img: '/10TH TOPPER/Screenshot 2025-12-21 191321.png' },
    { name: 'Hitakshi', percentage: '95.2', img: '/10TH TOPPER/Screenshot 2025-12-21 191336.png' },
    { name: 'Ishu', percentage: '93.2', img: '/10TH TOPPER/Screenshot 2025-12-21 191340.png' },
];

const class10OtherAchievers = [
    { name: 'Yogesh', percentage: '93.0', img: '/10TH TOPPER/Screenshot 2025-12-21 191346.png' },
    { name: 'Prince Shuklan', percentage: '91.2', img: '/10TH TOPPER/Screenshot 2025-12-21 191353.png' },
    { name: 'Shreya', percentage: '90.6', img: '/10TH TOPPER/Screenshot 2025-12-21 191403.png' },
    { name: 'Keshav Malik', percentage: '90.2', img: '/10TH TOPPER/Screenshot 2025-12-21 191409.png' },
    { name: 'Utkarsh', percentage: '89.4', img: '/10TH TOPPER/Screenshot 2025-12-21 191415.png' },
    { name: 'Jai Batra', percentage: '88.2', img: '/10TH TOPPER/Screenshot 2025-12-21 191420.png' },
    { name: 'Aryaman', percentage: '88.0', img: '/10TH TOPPER/Screenshot 2025-12-21 191425.png' },
    { name: 'Shubham', percentage: '87.4', img: '/10TH TOPPER/Screenshot 2025-12-21 191655.png' },
    { name: 'Rubal Malik', percentage: '86.0', img: '/10TH TOPPER/Screenshot 2025-12-21 191715.png' },
    { name: 'Avani', percentage: '84.8', img: '/10TH TOPPER/Screenshot 2025-12-21 191718.png' },
    { name: 'Anshika', percentage: '84.6', img: '/10TH TOPPER/Screenshot 2025-12-21 191722.png' },
    { name: 'Harsh', percentage: '84.2', img: '/10TH TOPPER/Screenshot 2025-12-21 191725.png' },
    { name: 'Vansh', percentage: '82.8', img: '/10TH TOPPER/Screenshot 2025-12-21 191730.png' },
    { name: 'Garima', percentage: '81.8', img: '/10TH TOPPER/Screenshot 2025-12-21 191733.png' },
    { name: 'Palak', percentage: '81.2', img: '/10TH TOPPER/Screenshot 2025-12-21 191737.png' },
    { name: 'Dev', percentage: '80.6', img: '/10TH TOPPER/Screenshot 2025-12-21 191741.png' },
    { name: 'Nainsee Malik', percentage: '80.0', img: '/10TH TOPPER/Screenshot 2025-12-21 191745.png' },
];

const class10SubjectStats = [
    { subject: 'English', merit: 40, highest: 96 },
    { subject: 'Hindi', merit: 46, highest: 96 },
    { subject: 'Mathematics', merit: 22, highest: 98 },
    { subject: 'Science', merit: 30, highest: 97 },
    { subject: 'Social Science', merit: 43, highest: 99 },
    { subject: 'IT', merit: 46, highest: 97 },
];

const class10Stats = {
    passResult: '100%',
    distinctions: 35,
    highlights: [] // No stream breakdown for Class 10
};

export default function AcademicAchievers() {
    const [activeTab, setActiveTab] = useState('XII');
    const [achieversData, setAchieversData] = useState([]);
    const [subjectToppersData, setSubjectToppersData] = useState([]);
    const [subjectStatsData, setSubjectStatsData] = useState([]);
    const [resultStatsData, setResultStatsData] = useState({ XII: null, X: null });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            // Fetch achievers
            const { data: achievers } = await supabase
                .from('achievers')
                .select('*')
                .order('score', { ascending: false });
            if (achievers) setAchieversData(achievers);

            // Fetch subject toppers
            const { data: toppers } = await supabase
                .from('subject_toppers')
                .select('*')
                .order('score', { ascending: false });
            if (toppers) setSubjectToppersData(toppers);

            // Fetch subject stats
            const { data: stats } = await supabase
                .from('subject_stats')
                .select('*');
            if (stats) setSubjectStatsData(stats);

            // Fetch result stats
            const { data: resultStats } = await supabase
                .from('result_stats')
                .select('*');
            if (resultStats) {
                const statsMap = { XII: null, X: null };
                resultStats.forEach(r => {
                    statsMap[r.student_class] = r;
                });
                setResultStatsData(statsMap);
            }

            setLoading(false);
        };
        fetchAllData();
    }, []);

    // Filter helpers - Get database data for selected class, or fallback to static data
    const getTopPerformers = (cls) => {
        // Filter database records by class
        const dbData = achieversData.filter(s => s.student_class === cls && s.category === 'TOPPER');

        // If we have database data for this class, use it
        if (dbData.length > 0) {
            return dbData.slice(0, 3);
        }

        // Otherwise fallback to static data for this class
        return cls === 'XII' ? class12TopPerformers : class10TopPerformers;
    };

    const getOtherAchievers = (cls) => {
        // Filter database records by class
        const dbData = achieversData.filter(s => s.student_class === cls && s.category !== 'TOPPER');

        let list;
        // If we have database data for this class, use it
        if (dbData.length > 0) {
            list = [...dbData]; // Clone to avoid mutation
        } else {
            // Fallback to static data
            list = cls === 'XII' ? [...class12OtherAchievers] : [...class10OtherAchievers];
        }

        // Fill up the blank space to ensure grid looks full (multiple of 3)
        if (list.length > 0 && list.length % 3 !== 0) {
            const missing = 3 - (list.length % 3);
            for (let i = 0; i < missing; i++) {
                list.push({ ...list[i % list.length], id: `fill-${i}` });
            }
        }
        return list;
    };

    const topPerformers = activeTab === 'XII' ? getTopPerformers('XII') : getTopPerformers('X');
    const otherAchievers = activeTab === 'XII' ? getOtherAchievers('XII') : getOtherAchievers('X');

    // Get stats from database or fallback to static
    const getStats = (cls) => {
        if (resultStatsData[cls]) {
            return {
                passResult: resultStatsData[cls].pass_result,
                distinctions: resultStatsData[cls].distinctions,
                highlights: resultStatsData[cls].stream_highlights || []
            };
        }
        return cls === 'XII' ? class12Stats : class10Stats;
    };
    const stats = getStats(activeTab);

    // Get subject toppers from database or fallback to static (Class XII)
    const getSubjectToppers = () => {
        const dbToppers = subjectToppersData.filter(s => s.student_class === 'XII');
        if (dbToppers.length > 0) {
            return dbToppers.map(s => ({ subject: s.subject, score: s.score, student: s.student_name }));
        }
        return class12SubjectToppers;
    };
    const subjectToppers = getSubjectToppers();

    // Get subject stats from database or fallback to static (Class X)
    const getSubjectStats = () => {
        const dbStats = subjectStatsData.filter(s => s.student_class === 'X');
        if (dbStats.length > 0) {
            return dbStats.map(s => ({ subject: s.subject, merit: s.merit_count, highest: s.highest_score }));
        }
        return class10SubjectStats;
    };
    const subjectStats = getSubjectStats();

    return (
        <section className="py-20 bg-gradient-to-br from-indigo-50 via-white to-pink-50 scroll-mt-20" id="achievers">
            <div className="max-w-7xl mx-auto px-4">

                {/* Header */}
                <div className="text-center mb-12 animate-fade-in-up">
                    <span className="inline-block bg-iis-gold text-iis-navy text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-widest border border-iis-navy/20">
                        Energy • Excellence • Evolution
                    </span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-iis-maroon mb-4">
                        <span className="text-yellow-500 mr-2">⭐</span>
                        Heartiest Congratulations
                        <span className="text-yellow-500 ml-2">⭐</span>
                    </h2>
                    <p className="text-xl text-slate-700 font-medium">To Our Academic Achievers (2024–25)</p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-16">
                    <div className="bg-white p-2 rounded-full shadow-md border border-gray-100 flex gap-2">
                        <button
                            onClick={() => setActiveTab('XII')}
                            className={`px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-all ${activeTab === 'XII' ? 'bg-iis-maroon text-white shadow-lg' : 'text-slate-500 hover:bg-gray-50'}`}
                        >
                            Class XII
                        </button>
                        <button
                            onClick={() => setActiveTab('X')}
                            className={`px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-all ${activeTab === 'X' ? 'bg-iis-maroon text-white shadow-lg' : 'text-slate-500 hover:bg-gray-50'}`}
                        >
                            Class X
                        </button>
                    </div>
                </div>

                {/* Content Container with Animation Key */}
                <div key={activeTab} className="animate-fade-in-up">

                    {/* Top Performers */}
                    <div className="mb-16">
                        <h3 className="text-center font-serif text-3xl font-bold text-iis-navy mb-10 flex items-center justify-center gap-4">
                            <span className="h-px w-10 bg-iis-navy/30"></span>
                            Top Performers - Class {activeTab}
                            <span className="h-px w-10 bg-iis-navy/30"></span>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center max-w-5xl mx-auto">
                            {topPerformers.map((student, idx) => (
                                <div key={idx} className="bg-white p-6 rounded-2xl shadow-xl border-t-8 border-yellow-400 transform hover:-translate-y-2 transition-all text-center relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 bg-yellow-400 text-iis-navy font-bold text-xs px-3 py-1 rounded-bl-lg z-10">
                                        Rank #{idx + 1}
                                    </div>
                                    <div className="w-40 h-40 mx-auto rounded-full border-4 border-yellow-100 overflow-hidden mb-4 shadow-inner group-hover:scale-105 transition-transform duration-500 relative">
                                        <Image
                                            src={student.img || student.image_url}
                                            alt={student.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                    </div>
                                    <h4 className="font-serif text-2xl font-bold text-slate-800 mb-1">{student.name}</h4>
                                    <div className="text-4xl font-black text-iis-maroon">{student.percentage || student.score}%</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Other Achievers & Stats Grid */}
                    <div className="grid lg:grid-cols-3 gap-12">

                        {/* Other Achievers List */}
                        <div className="lg:col-span-2">
                            <h3 className="font-serif text-2xl font-bold text-slate-700 mb-6 flex items-center gap-3">
                                <i className="fa-solid fa-medal text-iis-maroon"></i> Stellar Achievers
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-4 gap-4">
                                {otherAchievers.map((student, idx) => (
                                    <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="aspect-square bg-gray-100 overflow-hidden relative">
                                            {student.img || student.image_url ? (
                                                <Image
                                                    src={student.img || student.image_url}
                                                    alt={student.name}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            ) : (
                                                // Fallback for filler items or missing images
                                                <div className="w-full h-full bg-slate-200"></div>
                                            )}
                                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 text-center text-white">
                                                <span className="font-bold text-lg">{student.percentage || student.score}%</span>
                                            </div>
                                        </div>
                                        <div className="p-3 text-center bg-white">
                                            <h5 className="font-bold text-slate-700 text-sm truncate" title={student.name}>{student.name}</h5>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stats & Subject Details */}
                        <div className="space-y-8">

                            {/* Summary Stats */}
                            <div className="bg-iis-maroon text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
                                <h4 className="font-serif text-xl font-bold mb-4 border-b border-white/20 pb-2">Result Highlights</h4>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div className="bg-white/10 rounded-lg p-3">
                                        <div className="text-3xl font-bold text-yellow-400">{stats.passResult}</div>
                                        <div className="text-xs uppercase tracking-wider opacity-80">Pass Result</div>
                                    </div>
                                    <div className="bg-white/10 rounded-lg p-3">
                                        <div className="text-3xl font-bold text-yellow-400">{stats.distinctions}</div>
                                        <div className="text-xs uppercase tracking-wider opacity-80">Distinctions</div>
                                    </div>
                                </div>
                                <div className="mt-6 space-y-2">
                                    {stats.highlights.map((item, idx) => (
                                        <div key={idx} className="flex justify-between text-sm">
                                            <span>{item.label}</span> <span className="font-bold">{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Conditional Rendering for Subject Stats */}
                            {activeTab === 'XII' ? (
                                <div className="bg-white border-l-4 border-iis-gold shadow-md rounded-r-xl p-6">
                                    <h4 className="font-serif text-xl font-bold text-slate-800 mb-4">Subject Toppers</h4>
                                    <div className="space-y-3">
                                        {subjectToppers.map((sub, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-sm border-b border-gray-100 last:border-0 pb-2 last:pb-0">
                                                <div>
                                                    <span className="font-bold text-slate-700">{sub.subject}</span>
                                                    <span className="block text-xs text-slate-500">{sub.student}</span>
                                                </div>
                                                <div className="bg-green-50 text-green-700 font-bold px-2 py-1 rounded text-xs">
                                                    {sub.score}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white border-l-4 border-iis-gold shadow-md rounded-r-xl p-6">
                                    <h4 className="font-serif text-xl font-bold text-slate-800 mb-4">Subject Performance</h4>
                                    <div className="space-y-0">
                                        {/* Header */}
                                        <div className="grid grid-cols-3 text-xs font-bold text-slate-400 uppercase tracking-wider pb-2 border-b border-gray-200 mb-2">
                                            <span>Subject</span>
                                            <span className="text-center">Merits</span>
                                            <span className="text-right">Highest</span>
                                        </div>
                                        {subjectStats.map((sub, idx) => (
                                            <div key={idx} className="grid grid-cols-3 items-center text-sm py-2 border-b border-gray-50 last:border-0">
                                                <div className="font-bold text-slate-700">{sub.subject}</div>
                                                <div className="text-center text-slate-600 font-medium">{sub.merit}</div>
                                                <div className="text-right">
                                                    <span className="bg-green-50 text-green-700 font-bold px-2 py-1 rounded text-xs">{sub.highest}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
