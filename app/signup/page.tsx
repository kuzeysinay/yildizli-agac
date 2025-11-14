"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

interface Interest {
  id: number;
  name: string;
}

export default function SignupPage() {
  const [step, setStep] = useState(1);
  const [interestSearch, setInterestSearch] = useState("");
  const [availableInterests, setAvailableInterests] = useState<Interest[]>([]);
  const [loadingInterests, setLoadingInterests] = useState(true);
  const [interestsError, setInterestsError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
    interests: [] as number[], // Store interest IDs
  });

  // Refs to track abort controller and timeout for cleanup
  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch interests function
  const fetchInterests = useCallback(async () => {
    // Clean up any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    try {
      setLoadingInterests(true);
      setInterestsError(null);
      
      // Create new abort controller and timeout
      const controller = new AbortController();
      abortControllerRef.current = controller;
      
      timeoutRef.current = setTimeout(() => {
        if (!controller.signal.aborted) {
          controller.abort();
        }
      }, 10000); // 10 second timeout
      
      const response = await fetch("https://api.yildizliagac.com/api/v1/interests/getAllInterests", {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      // Clear timeout on successful response
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success && result.data) {
        setAvailableInterests(result.data);
      } else {
        throw new Error(result.message || "İlgi alanları alınamadı");
      }
    } catch (error: any) {
      // Clear timeout on error
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      // Handle different error types
      if (error.name === "AbortError") {
        // Only set error if this wasn't a cleanup abort (component still mounted)
        if (abortControllerRef.current) {
          setInterestsError("İstek zaman aşımına uğradı. Lütfen tekrar deneyin.");
        }
      } else if (error.message?.includes("Failed to fetch") || error.message?.includes("NetworkError")) {
        setInterestsError("API'ye bağlanılamıyor. İnternet bağlantınızı kontrol edin veya daha sonra tekrar deneyin.");
      } else {
        setInterestsError(error.message || "İlgi alanları yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.");
      }
    } finally {
      // Clean up refs
      abortControllerRef.current = null;
      setLoadingInterests(false);
    }
  }, []);

  // Fetch interests from API on mount
  useEffect(() => {
    fetchInterests();
    
    // Cleanup function to abort any pending requests
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [fetchInterests]);

  const filteredInterests = availableInterests.filter((interest) =>
    interest.name.toLowerCase().includes(interestSearch.toLowerCase())
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInterestToggle = (interestId: number) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(interestId)
        ? formData.interests.filter((id) => id !== interestId)
        : [...formData.interests, interestId],
    });
  };

  const getInterestName = (interestId: number) => {
    return availableInterests.find((i) => i.id === interestId)?.name || "";
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      // Validate names
      if (!formData.firstName.trim() || !formData.lastName.trim()) {
        alert("Lütfen ad ve soyad bilgilerinizi girin.");
        return;
      }
      // Validate email domain
      if (!formData.email.endsWith("@std.yildiz.edu.tr")) {
        alert("Lütfen YTÜ öğrenci mail adresinizi kullanın (@std.yildiz.edu.tr)");
        return;
      }

      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        alert("Şifreler eşleşmiyor!");
        return;
      }

      // Validate password length
      if (formData.password.length < 6) {
        alert("Şifre en az 6 karakter olmalıdır!");
        return;
      }

      setStep(2);
    }
  };

  const mapGenderToApi = (gender: string): string => {
    const genderMap: { [key: string]: string } = {
      "erkek": "ERKEK",
      "kadin": "KADIN",
      "belirtmek-istemiyorum": "DIGER",
    };
    return genderMap[gender] || gender.toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validate gender
    if (!formData.gender) {
      setError("Lütfen cinsiyet seçiniz!");
      return;
    }

    // Validate interests
    if (formData.interests.length === 0) {
      setError("Lütfen en az bir ilgi alanı seçiniz!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.yildizliagac.com/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email,
          password: formData.password,
          gender: mapGenderToApi(formData.gender),
          interestIds: formData.interests,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Registration successful - redirect to verification page
        window.location.href = "/verify";
      } else {
        // Registration failed
        setError(result.message || "Kayıt işlemi başarısız oldu. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Registration error:", error);
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

        {/* Signup Form */}
        <main className="container relative z-10 mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex min-h-[70vh] items-center justify-center">
            <div className={`w-full ${step === 2 ? 'max-w-2xl' : 'max-w-md'}`}>
              <div className="rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-8 backdrop-blur-sm">
                <div className="mb-8 text-center">
                  <div className="mb-4 text-5xl select-none">🎁</div>
                  <h1 className="mb-2 text-3xl font-bold">Kayıt Ol</h1>
                  <p className="text-gray-400">Yılbaşı 2026 hediye değişimine katıl!</p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-8">
                  <div className="flex items-center justify-center gap-2">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                      step >= 1 ? "border-[#4a6b5a] bg-[#4a6b5a] text-white" : "border-[#4a6b5a]/30 text-gray-500"
                    }`}>
                      {step > 1 ? "✓" : "1"}
                    </div>
                    <div className={`h-1 w-20 transition-all ${
                      step >= 2 ? "bg-[#4a6b5a]" : "bg-[#4a6b5a]/30"
                    }`}></div>
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                      step >= 2 ? "border-[#4a6b5a] bg-[#4a6b5a] text-white" : "border-[#4a6b5a]/30 text-gray-500"
                    }`}>
                      2
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span className={step === 1 ? "text-[#d4c494]" : ""}>Hesap Bilgileri</span>
                    <span className={step === 2 ? "text-[#d4c494]" : ""}>Profil Bilgileri</span>
                  </div>
                </div>

                {/* Step 1: Email and Password */}
                {step === 1 && (
                  <form onSubmit={handleNext} className="space-y-5">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-[#d4c494]">
                          Ad
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="Adınız"
                          className="w-full rounded-lg border border-[#4a6b5a]/50 bg-[#0a1810]/50 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-[#4a6b5a] focus:outline-none focus:ring-2 focus:ring-[#4a6b5a]/20"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-[#d4c494]">
                          Soyad
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Soyadınız"
                          className="w-full rounded-lg border border-[#4a6b5a]/50 bg-[#0a1810]/50 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-[#4a6b5a] focus:outline-none focus:ring-2 focus:ring-[#4a6b5a]/20"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#d4c494]">
                        YTÜ E-posta Adresi
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ogrenci@std.yildiz.edu.tr"
                        className="w-full rounded-lg border border-[#4a6b5a]/50 bg-[#0a1810]/50 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-[#4a6b5a] focus:outline-none focus:ring-2 focus:ring-[#4a6b5a]/20"
                        required
                      />
                      <p className="mt-1 text-xs text-gray-500">
                        Sadece @std.yildiz.edu.tr uzantılı mail adresleri kabul edilir
                      </p>
                    </div>

                    <div>
                      <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#d4c494]">
                        Şifre
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-[#4a6b5a]/50 bg-[#0a1810]/50 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-[#4a6b5a] focus:outline-none focus:ring-2 focus:ring-[#4a6b5a]/20"
                        required
                        minLength={6}
                      />
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-[#d4c494]">
                        Şifre Tekrar
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full rounded-lg border border-[#4a6b5a]/50 bg-[#0a1810]/50 px-4 py-3 text-white placeholder-gray-500 transition-colors focus:border-[#4a6b5a] focus:outline-none focus:ring-2 focus:ring-[#4a6b5a]/20"
                        required
                        minLength={6}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-full bg-linear-to-r from-[#4a6b5a] to-[#5a7b6a] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                    >
                      Devam Et
                    </button>
                  </form>
                )}

                {/* Step 2: Gender and Interests */}
                {step === 2 && (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="mb-3 block text-sm font-medium text-[#d4c494]">
                        Cinsiyet
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <label className={`flex flex-col items-center gap-1 cursor-pointer rounded-lg border-2 p-2 transition-all ${
                          formData.gender === "erkek"
                            ? "border-[#4a6b5a] bg-[#4a6b5a]/20"
                            : "border-[#4a6b5a]/30 bg-[#0a1810]/50 hover:border-[#4a6b5a]/60"
                        }`}>
                          <input
                            type="radio"
                            name="gender"
                            value="erkek"
                            checked={formData.gender === "erkek"}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span className="text-2xl select-none">♂️</span>
                          <span className="text-xs font-medium">Erkek</span>
                        </label>

                        <label className={`flex flex-col items-center gap-1 cursor-pointer rounded-lg border-2 p-2 transition-all ${
                          formData.gender === "kadin"
                            ? "border-[#4a6b5a] bg-[#4a6b5a]/20"
                            : "border-[#4a6b5a]/30 bg-[#0a1810]/50 hover:border-[#4a6b5a]/60"
                        }`}>
                          <input
                            type="radio"
                            name="gender"
                            value="kadin"
                            checked={formData.gender === "kadin"}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span className="text-2xl select-none">♀️</span>
                          <span className="text-xs font-medium">Kadın</span>
                        </label>

                        <label className={`flex flex-col items-center gap-1 cursor-pointer rounded-lg border-2 p-2 transition-all ${
                          formData.gender === "belirtmek-istemiyorum"
                            ? "border-[#4a6b5a] bg-[#4a6b5a]/20"
                            : "border-[#4a6b5a]/30 bg-[#0a1810]/50 hover:border-[#4a6b5a]/60"
                        }`}>
                          <input
                            type="radio"
                            name="gender"
                            value="belirtmek-istemiyorum"
                            checked={formData.gender === "belirtmek-istemiyorum"}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <span className="text-2xl select-none">⚧️</span>
                          <span className="text-xs font-medium text-center">Diğer</span>
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div>
                          <label className="block text-base font-semibold text-[#d4c494]">
                            İlgi Alanları
                          </label>
                          <p className="mt-1 text-xs text-gray-400">
                            Hediye tercihlerinizi belirlemek için ilgi alanlarınızı seçin
                          </p>
                        </div>
                        {formData.interests.length > 0 && (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4a6b5a]/30 text-sm font-bold text-[#d4c494]">
                            {formData.interests.length}
                          </div>
                        )}
                      </div>
                      
                      {/* Search Input with Icon */}
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          placeholder="İlgi alanı ara..."
                          value={interestSearch}
                          onChange={(e) => setInterestSearch(e.target.value)}
                          className="w-full rounded-xl border-2 border-[#4a6b5a]/30 bg-[#0a1810]/70 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 transition-all focus:border-[#4a6b5a] focus:bg-[#0a1810] focus:outline-none focus:ring-2 focus:ring-[#4a6b5a]/20"
                        />
                        {interestSearch && (
                          <button
                            type="button"
                            onClick={() => setInterestSearch("")}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-300"
                          >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>

                      {/* Selected Interests Preview */}
                      {formData.interests.length > 0 && (
                        <div className="rounded-xl border-2 border-[#4a6b5a]/40 bg-gradient-to-br from-[#4a6b5a]/10 to-[#0a1810]/50 p-4 backdrop-blur-sm">
                          <div className="mb-3 flex items-center gap-2">
                            <svg className="h-5 w-5 text-[#d4c494]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm font-semibold text-[#d4c494]">
                              Seçilenler ({formData.interests.length})
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {formData.interests.map((interestId) => {
                              const interestName = getInterestName(interestId);
                              return (
                                <span
                                  key={interestId}
                                  className="group inline-flex items-center gap-2 rounded-full border border-[#4a6b5a] bg-[#4a6b5a]/30 px-4 py-1.5 text-xs font-medium text-[#d4c494] transition-all hover:bg-[#4a6b5a]/40"
                                >
                                  <svg className="h-3 w-3 text-[#4a6b5a]" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                  {interestName}
                                  <button
                                    type="button"
                                    onClick={() => handleInterestToggle(interestId)}
                                    className="ml-1 rounded-full p-0.5 transition-all hover:bg-[#4a6b5a]/50 hover:text-white"
                                    aria-label={`${interestName} seçimini kaldır`}
                                  >
                                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                  </button>
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Interests Grid - Enhanced Scrollable Container */}
                      <div className="rounded-xl border-2 border-[#4a6b5a]/30 bg-gradient-to-br from-[#0a1810]/80 to-[#0f1f18]/50 p-4 backdrop-blur-sm">
                        {loadingInterests ? (
                          <div className="flex flex-col items-center justify-center py-12">
                            <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-[#4a6b5a]/30 border-t-[#4a6b5a]"></div>
                            <p className="text-sm text-gray-400">İlgi alanları yükleniyor...</p>
                          </div>
                        ) : interestsError ? (
                          <div className="flex flex-col items-center justify-center py-12">
                            <svg className="mb-3 h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="mb-2 text-sm font-medium text-red-400">{interestsError}</p>
                            <button
                              type="button"
                              onClick={fetchInterests}
                              className="mt-4 rounded-lg border border-[#4a6b5a] bg-[#4a6b5a]/20 px-4 py-2 text-sm font-medium text-[#d4c494] transition-all hover:bg-[#4a6b5a]/30"
                            >
                              Tekrar Dene
                            </button>
                          </div>
                        ) : filteredInterests.length > 0 ? (
                          <div className="interest-scroll max-h-72 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                              {filteredInterests.map((interest) => {
                                const isSelected = formData.interests.includes(interest.id);
                                return (
                                  <button
                                    key={interest.id}
                                    type="button"
                                    onClick={() => handleInterestToggle(interest.id)}
                                    className={`group relative flex items-center justify-center rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                      isSelected
                                        ? "border-[#4a6b5a] bg-gradient-to-br from-[#4a6b5a]/40 to-[#4a6b5a]/20 text-[#d4c494] shadow-lg shadow-[#4a6b5a]/20 scale-[1.02]"
                                        : "border-[#4a6b5a]/20 bg-[#0a1810]/40 text-gray-400 hover:border-[#4a6b5a]/50 hover:bg-[#0a1810]/60 hover:text-gray-300 hover:scale-[1.01]"
                                    }`}
                                  >
                                    {isSelected && (
                                      <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#4a6b5a] text-xs text-white shadow-md">
                                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                      </div>
                                    )}
                                    <span className="text-center leading-tight">{interest.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center py-12">
                            <svg className="mb-3 h-12 w-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm font-medium text-gray-500">Arama sonucu bulunamadı</p>
                            <p className="mt-1 text-xs text-gray-600">Farklı bir arama terimi deneyin</p>
                          </div>
                        )}
                      </div>

                      {/* Minimum Selection Requirement */}
                      {formData.interests.length === 0 && (
                        <div className="rounded-lg border border-yellow-600/30 bg-yellow-600/10 p-3">
                          <p className="text-xs text-yellow-400">
                            ⚠️ Lütfen en az bir ilgi alanı seçiniz
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms"
                        className="mr-2 mt-1 h-4 w-4 rounded border-[#4a6b5a]/50 bg-[#0a1810]/50 text-[#4a6b5a] focus:ring-2 focus:ring-[#4a6b5a]/20"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-400">
                        <a href="#" className="text-[#d4c494] hover:text-[#e4d4a4] transition-colors">
                          Kullanım koşullarını
                        </a>
                        {" "}ve{" "}
                        <a href="#" className="text-[#d4c494] hover:text-[#e4d4a4] transition-colors">
                          gizlilik politikasını
                        </a>
                        {" "}kabul ediyorum
                      </label>
                    </div>

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

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setStep(1);
                          setError(null);
                        }}
                        disabled={isSubmitting}
                        className="flex-1 rounded-full border-2 border-[#4a6b5a]/50 bg-transparent px-8 py-4 text-lg font-semibold text-[#d4c494] transition-all hover:border-[#4a6b5a] hover:bg-[#4a6b5a]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Geri
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#4a6b5a] to-[#5a7b6a] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                            <span>Kayıt ediliyor...</span>
                          </>
                        ) : (
                          "Kayıt Ol"
                        )}
                      </button>
                    </div>
                  </form>
                )}

                <div className="mt-6 text-center text-sm text-gray-400">
                  Zaten hesabın var mı?{" "}
                  <Link href="/login" className="text-[#d4c494] hover:text-[#e4d4a4] transition-colors font-semibold">
                    Giriş Yap
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

