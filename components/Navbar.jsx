"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Sticky Social Media Sidebar */}
            <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-1">
                <a href="https://www.youtube.com/@iisgohana6772" target="_blank" className="bg-red-600 text-white w-12 h-12 flex items-center justify-center hover:w-32 transition-all duration-300 overflow-hidden group shadow-md rounded-l-sm">
                    <i className="fa-brands fa-youtube text-xl flex-shrink-0"></i>
                    <span className="ml-3 text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">YouTube</span>
                </a>
                <a href="https://www.instagram.com/ishwarinternational_school?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" className="bg-pink-600 text-white w-12 h-12 flex items-center justify-center hover:w-32 transition-all duration-300 overflow-hidden group shadow-md rounded-l-sm">
                    <i className="fa-brands fa-instagram text-xl flex-shrink-0"></i>
                    <span className="ml-3 text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Instagram</span>
                </a>
                <a href="https://www.facebook.com/IISGohana/" target="_blank" className="bg-blue-700 text-white w-12 h-12 flex items-center justify-center hover:w-32 transition-all duration-300 overflow-hidden group shadow-md rounded-l-sm">
                    <i className="fa-brands fa-facebook-f text-xl flex-shrink-0"></i>
                    <span className="ml-3 text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Facebook</span>
                </a>
                <a href="https://wa.me/919996390013" target="_blank" className="bg-green-500 text-white w-12 h-12 flex items-center justify-center hover:w-32 transition-all duration-300 overflow-hidden group shadow-md rounded-l-sm">
                    <i className="fa-brands fa-whatsapp text-xl flex-shrink-0"></i>
                    <span className="ml-3 text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">WhatsApp</span>
                </a>
            </div>

            {/* Top Info Bar */}
            <div className="bg-iis-navy text-white py-3 text-sm font-medium">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-6">
                        <a href="tel:+919996390013" className="flex items-center gap-2 hover:text-gray-200 transition-colors">
                            <i className="fa-solid fa-phone"></i>
                            <span>+91 99963 90013</span>
                        </a>
                        <a href="mailto:admin@iisgohana.com" className="flex items-center gap-2 hover:text-gray-200 transition-colors">
                            <i className="fa-solid fa-envelope"></i>
                            <span className="hidden sm:inline">admin@iisgohana.com</span>
                            <span className="sm:hidden">Email Us</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/notices" className="hover:text-gray-200 transition-colors flex items-center gap-2">
                            <i className="fa-solid fa-bell"></i>
                            Latest Notices
                        </Link>
                        <span className="opacity-50">|</span>
                        <Link href="/admissions" className="hover:text-gray-200 transition-colors">
                            Apply Now
                        </Link>
                    </div>
                </div>
            </div>

            <header
                id="navbar"
                className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-500 ease-in-out ${isScrolled ? 'py-2 shadow-md' : 'py-5'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <Link href="/" className="flex items-center group hover:opacity-90 transition-opacity">
                                <div className={`relative transition-all duration-500 ${isScrolled ? 'h-12 w-12' : 'h-16 w-16'}`}>
                                    <Image
                                        src="/me.jpg"
                                        alt="Ishwar International School"
                                        fill
                                        className="object-contain"
                                        id="navbar-logo"
                                    />
                                </div>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center space-x-8">
                            <Link href="/" className="text-sm font-medium text-slate-700 hover:text-iis-maroon transition-colors">Home</Link>
                            <Link href="/about" className="text-sm font-medium text-slate-700 hover:text-iis-maroon transition-colors">About</Link>
                            <Link href="/admissions" className="text-sm font-medium text-slate-700 hover:text-iis-maroon transition-colors">Admissions</Link>

                            <div className="relative group h-20 flex items-center">
                                <button className="flex items-center gap-1 text-sm font-medium text-slate-700 hover:text-iis-maroon transition-colors focus:outline-none">
                                    Academics <i className="fa-solid fa-chevron-down text-[10px] pt-1"></i>
                                </button>
                                <div className="absolute top-full left-0 w-60 bg-white border border-gray-100 shadow-lg rounded-b-sm hidden group-hover:block animate-fade-in-up">
                                    <Link href="/academics" className="block px-4 py-3 text-sm text-slate-700 hover:bg-iis-cream hover:text-iis-maroon border-b border-gray-50">Curriculum</Link>
                                    <Link href="/academics#scholarships" className="block px-4 py-3 text-sm text-slate-700 hover:bg-iis-cream hover:text-iis-maroon border-b border-gray-50">Scholarships & Awards</Link>
                                    <Link href="/academics#faculty" className="block px-4 py-3 text-sm text-slate-700 hover:bg-iis-cream hover:text-iis-maroon">Faculty</Link>
                                </div>
                            </div>

                            <Link href="/gallery" className="text-sm font-medium text-slate-700 hover:text-iis-maroon transition-colors">Gallery</Link>
                            <Link href="/activities" className="text-sm font-medium text-slate-700 hover:text-iis-maroon transition-colors">Holistic Activities</Link>
                            <Link href="/fees" className="text-sm font-medium text-slate-700 hover:text-iis-maroon transition-colors">Fees</Link>
                            <Link href="/public-disclosure" className="text-sm font-medium text-slate-700 hover:text-iis-maroon transition-colors whitespace-nowrap">
                                Public Disclosure
                            </Link>
                            <Link href="/contact" className="text-sm font-medium text-slate-700 hover:text-iis-maroon transition-colors">Contact</Link>

                            <Link href="/admissions" className="bg-iis-maroon text-white px-5 py-2.5 rounded-sm text-sm font-semibold hover:bg-red-900 transition-all shadow-md whitespace-nowrap">
                                Apply Now
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="text-slate-700 focus:outline-none"
                            >
                                <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 shadow-lg h-screen overflow-y-auto">
                        <div className="flex flex-col space-y-4 mt-4">
                            <Link href="/" className="text-lg font-medium text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                            <Link href="/about" className="text-lg font-medium text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
                            <Link href="/admissions" className="text-lg font-medium text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>Admissions</Link>
                            <Link href="/academics" className="text-lg font-medium text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>Academics</Link>
                            <Link href="/gallery" className="text-lg font-medium text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>Gallery</Link>
                            <Link href="/activities" className="text-lg font-medium text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>Activities</Link>
                            <Link href="/fees" className="text-lg font-medium text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>Fees</Link>
                            <Link href="/public-disclosure" className="text-lg font-medium text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>Public Disclosure</Link>
                            <Link href="/contact" className="text-lg font-medium text-slate-700" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
