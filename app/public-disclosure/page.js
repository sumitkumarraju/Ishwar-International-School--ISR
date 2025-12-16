import React from 'react';

export default function PublicDisclosurePage() {
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
                <div className="grid md:grid-cols-2 gap-4">
                    <a href="/Affiliation.pdf" target="_blank" className="flex items-center p-4 border border-gray-200 bg-white rounded-sm hover:bg-iis-cream hover:border-iis-maroon transition-all group">
                        <i className="fa-solid fa-file-pdf text-red-600 text-2xl mr-3 group-hover:scale-110 transition-transform"></i>
                        <span className="font-bold text-slate-700">Affiliation Letter</span>
                    </a>
                    <a href="/mandatory public disclosure.pdf" target="_blank" className="flex items-center p-4 border border-gray-200 bg-white rounded-sm hover:bg-iis-cream hover:border-iis-maroon transition-all group">
                        <i className="fa-solid fa-file-pdf text-red-600 text-2xl mr-3 group-hover:scale-110 transition-transform"></i>
                        <span className="font-bold text-slate-700">Public Disclosure</span>
                    </a>
                    <a href="/Society Registration.pdf" target="_blank" className="flex items-center p-4 border border-gray-200 bg-white rounded-sm hover:bg-iis-cream hover:border-iis-maroon transition-all group">
                        <i className="fa-solid fa-file-pdf text-red-600 text-2xl mr-3 group-hover:scale-110 transition-transform"></i>
                        <span className="font-bold text-slate-700">Society Registration</span>
                    </a>
                    <a href="/Fees Structure.pdf" target="_blank" className="flex items-center p-4 border border-gray-200 bg-white rounded-sm hover:bg-iis-cream hover:border-iis-maroon transition-all group">
                        <i className="fa-solid fa-file-pdf text-red-600 text-2xl mr-3 group-hover:scale-110 transition-transform"></i>
                        <span className="font-bold text-slate-700">Fee Structure PDF</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
