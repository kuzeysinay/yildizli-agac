"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const howItWorksRef = useRef<HTMLDivElement>(null);
  const stepRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll snap and auto-scroll functionality for mobile
  useEffect(() => {
    if (!isMobile || !howItWorksRef.current) return;

    const container = howItWorksRef.current;
    let touchStartY = 0;
    let touchEndY = 0;
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      const swipeDistance = touchStartY - touchEndY;
      const minSwipeDistance = 50;

      if (Math.abs(swipeDistance) > minSwipeDistance && !isScrolling) {
        setIsScrolling(true);

        // Find current step based on scroll position
        const containerRect = container.getBoundingClientRect();
        const containerTop = containerRect.top + window.scrollY;
        const currentScroll = window.scrollY;
        const relativeScroll = currentScroll - containerTop;

        let currentStep = 0;
        stepRefs.forEach((ref, index) => {
          if (ref.current) {
            const stepTop = ref.current.offsetTop;
            if (relativeScroll >= stepTop - 100) {
              currentStep = index;
            }
          }
        });

        if (swipeDistance > 0 && currentStep < stepRefs.length - 1) {
          // Swipe up - go to next step
          const nextStep = currentStep + 1;
          stepRefs[nextStep].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveStep(nextStep);
        } else if (swipeDistance < 0 && currentStep > 0) {
          // Swipe down - go to previous step
          const prevStep = currentStep - 1;
          stepRefs[prevStep].current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveStep(prevStep);
        }

        setTimeout(() => setIsScrolling(false), 1000);
      }
    };

    // Intersection Observer for step visibility
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0.5,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepIndex = stepRefs.findIndex((ref) => ref.current === entry.target);
          if (stepIndex !== -1) {
            setActiveStep(stepIndex);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    stepRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
      observer.disconnect();
      if (scrollTimeout !== null) clearTimeout(scrollTimeout);
    };
  }, [isMobile, isScrolling]);

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Safety timeout for loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsImageLoaded(true);
    }, 2500); // Fallback after 2.5s
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-linear-to-b from-[#0a1810] via-[#0d1f18] to-[#0a1810] text-white font-(family-name:--font-work-sans)" style={{ overscrollBehavior: 'none' }}>

      {/* Loading Overlay */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0a1810] transition-opacity duration-700 ${isImageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="text-6xl animate-bounce">🎄</div>
          <div className="text-[#d4c494] font-(family-name:--font-modak) text-2xl animate-pulse">Yükleniyor...</div>
        </div>
      </div>

      {/* Background Layer - Snowflakes */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Animated Snowflakes */}
        <div className="snowflake" style={{ left: '10%', animationDuration: '10s', animationDelay: '0s' }}>❄</div>
        <div className="snowflake" style={{ left: '20%', animationDuration: '12s', animationDelay: '2s', fontSize: '1.5em' }}>❄</div>
        <div className="snowflake" style={{ left: '30%', animationDuration: '15s', animationDelay: '4s' }}>❄</div>
        <div className="snowflake" style={{ left: '40%', animationDuration: '11s', animationDelay: '1s', fontSize: '1.2em' }}>❄</div>
        <div className="snowflake" style={{ left: '50%', animationDuration: '13s', animationDelay: '3s' }}>❄</div>
        <div className="snowflake" style={{ left: '60%', animationDuration: '14s', animationDelay: '5s', fontSize: '1.3em' }}>❄</div>
        <div className="snowflake" style={{ left: '70%', animationDuration: '12s', animationDelay: '2.5s' }}>❄</div>
        <div className="snowflake" style={{ left: '80%', animationDuration: '11s', animationDelay: '1.5s', fontSize: '1.4em' }}>❄</div>
        <div className="snowflake" style={{ left: '90%', animationDuration: '13s', animationDelay: '4.5s' }}>❄</div>
        <div className="snowflake" style={{ left: '15%', animationDuration: '16s', animationDelay: '6s' }}>❄</div>
        <div className="snowflake" style={{ left: '35%', animationDuration: '10s', animationDelay: '0.5s', fontSize: '1.1em' }}>❄</div>
        <div className="snowflake" style={{ left: '55%', animationDuration: '14s', animationDelay: '3.5s' }}>❄</div>
        <div className="snowflake" style={{ left: '75%', animationDuration: '12s', animationDelay: '2s', fontSize: '1.3em' }}>❄</div>
        <div className="snowflake" style={{ left: '85%', animationDuration: '15s', animationDelay: '5.5s' }}>❄</div>

        {/* Floating Decorations */}
        <div className="absolute left-[5%] top-[15%] text-4xl opacity-20 float-decoration" style={{ animationDelay: '0s' }}>🎁</div>
        <div className="absolute right-[8%] top-[25%] text-3xl opacity-20 float-decoration" style={{ animationDelay: '1s' }}>🎄</div>
        <div className="absolute left-[8%] top-[60%] text-3xl opacity-20 float-decoration" style={{ animationDelay: '2s' }}>🎅</div>
        <div className="absolute right-[5%] top-[70%] text-4xl opacity-20 float-decoration" style={{ animationDelay: '1.5s' }}>🎁</div>
        <div className="absolute left-[12%] top-[80%] text-3xl opacity-15 float-decoration" style={{ animationDelay: '0.5s' }}>⭐</div>
        <div className="absolute right-[12%] top-[45%] text-3xl opacity-15 float-decoration" style={{ animationDelay: '2.5s' }}>⭐</div>
      </div>

      {/* Content Layer */}
      <div className={`relative z-10 transition-opacity duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}>
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
                  onLoad={() => setIsImageLoaded(true)}
                  sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, (max-width: 1024px) 55vw, (max-width: 1280px) 50vw, 45vw"
                />
              </div>
            </div>

            {/* Decorative elements around tree */}
            <div className="absolute left-[2%] sm:left-[5%] md:left-[8%] lg:left-[12%] top-1/2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}>⭐</div>
            <div className="absolute right-[2%] sm:right-[5%] md:right-[8%] lg:right-[12%] top-1/3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }}>⭐</div>
            <div className="absolute left-[3%] sm:left-[8%] md:left-[10%] lg:left-[14%] top-1/4 text-xl sm:text-2xl md:text-3xl lg:text-4xl opacity-40 animate-pulse" style={{ animationDelay: '1.5s' }}>⭐</div>
            <div className="absolute right-[3%] sm:right-[8%] md:right-[10%] lg:right-[14%] top-2/3 text-xl sm:text-2xl md:text-3xl lg:text-4xl opacity-40 animate-pulse" style={{ animationDelay: '2s' }}>⭐</div>
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
                <button
                  onClick={() => {
                    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="rounded-full border-2 border-[#d4c494]/50 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-[#d4c494] transition-all hover:border-[#d4c494] hover:bg-[#d4c494]/10 hover:scale-105 active:scale-95"
                >
                  Nasıl Çalışır?
                </button>
              </div>
            </div>
          </div>

          {/* How It Works Section */}
          <div
            ref={howItWorksRef}
            className={`container mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 ${isMobile ? 'snap-y snap-mandatory' : ''}`}
            style={isMobile ? { scrollSnapType: 'y mandatory' } : {}}
          >
            <div className="mx-auto mt-20 max-w-5xl">
              <div className="rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-8 backdrop-blur-sm sm:p-12 relative overflow-hidden">
                {/* Animated background decorations */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4c494]/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#4a6b5a]/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="mb-8 text-center relative z-10">
                  <div className="mb-4 flex items-center justify-center gap-3">
                    <span className="text-4xl animate-bounce select-none">🎄</span>
                    <h3 className="text-3xl font-bold sm:text-4xl">
                      <span className="text-[#d4c494] glow-text">Nasıl Çalışır?</span>
                    </h3>
                    <span className="text-4xl animate-bounce select-none" style={{ animationDelay: '0.2s' }}>✨</span>
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Yıldızlı Ağaç hediye değiş-tokuş sisteminin tüm detayları
                  </p>
                  {isMobile && (
                    <p className="mt-2 text-xs text-[#d4c494]/70 animate-pulse">
                      👆 Yukarı kaydır, sonraki adıma geç!
                    </p>
                  )}
                </div>

                {/* Process Flow */}
                <div className="mb-12 space-y-8 relative z-10">
                  {/* Step 1 */}
                  <div
                    ref={stepRefs[0]}
                    className={`relative flex flex-col gap-4 sm:flex-row sm:items-start transition-all duration-500 ${isMobile ? 'snap-start min-h-[80vh]' : ''} ${activeStep === 0 ? 'scale-100 opacity-100' : 'opacity-90'}`}
                    style={isMobile ? { scrollSnapAlign: 'start' } : {}}
                  >
                    <div className="flex shrink-0 items-center justify-center sm:flex-col">
                      <div className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#4a6b5a] to-[#5a7b6a] text-3xl font-bold shadow-xl ring-4 ring-[#4a6b5a]/30 transition-all duration-500 ${activeStep === 0 ? 'scale-110 ring-[#d4c494]/50 animate-pulse' : 'scale-100'}`}>
                        <span className="relative z-10">1</span>
                        {activeStep === 0 && (
                          <div className="absolute inset-0 rounded-full bg-[#d4c494]/20 animate-ping"></div>
                        )}
                      </div>
                      {!isMobile && (
                        <div className="mx-auto mt-4 h-16 w-0.5 bg-linear-to-b from-[#4a6b5a] to-transparent"></div>
                      )}
                    </div>
                    <div className={`flex-1 rounded-xl border-2 p-6 backdrop-blur-sm transition-all duration-500 ${activeStep === 0 ? 'border-[#d4c494]/50 bg-[#0a1810]/60 shadow-lg shadow-[#d4c494]/10' : 'border-[#4a6b5a]/30 bg-[#0a1810]/40'}`}>
                      <div className="mb-3 flex items-center gap-3">
                        <span className={`text-4xl select-none transition-transform duration-500 ${activeStep === 0 ? 'animate-bounce scale-110' : ''}`}>📧</span>
                        <h4 className="text-xl font-bold text-[#d4c494]">Kayıt ve Doğrulama</h4>
                      </div>
                      <p className="mb-3 text-gray-300 leading-relaxed">
                        YTÜ öğrenci mail adresinle (@std.yildiz.edu.tr) kayıt ol. Mail adresine gönderilen doğrulama linkine tıklayarak hesabını aktifleştir.
                      </p>
                      <div className="rounded-lg bg-[#4a6b5a]/10 p-3 border border-[#4a6b5a]/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-r from-[#d4c494]/5 via-transparent to-[#d4c494]/5 animate-pulse"></div>
                        <p className="text-xs text-gray-400 relative z-10">
                          <strong className="text-[#d4c494]">💡 Önemli:</strong> Sadece YTÜ öğrenci mail adresleri kabul edilir. Doğrulama mailini kontrol etmeyi unutma!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div
                    ref={stepRefs[1]}
                    className={`relative flex flex-col gap-4 sm:flex-row sm:items-start transition-all duration-500 ${isMobile ? 'snap-start min-h-[80vh]' : ''} ${activeStep === 1 ? 'scale-100 opacity-100' : 'opacity-90'}`}
                    style={isMobile ? { scrollSnapAlign: 'start' } : {}}
                  >
                    <div className="flex shrink-0 items-center justify-center sm:flex-col">
                      <div className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#4a6b5a] to-[#5a7b6a] text-3xl font-bold shadow-xl ring-4 ring-[#4a6b5a]/30 transition-all duration-500 ${activeStep === 1 ? 'scale-110 ring-[#d4c494]/50 animate-pulse' : 'scale-100'}`}>
                        <span className="relative z-10">2</span>
                        {activeStep === 1 && (
                          <div className="absolute inset-0 rounded-full bg-[#d4c494]/20 animate-ping"></div>
                        )}
                      </div>
                      {!isMobile && (
                        <div className="mx-auto mt-4 h-16 w-0.5 bg-linear-to-b from-[#4a6b5a] to-transparent"></div>
                      )}
                    </div>
                    <div className={`flex-1 rounded-xl border-2 p-6 backdrop-blur-sm transition-all duration-500 ${activeStep === 1 ? 'border-[#d4c494]/50 bg-[#0a1810]/60 shadow-lg shadow-[#d4c494]/10' : 'border-[#4a6b5a]/30 bg-[#0a1810]/40'}`}>
                      <div className="mb-3 flex items-center gap-3">
                        <span className={`text-4xl select-none transition-transform duration-500 ${activeStep === 1 ? 'animate-bounce scale-110' : ''}`}>🎯</span>
                        <h4 className="text-xl font-bold text-[#d4c494]">Profil Oluşturma</h4>
                      </div>
                      <p className="mb-3 text-gray-300 leading-relaxed">
                        İlgi alanlarını ve tercihlerini belirt. Bu bilgiler, eşleştiğin kişinin sana uygun bir hediye seçmesine yardımcı olacak.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className={`rounded-full bg-[#4a6b5a]/30 px-3 py-1 text-xs text-gray-300 border border-[#4a6b5a]/40 transition-all duration-300 ${activeStep === 1 ? 'animate-pulse scale-105' : ''}`}>
                          ✨ İlgi alanları seçimi
                        </span>
                        <span className={`rounded-full bg-[#4a6b5a]/30 px-3 py-1 text-xs text-gray-300 border border-[#4a6b5a]/40 transition-all duration-300 ${activeStep === 1 ? 'animate-pulse scale-105' : ''}`} style={{ animationDelay: '0.1s' }}>
                          👤 Cinsiyet tercihi
                        </span>
                        <span className={`rounded-full bg-[#4a6b5a]/30 px-3 py-1 text-xs text-gray-300 border border-[#4a6b5a]/40 transition-all duration-300 ${activeStep === 1 ? 'animate-pulse scale-105' : ''}`} style={{ animationDelay: '0.2s' }}>
                          🎁 Hediye tercihleri
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div
                    ref={stepRefs[2]}
                    className={`relative flex flex-col gap-4 sm:flex-row sm:items-start transition-all duration-500 ${isMobile ? 'snap-start min-h-[80vh]' : ''} ${activeStep === 2 ? 'scale-100 opacity-100' : 'opacity-90'}`}
                    style={isMobile ? { scrollSnapAlign: 'start' } : {}}
                  >
                    <div className="flex shrink-0 items-center justify-center sm:flex-col">
                      <div className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#4a6b5a] to-[#5a7b6a] text-3xl font-bold shadow-xl ring-4 ring-[#4a6b5a]/30 transition-all duration-500 ${activeStep === 2 ? 'scale-110 ring-[#d4c494]/50 animate-pulse' : 'scale-100'}`}>
                        <span className="relative z-10">3</span>
                        {activeStep === 2 && (
                          <div className="absolute inset-0 rounded-full bg-[#d4c494]/20 animate-ping"></div>
                        )}
                      </div>
                      {!isMobile && (
                        <div className="mx-auto mt-4 h-16 w-0.5 bg-linear-to-b from-[#4a6b5a] to-transparent"></div>
                      )}
                    </div>
                    <div className={`flex-1 rounded-xl border-2 p-6 backdrop-blur-sm transition-all duration-500 ${activeStep === 2 ? 'border-[#d4c494]/50 bg-[#0a1810]/60 shadow-lg shadow-[#d4c494]/10' : 'border-[#4a6b5a]/30 bg-[#0a1810]/40'}`}>
                      <div className="mb-3 flex items-center gap-3">
                        <span className={`text-4xl select-none transition-transform duration-500 ${activeStep === 2 ? 'animate-bounce scale-110' : ''}`}>🎁</span>
                        <h4 className="text-xl font-bold text-[#d4c494]">Otomatik Eşleşme</h4>
                      </div>
                      <p className="mb-3 text-gray-300 leading-relaxed">
                        Sistemimiz seni algoritma ile bir Yıldızlıyla eşleştirecek. Eşleşme sonucunda:
                      </p>
                      <ul className="space-y-3 text-sm text-gray-300">
                        <li className={`flex items-start gap-2 transition-all duration-300 ${activeStep === 2 ? 'translate-x-2' : ''}`}>
                          <span className="mt-0.5 text-[#d4c494] text-lg">✨</span>
                          <span>Eşleştiğin kişinin <strong className="text-[#d4c494]">ilgi alanlarını</strong> göreceksin</span>
                        </li>
                        <li className={`flex items-start gap-2 transition-all duration-300 ${activeStep === 2 ? 'translate-x-2' : ''}`} style={{ transitionDelay: '0.1s' }}>
                          <span className="mt-0.5 text-[#d4c494] text-lg">🔒</span>
                          <span><strong className="text-[#d4c494]">Tam isim gizli</strong> kalacak (sadece baş harfler gösterilir)</span>
                        </li>
                        <li className={`flex items-start gap-2 transition-all duration-300 ${activeStep === 2 ? 'translate-x-2' : ''}`} style={{ transitionDelay: '0.2s' }}>
                          <span className="mt-0.5 text-[#d4c494] text-lg">📅</span>
                          <span>Hediye teslim <strong className="text-[#d4c494]">tarihini</strong> öğreneceksin</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div
                    ref={stepRefs[3]}
                    className={`relative flex flex-col gap-4 sm:flex-row sm:items-start transition-all duration-500 ${isMobile ? 'snap-start min-h-[80vh]' : ''} ${activeStep === 3 ? 'scale-100 opacity-100' : 'opacity-90'}`}
                    style={isMobile ? { scrollSnapAlign: 'start' } : {}}
                  >
                    <div className="flex shrink-0 items-center justify-center sm:flex-col">
                      <div className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#4a6b5a] to-[#5a7b6a] text-3xl font-bold shadow-xl ring-4 ring-[#4a6b5a]/30 transition-all duration-500 ${activeStep === 3 ? 'scale-110 ring-[#d4c494]/50 animate-pulse' : 'scale-100'}`}>
                        <span className="relative z-10">4</span>
                        {activeStep === 3 && (
                          <div className="absolute inset-0 rounded-full bg-[#d4c494]/20 animate-ping"></div>
                        )}
                      </div>
                      {!isMobile && (
                        <div className="mx-auto mt-4 h-16 w-0.5 bg-linear-to-b from-[#4a6b5a] to-transparent"></div>
                      )}
                    </div>
                    <div className={`flex-1 rounded-xl border-2 p-6 backdrop-blur-sm transition-all duration-500 ${activeStep === 3 ? 'border-[#d4c494]/50 bg-[#0a1810]/60 shadow-lg shadow-[#d4c494]/10' : 'border-[#4a6b5a]/30 bg-[#0a1810]/40'}`}>
                      <div className="mb-3 flex items-center gap-3">
                        <span className={`text-4xl select-none transition-transform duration-500 ${activeStep === 3 ? 'animate-bounce scale-110' : ''}`}>📅</span>
                        <h4 className="text-xl font-bold text-[#d4c494]">Buluşma Zamanı Belirleme</h4>
                      </div>
                      <p className="mb-3 text-gray-300 leading-relaxed">
                        Eşleştiğin kişiyle uygun olduğun <strong className="text-[#d4c494]">3 farklı gün ve saat</strong> öner. Sistem otomatik olarak ortak zamanları bulacak ve buluşma zamanınızı belirleyeceksiniz.
                      </p>
                      <div className="rounded-lg bg-green-600/10 p-3 border border-green-600/30 relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-r from-green-500/10 via-transparent to-green-500/10 animate-pulse"></div>
                        <p className="text-xs text-green-300 relative z-10">
                          <strong className="text-green-400">💡 İpucu:</strong> Karşı tarafın önerdiği günleri seçerseniz eşleşme şansınız artar! 🎯
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div
                    ref={stepRefs[4]}
                    className={`relative flex flex-col gap-4 sm:flex-row sm:items-start transition-all duration-500 ${isMobile ? 'snap-start min-h-[80vh]' : ''} ${activeStep === 4 ? 'scale-100 opacity-100' : 'opacity-90'}`}
                    style={isMobile ? { scrollSnapAlign: 'start' } : {}}
                  >
                    <div className="flex shrink-0 items-center justify-center sm:flex-col">
                      <div className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#4a6b5a] to-[#5a7b6a] text-3xl font-bold shadow-xl ring-4 ring-[#4a6b5a]/30 transition-all duration-500 ${activeStep === 4 ? 'scale-110 ring-[#d4c494]/50 animate-pulse' : 'scale-100'}`}>
                        <span className="relative z-10">5</span>
                        {activeStep === 4 && (
                          <div className="absolute inset-0 rounded-full bg-[#d4c494]/20 animate-ping"></div>
                        )}
                      </div>
                    </div>
                    <div className={`flex-1 rounded-xl border-2 p-6 backdrop-blur-sm transition-all duration-500 ${activeStep === 4 ? 'border-[#d4c494]/50 bg-[#0a1810]/60 shadow-lg shadow-[#d4c494]/10' : 'border-[#4a6b5a]/30 bg-[#0a1810]/40'}`}>
                      <div className="mb-3 flex items-center gap-3">
                        <span className={`text-4xl select-none transition-transform duration-500 ${activeStep === 4 ? 'animate-bounce scale-110' : ''}`}>🎄</span>
                        <h4 className="text-xl font-bold text-[#d4c494]">Hediye Hazırlığı ve Teslim</h4>
                      </div>
                      <p className="mb-3 text-gray-300 leading-relaxed">
                        Belirlenen tarihte buluşup hediyeni teslim et. Bu bir <strong className="text-yellow-400">sürpriz</strong> olmalı - kime hediye aldığını kimseye söyleme! 🤫
                      </p>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className={`rounded-lg bg-[#4a6b5a]/10 p-3 border border-[#4a6b5a]/20 transition-all duration-300 ${activeStep === 4 ? 'scale-105 shadow-md' : ''}`}>
                          <p className="text-xs font-semibold text-[#d4c494] mb-1 flex items-center gap-1">
                            <span>💰</span> Bütçe
                          </p>
                          <p className="text-xs text-gray-400">200-500 TL arası</p>
                        </div>
                        <div className={`rounded-lg bg-[#4a6b5a]/10 p-3 border border-[#4a6b5a]/20 transition-all duration-300 ${activeStep === 4 ? 'scale-105 shadow-md' : ''}`} style={{ transitionDelay: '0.1s' }}>
                          <p className="text-xs font-semibold text-[#d4c494] mb-1 flex items-center gap-1">
                            <span>📦</span> Teslim
                          </p>
                          <p className="text-xs text-gray-400">Belirlenen tarihte</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="mt-12 space-y-4">
                  <h4 className="text-xl font-bold text-[#d4c494] text-center mb-6">Önemli Notlar</h4>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-yellow-600/30 bg-yellow-600/10 p-5">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-2xl select-none">🔒</span>
                        <h5 className="font-semibold text-yellow-400">Gizlilik</h5>
                      </div>
                      <p className="text-sm text-gray-300">
                        Kime hediye aldığın sadece sen bileceksin. Eşleştiğin kişi de senin kim olduğunu bilmeyecek - bu bir sürpriz!
                      </p>
                    </div>

                    <div className="rounded-xl border border-blue-600/30 bg-blue-600/10 p-5">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-2xl select-none">⏰</span>
                        <h5 className="font-semibold text-blue-400">Zamanlama</h5>
                      </div>
                      <p className="text-sm text-gray-300">
                        Eşleşme sonrası belirlenen tarihte buluşup hediyeleri değiş-tokuş edeceksiniz. Tarihleri kaçırma!
                      </p>
                    </div>

                    <div className="rounded-xl border border-green-600/30 bg-green-600/10 p-5">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-2xl select-none">💝</span>
                        <h5 className="font-semibold text-green-400">Hediye Seçimi</h5>
                      </div>
                      <p className="text-sm text-gray-300">
                        İlgi alanlarına göre düşünceli bir hediye seç. Bütçe: 100-300 TL arası. Yaratıcı ol!
                      </p>
                    </div>

                    <div className="rounded-xl border border-purple-600/30 bg-purple-600/10 p-5">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-2xl select-none">🎉</span>
                        <h5 className="font-semibold text-purple-400">Eğlence</h5>
                      </div>
                      <p className="text-sm text-gray-300">
                        Bu bir yılbaşı kutlaması! Eğlen, yeni arkadaşlıklar kur ve yılbaşı ruhunu yaşa!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="container relative z-10 mx-auto px-4 py-8 pb-12 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
          <p>Yıldız Teknik Üniversitesi Öğrenci Topluluğu • 2026</p>
        </footer>
      </div>
    </div>
  );
}
