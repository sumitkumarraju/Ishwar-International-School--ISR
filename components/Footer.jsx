import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-iis-navy text-white pt-16 pb-24 md:pb-8">
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8 mb-8">
                <div className="col-span-1 md:col-span-1">
                    <h2 className="font-serif text-xl font-bold text-iis-gold mb-4">
                        ईshwar<br />International School
                    </h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        Near By-Pass, Sonipat Road (NH-352A),<br />Gohana, Haryana
                    </p>
                </div>
                <div>
                    <h3 className="font-bold mb-4 text-iis-cream">Quick Links</h3>
                    <ul className="space-y-2 text-sm text-slate-400">
                        <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/admissions" className="hover:text-white transition-colors">Admissions</Link></li>
                        <li><Link href="/academics" className="hover:text-white transition-colors">Curriculum</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-4 text-iis-cream">Connect</h3>
                    <p className="text-sm text-slate-400 mb-2">9996390013</p>
                    <p className="text-sm text-slate-400">admin@iisgohana.com</p>
                </div>
            </div>
            <div className="border-t border-slate-700 pt-8 text-center text-xs text-slate-500">
                &copy; 2025 ईshwar International School. All Rights Reserved.
            </div>
        </footer>
    );
}
