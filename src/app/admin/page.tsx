"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginAction, checkSessionAction } from "./actions";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [checkingSession, setCheckingSession] = useState(true);

    // Check if already logged in
    useEffect(() => {
        checkSessionAction().then(hasSession => {
            if (hasSession) {
                router.replace("/admin/dashboard");
            } else {
                setCheckingSession(false);
            }
        });
    }, [router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        const res = await loginAction(email, password);

        if (res.error) {
            setError(res.error);
            setLoading(false);
        } else {
            router.replace("/admin/dashboard");
        }
    };

    if (checkingSession) {
        return (
            <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center">
                <div className="w-5 h-5 border border-white/30 border-t-white animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background grain */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-noise-texture" />

            {/* Decorative lines */}
            <div className="absolute top-[25%] left-0 right-0 h-[1px] bg-white/[0.03]" />
            <div className="absolute top-[75%] left-0 right-0 h-[1px] bg-white/[0.03]" />
            <div className="absolute left-[25%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />
            <div className="absolute left-[75%] top-0 bottom-0 w-[1px] bg-white/[0.03]" />

            <div className="relative z-10 w-full max-w-md">
                {/* Top label */}
                <div className="text-center mb-12">
                    <span className="font-sans text-[9px] tracking-[0.5em] uppercase text-white/20 block mb-6">
                        Admin Panel
                    </span>
                    <h1 className="font-display text-4xl md:text-5xl text-white uppercase tracking-tight leading-[0.9]">
                        Wedding
                        <br />
                        <span className="italic font-light text-white/50 lowercase tracking-normal">
                            Drishya
                        </span>
                    </h1>
                </div>

                {/* Login form */}
                <form onSubmit={handleLogin} className="flex flex-col gap-6">
                    {/* Email */}
                    <div className="flex flex-col gap-2">
                        <label className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/30">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-transparent border-b border-white/15 text-white text-sm py-3 outline-none
                         placeholder:text-white/15 focus:border-white/40 transition-colors font-sans tracking-wide"
                            placeholder="admin@weddingdrishya.com"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <label className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/30">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="bg-transparent border-b border-white/15 text-white text-sm py-3 outline-none
                         placeholder:text-white/15 focus:border-white/40 transition-colors font-sans tracking-wide"
                            placeholder="••••••••"
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <p className="font-sans text-xs text-red-400 tracking-wide">
                            {error}
                        </p>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-4 bg-white text-[#0d0d0d] font-sans text-[10px] uppercase tracking-[0.3em] py-4 px-8
                       hover:bg-white/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                    >
                        {loading ? "Authenticating..." : "Sign In"}
                    </button>
                </form>

                {/* Bottom */}
                <p className="text-center mt-10 font-sans text-[9px] uppercase tracking-[0.3em] text-white/15">
                    © 2026 Wedding Drishya · Secure Access
                </p>
            </div>
        </div>
    );
}
