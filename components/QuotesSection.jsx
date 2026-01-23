'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { FaQuoteLeft } from 'react-icons/fa';

export default function QuotesSection() {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const { data } = await supabase
                    .from('quotes')
                    .select('*')
                    .eq('active', true)
                    .order('created_at', { ascending: false });

                if (data) setQuotes(data);
            } catch (error) {
                console.error("Error fetching quotes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuotes();
    }, []);

    if (quotes.length === 0) return null;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-iis-gold font-bold tracking-widest uppercase text-sm">Inspiration</span>
                    <h2 className="font-serif text-4xl md:text-5xl font-bold text-iis-maroon mb-2">Words of Wisdom</h2>
                    <div className="w-24 h-1 bg-iis-gold mx-auto mt-4"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {quotes.map((quote) => (
                        <div key={quote.id} className="bg-slate-50 p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                            <div className="absolute top-4 left-4 text-4xl text-iis-maroon/10 group-hover:text-iis-maroon/20 transition-colors">
                                <FaQuoteLeft />
                            </div>
                            <p className="text-slate-700 text-lg leading-relaxed mb-6 italic relative z-10 font-serif">
                                &quot;{quote.text}&quot;
                            </p>
                            <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                                <div className="h-10 w-1 bg-iis-gold rounded-full"></div>
                                <div>
                                    <h4 className="font-bold text-slate-800">{quote.author || 'Unknown'}</h4>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
