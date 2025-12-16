"use client";
import React, { useState } from 'react';

export default function AdmissionsPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});

    const handleNext = (e) => {
        e.preventDefault();
        // Validate inputs here if needed
        setCurrentStep((prev) => prev + 1);
        const formElement = document.getElementById('admission-form');
        // Scroll to top of form
        if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
    };

    const handlePrev = (e) => {
        e.preventDefault();
        setCurrentStep((prev) => prev - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Inquiry Sent! We have received your details. Our admission counselor will call you shortly.");
        // In a real app, you would send data to a server here.
    };

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-iis-maroon text-white py-16 text-center">
                <h1 className="font-serif text-4xl font-bold">Admissions</h1>
                <p className="text-red-100 mt-2">Join the IIS Family. Apply for Session 2025-26.</p>
            </div>

            <div className="max-w-4xl mx-auto px-4 mt-[-50px]">
                <div className="bg-white rounded-xl shadow-2xl border-t-8 border-iis-gold overflow-hidden">

                    <div className="bg-white p-8 text-center border-b border-gray-100">
                        <h2 className="font-serif text-3xl font-bold text-iis-navy">Admission Inquiry Form</h2>
                        <p className="text-slate-500 mt-2">Session 2025-26 | Ishwar International School</p>
                    </div>

                    <div className="px-8 py-6 bg-gray-50">
                        <div className="flex justify-between items-center max-w-lg mx-auto relative">
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>

                            <div className="flex flex-col items-center bg-gray-50 px-2 relative z-10">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= 1 ? 'bg-iis-maroon text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>1</div>
                                <span className={`text-xs font-bold mt-2 uppercase ${currentStep >= 1 ? 'text-iis-maroon' : 'text-gray-400'}`}>Student</span>
                            </div>
                            <div className="flex flex-col items-center bg-gray-50 px-2 relative z-10">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= 2 ? 'bg-iis-maroon text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>2</div>
                                <span className={`text-xs font-bold mt-2 uppercase ${currentStep >= 2 ? 'text-iis-maroon' : 'text-gray-400'}`}>Academic</span>
                            </div>
                            <div className="flex flex-col items-center bg-gray-50 px-2 relative z-10">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${currentStep >= 3 ? 'bg-iis-maroon text-white shadow-lg' : 'bg-gray-200 text-gray-500'}`}>3</div>
                                <span className={`text-xs font-bold mt-2 uppercase ${currentStep >= 3 ? 'text-iis-maroon' : 'text-gray-400'}`}>Contact</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 md:p-10" id="admission-form">
                        <form onSubmit={handleSubmit}>

                            {currentStep === 1 && (
                                <div className="animate-fade-in-up">
                                    <h3 className="font-serif text-xl font-bold text-iis-maroon mb-6 flex items-center">
                                        <i className="fa-solid fa-user-graduate mr-3"></i> Student Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">First Name *</label>
                                            <input type="text" required className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all" placeholder="Student First Name" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Last Name *</label>
                                            <input type="text" required className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all" placeholder="Student Last Name" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Date of Birth *</label>
                                            <input type="date" required className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Gender *</label>
                                            <select required className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all">
                                                <option value="">Select Gender</option>
                                                <option>Male</option>
                                                <option>Female</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <button type="button" onClick={handleNext} className="bg-iis-maroon text-white px-8 py-3 rounded-sm font-bold uppercase tracking-wider hover:bg-red-900 transition-colors shadow-lg flex items-center">
                                            Next <i className="fa-solid fa-arrow-right ml-2"></i>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="animate-fade-in-up">
                                    <h3 className="font-serif text-xl font-bold text-iis-maroon mb-6 flex items-center">
                                        <i className="fa-solid fa-book mr-3"></i> Academic Details
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Admission Sought For Class *</label>
                                            <select required className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all">
                                                <option value="">-- Select Class --</option>
                                                <option>Nursery</option>
                                                <option>LKG</option>
                                                <option>UKG</option>
                                                <option>Class 1 - 5</option>
                                                <option>Class 6 - 8</option>
                                                <option>Class 9 - 10</option>
                                                <option>Class 11 - 12 (Science)</option>
                                                <option>Class 11 - 12 (Commerce)</option>
                                                <option>Class 11 - 12 (Arts)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Previous School Name</label>
                                            <input type="text" className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all" placeholder="Name of last school" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Last Grade / Percentage</label>
                                            <input type="text" className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all" placeholder="e.g. 85%" />
                                        </div>
                                    </div>
                                    <div className="mt-8 flex justify-between">
                                        <button type="button" onClick={handlePrev} className="text-slate-500 font-bold px-6 hover:text-iis-navy">
                                            Back
                                        </button>
                                        <button type="button" onClick={handleNext} className="bg-iis-maroon text-white px-8 py-3 rounded-sm font-bold uppercase tracking-wider hover:bg-red-900 transition-colors shadow-lg flex items-center">
                                            Next <i className="fa-solid fa-arrow-right ml-2"></i>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="animate-fade-in-up">
                                    <h3 className="font-serif text-xl font-bold text-iis-maroon mb-6 flex items-center">
                                        <i className="fa-solid fa-address-card mr-3"></i> Parent Details
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Father&apos;s Name *</label>
                                            <input type="text" required className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Mobile Number *</label>
                                            <input type="tel" required pattern="[0-9]{10}" className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all" placeholder="10 Digit Number" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email Address</label>
                                            <input type="email" className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all" placeholder="parent@example.com" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Residential Address</label>
                                            <textarea rows="2" className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all"></textarea>
                                        </div>
                                    </div>

                                    <div className="mt-6 bg-yellow-50 p-4 rounded border border-yellow-100 text-sm text-yellow-800 flex items-start gap-3">
                                        <input type="checkbox" required className="mt-1 w-4 h-4 accent-iis-maroon" />
                                        <span>I authorize Ishwar International School to contact me regarding this admission inquiry.</span>
                                    </div>

                                    <div className="mt-8 flex justify-between">
                                        <button type="button" onClick={handlePrev} className="text-slate-500 font-bold px-6 hover:text-iis-navy">
                                            Back
                                        </button>
                                        <button type="submit" className="bg-iis-gold text-iis-navy px-10 py-3 rounded-sm font-bold uppercase tracking-wider hover:bg-yellow-600 transition-colors shadow-lg">
                                            Submit Inquiry
                                        </button>
                                    </div>
                                </div>
                            )}

                        </form>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-20">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl font-bold text-iis-maroon mb-10">Frequently Asked Questions</h2>
                    <div className="bg-white max-w-4xl mx-auto rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-100">
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-slate-800 hover:text-iis-maroon">
                                <span>What is the admission criteria for Nursery?</span>
                                <span className="transition group-open:rotate-180">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </span>
                            </summary>
                            <div className="text-slate-600 px-5 pb-5 leading-relaxed text-sm text-left">
                                For Nursery, the child must be 3+ years of age as of March 31st of the academic year. Admissions are based on an informal interaction with parents and the child; no written test is required.
                            </div>
                        </details>
                        <details className="group">
                            <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-5 text-slate-800 hover:text-iis-maroon">
                                <span>Do you provide transport facilities?</span>
                                <span className="transition group-open:rotate-180">
                                    <i className="fa-solid fa-chevron-down"></i>
                                </span>
                            </summary>
                            <div className="text-slate-600 px-5 pb-5 leading-relaxed text-sm text-left">
                                Yes, IIS Gohana has a fleet of GPS-enabled buses covering all major routes in Gohana city and surrounding villages within a 20km radius.
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    );
}
