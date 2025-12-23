"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function EnquiryForm() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // success | error

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        const formData = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            message: e.target.message.value,
        };

        try {
            const { data, error } = await supabase
                .from('enquiries')
                .insert([formData])
                .select();

            if (error) {
                console.error('Supabase error:', error);
                setStatus('error');
                // Keep alert for errors as fallback, or use a toast if available. Use simple alert for error for now.
                alert("Failed to submit enquiry: " + error.message);
                return;
            }

            setStatus('success');
            e.target.reset();

        } catch (err) {
            console.error('Unexpected error:', err);
            setStatus('error');
            alert("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    if (status === 'success') {
        return (
            <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-200 h-full flex flex-col items-center justify-center text-center animate-fade-in-up">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <i className="fa-solid fa-check text-3xl text-green-600"></i>
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-800 mb-2">Message Sent!</h3>
                <p className="text-slate-600 mb-6">
                    Thank you for contacting us. We have received your message and will respond shortly.
                </p>
                <button
                    onClick={() => setStatus(null)}
                    className="text-iis-maroon font-bold hover:text-red-900 transition-colors uppercase text-sm tracking-wider"
                >
                    Send Another Message
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-200">
            <h3 className="font-serif text-2xl mb-6 text-slate-800">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                    <input name="name" type="text" placeholder="Your Full Name" required className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 text-slate-900 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all placeholder:text-slate-400" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                    <input name="email" type="email" placeholder="you@example.com" required className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 text-slate-900 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all placeholder:text-slate-400" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Phone Number</label>
                    <input name="phone" type="tel" placeholder="Your Phone Number" required className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 text-slate-900 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all placeholder:text-slate-400" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Message</label>
                    <textarea name="message" rows="4" placeholder="How can we help you?" required className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 text-slate-900 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all placeholder:text-slate-400"></textarea>
                </div>

                <button type="submit" disabled={loading} className={`w-full py-3 px-6 rounded-sm font-bold uppercase tracking-wider text-white transition-all shadow-md flex justify-center items-center gap-2 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-iis-maroon hover:bg-red-900'}`}>
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </>
                    ) : (
                        'Submit Enquiry'
                    )}
                </button>

                {status === 'error' && <p className="text-red-600 text-sm font-bold text-center mt-2">Failed to send enquiry. Please try again.</p>}
            </form>
        </div>
    );
}
