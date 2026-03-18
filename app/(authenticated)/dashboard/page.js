"use client";
import { useState } from 'react';
import {
    Trophy,
    TrendingUp,
    UserPlus,
    ChevronRight,
    CheckCircle2,
    BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, Settings, Shield, ChevronDown } from 'lucide-react';

export default function EmployeeDashboard() {
    const [stats] = useState({
        dailyActivations: 12,
        monthlyTotal: 145,
        rank: 4,
        bonusEarned: 15000
    });

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
            {/* Top Navigation */}
            {/* <nav className="p-6 flex justify-between items-center border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
                <span className="font-black text-xl tracking-tighter">DRSELLER <span className="text-slate-400 font-medium">HUB</span></span>
                <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold">
                    JD
                </div>
            </nav> */}

            <NavWithProfile />


            <main className="p-6 max-w-2xl mx-auto space-y-10">

                {/* Welcome Header */}
                <motion.section
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-1"
                >
                    <h1 className="text-3xl font-extrabold tracking-tight">Executive Dashboard.</h1>
                    <p className="text-slate-500 text-sm">Kerala Expansion Program • Phase 1</p>
                </motion.section>

                {/* Primary Performance Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-black text-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200 space-y-6"
                >
                    <div className="flex justify-between items-start">
                        <div className="space-y-1">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Monthly Bonus Goal</p>
                            <h2 className="text-4xl font-black">₹35,000</h2>
                        </div>
                        <TrendingUp className="text-emerald-400" size={28} />
                    </div>

                    <div className="space-y-3">
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '48%' }}
                                className="h-full bg-white"
                            />
                        </div>
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter text-slate-400">
                            <span>145 Activations</span>
                            <span>Goal: 300</span>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Stats Grid */}
                <section className="grid grid-cols-2 gap-4">
                    <motion.div
                        whileHover={{ y: -4 }}
                        className="p-6 border border-slate-100 rounded-[2rem] space-y-2 bg-slate-50/50"
                    >
                        <BarChart3 size={20} />
                        <p className="text-2xl font-black">{stats.dailyActivations}</p>
                        <p className="text-slate-500 text-xs font-medium">Daily Leads</p>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -4 }}
                        className="p-6 border border-slate-100 rounded-[2rem] space-y-2 bg-slate-50/50"
                    >
                        <Trophy size={20} />
                        <p className="text-2xl font-black">#{stats.rank}</p>
                        <p className="text-slate-500 text-xs font-medium">Hub Ranking</p>
                    </motion.div>
                </section>

                {/* Action List */}
                <section className="space-y-4">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 px-2">Next Actions</h3>
                    <div className="space-y-2">
                        {[
                            { label: 'Register New Vehicle', icon: <UserPlus size={18} />, color: 'bg-black text-white' },
                            { label: 'View Leaderboard', icon: <ChevronRight size={18} />, color: 'bg-white border border-slate-100' },
                            { label: 'Platform Guidelines', icon: <CheckCircle2 size={18} />, color: 'bg-white border border-slate-100' }
                        ].map((item, i) => (
                            <motion.button
                                key={i}
                                whileTap={{ scale: 0.98 }}
                                className={`w-full flex items-center justify-between p-5 rounded-2xl font-bold text-sm transition-all ${item.color}`}
                            >
                                <span className="flex items-center gap-3">
                                    {item.icon}
                                    {item.label}
                                </span>
                                <ChevronRight size={16} className="opacity-30" />
                            </motion.button>
                        ))}
                    </div>
                </section>
            </main>

            {/* Zero Liability Power Footer */}
            <footer className="mt-20 p-10 text-center border-t border-slate-50">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 leading-loose">
                    Licensed Infrastructure Provider <br />
                    <span className="text-slate-900">Jurisdiction: Bangalore Courts</span>
                </p>
            </footer>
        </div>
    );
}














export function NavWithProfile() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="p-6 flex justify-between items-center border-b border-slate-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
            <span className="font-black text-xl tracking-tighter">DRSELLER
                {/* <span className="text-slate-400 font-medium">HUB</span> */}
            </span>

            <div className="relative">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-2 group"
                >
                    <div className="h-9 w-9 rounded-full bg-black flex items-center justify-center text-white text-xs font-bold transition-transform group-hover:rotate-12">
                        JD
                    </div>
                </motion.button>

                <AnimatePresence>
                    {isMenuOpen && (
                        <>
                            {/* Overlay to close menu */}
                            <div className="fixed inset-0 z-[-1]" onClick={() => setIsMenuOpen(false)} />

                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 mt-4 w-64 bg-white border border-slate-100 rounded-[2rem] shadow-2xl p-2 z-50 overflow-hidden"
                            >
                                <div className="p-4 border-b border-slate-50">
                                    <p className="font-black text-sm text-slate-900">John Doe</p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Purchasing Executive [cite: 129]</p>
                                </div>

                                <div className="py-2">
                                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors text-sm font-bold">
                                        <User size={16} /> Account Details
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors text-sm font-bold">
                                        <Settings size={16} /> App Settings
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 rounded-xl transition-colors text-sm font-bold text-blue-600">
                                        <Shield size={16} /> Legal & Privacy
                                    </button>
                                </div>

                                <div className="p-2 mt-2">
                                    <button
                                        onClick={() => console.log("Logout triggered")}
                                        className="w-full flex items-center justify-center gap-2 py-4 bg-slate-50 hover:bg-red-50 hover:text-red-600 rounded-2xl transition-all text-xs font-black uppercase tracking-tighter"
                                    >
                                        <LogOut size={14} /> Sign Out
                                    </button>
                                </div>

                                <div className="p-4 bg-slate-50/50 text-center">
                                    <p className="text-[8px] text-slate-400 uppercase font-bold tracking-widest">
                                        Contract Valid until Mar 2027
                                    </p>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}