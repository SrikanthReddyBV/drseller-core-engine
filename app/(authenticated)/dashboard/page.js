"use client";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Trophy, Zap, TrendingUp, ShieldCheck } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="min-h-screen bg-slate-950 text-white p-4 pb-24 font-sans">
            {/* Header with Animation */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center mb-8"
            >
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        DrSeller Hub
                    </h1>
                    <p className="text-slate-400 text-sm">Kerala Expansion Program [cite: 3]</p>
                </div>
                <div className="bg-slate-800 p-2 rounded-full">
                    <ShieldCheck className="text-emerald-400 w-6 h-6" />
                </div>
            </motion.div>

            {/* Incentive Progress Card */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-slate-900 border border-slate-800 rounded-3xl p-6 mb-6 shadow-xl"
            >
                <div className="flex justify-between items-start mb-4">
                    <span className="text-slate-400 text-sm">Monthly Bonus Progress</span>
                    <span className="text-emerald-400 font-bold text-lg">₹35,000 [cite: 77, 210]</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "45%" }}
                        className="bg-gradient-to-r from-blue-500 to-emerald-500 h-full"
                    />
                </div>
                <p className="text-xs text-slate-500 mt-3 text-right">135 / 300 Activations [cite: 76, 210]</p>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <Zap className="text-yellow-400 mb-2" />
                    <div className="text-xl font-bold">12</div>
                    <div className="text-xs text-slate-500">Daily Leads [cite: 28]</div>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                    <TrendingUp className="text-blue-400 mb-2" />
                    <div className="text-xl font-bold">₹2,000</div>
                    <div className="text-xs text-slate-500">Deal Bonus [cite: 60, 197]</div>
                </div>
            </div>

            {/* Zero Liability Footer */}
            <footer className="mt-auto pt-10 text-center opacity-30 text-[10px] uppercase tracking-widest">
                <p>Software Licensed to DrSeller • Disputes: Bangalore Courts</p>
                <p>Provider Not Liable for 3rd Party API / External Attacks</p>
            </footer>
        </div>
    );
}