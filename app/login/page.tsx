"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    console.log("Login attempted with:", { email, password });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-b from-[#0a1810] via-[#0d1f18] to-[#0a1810] text-white font-(family-name:--font-work-sans)">
      {/* Background Layer - Snowflakes */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Animated Snowflakes */}
        <div className="snowflake" style={{left: '10%', animationDuration: '10s', animationDelay: '0s'}}>❄</div>
        <div className="snowflake" style={{left: '20%', animationDuration: '12s', animationDelay: '2s', fontSize: '1.5em'}}>❄</div>
        <div className="snowflake" style={{left: '30%', animationDuration: '15s', animationDelay: '4s'}}>❄</div>
        <div className="snowflake" style={{left: '40%', animationDuration: '11s', animationDelay: '1s', fontSize: '1.2em'}}>❄</div>
        <div className="snowflake" style={{left: '50%', animationDuration: '13s', animationDelay: '3s'}}>❄</div>
        <div className="snowflake" style={{left: '60%', animationDuration: '14s', animationDelay: '5s', fontSize: '1.3em'}}>❄</div>
        <div className="snowflake" style={{left: '70%', animationDuration: '12s', animationDelay: '2.5s'}}>❄</div>
        <div className="snowflake" style={{left: '80%', animationDuration: '11s', animationDelay: '1.5s', fontSize: '1.4em'}}>❄</div>
        <div className="snowflake" style={{left: '90%', animationDuration: '13s', animationDelay: '4.5s'}}>❄</div>

        {/* Floating Decorations */}
        <div className="absolute left-[5%] top-[15%] text-4xl opacity-20 float-decoration" style={{animationDelay: '0s'}}>🎁</div>
        <div className="absolute right-[8%] top-[25%] text-3xl opacity-20 float-decoration" style={{animationDelay: '1s'}}>🎄</div>
        <div className="absolute left-[8%] top-[60%] text-3xl opacity-20 float-decoration" style={{animationDelay: '2s'}}>🎅</div>
        <div className="absolute right-[5%] top-[70%] text-4xl opacity-20 float-decoration" style={{animationDelay: '1.5s'}}>🎁</div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
        {/* Header */}
        <header className="container relative z-10 mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <Link href="/" className="text-2xl sm:text-3xl font-bold hover:opacity-80 transition-opacity">
              <span className="select-none">🎄</span> YILDIZLI AĞAÇ
            </Link>
          </div>
        </header>

        {/* Login Form */}
        <main className="container relative z-10 mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="w-full max-w-md">
              <div className="rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-8 backdrop-blur-sm">
                <div className="mb-8 text-center">
                  <div className="mb-4 text-5xl select-none">🎄</div>
                  <h1 className="mb-2 text-3xl font-bold">Giriş Yap</h1>
                  <p className="text-gray-400">YTÜ mail adresinle giriş yap</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#d4c494]">
                      E-posta Adresi
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ogrenci@std.yildiz.edu.tr"
                      className="w-full rounded-lg border border-[#4a6b5a]/50 bg-[#0a1810]/50 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-[#4a6b5a] focus:outline-none focus:ring-2 focus:ring-[#4a6b5a]/20"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#d4c494]">
                      Şifre
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-lg border border-[#4a6b5a]/50 bg-[#0a1810]/50 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-[#4a6b5a] focus:outline-none focus:ring-2 focus:ring-[#4a6b5a]/20"
                      required
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 rounded border-[#4a6b5a]/50 bg-[#0a1810]/50 text-[#4a6b5a] focus:ring-2 focus:ring-[#4a6b5a]/20"
                      />
                      <span className="text-gray-400">Beni hatırla</span>
                    </label>
                    <a href="#" className="text-[#d4c494] hover:text-[#e4d4a4] transition-colors">
                      Şifremi unuttum
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-linear-to-r from-[#4a6b5a] to-[#5a7b6a] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                  >
                    Giriş Yap
                  </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                  Hesabın yok mu?{" "}
                  <Link href="/signup" className="text-[#d4c494] hover:text-[#e4d4a4] transition-colors font-semibold">
                    Kayıt Ol
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="container relative z-10 mx-auto px-4 py-8 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
          <p>Yıldız Teknik Üniversitesi Öğrenci Topluluğu • 2026</p>
        </footer>
      </div>
    </div>
  );
}

