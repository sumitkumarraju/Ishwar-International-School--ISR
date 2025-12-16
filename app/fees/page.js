import React from 'react';

export default function FeesPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-iis-maroon text-white py-16 text-center">
                <h1 className="font-serif text-4xl font-bold">Fee Structure</h1>
                <p className="text-red-100 mt-2">Transparent and affordable education.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12">

                <div className="text-center mb-16">
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Detailed academic fee breakdown for the session. <br />
                        <strong>Registration Fee:</strong> ₹ 500 (All Classes)
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-16">

                    {/* Pre-Primary */}
                    <div className="bg-white rounded-sm shadow-lg border border-gray-200 overflow-hidden group hover:border-iis-maroon transition-colors">
                        <div className="bg-iis-navy text-white p-4 text-center group-hover:bg-iis-maroon transition-colors">
                            <h3 className="font-serif text-xl font-bold">Pre-Primary</h3>
                            <p className="text-xs text-slate-300 uppercase tracking-widest">Nursery - UKG</p>
                        </div>
                        <div className="p-6 text-sm">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-slate-600">Admission Charge (New)</span>
                                <span className="font-bold text-slate-800">₹ 2,500</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mt-4 mb-2 text-xs font-bold text-iis-maroon uppercase">
                                <span>Class</span>
                                <span className="text-right">1st Child</span>
                                <span className="text-right">2nd Child</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50">
                                <span className="font-bold">Nursery</span>
                                <span className="text-right">₹ 1,950</span>
                                <span className="text-right">₹ 1,950</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50">
                                <span className="font-bold">L.K.G.</span>
                                <span className="text-right">₹ 2,650</span>
                                <span className="text-right">₹ 2,450</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50">
                                <span className="font-bold">U.K.G.</span>
                                <span className="text-right">₹ 2,650</span>
                                <span className="text-right">₹ 2,450</span>
                            </div>

                            <button className="w-full mt-6 bg-iis-navy text-white py-2 rounded-sm text-xs font-bold uppercase hover:bg-slate-700">Pay Nursery-UKG Fees</button>
                        </div>
                    </div>

                    {/* Primary */}
                    <div className="bg-white rounded-sm shadow-lg border border-gray-200 overflow-hidden group hover:border-iis-maroon transition-colors">
                        <div className="bg-iis-navy text-white p-4 text-center group-hover:bg-iis-maroon transition-colors">
                            <h3 className="font-serif text-xl font-bold">Primary Wing</h3>
                            <p className="text-xs text-slate-300 uppercase tracking-widest">Grade 1 - 5</p>
                        </div>
                        <div className="p-6 text-sm">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-slate-600">Admission Charge (New)</span>
                                <span className="font-bold text-slate-800">₹ 2,500</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mt-4 mb-2 text-xs font-bold text-iis-maroon uppercase">
                                <span>Class</span>
                                <span className="text-right">1st Child</span>
                                <span className="text-right">2nd Child</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50">
                                <span className="font-bold">1st</span>
                                <span className="text-right">₹ 2,900</span>
                                <span className="text-right">₹ 2,700</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50">
                                <span className="font-bold">2nd</span>
                                <span className="text-right">₹ 2,900</span>
                                <span className="text-right">₹ 2,700</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50">
                                <span className="font-bold">3rd</span>
                                <span className="text-right">₹ 3,250</span>
                                <span className="text-right">₹ 3,000</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50">
                                <span className="font-bold">4th</span>
                                <span className="text-right">₹ 3,250</span>
                                <span className="text-right">₹ 3,000</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50">
                                <span className="font-bold">5th</span>
                                <span className="text-right">₹ 3,250</span>
                                <span className="text-right">₹ 3,000</span>
                            </div>

                            <button className="w-full mt-6 bg-iis-navy text-white py-2 rounded-sm text-xs font-bold uppercase hover:bg-slate-700">Pay Primary Fees</button>
                        </div>
                    </div>

                    {/* Senior */}
                    <div className="bg-white rounded-sm shadow-lg border border-gray-200 overflow-hidden group hover:border-iis-maroon transition-colors">
                        <div className="bg-iis-navy text-white p-4 text-center group-hover:bg-iis-maroon transition-colors">
                            <h3 className="font-serif text-xl font-bold">Middle & Senior</h3>
                            <p className="text-xs text-slate-300 uppercase tracking-widest">Grade 6 - 12</p>
                        </div>
                        <div className="p-6 text-sm">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                                <span className="text-slate-600">Admission Charge (New)</span>
                                <span className="font-bold text-slate-800">₹ 3,500</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mt-4 mb-2 text-xs font-bold text-iis-maroon uppercase">
                                <span>Class</span>
                                <span className="text-right">1st Child</span>
                                <span className="text-right">2nd Child</span>
                            </div>

                            <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50">
                                <span className="font-bold">6th - 8th</span>
                                <span className="text-right">₹ 3,750</span>
                                <span className="text-right">₹ 3,400</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50">
                                <span className="font-bold">9th - 10th</span>
                                <span className="text-right">₹ 4,300</span>
                                <span className="text-right">₹ 3,950</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50">
                                <span className="font-bold text-[10px] leading-tight">11th/12th<br />(Commerce)</span>
                                <span className="text-right">₹ 4,950</span>
                                <span className="text-right">₹ 4,500</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-50">
                                <span className="font-bold text-[10px] leading-tight">11th/12th<br />(Science)</span>
                                <span className="text-right">₹ 5,150</span>
                                <span className="text-right">₹ 4,700</span>
                            </div>

                            <button className="w-full mt-6 bg-iis-navy text-white py-2 rounded-sm text-xs font-bold uppercase hover:bg-slate-700">Pay Senior Fees</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
