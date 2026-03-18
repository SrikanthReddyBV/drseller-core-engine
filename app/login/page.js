"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Smartphone, ShieldCheck, ArrowRight, Loader2, Lock, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('phone'); // phone | otp
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleRequestOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        // 1. Whitelist Check (Security Layer)
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .eq('phone_number', phone)
            .single();

        if (error || !data || !data.is_active) {
            setMessage({ type: 'error', text: 'Access Denied. Unauthorized number.' });
            setLoading(false);
            return;
        }

        // 2. Trigger Supabase OTP
        const { error: authError } = await supabase.auth.signInWithOtp({
            phone: phone,
        });

        if (authError) {
            setMessage({ type: 'error', text: 'Failed to send OTP. Check connectivity.' });
        } else {
            setStep('otp');
            setMessage({ type: 'success', text: `Verification code sent to ${phone}` });
        }
        setLoading(false);
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { data, error } = await supabase.auth.verifyOtp({
            phone,
            token: otp,
            type: 'sms',
        });

        if (error) {
            setMessage({ type: 'error', text: 'Invalid OTP code. Please try again.' });
            setLoading(false);
        } else {
            window.location.href = '/dashboard';
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-black font-sans selection:bg-black selection:text-white">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-sm"
            >
                {/* Branding */}
                <div className="text-center mb-12">
                    <div className="inline-flex p-4 rounded-3xl bg-slate-50 mb-6">
                        <ShieldCheck className="text-black w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase">DrSeller Hub</h1>
                    <p className="text-slate-400 mt-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                        Internal Operations Portal
                    </p>
                </div>

                <AnimatePresence mode="wait">
                    {step === 'phone' ? (
                        <motion.form
                            key="phone-step"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            onSubmit={handleRequestOtp}
                            className="space-y-4"
                        >
                            <div className="space-y-1 px-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    Registered Mobile
                                </label>
                                <div className="relative">
                                    <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                                    <input
                                        type="tel"
                                        required
                                        placeholder="Enter 10-digit number"
                                        className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-14 pr-5 focus:ring-2 focus:ring-black transition-all outline-none font-bold text-sm placeholder:text-slate-300 shadow-sm shadow-slate-100"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all hover:bg-slate-800 active:scale-95 disabled:bg-slate-100"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <>Get OTP <ArrowRight size={16} /></>}
                            </button>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="otp-step"
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            onSubmit={handleVerifyOtp}
                            className="space-y-4"
                        >
                            <button
                                type="button"
                                onClick={() => setStep('phone')}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 hover:text-black transition-colors"
                            >
                                <ArrowLeft size={14} /> Back
                            </button>

                            <div className="space-y-1 px-1">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                    Verification Code
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5" />
                                    <input
                                        type="text"
                                        required
                                        maxLength={6}
                                        placeholder="Enter 6-digit OTP"
                                        className="w-full bg-slate-50 border-none rounded-2xl py-5 pl-14 pr-5 focus:ring-2 focus:ring-black transition-all outline-none font-black tracking-[0.5em] text-center text-lg shadow-sm shadow-slate-100"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                disabled={loading}
                                className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all active:scale-95 disabled:bg-slate-100 shadow-xl shadow-slate-200"
                            >
                                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : "Verify & Enter"}
                            </button>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Status Messages */}
                <AnimatePresence>
                    {message.text && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`mt-8 p-5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center shadow-sm ${message.type === 'error'
                                ? 'bg-red-50 text-red-500 border border-red-100'
                                : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                                }`}
                        >
                            {message.text}
                        </motion.div>
                    )}
                </AnimatePresence>

                <footer className="mt-16 text-center opacity-20 text-[8px] font-black uppercase tracking-[0.3em] space-y-2">
                    <p>© 2026 DrSeller Tech • Bangalore Jurisdiction</p>
                </footer>
            </motion.div>
        </div>
    );
}