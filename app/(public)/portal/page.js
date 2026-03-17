"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Car, PenTool, ChevronRight } from 'lucide-react';

export default function PublicPortal() {
    const [view, setView] = useState('landing'); // landing | seller-form | buyer-form

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans">
            {/* Premium Header */}
            <nav className="p-6 flex justify-between items-center border-b border-slate-100">
                <span className="font-black text-2xl tracking-tighter text-blue-600">DRSELLER</span>
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                    <ShieldCheck size={14} /> Verified C2C [cite: 4, 140]
                </div>
            </nav>

            <main className="p-6 max-w-xl mx-auto">
                {view === 'landing' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 py-10">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-extrabold leading-tight">Direct Vehicle Transactions.</h1>
                            <p className="text-slate-500">No showrooms. No middleman margins. Just transparent deals. [cite: 8, 280]</p>
                        </div>

                        <div className="grid gap-4">
                            <button
                                onClick={() => setView('seller-form')}
                                className="flex items-center justify-between p-6 bg-slate-900 text-white rounded-3xl shadow-xl shadow-slate-200 group"
                            >
                                <div className="text-left">
                                    <div className="font-bold text-lg">Sell My Vehicle</div>
                                    <div className="text-slate-400 text-sm">Activate for ₹399 [cite: 301]</div>
                                </div>
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                                onClick={() => setView('buyer-form')}
                                className="flex items-center justify-between p-6 border-2 border-slate-100 rounded-3xl hover:bg-slate-50 transition-colors group"
                            >
                                <div className="text-left">
                                    <div className="font-bold text-lg text-slate-800">Buy a Vehicle</div>
                                    <div className="text-slate-500 text-sm">Book verified listings [cite: 321-322]</div>
                                </div>
                                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {view === 'seller-form' && (
                    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                        <h2 className="text-2xl font-bold">Vehicle Activation [cite: 300]</h2>
                        <div className="space-y-4">
                            <input type="text" placeholder="Full Name (As per RC) [cite: 39, 176]" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-blue-500" />
                            <input type="tel" placeholder="WhatsApp Number" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-blue-500" />
                            <textarea placeholder="Vehicle Details (Model, Year, KM) [cite: 30, 38]" className="w-full p-4 bg-slate-50 rounded-2xl border-none outline-blue-500 h-32" />

                            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                <p className="text-xs text-blue-700 font-medium">Activation Fee: ₹399 (Includes Listing & Support) [cite: 301-306]</p>
                            </div>

                            <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-200">
                                Proceed to Payment & Sign [cite: 32, 55]
                            </button>
                        </div>
                    </motion.div>
                )}
            </main>

            <footer className="mt-20 p-10 bg-slate-50 text-center text-[10px] text-slate-400 uppercase tracking-widest leading-loose">
                Platform Partner: DrSeller Kerala [cite: 3] <br />
                Legal Support: Digital Agreement System [cite: 11, 147] <br />
                <span className="font-bold">Exclusive Jurisdiction: Bangalore Courts</span>
            </footer>
        </div>
    );
}