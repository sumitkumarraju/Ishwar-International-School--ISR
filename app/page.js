"use client";
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NoticeBoard from '@/components/NoticeBoard';
import AdmissionBanner from '@/components/AdmissionBanner';
import AcademicAchievers from '@/components/AcademicAchievers';
import QuotesSection from '@/components/QuotesSection';
import NoticeCorner from '@/components/NoticeCorner';

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
      <AdmissionBanner />
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/building.png')] bg-cover bg-center opacity-40"></div>

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
            &quot;न चौर हार्यं न च राज हार्यं । न भ्रात्रभाज्यं न च भारकारी ।<br />
            व्यये कृते वर्धते नित्यं । विद्या धनं सर्व धनं प्रधानम् ।।&quot;
          </p>

          <p className="text-sm md:text-base text-slate-200 mb-10 max-w-3xl mx-auto font-light leading-relaxed border-t border-gray-700 pt-4 mt-4">
            &quot;Education is the best wealth among all. No one can steal it, no state can snatch it. It cannot be divided among brothers and it&apos;s not heavy to carry. As one consumes it, it increases; as one shares, it expands.&quot;
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

      <NoticeBoard />

      <AcademicAchievers />

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-iis-gold font-bold tracking-widest uppercase text-sm">Welcome to IIS</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-iis-maroon mb-6">About The School</h2>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                Ishwar International School is a progressive educational institution founded on secular, ethical and democratic values. The school is committed to nurturing the inherent potential of every child and preparing students to meet the challenges of a rapidly changing world.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                We believe that education is a continuous and transformative process. Our approach encourages intellectual growth, self-discipline, physical fitness and moral integrity, enabling students to grow into confident, responsible and compassionate global citizens.
              </p>
              <p className="text-slate-600 leading-relaxed text-lg">
                At Ishwar International School, children from all backgrounds are welcomed into an inclusive environment where learning is free from prejudice, fear and inhibition.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-100 p-6 rounded-lg text-center hover:shadow-lg transition-all">
                <i className="fa-solid fa-graduation-cap text-4xl text-iis-maroon mb-4"></i>
                <h3 className="font-bold text-lg mb-2 text-iis-maroon">Progressive Education</h3>
                <p className="text-sm text-slate-700">Secular, ethical, and democratic values.</p>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg text-center hover:shadow-lg transition-all mt-8">
                <i className="fa-solid fa-child-reaching text-4xl text-iis-maroon mb-4"></i>
                <h3 className="font-bold text-lg mb-2 text-iis-maroon">Inclusive Growth</h3>
                <p className="text-sm text-slate-700">Free from prejudice, fear, and inhibition.</p>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg text-center hover:shadow-lg transition-all">
                <i className="fa-solid fa-earth-americas text-4xl text-iis-maroon mb-4"></i>
                <h3 className="font-bold text-lg mb-2 text-iis-maroon">Global Citizens</h3>
                <p className="text-sm text-slate-700">Confident, responsible, and compassionate.</p>
              </div>
              <div className="bg-slate-100 p-6 rounded-lg text-center hover:shadow-lg transition-all mt-8">
                <i className="fa-solid fa-hands-holding-child text-4xl text-iis-maroon mb-4"></i>
                <h3 className="font-bold text-lg mb-2 text-iis-maroon">Holistic Care</h3>
                <p className="text-sm text-slate-700">Intellectual and physical development.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-iis-cream">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

            {/* Vision */}
            <div className="bg-white p-10 rounded-lg shadow-md border-l-4 border-iis-maroon">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-iis-maroon/10 rounded-full flex items-center justify-center text-iis-maroon text-2xl">
                  <i className="fa-solid fa-eye"></i>
                </div>
                <h2 className="font-serif text-3xl font-bold text-iis-maroon">Vision</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-check text-iis-gold mt-1"></i>
                  <span className="text-slate-700 text-lg">To nurture confident, successful and socially responsible students.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-check text-iis-gold mt-1"></i>
                  <span className="text-slate-700 text-lg">To set new benchmarks in compassionate, respectful and student-centered education.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-check text-iis-gold mt-1"></i>
                  <span className="text-slate-700 text-lg">To improve the quality of life of children through excellence in academics, sports, arts and community engagement.</span>
                </li>
              </ul>
            </div>

            {/* Mission */}
            <div className="bg-white p-10 rounded-lg shadow-md border-l-4 border-iis-gold">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-iis-gold/10 rounded-full flex items-center justify-center text-iis-gold text-2xl">
                  <i className="fa-solid fa-bullseye"></i>
                </div>
                <h2 className="font-serif text-3xl font-bold text-iis-gold">Mission</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-angle-right text-iis-maroon mt-1"></i>
                  <span className="text-slate-700 text-lg">To provide a carefully planned, stimulating and joyful learning environment.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-angle-right text-iis-maroon mt-1"></i>
                  <span className="text-slate-700 text-lg">To foster holistic development through academics, co-curricular and extracurricular activities.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-angle-right text-iis-maroon mt-1"></i>
                  <span className="text-slate-700 text-lg">To celebrate education as a lifelong journey of personal growth.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-angle-right text-iis-maroon mt-1"></i>
                  <span className="text-slate-700 text-lg">To build strong partnerships with parents and the community.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Leadership Messages */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-iis-gold font-bold tracking-widest uppercase text-sm">Leadership</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-iis-maroon mt-2">From The Desk</h2>
          </div>

          <div className="space-y-20">
            {/* Chairman */}
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="w-full md:w-1/3 bg-slate-100 p-6 rounded-lg text-center">
                <div className="w-48 h-48 mx-auto bg-slate-300 rounded-full mb-6 relative overflow-hidden">
                  <Image src="/teacher/DIRRECCTOR.jpeg" alt="Mr. Anil Malik" fill className="object-cover" sizes="(max-width: 768px) 100vw, 200px" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-iis-maroon">Mr. Anil Malik</h3>
                <p className="text-iis-gold font-bold uppercase tracking-wide text-sm">Chairman</p>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-slate-100 pb-2 inline-block">A Message from the Chairman</h3>
                <div className="prose prose-lg text-slate-600">
                  <p className="mb-4">&quot;Ishwar International School stands as a beacon of quality education rooted in strong values. Our philosophy is guided by our motto Energy, Excellence and Evolution, which we integrate into everyday learning.&quot;</p>
                  <p className="mb-4">&quot;We strive to create an atmosphere where students are encouraged to explore their abilities, develop self-discipline and achieve excellence both academically and physically. Every child receives personal attention and care, ensuring that education remains purposeful, meaningful and enjoyable.&quot;</p>
                  <p className="italic font-semibold">&quot;Our goal is not only academic success but also the development of character, confidence and social responsibility.&quot;</p>
                </div>
              </div>
            </div>

            {/* Director */}
            <div className="flex flex-col md:flex-row-reverse gap-10 items-start">
              <div className="w-full md:w-1/3 bg-slate-100 p-6 rounded-lg text-center">
                <div className="w-48 h-56 mx-auto mb-4 overflow-hidden rounded-lg shadow-md relative">
                  <Image src="/teacher/DIRECTOR WOMEN.jpeg" fill className="object-cover" alt="Mrs. Mukesh Malik" sizes="(max-width: 768px) 100vw, 200px" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-iis-maroon">Mrs. Mukesh Malik</h3>
                <p className="text-iis-gold font-bold uppercase tracking-wide text-sm">Director</p>
              </div>
              <div className="w-full md:w-2/3 text-right">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-slate-100 pb-2 inline-block">A Message from the Director</h3>
                <div className="prose prose-lg text-slate-600" style={{ direction: "rtl" }}>
                  {/* RTL for visual styling, but content is English. Actually flex-row-reverse handles the layout, let's keep text left aligned or justified for readability */}
                </div>
                <div className="prose prose-lg text-slate-600 text-left">
                  <p className="mb-4">&quot;Education has a higher purpose — to shape character and help students find their rightful place in society. At Ishwar International School, we aim to be more than just an academic institution; we aspire to be a center of inspiration, growth and transformation.&quot;</p>
                  <p className="mb-4">&quot;We emphasize experiential learning through laboratories, physical training and real-world activities. A balanced teacher-student ratio ensures personalized attention and creative learning experiences.&quot;</p>
                  <p className="italic font-semibold">&quot;We thank parents for placing their trust in us and assure them of a nurturing and enriching educational journey for their children.&quot;</p>
                </div>
              </div>
            </div>

            {/* Principal */}
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="w-full md:w-1/3 bg-slate-100 p-6 rounded-lg text-center">
                <div className="w-48 h-48 mx-auto bg-slate-300 rounded-full mb-6 relative overflow-hidden">
                  <Image src="/teacher/principla.jpg" alt="Mrs. Usha Kaushik" fill className="object-cover" sizes="(max-width: 768px) 100vw, 200px" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-iis-maroon">Mrs. Usha Kaushik</h3>
                <p className="text-iis-gold font-bold uppercase tracking-wide text-sm">Principal</p>
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 border-b-2 border-slate-100 pb-2 inline-block">A Message from the Principal</h3>
                <div className="prose prose-lg text-slate-600">
                  <p className="mb-4">&quot;Every child enters this world with limitless potential. At Ishwar International School, we strive to create a joyful, safe and intellectually stimulating environment where children feel valued and empowered.&quot;</p>
                  <p className="mb-4">&quot;Our curriculum blends academic excellence with value-based education, creativity and innovation. Teachers play a proactive role in guiding students beyond conventional learning through e-classrooms, collaborative activities and critical thinking exercises.&quot;</p>
                  <p className="italic font-semibold">&quot;For us, education is not a destination but a lifelong journey of discovery, exploration and excellence.&quot;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academics Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-iis-gold font-bold tracking-widest uppercase text-sm">Excellence in</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-iis-maroon mt-2">Academics</h2>
            <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">Facilities That Match Global Standards</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-all border-t-4 border-iis-maroon">
              <h3 className="font-serif text-2xl font-bold text-slate-800 mb-4">Education</h3>
              <p className="text-slate-600 leading-relaxed">
                Learning at Ishwar International School is interactive, engaging and student-centric. Assignments are thoughtfully designed to nurture individual talents rather than simply repeat classroom work.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-all border-t-4 border-iis-gold">
              <h3 className="font-serif text-2xl font-bold text-slate-800 mb-4">Classrooms</h3>
              <p className="text-slate-600 leading-relaxed">
                Our technology-enabled classrooms provide an inviting and nurturing environment that stimulates curiosity, creativity and active participation.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-all border-t-4 border-iis-maroon flex flex-col">
              <h3 className="font-serif text-2xl font-bold text-slate-800 mb-4">Library</h3>
              <p className="text-slate-600 leading-relaxed mb-6 flex-grow">
                The fully computerized library operates on an open-access system, housing a wide collection of books, periodicals and five newspapers in two languages. Class libraries further encourage reading habits among students.
              </p>
              <Link href="/library" className="group flex items-center text-iis-maroon font-bold uppercase tracking-wider text-sm hover:text-red-800 transition-colors">
                View Library Gallery <i className="fa-solid fa-arrow-right ml-2 transition-transform group-hover:translate-x-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratories Section */}
      <section className="py-20 bg-iis-maroon text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-2">Laboratories</h2>
            <div className="w-24 h-1 bg-iis-gold"></div>
            <p className="mt-4 text-slate-200 max-w-2xl">Practical learning is at the heart of our curriculum. Our state-of-the-art laboratories provide the perfect ground for experimentation and innovation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all">
              <i className="fa-solid fa-atom text-4xl text-iis-gold mb-4"></i>
              <h3 className="font-bold text-xl mb-3">Physics Lab</h3>
              <p className="text-sm text-white leading-relaxed">
                Exploring the laws of nature through experiments in mechanics, optics, and electricity with modern apparatus.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all">
              <i className="fa-solid fa-flask text-4xl text-iis-gold mb-4"></i>
              <h3 className="font-bold text-xl mb-3">Chemistry Lab</h3>
              <p className="text-sm text-white leading-relaxed">
                A safe environment for chemical analysis and reactions, fostering a deep understanding of matter and composition.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all">
              <i className="fa-solid fa-dna text-4xl text-iis-gold mb-4"></i>
              <h3 className="font-bold text-xl mb-3">Biology Lab</h3>
              <p className="text-sm text-white leading-relaxed">
                Study of life sciences with high-quality microscopes and specimens to understand anatomy and physiology.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all">
              <i className="fa-solid fa-calculator text-4xl text-iis-gold mb-4"></i>
              <h3 className="font-bold text-xl mb-3">Mathematics Lab</h3>
              <p className="text-sm text-white leading-relaxed">
                Promotes logical thinking, problem-solving and conceptual understanding through experiential learning and strong analytical development.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition-all">
              <i className="fa-solid fa-computer text-4xl text-iis-gold mb-4"></i>
              <h3 className="font-bold text-xl mb-3">Computer Lab</h3>
              <p className="text-sm text-white leading-relaxed">
                Air-conditioned lab with high-speed Wi-Fi and 30 modern computers, supporting digital literacy and 21st-century technological competence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creativity & Sports */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
                <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 text-3xl mb-6">
                  <i className="fa-solid fa-palette"></i>
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-800 mb-4">Spirit of Creativity</h3>
                <p className="text-slate-600 text-base leading-relaxed mb-6 flex-grow">
                  Creative expression is an integral part of education. Through music, dance, arts, and crafts, students develop self-expression, teamwork, and confidence.
                </p>
                <Link href="#" className="font-bold text-pink-600 text-sm uppercase tracking-wider group-hover:underline">Explore Arts &rarr;</Link>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-100 to-green-100 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 text-3xl mb-6">
                  <i className="fa-solid fa-shapes"></i>
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-800 mb-4">Kids Play Zone</h3>
                <p className="text-slate-600 text-base leading-relaxed mb-6 flex-grow">
                  A safe and colorful haven for our kindergartners. Designed to stimulate imagination and motor skills through play in a joy-filled environment.
                </p>
                <Link href="/kids-zone" className="font-bold text-yellow-600 text-sm uppercase tracking-wider group-hover:underline">View Gallery &rarr;</Link>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-3xl mb-6">
                  <i className="fa-solid fa-volleyball"></i>
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-800 mb-4">Sports & Fitness</h3>
                <p className="text-slate-600 text-base leading-relaxed mb-6 flex-grow">
                  Global-standard courts and fields. Our trained coaches cultivate discipline, teamwork, and sportsmanship through regular physical training.
                </p>
                <Link href="#" className="font-bold text-orange-600 text-sm uppercase tracking-wider group-hover:underline">Sports Facilities &rarr;</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus & Salient Features */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-iis-gold font-bold tracking-widest uppercase text-sm">Our Infrastructure</span>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Campus Ambience</h2>
              <p className="text-slate-100 leading-relaxed mb-6 text-lg">
                The fully automated campus is spread over 3.5 acres, located approximately 3 km from Gohana on Sonipat Road. The serene, pollution-free environment provides the perfect setting for learning and growth.
              </p>
              <p className="text-slate-100 leading-relaxed mb-8 text-lg">
                The campus promotes holistic development through academics, sports, arts, music and social interaction, shaping students into responsible global citizens.
              </p>
            </div>

            <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
              <h3 className="font-serif text-2xl font-bold text-iis-gold mb-6 border-b border-white/10 pb-4">Salient Features</h3>
              <ul className="space-y-4">
                {[
                  "Fully air-conditioned and automated campus",
                  "Well-equipped, spacious classrooms",
                  "CBSE curriculum",
                  "Advanced science, maths, language and computer labs",
                  "Activity-based learning (Teacher-Student ratio 1:30)",
                  "Dedicated and trained faculty",
                  "Full-time nurse and healthcare support",
                  "Safe transport facilities with security",
                  "Yoga, sports and physical education programs",
                  "Cultural, literary and value-based activities"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <i className="fa-solid fa-circle-check text-iis-gold mt-1 text-sm"></i>
                    <span className="text-white">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-16 bg-gradient-to-r from-iis-maroon to-red-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">Our Philosophy</h2>
          <p className="text-xl md:text-2xl font-serif italic opacity-90 leading-relaxed">
            &quot;We channelize our <span className="text-iis-gold">Energy</span>, strive for <span className="text-iis-gold">Excellence</span>, and continuously evolve through <span className="text-iis-gold">Innovation</span>. Our commitment is to deliver the best educational experience and set benchmarks that make Ishwar International School one of India’s most trusted institutions.&quot;
          </p>
        </div>
      </section>

      {/* Quotes Section */}
      <QuotesSection />

      {/* Notice Corner Widget */}
      <NoticeCorner />

      {/* Stats Section */}
      <section className="py-16 bg-iis-cream">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center"><i className="fa-solid fa-book-open text-3xl text-iis-maroon mb-2"></i><h3 className="font-serif text-3xl font-bold text-iis-maroon">15+</h3><p className="text-xs text-slate-800 font-bold uppercase tracking-wide mt-1">Years of Excellence</p></div>
          <div className="flex flex-col items-center"><i className="fa-solid fa-users text-3xl text-iis-maroon mb-2"></i><h3 className="font-serif text-3xl font-bold text-iis-maroon">1200+</h3><p className="text-xs text-slate-800 font-bold uppercase tracking-wide mt-1">Students</p></div>
          <div className="flex flex-col items-center"><i className="fa-solid fa-chalkboard-user text-3xl text-iis-maroon mb-2"></i><h3 className="font-serif text-3xl font-bold text-iis-maroon">50+</h3><p className="text-xs text-slate-800 font-bold uppercase tracking-wide mt-1">Faculty</p></div>
          <div className="flex flex-col items-center"><i className="fa-solid fa-trophy text-3xl text-iis-maroon mb-2"></i><h3 className="font-serif text-3xl font-bold text-iis-maroon">100%</h3><p className="text-xs text-slate-800 font-bold uppercase tracking-wide mt-1">Results</p></div>
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
