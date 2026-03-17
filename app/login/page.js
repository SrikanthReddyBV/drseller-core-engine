"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Smartphone, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        // 1. Whitelist Check: Ensure they belong to the Purchasing Team 
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .eq('phone_number', phone)
            .single();

        if (error || !data || !data.is_active) {
            setMessage({ type: 'error', text: 'Access Denied. Contact Admin.' });
            setLoading(false);
            return;
        }

        // 2. Trigger Supabase OTP
        const { error: authError } = await supabase.auth.signInWithOtp({
            phone: phone,
        });

        if (authError) {
            setMessage({ type: 'error', text: 'Error sending OTP. Try again.' });
        } else {
            setMessage({ type: 'success', text: `OTP sent to ${phone}` });
            // Logic to show OTP input field goes here
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 text-slate-100">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl"
            >
                {/* Branding */}
                <div className="text-center mb-10">
                    <div className="inline-flex p-3 rounded-2xl bg-blue-500/10 mb-4">
                        <ShieldCheck className="text-blue-500 w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">DrSeller Hub</h1>
                    <p className="text-slate-400 mt-2 text-sm uppercase tracking-widest">
                        Kerala Expansion Program [cite: 3]
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-500 uppercase ml-1">
                            Registered Mobile
                        </label>
                        <div className="relative">
                            <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5" />
                            <input
                                type="tel"
                                required
                                placeholder="Enter 10-digit mobile"
                                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Get OTP <ArrowRight size={18} /></>}
                    </button>
                </form>

                {/* Notifications */}
                <AnimatePresence>
                    {message.text && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-6 p-4 rounded-2xl text-sm text-center ${message.type === 'error' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'
                                }`}
                        >
                            {message.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-10 text-center opacity-30 text-[10px] uppercase tracking-tighter space-y-1">
                    <p>© 2026 DrSeller Tech • All Rights Reserved</p>
                    <p>Legal Jurisdiction: Bangalore Courts</p>
                </div>
            </motion.div>
        </div>
    );
}