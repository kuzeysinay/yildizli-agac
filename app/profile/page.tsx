"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  type CurrentUser = {
    id: number;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    lastLogin: string;
    approved: boolean;
  };

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [userError, setUserError] = useState<string | null>(null);

  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setIsLoadingUser(true);
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");
        
        const headers: HeadersInit = {
          "Accept": "application/json",
        };
        
        // Add Authorization header if token exists
        if (token) {
          headers["Authorization"] = `Bearer ${token}`;
        }
        
        const res = await fetch("https://api.yildizliagac.com/api/v1/users/getCurrentUser", {
          method: "GET",
          credentials: "include",
          headers,
        });
        const data = await res.json().catch(() => null);
        if (cancelled) return;
        if (res.ok && data?.success && data?.data) {
          setCurrentUser(data.data as CurrentUser);
          setUserError(null);
        } else {
          setUserError(data?.message || "Kullanıcı bilgileri alınamadı");
        }
      } catch (e) {
        if (!cancelled) setUserError("Ağ hatası: Kullanıcı bilgileri alınamadı");
      } finally {
        if (!cancelled) setIsLoadingUser(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLogout() {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      
      const headers: HeadersInit = {
        "Accept": "application/json",
      };
      
      // Add Authorization header if token exists
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      
      const response = await fetch("https://api.yildizliagac.com/api/v1/auth/logout", {
        method: "POST",
        credentials: "include",
        headers,
      });

      if (!response.ok) {
        // Best-effort: still navigate to login on non-OK, since session might be invalid anyway
        console.error("Logout failed with status:", response.status);
      }
      
      // Clear token from localStorage on logout
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      console.error("Logout request error:", error);
      // Even on error, clear local storage and proceed to login to force re-auth
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      router.push("/login");
      setIsLoggingOut(false);
    }
  }

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
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <Link href="/" className="block truncate whitespace-nowrap text-2xl sm:text-3xl font-bold hover:opacity-80 transition-opacity">
                <span className="select-none">🎄</span> YILDIZLI AĞAÇ
              </Link>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              aria-disabled={isLoggingOut}
              className="shrink-0 rounded-full border-2 border-red-600/50 px-6 py-2 text-sm font-semibold text-red-400 transition-all hover:border-red-600 hover:bg-red-600/10 disabled:opacity-60 disabled:cursor-not-allowed w-32 sm:w-auto"
            >
              {isLoggingOut ? "Çıkış Yapılıyor..." : "Çıkış Yap"}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container relative z-10 mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Profile Header */}
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-[#4a6b5a] to-[#5a7b6a] text-5xl select-none">
                🎄
              </div>
              {isLoadingUser ? (
                <>
                  <div className="mb-2 flex justify-center">
                    <div className="skeleton skeleton-text w-64 h-10 max-w-full"></div>
                  </div>
                  <div className="flex justify-center">
                    <div className="skeleton skeleton-text w-48 h-5 max-w-full"></div>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="mb-2 text-4xl font-bold">
                    {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Misafir"}
                  </h1>
                  <p className="text-gray-400">
                    {currentUser?.email || ""}
                  </p>
                </>
              )}
              {userError && (
                <p className="mt-2 text-sm text-red-400">{userError}</p>
              )}
            </div>

            {/* Match Status Card */}
            <div className="mb-6 rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-8 backdrop-blur-sm">
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 text-8xl select-none">
                  🎄
                </div>
                <h2 className="mb-2 text-2xl font-bold">Eşleşme Durumu</h2>
                <p className="mb-6 text-gray-400 max-w-md">
                  Eşleşmen tamamlandı! 🎉
                </p>
                <Link
                  href="/match"
                  className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#4a6b5a] to-[#5a7b6a] px-8 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  <span className="select-none">🎁</span>
                  <span>Eşleşmeni Gör</span>
                </Link>
              </div>
            </div>

            {/* Profile Information */}
            <div className="mb-6 rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-8 backdrop-blur-sm">
              <h2 className="mb-6 text-2xl font-bold">Profil Bilgileri</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#4a6b5a]/20 pb-4">
                  <span className="text-gray-400">Ad Soyad</span>
                  {isLoadingUser ? (
                    <div className="skeleton skeleton-text w-32 h-5"></div>
                  ) : (
                    <span className="font-semibold">
                      {currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "-"}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between border-b border-[#4a6b5a]/20 pb-4">
                  <span className="text-gray-400">E-posta</span>
                  {isLoadingUser ? (
                    <div className="skeleton skeleton-text w-40 h-5"></div>
                  ) : (
                    <span className="font-semibold">
                      {currentUser?.email || "-"}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Üyelik Durumu</span>
                  {isLoadingUser ? (
                    <div className="skeleton skeleton-text w-20 h-6 rounded-full"></div>
                  ) : (
                    <span className="rounded-full bg-green-500/20 px-4 py-1 text-sm font-semibold text-green-400">
                      {currentUser?.approved ? "Aktif" : "Onay Bekliyor"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Gift Preferences */}
            <div className="mb-6 rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-8 backdrop-blur-sm">
              <h2 className="mb-4 text-2xl font-bold">Hediye Tercihlerim</h2>
              <p className="mb-4 text-gray-400">
                Hediye verecek kişinin sana uygun bir hediye seçmesine yardımcı olmak için tercihlerini belirt.
              </p>
              <button className="rounded-full border-2 border-[#d4c494]/50 px-6 py-3 text-sm font-semibold text-[#d4c494] transition-all hover:border-[#d4c494] hover:bg-[#d4c494]/10">
                Tercihleri Düzenle
              </button>
            </div>

            {/* Settings */}
            <div className="rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-8 backdrop-blur-sm">
              <h2 className="mb-4 text-2xl font-bold">Ayarlar</h2>
              <div className="space-y-3">
                <button className="w-full rounded-lg border border-[#4a6b5a]/50 bg-[#0a1810]/50 px-6 py-3 text-left transition-colors hover:border-[#4a6b5a] hover:bg-[#0a1810]/80">
                  Şifremi Değiştir
                </button>
                <button className="w-full rounded-lg border border-[#4a6b5a]/50 bg-[#0a1810]/50 px-6 py-3 text-left transition-colors hover:border-[#4a6b5a] hover:bg-[#0a1810]/80">
                  Bildirim Ayarları
                </button>
                <button className="w-full rounded-lg border border-red-600/50 bg-[#0a1810]/50 px-6 py-3 text-left text-red-400 transition-colors hover:border-red-600 hover:bg-red-600/10">
                  Hesabı Sil
                </button>
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

