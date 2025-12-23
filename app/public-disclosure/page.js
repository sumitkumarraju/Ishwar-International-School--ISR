'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function PublicDisclosurePage() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        // Debug: Check if env vars are present (without logging secrets)
        const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const isPlaceholder = !sbUrl || sbUrl.includes('placeholder');

        if (isPlaceholder) {
            console.error('Supabase URL is missing or placeholder. Check deployment environment variables.');
            setError('Configuration Error: Supabase URL is not set in this environment.');
            setLoading(false);
            return;
        }

        try {
            console.log("Fetching public disclosures...");
            const { data, error } = await supabase
                .from('public_disclosures')
                .select('*')
                .order('uploaded_at', { ascending: false });

            if (error) {
                console.error('Supabase error fetching documents:', error);
                setError(error.message);
            } else {
                console.log("Documents fetched:", data);
                setDocuments(data || []);
            }
        } catch (err) {
            console.error('Unexpected fetch error:', err);
            // Check if it's a network/fetch error
            const message = err.message || 'Failed to connect to the database. Please check your internet connection.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-iis-navy text-white py-16 text-center">
                <h1 className="font-serif text-4xl font-bold">Public Disclosure</h1>
                <p className="text-slate-300 mt-2">Mandatory Disclosures as per CBSE norms.</p>
            </div>

            <div className="max-w-4xl mx-auto px-4 text-center mt-12">
                <h2 className="font-serif text-3xl font-bold text-iis-maroon mb-6">Mandatory Public Disclosure</h2>
                <p className="text-slate-600 mb-8">
                    In compliance with CBSE norms, the mandatory public disclosure documents are available for viewing.
                </p>

                {loading ? (
                    <div className="py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-iis-maroon"></div>
                        <p className="text-slate-500 mt-4">Loading documents...</p>
                    </div>
                ) : error ? (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
                        <i className="fa-solid fa-exclamation-triangle text-2xl mb-2"></i>
                        <p className="font-medium">Failed to load documents</p>
                        <p className="text-sm mt-1">{error}</p>
                    </div>
                ) : documents.length === 0 ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 text-blue-700">
                        <i className="fa-solid fa-info-circle text-3xl mb-3"></i>
                        <p className="font-medium text-lg">No documents available at the moment</p>
                        <p className="text-sm mt-2">Please check back later or contact the school office.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 gap-4">
                        {documents.map((doc) => (
                            <a
                                key={doc.id}
                                href={doc.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center p-4 border border-gray-200 bg-white rounded-sm hover:bg-iis-cream hover:border-iis-maroon transition-all group"
                            >
                                <i className="fa-solid fa-file-pdf text-red-600 text-2xl mr-3 group-hover:scale-110 transition-transform"></i>
                                <span className="font-bold text-slate-700">{doc.title}</span>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
