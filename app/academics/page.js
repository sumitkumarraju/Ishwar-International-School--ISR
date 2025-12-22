import React from 'react';
import FacultyCard from '@/components/FacultyCard';

export const metadata = {
    title: 'Academics',
    description: 'Explore our CBSE curriculum, holistic education approach, and state-of-the-art laboratories designed for experiential learning.',
};

export default function AcademicsPage() {
    // Verified images from public folder
    const facultyMembers = [
        { name: "Ms. Suman", role: "TGT Maths", image: "/teacher/SUMAN.jpg" },
        { name: "Ms. Manjot", role: "PRT Hindi", image: "/teacher/MANJOT.jpg" },
        { name: "Ms. Meena", role: "PGT Hindi", image: "/teacher/MEENA.jpg" },
        { name: "Ms. Priti", role: "Mother Teacher", image: "/teacher/PRITI.jpg" },
        { name: "Mr. Ravinder Sharma", role: "TGT Sanskrit", image: "/teacher/RAVINDER.jpg" },
        { name: "Mr. Shyam", role: "Music Teacher", image: "/teacher/SHYAM.jpg" },
        { name: "Ms. Kamlesh", role: "PRT Hindi", image: "/teacher/KAMLESH.jpg" },
        { name: "Ms. Bhawna", role: "PGT IP", image: "/teacher/BHWANA.jpeg" },
        { name: "Ms. Bharati Grover", role: "PGT Commerce", image: "/teacher/BHARATI.jpeg" },
        { name: "Ms. Mamta", role: "Teacher", image: "/teacher/MAMTA.jpeg" },
        { name: "Ms. Jyoti", role: "Teacher", image: "/teacher/JYOTI.jpeg" },
        { name: "Ms. Nidhi", role: "Teacher", image: "/teacher/NIGHI.jpeg" },
        { name: "Ms. Priyanka", role: "Teacher", image: "/teacher/PRIYUANKA.jpeg" },
        { name: "Ms. Manju", role: "Teacher", image: "/teacher/MANJU.jpeg" },
        { name: "Ms. Deepika", role: "Teacher", image: "/teacher/DEEIPKA.jpeg" },
        { name: "Ms. Nisita", role: "Teacher", image: "/teacher/NISITA.jpeg" },
        { name: "Mr. Lalit", role: "Teacher", image: "/teacher/LALIT.jpg" },
        { name: "Mr. Rohit", role: "Teacher", image: "/teacher/ROHIT.jpeg" },
    ];

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Hero Header */}
            <div className="bg-iis-navy text-white py-20 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/building.png')] bg-cover bg-center opacity-20"></div>
                <div className="relative z-10 animate-fade-in-up">
                    <h1 className="font-serif text-5xl font-bold mb-4">Academics</h1>
                    <p className="text-slate-100 text-lg max-w-2xl mx-auto font-medium tracking-wide">
                        Fostering intellectual curiosity and academic excellence through a blended curriculum of tradition and innovation.
                    </p>
                </div>
            </div>

            {/* Curriculum Section */}
            <section id="curriculum" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-iis-gold font-bold tracking-widest uppercase text-sm">Academic Program</span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-iis-maroon mt-2 mb-6">Our Curriculum</h2>
                        <div className="w-24 h-1 bg-iis-navy mx-auto mb-8"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: "book-open", title: "CBSE Curriculum", desc: "Fully aligned with Central Board of Secondary Education standards for comprehensive development.", color: "iis-maroon" },
                            { icon: "lightbulb", title: "Experiential Learning", desc: "Combining theoretical knowledge with practical application and laboratory work.", color: "iis-navy" },
                            { icon: "globe", title: "Holistic Education", desc: "Focusing on critical thinking, creativity, communication skills, and ethical values.", color: "iis-gold" },
                            { icon: "graduation-cap", title: "Career Prep", desc: "Preparing students for higher education and competitive exams in Classes 11 & 12.", color: "red-700" }
                        ].map((item, idx) => (
                            <div key={idx} className={`bg-slate-50 p-8 rounded-lg border-t-4 border-${item.color} shadow-sm hover:shadow-lg transition-all group`}>
                                <div className={`w-14 h-14 bg-white rounded-full flex items-center justify-center text-2xl mb-6 shadow-sm text-${item.color} group-hover:scale-110 transition-transform`}>
                                    <i className={`fa-solid fa-${item.icon}`}></i>
                                </div>
                                <h3 className={`font-serif text-xl font-bold text-slate-800 mb-3`}>{item.title}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Streams Section */}
            <section className="py-20 bg-iis-cream">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="font-serif text-3xl md:text-4xl font-bold text-iis-maroon mb-6">Academic Streams (XI & XII)</h2>
                            <p className="text-slate-700 leading-relaxed mb-6">
                                Senior Secondary is a crucial stage where students choose their career paths. We offer specialized streams with expert faculty guidance.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
                                    <div className="mt-1 bg-iis-navy/10 p-2 rounded-full text-iis-navy"><i className="fa-solid fa-atom"></i></div>
                                    <div>
                                        <h4 className="font-bold text-iis-navy">Science Stream</h4>
                                        <p className="text-sm text-slate-600">Physics, Chemistry, Biology/Maths, English, Physical Education/IP.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
                                    <div className="mt-1 bg-iis-maroon/10 p-2 rounded-full text-iis-maroon"><i className="fa-solid fa-chart-line"></i></div>
                                    <div>
                                        <h4 className="font-bold text-iis-maroon">Commerce Stream</h4>
                                        <p className="text-sm text-slate-600">Accountancy, Business Studies, Economics, English, Maths/IP.</p>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4 p-4 bg-white rounded-md shadow-sm">
                                    <div className="mt-1 bg-iis-gold/10 p-2 rounded-full text-iis-gold"><i className="fa-solid fa-palette"></i></div>
                                    <div>
                                        <h4 className="font-bold text-yellow-700">Humanities Stream</h4>
                                        <p className="text-sm text-slate-600">History, Political Science, Geography, English, Psychology/Painting.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <span className="text-4xl font-bold text-iis-navy block mb-2">100%</span>
                                <span className="text-sm text-slate-500 uppercase font-bold tracking-wide">Pass Percentage</span>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center">
                                <span className="text-4xl font-bold text-iis-maroon block mb-2">25+</span>
                                <span className="text-sm text-slate-500 uppercase font-bold tracking-wide">Subject Experts</span>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md text-center col-span-2">
                                <span className="text-4xl font-bold text-iis-gold block mb-2">District Toppers</span>
                                <span className="text-sm text-slate-500 uppercase font-bold tracking-wide">Consistent Academic Performance</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Scholarships & Awards */}
            <section id="scholarships-awards" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-serif text-4xl font-bold text-iis-maroon mb-6">Scholarships & Awards</h2>
                        <p className="text-slate-600 text-lg">
                            We recognize and reward excellence. Our scholarship programs motivate students to achieve their highest potential.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="group bg-slate-50 p-8 rounded-lg hover:bg-iis-maroon hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl text-center border border-gray-100">
                            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-3xl mb-6 text-iis-maroon group-hover:text-iis-maroon">
                                <i className="fa-solid fa-trophy"></i>
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-3">The Director Trophy</h3>
                            <p className="text-sm opacity-90 leading-relaxed">Awarded to the best All-Rounder of the year for excellence in academics and co-curriculars.</p>
                        </div>
                        <div className="group bg-slate-50 p-8 rounded-lg hover:bg-iis-navy hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl text-center border border-gray-100">
                            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-3xl mb-6 text-iis-navy group-hover:text-iis-navy">
                                <i className="fa-solid fa-medal"></i>
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-3">The Principal Trophy</h3>
                            <p className="text-sm opacity-90 leading-relaxed">Honoring students who demonstrate outstanding academic performance and discipline.</p>
                        </div>
                        <div className="group bg-slate-50 p-8 rounded-lg hover:bg-iis-gold hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl text-center border border-gray-100">
                            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center text-3xl mb-6 text-yellow-600 group-hover:text-yellow-600">
                                <i className="fa-solid fa-certificate"></i>
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-3">Scholar Badges</h3>
                            <p className="text-sm opacity-90 leading-relaxed">Given to students securing over 90% aggregate in their annual examinations.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Faculty Section */}
            <section id="faculty" className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl font-bold text-iis-maroon mb-4">Meet Our Faculty</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            Highly qualified mentors dedicated to shaping the future leaders of tomorrow.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {facultyMembers.map((faculty, index) => (
                            <div key={index} className="h-[400px]">
                                <FacultyCard
                                    name={faculty.name}
                                    role={faculty.role}
                                    image={faculty.image}
                                    className="h-full"
                                    imageClassName="h-64 object-top"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
}
