import React from 'react';

export default function ContactPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-iis-maroon text-white py-16 text-center">
                <h1 className="font-serif text-4xl font-bold">Contact Us</h1>
                <p className="text-red-100 mt-2">Get in touch with us.</p>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-12">
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-200">
                        <h3 className="font-serif text-2xl mb-6 text-slate-800">Get in Touch</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <i className="fa-solid fa-location-dot text-iis-maroon mt-1 text-xl"></i>
                                <div>
                                    <h4 className="font-bold text-slate-800">Campus Address</h4>
                                    <p className="text-slate-600">Ishwar International School<br />Sonipat Bypass Rd, State Highway 11,<br />Gohana, Haryana 131301</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <i className="fa-solid fa-phone text-iis-maroon mt-1 text-xl"></i>
                                <div>
                                    <h4 className="font-bold text-slate-800">Phone</h4>
                                    <p className="text-slate-600">9996390013, 9812531013</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <i className="fa-solid fa-envelope text-iis-maroon mt-1 text-xl"></i>
                                <div>
                                    <h4 className="font-bold text-slate-800">Email</h4>
                                    <p className="text-slate-600">admin@iisgohana.com</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="h-96 bg-gray-200 rounded-sm overflow-hidden shadow-lg border border-gray-200">
                        <iframe
                            title="Ishwar International School Map"
                            width="100%"
                            height="100%"
                            id="gmap_canvas"
                            src="https://maps.google.com/maps?q=Ishwar+International+School+Gohana+Haryana&t=&z=13&ie=UTF8&iwloc=&output=embed"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight="0"
                            marginWidth="0">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    );
}
