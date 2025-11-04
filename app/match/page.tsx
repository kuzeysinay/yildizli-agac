"use client";

import { useState } from "react";
import Link from "next/link";

export default function MatchPage() {
  const [revealed, setRevealed] = useState(false);
  const [showTimeProposal, setShowTimeProposal] = useState(false);
  const [myProposedTimes, setMyProposedTimes] = useState<string[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  // TODO: This would come from authentication/database
  const matchInfo = {
    matchedWith: {
      firstName: "Ayşe",
      lastName: "Demir",
      email: "ayse.demir@std.yildiz.edu.tr",
      gender: "kadin",
      preferences: [
        "Kitap severim, özellikle bilim kurgu ve fantastik türler",
        "Kahve tutkunuyum ☕",
        "El yapımı süslemeler ve dekoratif objeler hoşuma gider",
        "Teknoloji aksesuarları kullanışlı olur",
      ],
      favoriteColor: "Mavi ve mor tonları",
      hobbies: "Okuma, fotoğrafçılık, yürüyüş",
      proposedTimes: [
        "27 Aralık 2025 - 14:00",
        "28 Aralık 2025 - 16:30",
        "29 Aralık 2025 - 15:00",
      ],
    },
    matchDate: "25 Aralık 2025",
    deliveryDate: "31 Aralık 2025",
    myProposedTimes: [
      "27 Aralık 2025 - 14:00",
      "28 Aralık 2025 - 10:00",
      "30 Aralık 2025 - 18:00",
    ],
  };

  // Find overlapping times
  const overlappingTimes = matchInfo.myProposedTimes.filter(time =>
    matchInfo.matchedWith.proposedTimes.includes(time)
  );

  const handleAddTime = () => {
    if (newDate && newTime && myProposedTimes.length < 3) {
      const formattedDateTime = `${newDate} - ${newTime}`;
      setMyProposedTimes([...myProposedTimes, formattedDateTime]);
      setNewDate("");
      setNewTime("");
    }
  };

  const handleRemoveTime = (index: number) => {
    setMyProposedTimes(myProposedTimes.filter((_, i) => i !== index));
  };

  // Get initials from name for anonymity
  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}. ${lastName.charAt(0)}.`;
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
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl sm:text-3xl font-bold hover:opacity-80 transition-opacity">
              <span className="select-none">🎄</span> YILDIZLI AĞAÇ
            </Link>
            <Link href="/profile" className="rounded-full border-2 border-[#4a6b5a]/50 px-6 py-2 text-sm font-semibold text-[#d4c494] transition-all hover:border-[#4a6b5a] hover:bg-[#4a6b5a]/10">
              Profilim
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="container relative z-10 mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Page Title */}
            <div className="mb-8 text-center">
              <h1 className="mb-4 text-5xl font-bold">
                <span className="bg-linear-to-r from-[#9db89d] to-[#c4d4a6] bg-clip-text text-transparent">
                  EŞLEŞMEN
                </span>
              </h1>
              <p className="text-lg text-gray-300">
                Yılbaşı 2026'da hediye alacağın kişi...
              </p>
            </div>

            {/* Reveal Card */}
            {!revealed ? (
              <div className="mb-6 rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-12 backdrop-blur-sm text-center">
                <div className="mb-6 text-9xl select-none animate-pulse">🎁</div>
                <h2 className="mb-4 text-3xl font-bold">Sürpriz Zamanı!</h2>
                <p className="mb-8 text-gray-400">
                  Hediye alacağın kişiyi öğrenmeye hazır mısın?
                </p>
                <button
                  onClick={() => setRevealed(true)}
                  className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-red-600 to-red-700 px-12 py-4 text-xl font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  <span className="select-none">🎄</span>
                  <span>Açığa Çıkar!</span>
                </button>
              </div>
            ) : (
              <>
                 {/* Match Revealed */}
                 <div className="mb-6 rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-8 backdrop-blur-sm">
                   <div className="mb-6 flex items-center gap-6">
                     <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-[#4a6b5a] to-[#5a7b6a] text-5xl select-none">
                       {matchInfo.matchedWith.gender === "erkek" ? "♂️" : matchInfo.matchedWith.gender === "kadin" ? "♀️" : "⚧️"}
                     </div>
                     <div>
                       <h2 className="mb-2 text-3xl font-bold text-[#d4c494]">
                         {getInitials(matchInfo.matchedWith.firstName, matchInfo.matchedWith.lastName)}
                       </h2>
                       <p className="text-gray-400 text-sm">Gizlilik için tam isim gösterilmemektedir</p>
                     </div>
                   </div>

                  <div className="rounded-lg bg-[#0a1810]/50 p-6">
                    <div className="mb-4 flex items-center gap-2">
                      <span className="text-2xl select-none">🎁</span>
                      <h3 className="text-xl font-bold">Önemli Bilgi</h3>
                    </div>
                    <p className="text-gray-300">
                      Bu kişi senin hediye vereceğin kişi! Unutma, bu bir <strong>sır</strong> olmalı. 
                      Hediyeni <strong>{matchInfo.deliveryDate}</strong> tarihinde teslim et.
                    </p>
                  </div>
                </div>

                {/* Preferences & Info */}
                <div className="mb-6 rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-8 backdrop-blur-sm">
                  <div className="mb-6 flex items-center gap-2">
                    <span className="text-2xl select-none">📝</span>
                    <h3 className="text-2xl font-bold">Hediye Tercihleri</h3>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="mb-3 font-semibold text-[#d4c494]">İlgi Alanları ve Tercihler:</h4>
                      <ul className="space-y-2">
                        {matchInfo.matchedWith.preferences.map((pref, index) => (
                          <li key={index} className="flex items-start gap-2 text-gray-300">
                            <span className="mt-1 text-[#d4c494]">•</span>
                            <span>{pref}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg bg-[#0a1810]/50 p-4">
                        <h4 className="mb-2 font-semibold text-[#d4c494]">Favori Renkler:</h4>
                        <p className="text-gray-300">{matchInfo.matchedWith.favoriteColor}</p>
                      </div>

                      <div className="rounded-lg bg-[#0a1810]/50 p-4">
                        <h4 className="mb-2 font-semibold text-[#d4c494]">Hobiler:</h4>
                        <p className="text-gray-300">{matchInfo.matchedWith.hobbies}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Meeting Time Coordination */}
                <div className="mb-6 rounded-2xl border border-[#4a6b5a]/30 bg-linear-to-br from-[#1a2f25]/50 to-[#0f1f18]/50 p-8 backdrop-blur-sm">
                  <div className="mb-6 flex items-center gap-2">
                    <span className="text-2xl select-none">📅</span>
                    <h3 className="text-2xl font-bold">Buluşma Zamanı Koordinasyonu</h3>
                  </div>

                  <p className="mb-6 text-gray-400">
                    Hediyeyi teslim etmek için uygun olduğunuz 3 tarih ve saat önerisinde bulunun. 
                    Eşleştiğiniz kişinin önerileriyle karşılaştırıp ortak zaman bulabilirsiniz.
                  </p>

                  {/* Overlapping Times Alert */}
                  {overlappingTimes.length > 0 && (
                    <div className="mb-6 rounded-lg border-2 border-green-600/50 bg-green-600/10 p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl select-none">✅</span>
                        <h4 className="text-lg font-bold text-green-400">Ortak Zamanlar Bulundu!</h4>
                      </div>
                      <ul className="space-y-2">
                        {overlappingTimes.map((time, index) => (
                          <li key={index} className="flex items-center gap-2 text-green-300">
                            <span>🎯</span>
                            <span className="font-semibold">{time}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid gap-6 md:grid-cols-2">
                    {/* My Proposed Times */}
                    <div className="rounded-lg bg-[#0a1810]/50 p-6">
                      <h4 className="mb-4 font-semibold text-[#d4c494]">Senin Önerdiğin Zamanlar:</h4>
                      
                      {matchInfo.myProposedTimes.length > 0 ? (
                        <ul className="mb-4 space-y-2">
                          {matchInfo.myProposedTimes.map((time, index) => (
                            <li key={index} className="flex items-center justify-between rounded bg-[#4a6b5a]/20 px-3 py-2">
                              <span className="text-sm">{time}</span>
                              <span className="text-green-400">✓</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mb-4 text-sm text-gray-500">Henüz zaman önermediniz</p>
                      )}

                      {!showTimeProposal && matchInfo.myProposedTimes.length < 3 && (
                        <button
                          onClick={() => setShowTimeProposal(true)}
                          className="w-full rounded-lg border-2 border-[#4a6b5a]/50 px-4 py-2 text-sm font-semibold transition-all hover:border-[#4a6b5a] hover:bg-[#4a6b5a]/10"
                        >
                          + Zaman Öner
                        </button>
                      )}

                      {showTimeProposal && (
                        <div className="mt-4 space-y-3">
                          <div>
                            <label className="mb-1 block text-xs text-gray-400">Tarih</label>
                            <input
                              type="date"
                              value={newDate}
                              onChange={(e) => setNewDate(e.target.value)}
                              className="w-full rounded-lg border border-[#4a6b5a]/50 bg-[#0a1810]/50 px-3 py-2 text-sm text-white transition-colors focus:border-[#4a6b5a] focus:outline-none focus:ring-2 focus:ring-[#4a6b5a]/20"
                            />
                          </div>
                          <div>
                            <label className="mb-1 block text-xs text-gray-400">Saat</label>
                            <input
                              type="time"
                              value={newTime}
                              onChange={(e) => setNewTime(e.target.value)}
                              className="w-full rounded-lg border border-[#4a6b5a]/50 bg-[#0a1810]/50 px-3 py-2 text-sm text-white transition-colors focus:border-[#4a6b5a] focus:outline-none focus:ring-2 focus:ring-[#4a6b5a]/20"
                            />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handleAddTime}
                              disabled={!newDate || !newTime}
                              className="flex-1 rounded-lg bg-[#4a6b5a] px-4 py-2 text-sm font-semibold transition-all hover:bg-[#5a7b6a] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Ekle
                            </button>
                            <button
                              onClick={() => {
                                setShowTimeProposal(false);
                                setNewDate("");
                                setNewTime("");
                              }}
                              className="flex-1 rounded-lg border border-[#4a6b5a]/50 px-4 py-2 text-sm font-semibold transition-all hover:bg-[#4a6b5a]/10"
                            >
                              İptal
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                     {/* Their Proposed Times */}
                     <div className="rounded-lg bg-[#0a1810]/50 p-6">
                       <h4 className="mb-4 font-semibold text-[#d4c494]">
                         {matchInfo.matchedWith.firstName.charAt(0)}. Önerdiği Zamanlar:
                       </h4>
                       {matchInfo.matchedWith.proposedTimes.length > 0 ? (
                         <ul className="space-y-2">
                           {matchInfo.matchedWith.proposedTimes.map((time, index) => (
                             <li
                               key={index}
                               className={`flex items-center justify-between rounded px-3 py-2 ${
                                 overlappingTimes.includes(time)
                                   ? "bg-green-600/20 border border-green-600/50"
                                   : "bg-[#4a6b5a]/20"
                               }`}
                             >
                               <span className="text-sm">{time}</span>
                               {overlappingTimes.includes(time) && (
                                 <span className="text-green-400">🎯</span>
                               )}
                             </li>
                           ))}
                         </ul>
                       ) : (
                         <p className="text-sm text-gray-500">
                           {matchInfo.matchedWith.firstName.charAt(0)}. henüz zaman önermedi
                         </p>
                       )}
                     </div>
                  </div>
                </div>

                {/* Reminder Card */}
                <div className="mb-6 rounded-2xl border border-yellow-600/30 bg-linear-to-br from-yellow-900/20 to-yellow-800/10 p-6 backdrop-blur-sm">
                  <div className="flex items-start gap-4">
                    <span className="text-4xl select-none">⚠️</span>
                    <div>
                      <h3 className="mb-2 text-xl font-bold text-yellow-400">Hatırlatma</h3>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• Hediye bütçesi: 100-300 TL arası önerilir</li>
                        <li>• Teslim tarihiniz: <strong>{matchInfo.deliveryDate}</strong></li>
                        <li>• Eşleşmeni gizli tut - bu bir sürpriz! 🤫</li>
                        <li>• Kişinin tercihlerini dikkate alarak düşünceli bir hediye seç</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/profile"
                    className="flex-1 rounded-full border-2 border-[#d4c494]/50 px-8 py-4 text-center text-lg font-semibold text-[#d4c494] transition-all hover:border-[#d4c494] hover:bg-[#d4c494]/10"
                  >
                    Profilime Dön
                  </Link>
                </div>
              </>
            )}
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

