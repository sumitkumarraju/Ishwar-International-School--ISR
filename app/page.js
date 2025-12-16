"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (textRef.current) {
        const scrollY = window.scrollY;
        const maxScroll = 500;
        const fillPercentage = Math.min((scrollY / maxScroll) * 100, 100);

        textRef.current.style.background = `linear-gradient(to right, #FF8C42 0%, #FF8C42 ${fillPercentage}%, #FFFFFF ${fillPercentage}%, #FFFFFF 100%)`;
        textRef.current.style.webkitBackgroundClip = 'text';
        textRef.current.style.webkitTextFillColor = 'transparent';
        textRef.current.style.backgroundClip = 'text';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070')] bg-cover bg-center opacity-30"></div>

        <div className="relative z-10 text-center max-w-5xl px-4 animate-fade-in-up">

          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-2 leading-tight text-white tracking-wide">
            <span id="ishwar-text" ref={textRef} className="relative inline-block transition-all duration-75">ईshwar</span> International School
          </h1>

          <div className="flex items-center justify-center gap-3 text-iis-gold font-bold tracking-[0.2em] uppercase mb-8 text-sm md:text-xl">
            <span>Energy</span>
            <span className="text-xs align-middle">•</span>
            <span>Excellence</span>
            <span className="text-xs align-middle">•</span>
            <span>Evolution</span>
          </div>

          <p className="font-serif text-lg md:text-2xl text-slate-200 mb-4 italic leading-relaxed">
            "न चौर हार्यं न च राज हार्यं । न भ्रात्रभाज्यं न च भारकारी ।<br />
            व्यये कृते वर्धते नित्यं । विद्या धनं सर्व धनं प्रधानम् ।।"
          </p>

          <p className="text-sm md:text-base text-gray-400 mb-10 max-w-3xl mx-auto font-light leading-relaxed border-t border-gray-700 pt-4 mt-4">
            "Education is the best wealth among all. No one can steal it, no state can snatch it. It cannot be divided among brothers and it&apos;s not heavy to carry. As one consumes it, it increases; as one shares, it expands."
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/admissions" className="bg-iis-maroon hover:bg-red-800 text-white px-8 py-4 rounded-sm font-semibold transition-all shadow-lg hover:shadow-red-900/50 uppercase tracking-wider">
              Admissions Open
            </Link>
            <Link href="/contact" className="bg-transparent border border-white hover:bg-white hover:text-iis-maroon text-white px-8 py-4 rounded-sm font-semibold transition-all uppercase tracking-wider">
              Visit Campus
            </Link>
          </div>
        </div>
      </section>

      {/* Parents' Voice Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-iis-maroon mb-2">Parents&apos; Voice</h2>
            <div className="w-24 h-1 bg-iis-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 text-6xl text-iis-gold/10 font-serif">&quot;</div>
              <p className="text-slate-600 text-lg leading-relaxed mb-6 italic relative z-10">&quot;The focus on discipline and values at IIS is what differentiates it from other schools. My daughter has become much more confident.&quot;</p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <div className="w-14 h-14 bg-gradient-to-br from-iis-maroon to-iis-gold rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0">SK</div>
                <div>
                  <h4 className="font-serif font-bold text-slate-800">Mr. Sunil Kumar</h4>
                  <p className="text-sm text-iis-gold font-semibold">Parent of Class V Student</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 text-6xl text-iis-gold/10 font-serif">&quot;</div>
              <p className="text-slate-600 text-lg leading-relaxed mb-6 italic relative z-10">&quot;Excellent faculty and supportive environment. The teachers take personal care of every student&apos;s academic progress.&quot;</p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <div className="w-14 h-14 bg-gradient-to-br from-iis-maroon to-iis-gold rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0">RP</div>
                <div>
                  <h4 className="font-serif font-bold text-slate-800">Mrs. Ritu Phal</h4>
                  <p className="text-sm text-iis-gold font-semibold">Parent of Class X Student</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 left-0 text-6xl text-iis-gold/10 font-serif">&quot;</div>
              <p className="text-slate-600 text-lg leading-relaxed mb-6 italic relative z-10">&quot;I am very happy with the sports facilities. My son won a district medal thanks to the coaching provided at school.&quot;</p>
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <div className="w-14 h-14 bg-gradient-to-br from-iis-maroon to-iis-gold rounded-full flex items-center justify-center font-bold text-white text-lg flex-shrink-0">VS</div>
                <div>
                  <h4 className="font-serif font-bold text-slate-800">Mr. Vikram Singh</h4>
                  <p className="text-sm text-iis-gold font-semibold">Parent of Class VIII Student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-iis-cream">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center"><i className="fa-solid fa-book-open text-3xl text-iis-maroon mb-2"></i><h3 className="font-serif text-3xl font-bold">15+</h3><p className="text-xs text-slate-500 uppercase tracking-wide mt-1">Years of Excellence</p></div>
          <div className="flex flex-col items-center"><i className="fa-solid fa-users text-3xl text-iis-maroon mb-2"></i><h3 className="font-serif text-3xl font-bold">1200+</h3><p className="text-xs text-slate-500 uppercase tracking-wide mt-1">Students</p></div>
          <div className="flex flex-col items-center"><i className="fa-solid fa-chalkboard-user text-3xl text-iis-maroon mb-2"></i><h3 className="font-serif text-3xl font-bold">50+</h3><p className="text-xs text-slate-500 uppercase tracking-wide mt-1">Faculty</p></div>
          <div className="flex flex-col items-center"><i className="fa-solid fa-trophy text-3xl text-iis-maroon mb-2"></i><h3 className="font-serif text-3xl font-bold">100%</h3><p className="text-xs text-slate-500 uppercase tracking-wide mt-1">Results</p></div>
        </div>
      </section>

      {/* Social Media Section */}
      <section id="social-media" className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center">

          <span className="text-iis-gold font-bold tracking-widest uppercase text-sm">Social Community</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-iis-maroon mt-2 mb-8">Connect With Campus Life</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">

            <a href="https://www.youtube.com/@iisgohana6772" target="_blank" className="group bg-slate-50 p-6 rounded-sm border border-gray-200 hover:border-red-600 hover:shadow-lg transition-all">
              <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center text-3xl text-red-600 group-hover:scale-110 transition-transform mb-4">
                <i className="fa-brands fa-youtube"></i>
              </div>
              <h3 className="font-bold text-slate-800 text-lg group-hover:text-red-600">YouTube Channel</h3>
              <p className="text-sm text-slate-500 mt-2">Watch annual functions, sports meets, and student performances.</p>
              <span className="inline-block mt-4 text-xs font-bold uppercase text-red-600 tracking-wider">Subscribe Now &rarr;</span>
            </a>

            <a href="https://www.instagram.com/ishwarinternational_school?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" className="group bg-slate-50 p-6 rounded-sm border border-gray-200 hover:border-pink-600 hover:shadow-lg transition-all">
              <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center text-3xl text-pink-600 group-hover:scale-110 transition-transform mb-4">
                <i className="fa-brands fa-instagram"></i>
              </div>
              <h3 className="font-bold text-slate-800 text-lg group-hover:text-pink-600">Instagram</h3>
              <p className="text-sm text-slate-500 mt-2">Daily updates, classroom activities, and behind-the-scenes stories.</p>
              <span className="inline-block mt-4 text-xs font-bold uppercase text-pink-600 tracking-wider">Follow Us &rarr;</span>
            </a>

            <a href="https://www.facebook.com/IISGohana/" target="_blank" className="group bg-slate-50 p-6 rounded-sm border border-gray-200 hover:border-blue-700 hover:shadow-lg transition-all">
              <div className="w-16 h-16 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center text-3xl text-blue-700 group-hover:scale-110 transition-transform mb-4">
                <i className="fa-brands fa-facebook-f"></i>
              </div>
              <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-700">Facebook Page</h3>
              <p className="text-sm text-slate-500 mt-2">Official announcements, event galleries, and parent community.</p>
              <span className="inline-block mt-4 text-xs font-bold uppercase text-blue-700 tracking-wider">Like Page &rarr;</span>
            </a>

          </div>
        </div>
      </section>
    </>
  );
}
