'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import {
    LayoutDashboard,
    GraduationCap,
    Megaphone,
    Image as ImageIcon,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X,
    FileText,
    Users,
    Trophy,
    Newspaper,
    DollarSign,
    Shield,
    Mail
} from 'lucide-react';

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            if (pathname === '/admin/login') {
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase.auth.getSession();

                if (error || !data?.session) {
                    console.log("No active session or error:", error);
                    router.push('/admin/login');
                }
            } catch (err) {
                console.error("Auth check failed:", err);
                router.push('/admin/login');
            }
            setLoading(false);
        };
        checkAuth();
    }, [pathname, router]);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
    };

    const menuItems = [
        { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
        { name: 'Admissions', icon: <GraduationCap size={20} />, path: '/admin/admissions' },
        { name: 'Inquiries', icon: <Mail size={20} />, path: '/admin/inquiries' },
        { name: 'Notices', icon: <Megaphone size={20} />, path: '/admin/notices' },
        { name: 'Achievers', icon: <Trophy size={20} />, path: '/admin/achievers' },
        { name: 'Gallery', icon: <ImageIcon size={20} />, path: '/admin/gallery' },
        { name: 'Hero Slides', icon: <Newspaper size={20} />, path: '/admin/hero' },
        { name: 'Staff', icon: <Users size={20} />, path: '/admin/staff' },
        { name: 'Quotes', icon: <MessageSquare size={20} />, path: '/admin/quotes' },
        { name: 'Public Disclosure', icon: <Shield size={20} />, path: '/admin/public-disclosure' },
        { name: 'Fees', icon: <DollarSign size={20} />, path: '/admin/fees' },
    ];

    if (loading) return <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600 font-serif">Loading Admin Panel...</div>;

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen bg-slate-50 font-sans text-slate-900">

            {/* MOBILE OVERLAY */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* SIDEBAR */}
            <aside className={`
        fixed lg:static top-0 left-0 z-30 h-full w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="h-16 flex items-center justify-between px-6 bg-slate-950 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-lg">ॐ</div>
                        <span className="font-bold text-lg tracking-tight">IIS Admin</span>
                    </div>
                    <button className="lg:hidden text-slate-400" onClick={() => setSidebarOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Main Menu</div>

                    {menuItems.map((item) => {
                        const isActive = pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                href={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive
                                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'}
                `}
                            >
                                {item.icon}
                                {item.name}
                            </Link>
                        );
                    })}

                    <div className="pt-8 mt-8 border-t border-slate-800">
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors"
                        >
                            <LogOut size={20} />
                            Sign Out
                        </button>
                    </div>
                </nav>
            </aside>

            {/* MAIN CONTENT WRAPPER */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">

                {/* TOP HEADER */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 lg:px-8">
                    <button className="lg:hidden p-2 -ml-2 text-slate-600" onClick={() => setSidebarOpen(true)}>
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-slate-900">Admin User</p>
                            <p className="text-xs text-slate-500">Super Admin</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                            AD
                        </div>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main className="flex-1 overflow-auto p-4 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
