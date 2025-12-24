"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import FacultyCard from "@/components/FacultyCard";

export default function AboutPage() {
    const [activeTab, setActiveTab] = useState('principal');
    const [staff, setStaff] = useState([]);
    const [principal, setPrincipal] = useState(null);
    const [director, setDirector] = useState(null);

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        const { data } = await supabase
            .from('staff')
            .select('*')
            .eq('active', true)
            .order('display_order', { ascending: true });

        if (data) {
            setStaff(data);
            const principalData = data.find(s => s.designation?.toLowerCase().includes('principal') && !s.designation?.toLowerCase().includes('vice'));
            const directorData = data.find(s => s.designation?.toLowerCase().includes('director'));
            setPrincipal(principalData);
            setDirector(directorData);
        }
    };

    // Use database data if available, otherwise fall back to hardcoded
    const principalData = principal || { name: 'Mrs. Usha Kaushik', designation: 'Principal', image_url: '/teacher/principla.jpg' };
    const directorData = director || { name: 'Mrs. Mukesh Malik', designation: 'Director', image_url: '/teacher/DIRECTOR WOMEN.jpeg' };

    return (
        <div className="bg-white">
            {/* Page Header */}
            <div className="bg-iis-navy text-white py-16 text-center">
                <h1 className="font-serif text-4xl font-bold">About Us</h1>
                <p className="text-slate-200 mt-2">Discover our legacy, mission, and leadership.</p>
            </div>

            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-iis-gold font-bold tracking-widest uppercase text-sm">Welcome to the</span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-iis-maroon mt-2 mb-6">ईshwar International School</h2>
                        <div className="w-24 h-1 bg-iis-navy mx-auto mb-8"></div>
                    </div>

                    <div className="max-w-4xl mx-auto text-lg text-slate-700 leading-relaxed text-justify font-light">
                        <p className="mb-6 first-letter:text-5xl first-letter:font-serif first-letter:text-iis-maroon first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]">
                            Ishwar International School, <strong>Affiliated to C.B.S.E</strong>, is a community of learners including students, parents & staff dedicated to creating an academically rigorous, culturally caring & inclusive learning environment. Achievers are goal-oriented, critical thinkers & community leaders who are dedicated to achieving the highest level of integrity & academic success.
                        </p>
                        <p className="mb-6">
                            Learning in our school is not linear; instead, the students are immersed in a <strong>multidimensional & experimental system of learning</strong>. They are encouraged towards value-led pursuits so that they can comprehend their role in the larger context of the community.
                        </p>
                        <p>
                            We emphasize all-round development committed to the growth & development of each student. Our mission is to include self-discipline in students and make them empathetic towards their fellow mates & surroundings.
                        </p>
                    </div>
                </div>
            </section>

            <section id="mission" className="py-20 bg-iis-cream">
                <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

                    <div>
                        <h2 className="font-serif text-3xl font-bold text-iis-maroon mb-6">Our Mission</h2>
                        <div className="space-y-4 text-slate-700 leading-relaxed text-justify">
                            <p>
                                ईshwar International School is envisioned to be a <strong>centre for Academic Excellence</strong> where children receive progressive and contemporary education.
                            </p>
                            <p>
                                The importance of a good education system in the process of nation-building is well known. The <strong>Jai Hanuman Education Society</strong> has embarked on a journey to revolutionize education in India, by becoming educational change agents to learners across all educational segments — be it Pre-school, K12 School, or technological education.
                            </p>
                            <p>
                                It promises to build a uniting culture, provide rich education, develop support educational solutions, and develop a strong sense of community through each of its multifaceted institutions by nurturing sensitivity towards the <strong>Society, Economy & Environment</strong>.
                            </p>
                            <p>
                                At Ishwar International School, we recognize that every child is unique and is capable of reaching greater heights of academic excellence with the right kind of support and approach. We aim to instill in our students a liberal attitude, a strong belief in ethics, and respect for all life through <strong>Parent-School Partnerships</strong> and Community Integration Programmes.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="bg-white p-8 border-l-4 border-iis-gold shadow-sm">
                            <h3 className="font-serif text-xl font-bold text-iis-navy mb-2">Global Citizens</h3>
                            <p className="text-sm text-slate-600">It is our endeavour to develop responsible young &apos;global citizens&apos; who are future-ready.</p>
                        </div>
                        <div className="bg-white p-8 border-l-4 border-iis-maroon shadow-sm">
                            <h3 className="font-serif text-xl font-bold text-iis-navy mb-2">Unique Approach</h3>
                            <p className="text-sm text-slate-600">We believe that children learn best when learning is made fun and meaningful.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-gradient-to-br from-white to-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Tab Navigation */}
                    <div className="flex justify-center mb-12 gap-4">
                        <button
                            onClick={() => setActiveTab('principal')}
                            className={`px-8 py-3 font-bold text-lg border-b-4 transition-all duration-300 rounded-t-lg flex items-center ${activeTab === 'principal'
                                ? 'border-iis-maroon text-iis-maroon bg-white shadow-md'
                                : 'border-transparent text-slate-500 bg-slate-100 hover:border-iis-gold'
                                }`}
                        >
                            <i className="fa-solid fa-user-tie mr-2"></i>Principal
                        </button>
                        <button
                            onClick={() => setActiveTab('director')}
                            className={`px-8 py-3 font-bold text-lg border-b-4 transition-all duration-300 rounded-t-lg flex items-center ${activeTab === 'director'
                                ? 'border-iis-maroon text-iis-maroon bg-white shadow-md'
                                : 'border-transparent text-slate-500 bg-slate-100 hover:border-iis-gold'
                                }`}
                        >
                            <i className="fa-solid fa-user-tie mr-2"></i>Director
                        </button>
                    </div>

                    {/* Principal's Message */}
                    {activeTab === 'principal' && (
                        <div className="message-container animate-fade-in-up">
                            <div className="flex flex-col md:flex-row gap-12 items-start">
                                <div className="w-full md:w-1/3 flex flex-col items-center sticky top-20">
                                    <div className="w-full max-w-sm">
                                        <FacultyCard
                                            name={principalData.name}
                                            role={principalData.designation}
                                            image={principalData.image_url}
                                            imageClassName="aspect-[3/4] object-cover h-auto"
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-2/3">
                                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-iis-navy mb-6">Principal&apos;s Message</h2>

                                    <blockquote className="bg-slate-100 border-l-4 border-iis-gold p-6 mb-8 italic text-slate-700 font-serif text-lg">
                                        &quot;The aim of education is the knowledge not of facts, but of values.&quot;
                                        <footer className="text-sm text-iis-maroon font-bold not-italic mt-2">— William S. Burroughs</footer>
                                    </blockquote>

                                    <div className="space-y-4 text-slate-600 leading-relaxed text-justify">
                                        <p>
                                            As the Principal of IIS, my primary focus is student learning. All students must be prepared to face the challenges ahead & be successful. Students must know how to think, to innovate, and to collaborate. There is no longer a single pathway to that end, but whatever pathway our students choose must be stepped with effort, dedication, relevance, and relationship.
                                        </p>
                                        <p>
                                            Our commitment is to provide a safe & intellectually challenging environment that will empower the students to become self-sufficient to thrive in the <strong>21st century</strong>. High standards & expectations for each student in regard to academic performance, co-curricular participation, and responsible citizenship are the foundation of our school.
                                        </p>
                                        <p>
                                            We do not believe in imparting knowledge merely as information but insist on <strong>value-based education</strong> which the world needs today. With a fine blending of Indian tradition & modernity with impetus on sound character building, we aim to help students become men & women in a changing society.
                                        </p>
                                        <p>
                                            It is wonderful that the students get lots of exposure to learn, perform & find recognition for their talent & hard work on one hand, & develop the quality of multitasking, tolerance, and cooperation on the other.
                                        </p>
                                        <p className="font-serif font-bold text-iis-maroon text-lg mt-4">
                                            &quot;May the fountain head of creativity grow stronger amongst children under the able guidance of the dedicated teachers.&quot;
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Director's Message */}
                    {activeTab === 'director' && (
                        <div className="message-container animate-fade-in-up">
                            <div className="flex flex-col md:flex-row gap-12 items-start">
                                <div className="w-full md:w-1/3 flex flex-col items-center sticky top-20">
                                    <div className="w-full max-w-sm">
                                        <FacultyCard
                                            name={directorData.name}
                                            role={directorData.designation}
                                            image={directorData.image_url}
                                            imageClassName="aspect-[3/4] object-cover h-auto"
                                        />
                                    </div>
                                </div>

                                <div className="w-full md:w-2/3">
                                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-iis-navy mb-6">Director&apos;s Message</h2>

                                    <div className="space-y-4 text-slate-600 leading-relaxed text-justify">
                                        <p>
                                            Education is a commitment to excellence in teaching & learning. No good life is possible without education. It endorses the intelligence of human beings, develops his skills and enables him to be industrious. Life poses innumerable challenges & our goal in IIS is to help one to successfully brave through the rough seas of struggle, strife & hurdles. Here, a student is made to blossom intellectually, morally & spiritually. We offer our students a stress free learning environment which encourages creativity & critical thinking.
                                        </p>
                                        <p>
                                            At IIS we believe that true education is a right blend of intelligence & character, we educate our students to maximize innate behaviour along with positive social behavior, thus developing them as global citizens. I strongly believe that a school is not just about bricks, mortar & concrete but about building character, enriching mind & enriching experiences that last a lifetime. My mission is to create a niche where learning well not be just series of instructions but a passion, that goes beyond books, beyond instructions & beyond learning horizon.
                                        </p>
                                        <p>
                                            Given that our students come from a very wide range of backgrounds & abilities; each one of them has something within them that is a very special. It is this focus on trying to uncover that special talent & using it to build confidence & self-esteem that makes IIS much more than a school, but rather a family of Ishwarians.
                                        </p>
                                        <p className="font-serif italic text-iis-maroon text-lg font-semibold">
                                            It is pleasure to welcome you all to the school again where you & your child will have the opportunity to discover your child&apos;s extraordinary potential in a supportive academic environment.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Dedicated Faculty Section */}
            <section className="py-20 bg-iis-cream">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-iis-gold font-bold tracking-widest uppercase text-sm">Mentors & Guides</span>
                        <h2 className="font-serif text-4xl md:text-5xl font-bold text-iis-maroon mt-2 mb-6">Meet Our Dedicated Faculty</h2>
                        <div className="w-24 h-1 bg-iis-navy mx-auto mb-8"></div>
                        <p className="max-w-2xl mx-auto text-slate-600">
                            Our teachers are more than just educators; they are mentors who guide, inspire, and nurture every student to achieve their best.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {staff
                            .filter(s => !s.designation?.toLowerCase().includes('principal') && !s.designation?.toLowerCase().includes('director'))
                            .map((teacher, idx) => (
                                <FacultyCard
                                    key={teacher.id || idx}
                                    name={teacher.name}
                                    role={teacher.designation || "Faculty Member"}
                                    image={teacher.image_url || "/teacher/teacher-placeholder.jpg"}
                                    imageClassName="aspect-[3/4] object-cover h-64 w-full"
                                />
                            ))}
                        {staff.filter(s => !s.designation?.toLowerCase().includes('principal') && !s.designation?.toLowerCase().includes('director')).length === 0 && (
                            <p className="col-span-full text-center text-slate-500 italic">Faculty list is being updated...</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
