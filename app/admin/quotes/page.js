'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Plus, Quote, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import Modal from '@/components/ui/Modal';

export default function QuotesPage() {
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newQuote, setNewQuote] = useState({ text: '', author: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        try {
            const { data, error } = await supabase
                .from('quotes')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setQuotes(data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { data, error } = await supabase
                .from('quotes')
                .insert([{ text: newQuote.text, author: newQuote.author || '', active: true }])
                .select();

            if (error) throw error;

            if (data) {
                setQuotes([data[0], ...quotes]);
                setIsModalOpen(false);
                setNewQuote({ text: '', author: '' });
            }
        } catch (error) {
            alert("Failed to add quote: " + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggle = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('quotes')
                .update({ active: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            setQuotes(quotes.map(q => q.id === id ? { ...q, active: !currentStatus } : q));
        } catch (error) {
            alert("Failed to update status");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this quote?")) return;
        try {
            const { error } = await supabase.from('quotes').delete().eq('id', id);
            if (error) throw error;
            setQuotes(quotes.filter(q => q.id !== id));
        } catch (error) {
            alert("Failed to delete");
        }
    };

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-serif font-bold text-iis-navy">Words of Wisdom</h2>
                    <p className="text-sm text-slate-500">Manage the daily quotes displayed on the site.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-iis-gold text-iis-navy px-5 py-2 rounded shadow hover:bg-yellow-500 transition font-bold"
                >
                    <Plus size={18} /> Add New Quote
                </button>
            </div>

            {/* Existing Quotes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b bg-gray-50 font-bold text-slate-700">Active Quotes Library</div>
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading quotes...</div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {quotes.map((quote) => (
                            <div key={quote.id} className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors">
                                <div className={`mt-1 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${quote.active ? 'bg-iis-maroon text-white' : 'bg-gray-200 text-gray-400'}`}>
                                    <Quote size={20} />
                                </div>
                                <div className="flex-1">
                                    <p className="text-lg text-slate-800 font-serif italic mb-2">&quot;{quote.text}&quot;</p>
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">— {quote.author || 'Unknown'}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleToggle(quote.id, quote.active)}
                                        title={quote.active ? "Deactivate" : "Activate"}
                                        className={`text-2xl transition-colors ${quote.active ? 'text-green-500 hover:text-green-600' : 'text-gray-300 hover:text-green-400'}`}
                                    >
                                        {quote.active ? <ToggleRight size={24} /> : <ToggleLeft size={24} />}
                                    </button>
                                    <button
                                        onClick={() => handleDelete(quote.id)}
                                        className="text-red-300 hover:text-red-500 p-2"
                                        title="Delete"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {!loading && quotes.length === 0 && <div className="p-8 text-center text-gray-400 italic">No quotes found. Add one to inspire students!</div>}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Quote">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Quote Text</label>
                        <textarea
                            required
                            rows={4}
                            value={newQuote.text}
                            onChange={(e) => setNewQuote({ ...newQuote, text: e.target.value })}
                            className="w-full p-4 border rounded focus:ring-2 focus:ring-iis-gold outline-none resize-none bg-slate-50"
                            placeholder="Enter the quote here..."
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-1">Author Name </label>
                        <input
                            type="text"
                            value={newQuote.author}
                            onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
                            className="w-full p-3 border rounded focus:ring-2 focus:ring-iis-gold outline-none bg-slate-50"
                            placeholder="e.g. A.P.J. Abdul Kalam"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-iis-navy text-white font-bold py-3 rounded hover:bg-slate-800 disabled:opacity-50 transition-colors"
                    >
                        {submitting ? 'Publishing...' : 'Publish Quote'}
                    </button>
                </form>
            </Modal>
        </div>
    );
}
