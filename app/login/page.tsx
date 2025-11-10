"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!email || !password) {
      setError("Lütfen email ve şifrenizi giriniz.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.yildizliagac.com/api/v1/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Store token if provided
        if (result.data?.token) {
          localStorage.setItem("token", result.data.token);
        }
        // Store user data if provided
        if (result.data?.user) {
          localStorage.setItem("user", JSON.stringify(result.data.user));
        }

        // Login successful - redirect to profile page
        router.push("/profile");
      } else {
        // Login failed
        setError(result.message || "Giriş başarısız oldu. Email ve şifrenizi kontrol ediniz.");
      }
    } catch (error) {
      console.error("Login error:", error);
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
                      E-posta Adresi
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
                  </div>

                  <div>
                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#d4c494]">
                      Şifre
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-[#4a6b5a]/50 bg-[#0a1810]/50 pr-12 pl-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-[#4a6b5a] focus:outline-none focus:ring-2 focus:ring-[#4a6b5a]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        required
                        disabled={isSubmitting}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                        className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-gray-400 hover:text-gray-200 transition-colors disabled:opacity-50"
                        disabled={isSubmitting}
                      >
                        {showPassword ? (
                          // Eye-off icon
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18M10.477 10.485a3 3 0 104.243 4.243M9.88 4.607A9.953 9.953 0 0112 4c5.523 0 10 4.477 10 10 0 1.508-.333 2.939-.93 4.224M6.228 6.228C4.86 7.32 3.78 8.77 3 10c2.137 3.4 5.317 6 9 6 1.042 0 2.046-.168 2.988-.48" />
                          </svg>
                        ) : (
                          // Eye icon
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 rounded border-[#4a6b5a]/50 bg-[#0a1810]/50 text-[#4a6b5a] focus:ring-2 focus:ring-[#4a6b5a]/20 disabled:opacity-50"
                        disabled={isSubmitting}
                      />
                      <span className="text-gray-400">Beni hatırla</span>
                    </label>
                    <a href="#" className="text-[#d4c494] hover:text-[#e4d4a4] transition-colors">
                      Şifremi unuttum
                    </a>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#4a6b5a] to-[#5a7b6a] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                        <span>Giriş yapılıyor...</span>
                      </>
                    ) : (
                      "Giriş Yap"
                    )}
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

