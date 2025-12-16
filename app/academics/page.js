import React from 'react';
import FacultyCard from '@/components/FacultyCard';

export default function AcademicsPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-iis-navy text-white py-16 text-center">
                <h1 className="font-serif text-4xl font-bold">Academics</h1>
                <p className="text-slate-300 mt-2">Curriculum, Faculty, and Scholarships.</p>
            </div>

            <section id="curriculum" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <span className="text-iis-gold font-bold tracking-widest uppercase text-sm">Academic Program</span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-iis-maroon mt-2 mb-6">Our Curriculum</h2>
                        <div className="w-24 h-1 bg-iis-navy mx-auto mb-8"></div>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-gradient-to-br from-iis-cream to-white p-8 rounded-sm border-l-4 border-iis-gold shadow-sm">
                                <i className="fa-solid fa-book-open text-3xl text-iis-maroon mb-4"></i>
                                <h3 className="font-serif text-2xl font-bold text-iis-maroon mb-3">CBSE Curriculum</h3>
                                <p className="text-slate-600 leading-relaxed">Our curriculum is fully aligned with Central Board of Secondary Education (CBSE) standards, ensuring comprehensive academic development across all subjects and age groups.</p>
                            </div>

                            <div className="bg-gradient-to-br from-iis-cream to-white p-8 rounded-sm border-l-4 border-iis-navy shadow-sm">
                                <i className="fa-solid fa-lightbulb text-3xl text-iis-navy mb-4"></i>
                                <h3 className="font-serif text-2xl font-bold text-iis-navy mb-3">Experiential Learning</h3>
                                <p className="text-slate-600 leading-relaxed">We believe in learning through experience. Our teaching methodology combines theoretical knowledge with practical application, laboratory work, and field activities.</p>
                            </div>

                            <div className="bg-gradient-to-br from-iis-cream to-white p-8 rounded-sm border-l-4 border-iis-maroon shadow-sm">
                                <i className="fa-solid fa-globe text-3xl text-iis-maroon mb-4"></i>
                                <h3 className="font-serif text-2xl font-bold text-iis-maroon mb-3">Holistic Education</h3>
                                <p className="text-slate-600 leading-relaxed">Beyond academics, our curriculum focuses on developing critical thinking, creativity, communication skills, and ethical values in every student.</p>
                            </div>

                            <div className="bg-gradient-to-br from-iis-cream to-white p-8 rounded-sm border-l-4 border-iis-gold shadow-sm">
                                <i className="fa-solid fa-graduation-cap text-3xl text-iis-gold mb-4"></i>
                                <h3 className="font-serif text-2xl font-bold text-iis-maroon mb-3">Career Preparation</h3>
                                <p className="text-slate-600 leading-relaxed">Our curriculum is designed to prepare students for higher education and professional excellence through comprehensive subject specialization in Classes 11 & 12.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div id="scholarships-awards" className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-serif text-4xl font-bold text-iis-maroon mb-6">Scholarships & Awards</h2>
                    <div className="relative p-6 bg-white rounded-sm border-l-4 border-iis-gold shadow-sm">
                        <i className="fa-solid fa-quote-left text-3xl text-iis-maroon/20 absolute top-4 left-4"></i>
                        <p className="text-lg italic text-slate-700 font-serif leading-relaxed">
                            &quot;Being told you’re appreciated is one of the simplest & most uplifting things you can hear. Appreciation makes what is excellent in others belong to us as well.&quot;
                        </p>
                    </div>
                    <p className="mt-6 text-slate-600">
                        At IIS, we believe recognition fuels passion. We acknowledge the tireless efforts of our students in academics, sports, and co-curricular activities through these prestigious awards.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">

                    <div className="group bg-white p-8 rounded-sm hover:shadow-xl transition-all duration-300 border-t-4 border-slate-200 hover:border-iis-maroon">
                        <div className="w-14 h-14 bg-iis-maroon text-white rounded-full flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-trophy"></i>
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-slate-800 mb-3">The Director Trophy</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            The highest recognition bestowed upon a student who excels as a true <strong>All-Rounder</strong>. This award honors exceptional performance across academics, co-curricular activities, and sports fields.
                        </p>
                    </div>

                    <div className="group bg-white p-8 rounded-sm hover:shadow-xl transition-all duration-300 border-t-4 border-slate-200 hover:border-iis-maroon">
                        <div className="w-14 h-14 bg-iis-navy text-white rounded-full flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-medal"></i>
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-slate-800 mb-3">The Principal Trophy</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            An exclusive honor awarded to students with remarkable achievements specifically in <strong>Academics & Co-curricular</strong> fields, demonstrating balance and intellectual curiosity.
                        </p>
                    </div>

                    <div className="group bg-white p-8 rounded-sm hover:shadow-xl transition-all duration-300 border-t-4 border-slate-200 hover:border-iis-maroon">
                        <div className="w-14 h-14 bg-iis-gold text-white rounded-full flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                            <i className="fa-solid fa-certificate"></i>
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-slate-800 mb-3">Scholar Badges</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            Prestigious badges awarded to students who set the <strong>Academic Benchmark</strong> for their peers. This recognizes consistent excellence and dedication to learning.
                        </p>
                    </div>

                </div>
            </div>

            <section id="faculty" className="py-20 bg-iis-cream">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="font-serif text-4xl font-bold text-iis-maroon mb-4">Meet Our Faculty</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto">
                            Our dedicated team of educators who nurture excellence and shape the future of our students.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FacultyCard name="Ms. Suman" role="TGT Maths" image="/SUMAN.jpg" />
                        <FacultyCard name="Ms. Manoj" role="PRT Hindi" image="/MANJOT.jpg" />
                        <FacultyCard name="Ms. Meena" role="PGT Hindi" image="/MEENA.jpg" />
                        <FacultyCard name="Ms. Priti" role="Mother Teacher" image="/PRITI.jpg" />
                        <FacultyCard name="Mr. Ravinder Sharma" role="TGT Sanskrit" image="/RAVINDER.jpg" />
                        <FacultyCard name="Mr. Shyam" role="Music Teacher" image="/SHYAM.jpg" />
                        <FacultyCard name="Ms. Kamlesh" role="PRT Hindi" image="/KAMLESH.jpg" />
                        <FacultyCard name="Ms. Bhawna" role="PGT IP" image="/BHWANA.jpeg" />
                        <FacultyCard name="Bharti Grover" role="PGT Commerce" image="/BHARATI.jpeg" />
                    </div>
                </div>
            </section>

        </div>
    );
}
