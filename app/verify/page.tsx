"use client";

import { useState } from "react";
import Link from "next/link";

export default function VerifyPage() {
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    setIsResending(true);
    setResendSuccess(false);
    setError(null);
    
    // TODO: API connection will be added here
    setTimeout(() => {
      setIsResending(false);
      setResendSuccess(true);
      setCountdown(60); // 60 second countdown
      
      // Start countdown timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000);
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
            <Link href="/" className="text-2xl sm:text-3xl font-bold hover:opacity-80 transition-opacity" style={{ fontFamily: 'var(--font-modak), "Modak", cursive', fontWeight: 400 }}>
              <span className="select-none">🎄</span> YILDIZLI AĞAÇ
            </Link>
          </div>
        </header>

        {/* Verification Form */}
        <main className="container relative z-10 mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="w-full max-w-md">
              <div className="rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-8 backdrop-blur-sm">
                <div className="mb-8 text-center">
                  <div className="mb-4 text-5xl select-none">✉️</div>
                  <h1 className="mb-2 text-3xl font-bold">Hesabınızı Doğrulayın</h1>
                  <p className="text-gray-400">
                    E-posta adresinize gönderilen doğrulama linkine tıklayın
                  </p>
                </div>

                {/* Main Instruction Card */}
                <div className="mb-6 rounded-lg border-2 border-[#4a6b5a]/40 bg-gradient-to-br from-[#4a6b5a]/10 to-[#0a1810]/50 p-6 backdrop-blur-sm">
                  <div className="flex flex-col items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4a6b5a]/20">
                      <svg className="h-8 w-8 text-[#4a6b5a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <p className="mb-2 text-base font-semibold text-[#d4c494]">
                        Doğrulama e-postası gönderildi!
                      </p>
                      <p className="text-sm text-gray-400">
                        E-posta kutunuzu kontrol edin ve gönderilen linke tıklayarak hesabınızı doğrulayın.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Instructions List */}
                <div className="mb-6 space-y-3 rounded-lg border border-[#4a6b5a]/30 bg-[#0a1810]/30 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#4a6b5a]/20 text-xs font-semibold text-[#d4c494]">
                      1
                    </div>
                    <p className="text-sm text-gray-300">
                      E-posta kutunuzu kontrol edin (<span className="font-medium text-[#d4c494]">@std.yildiz.edu.tr</span>)
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#4a6b5a]/20 text-xs font-semibold text-[#d4c494]">
                      2
                    </div>
                    <p className="text-sm text-gray-300">
                      E-postadaki <span className="font-medium text-[#d4c494]">"Hesabı Doğrula"</span> butonuna tıklayın
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#4a6b5a]/20 text-xs font-semibold text-[#d4c494]">
                      3
                    </div>
                    <p className="text-sm text-gray-300">
                      Otomatik olarak giriş sayfasına yönlendirileceksiniz
                    </p>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 rounded-lg border-2 border-red-600/50 bg-red-600/10 p-4">
                    <div className="flex items-start gap-3">
                      <svg className="h-5 w-5 flex-shrink-0 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-400">{error}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setError(null)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {/* Resend Success Message */}
                {resendSuccess && (
                  <div className="mb-6 rounded-lg border-2 border-green-600/50 bg-green-600/10 p-4">
                    <div className="flex items-start gap-3">
                      <svg className="h-5 w-5 flex-shrink-0 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-400">
                          Doğrulama e-postası tekrar gönderildi!
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          Lütfen e-posta kutunuzu kontrol edin.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Spam Folder Warning */}
                <div className="mb-6 rounded-lg border border-yellow-600/30 bg-yellow-600/10 p-4">
                  <div className="flex items-start gap-3">
                    <svg className="h-5 w-5 flex-shrink-0 text-yellow-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-yellow-400 mb-1">
                        E-postayı görmüyor musunuz?
                      </p>
                      <p className="text-xs text-gray-400">
                        Spam veya gereksiz e-posta klasörünüze bakmayı unutmayın. E-posta birkaç dakika içinde gelebilir.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Resend Email Section */}
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="mb-3 text-sm text-gray-400">
                      E-postayı almadınız mı?
                    </p>
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={isResending || countdown > 0}
                      className="w-full rounded-full border-2 border-[#4a6b5a]/50 bg-transparent px-6 py-3 text-sm font-semibold text-[#d4c494] transition-all hover:border-[#4a6b5a] hover:bg-[#4a6b5a]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isResending ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#d4c494]/30 border-t-[#d4c494]"></div>
                          <span>Gönderiliyor...</span>
                        </span>
                      ) : countdown > 0 ? (
                        `E-postayı Tekrar Gönder (${countdown}s)`
                      ) : (
                        "E-postayı Tekrar Gönder"
                      )}
                    </button>
                  </div>

                  {/* Back to Login */}
                  <div className="pt-4 border-t border-[#4a6b5a]/30 text-center text-sm text-gray-400">
                    Hesabınız zaten doğrulandı mı?{" "}
                    <Link href="/login" className="text-[#d4c494] hover:text-[#e4d4a4] transition-colors font-semibold">
                      Giriş Yap
                    </Link>
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

