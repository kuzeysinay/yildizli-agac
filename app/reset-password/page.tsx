"use client";

import { useState } from "react";
import Link from "next/link";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    return email.endsWith("@std.yildiz.edu.tr");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!validateEmail(email)) {
      setError("Lütfen geçerli bir YTÜ öğrenci mail adresi giriniz (ad.soyad@std.yildiz.edu.tr)");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://api.yildizliagac.com/api/auth/forgotPassword?email=${encodeURIComponent(email)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        setEmail(""); // Clear email on success
      } else {
        setError(result.message || "Şifre sıfırlama işlemi başarısız oldu. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Password reset error:", error);
      setError("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
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

        {/* Reset Password Form */}
        <main className="container relative z-10 mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className="w-full max-w-md">
              <div className="rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-8 backdrop-blur-sm">
                <div className="mb-8 text-center">
                  <div className="mb-4 text-5xl select-none">🔑</div>
                  <h1 className="mb-2 text-3xl font-bold">Şifremi Unuttum</h1>
                  <p className="text-gray-400">
                    {success 
                      ? "Şifre sıfırlama e-postası gönderildi"
                      : "E-posta adresinizi girin, size şifre sıfırlama linki gönderelim"
                    }
                  </p>
                </div>

                {success ? (
                  /* Success State */
                  <div className="space-y-6">
                    <div className="rounded-lg border-2 border-green-600/50 bg-green-600/10 p-6">
                      <div className="flex flex-col items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600/20">
                          <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="text-center">
                          <p className="mb-2 text-base font-semibold text-green-400">
                            E-posta Gönderildi!
                          </p>
                          <p className="text-sm text-gray-400">
                            E-posta kutunuzu kontrol edin ve şifre sıfırlama linkine tıklayın.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Instructions */}
                    <div className="space-y-3 rounded-lg border border-[#4a6b5a]/30 bg-[#0a1810]/30 p-4">
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
                          E-postadaki <span className="font-medium text-[#d4c494]">"Şifreyi Sıfırla"</span> linkine tıklayın
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#4a6b5a]/20 text-xs font-semibold text-[#d4c494]">
                          3
                        </div>
                        <p className="text-sm text-gray-300">
                          Yeni şifrenizi belirleyin
                        </p>
                      </div>
                    </div>

                    {/* Spam Folder Warning */}
                    <div className="rounded-lg border border-yellow-600/30 bg-yellow-600/10 p-4">
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

                    {/* Back to Login */}
                    <div className="pt-4 border-t border-[#4a6b5a]/30 text-center">
                      <Link 
                        href="/login" 
                        className="inline-block w-full rounded-full bg-linear-to-r from-[#4a6b5a] to-[#5a7b6a] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                      >
                        Giriş Sayfasına Dön
                      </Link>
                    </div>
                  </div>
                ) : (
                  /* Form State */
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Error Message */}
                    {error && (
                      <div className="rounded-lg border-2 border-red-600/50 bg-red-600/10 p-4">
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

                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#d4c494]">
                        YTÜ E-posta Adresi
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ogrenci@std.yildiz.edu.tr"
                        className="w-full rounded-lg border border-[#4a6b5a]/50 bg-[#0a1810]/50 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-[#4a6b5a] focus:outline-none focus:ring-2 focus:ring-[#4a6b5a]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        required
                        disabled={isSubmitting}
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Sadece @std.yildiz.edu.tr uzantılı mail adresleri kabul edilir
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#4a6b5a] to-[#5a7b6a] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                          <span>Gönderiliyor...</span>
                        </>
                      ) : (
                        "Şifre Sıfırlama Linki Gönder"
                      )}
                    </button>

                    {/* Back to Login */}
                    <div className="pt-4 border-t border-[#4a6b5a]/30 text-center text-sm text-gray-400">
                      Şifrenizi hatırladınız mı?{" "}
                      <Link href="/login" className="text-[#d4c494] hover:text-[#e4d4a4] transition-colors font-semibold">
                        Giriş Yap
                      </Link>
                    </div>
                  </form>
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

