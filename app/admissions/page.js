"use client";
import React, { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function AdmissionsPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', dob: '', gender: '',
        classApplyingFor: '', previousSchool: '', lastGradePercentage: '',
        fatherName: '', mobile: '', email: '', address: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = (e) => {
        e.preventDefault();
        // Basic validation can be added here
        setCurrentStep((prev) => prev + 1);
        const formElement = document.getElementById('admission-form');
        if (formElement) formElement.scrollIntoView({ behavior: 'smooth' });
    };

    const handlePrev = (e) => {
        e.preventDefault();
        setCurrentStep((prev) => prev - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const { error } = await supabase.from('admissions').insert({
                first_name: formData.firstName,
                last_name: formData.lastName,
                dob: formData.dob,
                gender: formData.gender,
                class_applying_for: formData.classApplyingFor,
                previous_school: formData.previousSchool,
                last_grade_percentage: formData.lastGradePercentage,
                father_name: formData.fatherName,
                mobile: formData.mobile, // Mapped to 'mobile' in SQL as well based on my setup, or 'parent_phone'? In my SQL I put 'mobile'. Let me double check SQL.
                // SQL said 'mobile text not null' in Step 69.
                email: formData.email,
                address: formData.address,
            });

            if (!error) {
                // Send Email Notification
                try {
                    await fetch('/api/send-admission-email', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    });
                } catch (emailError) {
                    console.error("Failed to send email notification", emailError);
                    // Don't block success message to user if email fails, but log it
                }

                alert("Application Submitted Successfully! Our admission counselor will call you shortly.");
                setFormData({
                    firstName: '', lastName: '', dob: '', gender: '',
                    classApplyingFor: '', previousSchool: '', lastGradePercentage: '',
                    fatherName: '', mobile: '', email: '', address: ''
                });
                setCurrentStep(1);
            } else {
                throw error;
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Submission failed: " + error.message);
        } finally {
            setSubmitting(false);
        }
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
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">First Name *</label>
                                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 text-slate-900 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Last Name *</label>
                                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 text-slate-900 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Date of Birth *</label>
                                            <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 text-slate-900 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Gender *</label>
                                            <select name="gender" value={formData.gender} onChange={handleChange} required className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 text-slate-900 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all">
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
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
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Admission Sought For Class *</label>
                                            <select name="classApplyingFor" value={formData.classApplyingFor} onChange={handleChange} required className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 text-slate-900 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all">
                                                <option value="">-- Select Class --</option>
                                                <option value="Nursery">Nursery</option>
                                                <option value="LKG">LKG</option>
                                                <option value="UKG">UKG</option>
                                                <option value="Class 1">Class 1</option>
                                                <option value="Class 2">Class 2</option>
                                                <option value="Class 3">Class 3</option>
                                                <option value="Class 4">Class 4</option>
                                                <option value="Class 5">Class 5</option>
                                                <option value="Class 6">Class 6</option>
                                                <option value="Class 7">Class 7</option>
                                                <option value="Class 8">Class 8</option>
                                                <option value="Class 9">Class 9</option>
                                                <option value="Class 10">Class 10</option>
                                                <option value="Class 11 Science">Class 11 - Science</option>
                                                <option value="Class 11 Commerce">Class 11 - Commerce</option>
                                                <option value="Class 11 Arts">Class 11 - Arts</option>
                                                <option value="Class 12 Science">Class 12 - Science</option>
                                                <option value="Class 12 Commerce">Class 12 - Commerce</option>
                                                <option value="Class 12 Arts">Class 12 - Arts</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Previous School Name</label>
                                            <input type="text" name="previousSchool" value={formData.previousSchool} onChange={handleChange} className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 text-slate-900 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all" placeholder="Name of last school" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Last Grade / Percentage</label>
                                            <input type="text" name="lastGradePercentage" value={formData.lastGradePercentage} onChange={handleChange} className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 text-slate-900 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all" placeholder="e.g. 85%" />
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
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Father&apos;s Name *</label>
                                            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 text-slate-900 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Mobile Number *</label>
                                            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required pattern="[0-9]{10}" className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 text-slate-900 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all" placeholder="10 Digit Number" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Email Address</label>
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 text-slate-900 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all" placeholder="parent@example.com" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Residential Address</label>
                                            <textarea rows="2" name="address" value={formData.address} onChange={handleChange} className="w-full p-3 rounded-md bg-gray-50 border border-slate-200 text-slate-900 focus:border-iis-maroon focus:outline-none focus:ring-1 focus:ring-iis-maroon transition-all"></textarea>
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
                                        <button type="submit" disabled={submitting} className="bg-iis-gold text-iis-navy px-10 py-3 rounded-sm font-bold uppercase tracking-wider hover:bg-yellow-600 transition-colors shadow-lg disabled:opacity-50">
                                            {submitting ? 'Submitting...' : 'Submit Inquiry'}
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
