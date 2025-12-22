'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaTimes, FaBell } from 'react-icons/fa';

export default function NoticeCorner() {
    const [latestNotice, setLatestNotice] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchLatestNotice = async () => {
            const { data } = await supabase
                .from('notices')
                .select('*')
                .eq('active', true)
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (data) {
                setLatestNotice(data);
                // Delay appearance slightly for effect
                setTimeout(() => setIsVisible(true), 2000);
            }
        };

        fetchLatestNotice();
    }, []);

    if (!latestNotice || !isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-in-right max-w-sm w-full md:w-auto">
            <div className="bg-white rounded-lg shadow-2xl border-l-4 border-iis-gold p-4 relative overflow-hidden">
                <button
                    onClick={() => setIsVisible(false)}
                    className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <FaTimes size={14} />
                </button>

                <div className="flex items-start gap-3">
                    <div className="bg-red-50 text-red-600 p-2 rounded-full flex-shrink-0">
                        <FaBell size={18} className="animate-pulse" />
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-800 text-sm mb-1 uppercase tracking-wide">Latest Notice</h4>
                        <h5 className="font-semibold text-iis-maroon text-base mb-1">{latestNotice.title}</h5>
                        <p className="text-slate-600 text-sm line-clamp-3">{latestNotice.description}</p>
                        <span className="text-xs text-slate-400 mt-2 block ">
                            {new Date(latestNotice.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
