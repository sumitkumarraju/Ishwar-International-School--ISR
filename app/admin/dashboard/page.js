'use client';
import { Users, FileText, Bell, ImageIcon, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Dashboard() {
    const [stats, setStats] = useState({
        admissions: 0,
        notices: 0,
        galleryImages: 0,
        achievers: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            const [admissions, notices, gallery, achievers] = await Promise.all([
                supabase.from('admissions').select('id', { count: 'exact', head: true }),
                supabase.from('notices').select('id', { count: 'exact', head: true }).eq('active', true),
                supabase.from('gallery').select('id', { count: 'exact', head: true }),
                supabase.from('achievers').select('id', { count: 'exact', head: true })
            ]);

            setStats({
                admissions: admissions.count || 0,
                notices: notices.count || 0,
                galleryImages: gallery.count || 0,
                achievers: achievers.count || 0
            });
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            {/* Page Title */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
                <p className="text-slate-500">Welcome back! Here&apos;s what&apos;s happening at school today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Total Applications"
                    value={stats.admissions.toString()}
                    trend="View all applications"
                    icon={<Users className="text-blue-600" />}
                    color="bg-blue-50 border-blue-200"
                    href="/admin/admissions"
                />
                <StatsCard
                    title="Active Notices"
                    value={stats.notices.toString()}
                    trend="Manage notices"
                    icon={<Bell className="text-amber-600" />}
                    color="bg-amber-50 border-amber-200"
                    href="/admin/notices"
                />
                <StatsCard
                    title="Academic Achievers"
                    value={stats.achievers.toString()}
                    trend="View achievers"
                    icon={<TrendingUp className="text-indigo-600" />}
                    color="bg-indigo-50 border-indigo-200"
                    href="/admin/achievers"
                />
                <StatsCard
                    title="Gallery Images"
                    value={stats.galleryImages.toString()}
                    trend="Manage gallery"
                    icon={<ImageIcon className="text-emerald-600" />}
                    color="bg-emerald-50 border-emerald-200"
                    href="/admin/gallery"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                    <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <Link href="/admin/notices" className="p-4 rounded-lg border border-slate-200 hover:border-indigo-600 hover:bg-indigo-50 transition group text-left">
                            <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition">
                                <Bell size={20} />
                            </div>
                            <span className="block font-medium text-slate-900 text-sm">Post New Notice</span>
                            <span className="text-xs text-slate-500">Announce holidays or events</span>
                        </Link>
                        <Link href="/admin/gallery" className="p-4 rounded-lg border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50 transition group text-left">
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition">
                                <ImageIcon size={20} />
                            </div>
                            <span className="block font-medium text-slate-900 text-sm">Upload Photos</span>
                            <span className="text-xs text-slate-500">Add to gallery or slider</span>
                        </Link>
                        <Link href="/admin/staff" className="p-4 rounded-lg border border-slate-200 hover:border-purple-600 hover:bg-purple-50 transition group text-left">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mb-3 group-hover:bg-purple-600 group-hover:text-white transition">
                                <Users size={20} />
                            </div>
                            <span className="block font-medium text-slate-900 text-sm">Add Staff</span>
                            <span className="text-xs text-slate-500">Update faculty members</span>
                        </Link>
                        <Link href="/admin/achievers" className="p-4 rounded-lg border border-slate-200 hover:border-amber-600 hover:bg-amber-50 transition group text-left">
                            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition">
                                <TrendingUp size={20} />
                            </div>
                            <span className="block font-medium text-slate-900 text-sm">Add Achiever</span>
                            <span className="text-xs text-slate-500">Recognize top performers</span>
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="font-semibold text-slate-900">System Status</h3>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between py-3 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span className="text-sm text-slate-700">Website Online</span>
                            </div>
                            <span className="text-xs text-slate-500">All systems operational</span>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span className="text-sm text-slate-700">Database Connected</span>
                            </div>
                            <span className="text-xs text-slate-500">Supabase active</span>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-sm text-slate-700">Storage Available</span>
                            </div>
                            <span className="text-xs text-slate-500">Cloud storage ready</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome to Ishwar International School Admin</h2>
                <p className="text-indigo-100 mb-4">Manage your school website content, admissions, staff, and more from this dashboard.</p>
                <div className="flex gap-4">
                    <Link href="/admin/hero" className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition text-sm">
                        Manage Hero Slides
                    </Link>
                    <Link href="/" target="_blank" className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition text-sm">
                        View Website
                    </Link>
                </div>
            </div>
        </div>
    );
}

function StatsCard({ title, value, trend, icon, color, href }) {
    const content = (
        <div className={`p-6 rounded-xl border ${color} flex flex-col justify-between h-32 transition-transform hover:scale-105 cursor-pointer`}>
            <div className="flex justify-between items-start">
                <div className="p-2 bg-white/60 rounded-lg backdrop-blur-sm">{icon}</div>
                <span className="text-3xl font-bold text-slate-900">{value}</span>
            </div>
            <div>
                <p className="text-sm font-medium text-slate-600">{title}</p>
                <p className="text-xs text-slate-500 mt-1">{trend}</p>
            </div>
        </div>
    );

    return href ? <Link href={href}>{content}</Link> : content;
}
