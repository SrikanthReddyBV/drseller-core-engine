"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ArrowLeft,
    ShieldCheck,
    Search,
    HelpCircle,
    ChevronDown,
    User,
    LogOut,
    Settings,
    Shield
} from 'lucide-react';

// --- Shared Components ---

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const faqs = [
        { q: "What is the ₹399 Activation Fee?", a: "It covers digital listing, professional documentation, and access to our verified buyer network." },
        { q: "How does the C2C model work?", a: "We connect sellers directly with verified buyers, eliminating showroom margins and middleman costs." },
        { q: "Where are legal disputes settled?", a: "All legal disputes are subject to the exclusive jurisdiction of the courts in Bangalore, Karnataka." }
    ];

    return (
        <section className="py-12 border-t border-slate-100 mt-10">
            <div className="flex items-center gap-2 mb-6 text-slate-400">
                <HelpCircle size={18} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em]">Information & FAQ</h3>
            </div>
            <div className="space-y-2">
                {faqs.map((faq, i) => (
                    <div key={i} className="border border-slate-50 rounded-2xl overflow-hidden">
                        <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors">
                            <span className="text-sm font-bold">{faq.q}</span>
                            <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }}><ChevronDown size={16} /></motion.div>
                        </button>
                        <AnimatePresence>
                            {openIndex === i && (
                                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden bg-slate-50/50">
                                    <p className="p-5 text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </section>
    );
};

// --- Main Portal ---

export default function DrSellerPortal() {
    const [view, setView] = useState('landing');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">

            {/* Navigation */}
            <nav className="p-6 flex justify-between items-center border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
                <span className="font-black text-2xl tracking-tighter cursor-pointer" onClick={() => setView('landing')}>DRSELLER</span>

                {/* <div className="relative">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="h-10 w-10 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-slate-200">
                        JD
                    </button>
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }} className="absolute right-0 mt-4 w-64 bg-white border border-slate-100 rounded-[2rem] shadow-2xl p-2 z-50 overflow-hidden">
                                <div className="p-4 border-b border-slate-50">
                                    <p className="font-black text-sm">John Doe</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Platform Partner</p>
                                </div>
                                <div className="py-2">
                                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl text-sm font-bold"><User size={16} /> Profile</button>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl text-sm font-bold text-blue-600"><Shield size={16} /> Legal Info</button>
                                    <button className="w-full flex items-center justify-center gap-2 py-4 bg-slate-50 hover:bg-red-50 hover:text-red-600 rounded-2xl mt-2 text-xs font-black uppercase tracking-tighter"><LogOut size={14} /> Sign Out</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div> */}
            </nav>

            <main className="p-6 max-w-xl mx-auto">
                <AnimatePresence mode="wait">

                    {/* Landing View */}
                    {view === 'landing' && (
                        <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12 py-10">
                            <div className="space-y-3">
                                <h1 className="text-5xl font-black leading-tight tracking-tighter">The Future of <br /> Used Vehicles.</h1>
                                <p className="text-slate-500 font-medium italic">Direct C2C matching. No margins.</p>
                            </div>

                            <div className="grid gap-4">
                                <button onClick={() => setView('sell')} className="flex items-center justify-between p-8 bg-black text-white rounded-[2.5rem] shadow-2xl shadow-slate-200 group transition-transform active:scale-95">
                                    <div className="text-left"><div className="font-black text-xl text-white">Sell My Vehicle</div><div className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-1">Activate for ₹399</div></div>
                                    <ChevronRight className="group-hover:translate-x-2 transition-transform" />
                                </button>
                                <button onClick={() => setView('buy')} className="flex items-center justify-between p-8 border border-slate-100 rounded-[2.5rem] hover:bg-slate-50 transition-all group active:scale-95">
                                    <div className="text-left"><div className="font-black text-xl">Buy a Vehicle</div><div className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-1">Verified Listings</div></div>
                                    <ChevronRight className="group-hover:translate-x-2 transition-transform text-slate-300" />
                                </button>
                            </div>
                            <FAQSection />
                        </motion.div>
                    )}

                    {/* Sell Form */}
                    {view === 'sell' && (
                        <motion.div key="sell" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-8 py-10">
                            <button onClick={() => setView('landing')} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest"><ArrowLeft size={14} /> Back</button>
                            <h2 className="text-4xl font-black tracking-tight">Activate Listing.</h2>
                            <div className="space-y-4">
                                <input type="text" placeholder="Full Name (as per RC)" className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-black font-bold text-sm" />
                                <input type="tel" placeholder="WhatsApp Number" className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-black font-bold text-sm" />
                                <textarea placeholder="Vehicle Details (Model, Year, KM)" className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-black font-bold text-sm h-32" />
                                <button className="w-full bg-black text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl">Proceed to Payment & Sign</button>
                            </div>
                        </motion.div>
                    )}

                    {/* Buy Form */}
                    {view === 'buy' && (
                        <motion.div key="buy" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-8 py-10">
                            <button onClick={() => setView('landing')} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest"><ArrowLeft size={14} /> Back</button>
                            <h2 className="text-4xl font-black tracking-tight">Find a Vehicle.</h2>
                            <div className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input type="text" placeholder="Search Model or Brand" className="w-full p-5 pl-14 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-black font-bold text-sm" />
                                </div>
                                <div className="grid grid-cols-2 gap-3 font-bold text-[10px] uppercase tracking-widest text-slate-400">
                                    <div className="p-5 border border-slate-50 rounded-2xl text-center">Budget Range</div>
                                    <div className="p-5 border border-slate-50 rounded-2xl text-center">Fuel Type</div>
                                </div>
                                <button className="w-full bg-black text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl">Show Results</button>
                            </div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </main>

            <footer className="mt-20 p-10 border-t border-slate-50 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-200 leading-loose">
                    Secure C2C Platform Partner <br />
                    <span className="text-slate-900">Jurisdiction: Bangalore Courts</span>
                </p>
            </footer>
        </div>
    );
}