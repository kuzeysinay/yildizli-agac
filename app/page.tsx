"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");
        
        const headers: HeadersInit = {
          "Accept": "application/json",
        };
        
        const res = await fetch("https://api.yildizliagac.com/api/v1/users/getCurrentUser", {
          method: "GET",
          credentials: "include",
          headers,
        });
        if (cancelled) return;
        const data = await res.json().catch(() => null);
        setIsAuth(res.ok && data?.success === true && !!data?.data);
      } catch {
        if (!cancelled) setIsAuth(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
      <div className="snowflake" style={{left: '15%', animationDuration: '16s', animationDelay: '6s'}}>❄</div>
      <div className="snowflake" style={{left: '35%', animationDuration: '10s', animationDelay: '0.5s', fontSize: '1.1em'}}>❄</div>
      <div className="snowflake" style={{left: '55%', animationDuration: '14s', animationDelay: '3.5s'}}>❄</div>
      <div className="snowflake" style={{left: '75%', animationDuration: '12s', animationDelay: '2s', fontSize: '1.3em'}}>❄</div>
      <div className="snowflake" style={{left: '85%', animationDuration: '15s', animationDelay: '5.5s'}}>❄</div>

      {/* Floating Decorations */}
      <div className="absolute left-[5%] top-[15%] text-4xl opacity-20 float-decoration" style={{animationDelay: '0s'}}>🎁</div>
      <div className="absolute right-[8%] top-[25%] text-3xl opacity-20 float-decoration" style={{animationDelay: '1s'}}>🎄</div>
      <div className="absolute left-[8%] top-[60%] text-3xl opacity-20 float-decoration" style={{animationDelay: '2s'}}>🎅</div>
      <div className="absolute right-[5%] top-[70%] text-4xl opacity-20 float-decoration" style={{animationDelay: '1.5s'}}>🎁</div>
      <div className="absolute left-[12%] top-[80%] text-3xl opacity-15 float-decoration" style={{animationDelay: '0.5s'}}>⭐</div>
      <div className="absolute right-[12%] top-[45%] text-3xl opacity-15 float-decoration" style={{animationDelay: '2.5s'}}>⭐</div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10">
      {/* Header */}
      <header className="container relative z-10 mx-auto px-4 py-3 sm:px-6 sm:py-4 lg:px-8 lg:py-6">
        <div className="flex items-center justify-between">
          <div className="w-24 sm:w-32"></div>
          {isAuth ? (
            <Link href="/profile" className="group flex items-center gap-2 rounded-full border-2 border-[#d4c494]/40 bg-[#d4c494]/5 px-6 py-2.5 text-sm font-medium text-[#d4c494] backdrop-blur-sm transition-all hover:border-[#d4c494]/70 hover:bg-[#d4c494]/10 sm:px-8 sm:py-3">
              <svg 
                className="h-5 w-5 transition-transform group-hover:scale-110" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                />
              </svg>
              <span>Profil</span>
            </Link>
          ) : (
            <Link href="/login" className="group flex items-center gap-2 rounded-full border-2 border-[#d4c494]/40 bg-[#d4c494]/5 px-6 py-2.5 text-sm font-medium text-[#d4c494] backdrop-blur-sm transition-all hover:border-[#d4c494]/70 hover:bg-[#d4c494]/10 sm:px-8 sm:py-3">
              <span className="select-none text-base transition-transform group-hover:scale-110">🎄</span>
              <span>Giriş Yap</span>
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* Christmas Tree - Main Focus - Hero Section */}
        <div className="relative flex flex-col items-center justify-center px-2 pt-2 pb-0 sm:px-4 sm:pt-4 sm:pb-2 lg:px-4 lg:pt-6 lg:pb-4 select-none w-full">
          {/* Soft radial glow behind the SVG to blend with background */}
          <div className="pointer-events-none absolute inset-0 -z-10 mx-auto w-full max-w-[85vw] sm:max-w-[75vw] lg:max-w-[70vw] bg-[radial-gradient(ellipse_at_center,rgba(212,196,148,0.22),rgba(17,31,25,0)_60%)] blur-2xl" />
           
           {/* Tree */}
           <div className="relative w-full flex justify-center">
             <div className="flex flex-col items-center gap-1 w-full">
               {/* Tree image - Large on mobile, optimized for desktop */}
               <Image
                src="/hello.svg"
                alt="Yıldızlı Ağaç"
                width={1000}
                height={950}
                className="drop-shadow-2xl w-[80vw] sm:w-[60vw] md:w-[55vw] lg:w-[50vw] xl:w-[45vw] 2xl:w-[42vw] max-w-none sm:max-w-[600px] h-auto"
                priority
                sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, (max-width: 1024px) 55vw, (max-width: 1280px) 50vw, 45vw"
              />
            </div>
          </div>
 
          {/* Decorative elements around tree */}
          <div className="absolute left-[2%] sm:left-[5%] md:left-[8%] lg:left-[12%] top-1/2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl opacity-40 animate-pulse" style={{animationDelay: '0.5s'}}>⭐</div>
          <div className="absolute right-[2%] sm:right-[5%] md:right-[8%] lg:right-[12%] top-1/3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl opacity-40 animate-pulse" style={{animationDelay: '1s'}}>⭐</div>
          <div className="absolute left-[3%] sm:left-[8%] md:left-[10%] lg:left-[14%] top-1/4 text-xl sm:text-2xl md:text-3xl lg:text-4xl opacity-40 animate-pulse" style={{animationDelay: '1.5s'}}>⭐</div>
          <div className="absolute right-[3%] sm:right-[8%] md:right-[10%] lg:right-[14%] top-2/3 text-xl sm:text-2xl md:text-3xl lg:text-4xl opacity-40 animate-pulse" style={{animationDelay: '2s'}}>⭐</div>
        </div>

        {/* Content Below Tree - Overlapping with image */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex max-w-2xl mx-auto -mt-8 sm:-mt-12 lg:-mt-16 flex-col gap-2 sm:gap-3 lg:gap-4 text-center relative z-20">
            <div className="relative">
              <h2 className="mb-1 sm:mb-2 text-3xl sm:text-4xl font-bold tracking-tight lg:text-5xl xl:text-6xl">
                <span 
                  className="font-(family-name:--font-graduate) text-[#d4c494] text-5xl sm:text-7xl lg:text-8xl xl:text-9xl relative inline-block"
                  style={{
                    textShadow: `
                      -3px -3px 0 #4a6b5a,
                      3px -3px 0 #4a6b5a,
                      -3px 3px 0 #4a6b5a,
                      3px 3px 0 #4a6b5a,
                      -2px -2px 0 #4a6b5a,
                      2px -2px 0 #4a6b5a,
                      -2px 2px 0 #4a6b5a,
                      2px 2px 0 #4a6b5a,
                      -1px -1px 0 #4a6b5a,
                      1px -1px 0 #4a6b5a,
                      -1px 1px 0 #4a6b5a,
                      1px 1px 0 #4a6b5a
                    `,
                    WebkitTextStroke: '2px #4a6b5a',
                    paintOrder: 'stroke fill'
                  }}
                >
                  YTÜ
                </span>
                <br />
                <span 
                  className="text-white text-5xl sm:text-5xl lg:text-6xl xl:text-7xl relative inline-block drop-shadow-lg"
                  style={{
                    fontFamily: 'var(--font-modak), "Modak", cursive',
                    fontWeight: 400,
                    letterSpacing: '0.02em'
                  }}
                >
                  YILDIZLI AĞAÇ
                </span>
              </h2>
              <p className="text-sm sm:text-base text-gray-300 lg:text-lg mt-1 sm:mt-2 drop-shadow-md">
                2026'ya girerken bir Yıldızlıyla hediye değiş-tokuşu yap!
              </p>
            </div>

            <div className="space-y-2 sm:space-y-3 mx-auto max-w-md mt-2 sm:mt-3">
              <div className="flex items-start gap-2 sm:gap-3 text-left">
                <span className="mt-0.5 sm:mt-1 text-lg sm:text-xl select-none">🎁</span>
                <div>
                  <h3 className="font-semibold text-[#d4c494] text-sm sm:text-base">Eşleşme Sistemi</h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Otomatik olarak bir arkadaşınla eşleştirileceksin
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 sm:gap-3 text-left">
                <span className="mt-0.5 sm:mt-1 text-lg sm:text-xl select-none">⭐</span>
                <div>
                  <h3 className="font-semibold text-[#d4c494] text-sm sm:text-base">Gizli Kalıyor</h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Kime hediye alacağın sadece sen bileceksin
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2 sm:gap-3 text-left">
                <span className="mt-0.5 sm:mt-1 text-lg sm:text-xl select-none">🎄</span>
                <div>
                  <h3 className="font-semibold text-[#d4c494] text-sm sm:text-base">Yılbaşı Sürprizi</h3>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Hediyeni belirtilen tarihte teslim et ve sürprizi paylaş
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2 sm:gap-3 sm:flex-row sm:justify-center mt-3 sm:mt-4">
              <Link href="/signup" className="rounded-full bg-linear-to-r from-[#4a6b5a] to-[#5a7b6a] px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl text-center">
                Katıl
              </Link>
              <button className="rounded-full border-2 border-[#d4c494]/50 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-[#d4c494] transition-all hover:border-[#d4c494] hover:bg-[#d4c494]/10">
                Nasıl Çalışır?
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-20 max-w-4xl">
          <div className="rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-8 backdrop-blur-sm sm:p-12">
            <h3 className="mb-6 text-center text-2xl font-bold sm:text-3xl">
              Nasıl Katılırım?
            </h3>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4a6b5a] text-xl font-bold">
                  1
                </div>
                <h4 className="font-semibold text-[#d4c494]">Kayıt Ol</h4>
                <p className="text-sm text-gray-400">
                  YTÜ öğrenci mail adresinle kayıt ol
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4a6b5a] text-xl font-bold">
                  2
                </div>
                <h4 className="font-semibold text-[#d4c494]">Eşleş</h4>
                <p className="text-sm text-gray-400">
                  Sistemimiz seni biriyle eşleştirecek
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4a6b5a] text-xl font-bold">
                  3
                </div>
                <h4 className="font-semibold text-[#d4c494]">Hediye Al</h4>
                <p className="text-sm text-gray-400">
                  Eşleştiğin kişiye hediye al ve mutluluğu paylaş
                </p>
              </div>
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
