import React from 'react';

export default function ActivitiesPage() {
    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            <div className="bg-iis-navy text-white py-16 text-center">
                <h1 className="font-serif text-4xl font-bold">Holistic Activities</h1>
                <p className="text-slate-300 mt-2">Beyond the classroom.</p>
            </div>

            <section id="co-curricular" className="py-20 bg-iis-cream">
                <div className="max-w-7xl mx-auto px-4">

                    <div className="text-center mb-16">
                        <span className="text-iis-gold font-bold tracking-widest uppercase text-sm">Beyond The Classroom</span>
                        <h2 className="font-serif text-4xl lg:text-5xl font-bold text-iis-maroon mt-2 mb-6">Holistic Development</h2>
                        <div className="w-24 h-1 bg-iis-navy mx-auto mb-6"></div>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                            At Ishwar International School, we believe that education extends far beyond textbooks. Our vibrant co-curricular program ensures every student discovers their unique potential.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        <div className="group relative h-80 overflow-hidden rounded-sm shadow-lg cursor-pointer">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=2072')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-iis-maroon/90 via-iis-maroon/60 to-transparent opacity-90 transition-opacity duration-300"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="w-12 h-12 bg-iis-gold rounded-full flex items-center justify-center text-white mb-4 text-xl">
                                    <i className="fa-solid fa-hand-fist"></i>
                                </div>
                                <h3 className="font-serif text-2xl font-bold text-white mb-2">Taekwondo & Defense</h3>
                                <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    Training students in self-defense, discipline, and physical agility. Our Taekwondo program builds confidence and mental fortitude.
                                </p>
                            </div>
                        </div>

                        <div className="group relative h-80 overflow-hidden rounded-sm shadow-lg cursor-pointer">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514525253440-b393452e3726?q=80&w=1974')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-iis-navy/90 via-iis-navy/60 to-transparent opacity-90"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="w-12 h-12 bg-iis-gold rounded-full flex items-center justify-center text-white mb-4 text-xl">
                                    <i className="fa-solid fa-masks-theater"></i>
                                </div>
                                <h3 className="font-serif text-2xl font-bold text-white mb-2">Annual Functions</h3>
                                <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    A grand celebration of talent. From dance dramas to musical symphonies, our students take the stage to showcase their cultural prowess.
                                </p>
                            </div>
                        </div>

                        <div className="group relative h-80 overflow-hidden rounded-sm shadow-lg cursor-pointer">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2067')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-iis-maroon/90 via-iis-maroon/60 to-transparent opacity-90"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="w-12 h-12 bg-iis-gold rounded-full flex items-center justify-center text-white mb-4 text-xl">
                                    <i className="fa-solid fa-volleyball"></i>
                                </div>
                                <h3 className="font-serif text-2xl font-bold text-white mb-2">Sports Academy</h3>
                                <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    Cricket, Volleyball, Kho-Kho, and Athletics. We foster team spirit and physical health through regular coaching and district tournaments.
                                </p>
                            </div>
                        </div>

                        <div className="group relative h-80 overflow-hidden rounded-sm shadow-lg cursor-pointer">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511192336575-5a79af67a629?q=80&w=2064')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-iis-navy/90 via-iis-navy/60 to-transparent opacity-90"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="w-12 h-12 bg-iis-gold rounded-full flex items-center justify-center text-white mb-4 text-xl">
                                    <i className="fa-solid fa-music"></i>
                                </div>
                                <h3 className="font-serif text-2xl font-bold text-white mb-2">Music & Dance</h3>
                                <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    Classical and contemporary training. Students learn vocal music, instruments, and traditional Indian dance forms.
                                </p>
                            </div>
                        </div>

                        <div className="group relative h-80 overflow-hidden rounded-sm shadow-lg cursor-pointer">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-iis-maroon/90 via-iis-maroon/60 to-transparent opacity-90"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="w-12 h-12 bg-iis-gold rounded-full flex items-center justify-center text-white mb-4 text-xl">
                                    <i className="fa-solid fa-microphone-lines"></i>
                                </div>
                                <h3 className="font-serif text-2xl font-bold text-white mb-2">Debate & Oratory</h3>
                                <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    Nurturing future leaders through English and Hindi debates, declamations, and public speaking workshops.
                                </p>
                            </div>
                        </div>

                        <div className="group relative h-80 overflow-hidden rounded-sm shadow-lg cursor-pointer">
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=2070')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-iis-navy/90 via-iis-navy/60 to-transparent opacity-90"></div>

                            <div className="absolute bottom-0 left-0 p-8 w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div className="w-12 h-12 bg-iis-gold rounded-full flex items-center justify-center text-white mb-4 text-xl">
                                    <i className="fa-solid fa-flask"></i>
                                </div>
                                <h3 className="font-serif text-2xl font-bold text-white mb-2">Clubs & Societies</h3>
                                <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                    From the Eco Club to the Science Society, students engage in practical projects that solve real-world problems.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
