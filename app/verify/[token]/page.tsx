"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function VerifyTokenPage() {
  const params = useParams();
  const router = useRouter();
  const token = params?.token as string;
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    if (!token) {
      setError("Geçersiz doğrulama linki.");
      return;
    }

    setIsVerifying(true);
    setError(null);

    try {
      const response = await fetch(`https://api.yildizliagac.com/api/v1/auth/verify?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsVerified(true);
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setError(result.message || "Doğrulama başarısız oldu. Link geçersiz veya süresi dolmuş olabilir.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      setError("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setIsVerifying(false);
    }
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
                {isVerified ? (
                  /* Success State */
                  <div className="text-center">
                    <div className="mb-6 text-6xl select-none">✅</div>
                    <h1 className="mb-4 text-3xl font-bold text-[#d4c494]">Hesabınız Doğrulandı!</h1>
                    <p className="mb-6 text-gray-400">
                      Hesabınız başarıyla doğrulandı. Giriş sayfasına yönlendiriliyorsunuz...
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#4a6b5a]/30 border-t-[#4a6b5a]"></div>
                      <span>Yönlendiriliyor...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-8 text-center">
                      <div className="mb-4 text-5xl select-none">🔐</div>
                      <h1 className="mb-2 text-3xl font-bold">Hesabınızı Doğrulayın</h1>
                      <p className="text-gray-400">
                        Hesabınızı doğrulamak için aşağıdaki butona tıklayın
                      </p>
                    </div>

                    {/* Main Instruction Card */}
                    <div className="mb-6 rounded-lg border-2 border-[#4a6b5a]/40 bg-gradient-to-br from-[#4a6b5a]/10 to-[#0a1810]/50 p-6 backdrop-blur-sm">
                      <div className="flex flex-col items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4a6b5a]/20">
                          <svg className="h-8 w-8 text-[#4a6b5a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <div className="text-center">
                          <p className="mb-2 text-base font-semibold text-[#d4c494]">
                            Doğrulama Linkine Ulaştınız
                          </p>
                          <p className="text-sm text-gray-400">
                            Hesabınızı doğrulamak için aşağıdaki butona tıklayın. Bu işlem spam koruması için gereklidir.
                          </p>
                        </div>
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

                    {/* Verify Button */}
                    <div className="space-y-4">
                      <button
                        type="button"
                        onClick={handleVerify}
                        disabled={isVerifying || !token}
                        className="w-full rounded-full bg-linear-to-r from-[#4a6b5a] to-[#5a7b6a] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {isVerifying ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                            <span>Doğrulanıyor...</span>
                          </span>
                        ) : (
                          "Hesabı Doğrula"
                        )}
                      </button>

                      {/* Back to Login */}
                      <div className="pt-4 border-t border-[#4a6b5a]/30 text-center text-sm text-gray-400">
                        Hesabınız zaten doğrulandı mı?{" "}
                        <Link href="/login" className="text-[#d4c494] hover:text-[#e4d4a4] transition-colors font-semibold">
                          Giriş Yap
                        </Link>
                      </div>
                    </div>
                  </>
                )}
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

