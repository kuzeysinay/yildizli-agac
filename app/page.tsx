import Link from "next/link";
import Image from "next/image";

export default function Home() {
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
      <header className="container relative z-10 mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="w-24 sm:w-32"></div>
          <Link href="/login" className="group flex items-center gap-2 rounded-full border-2 border-[#d4c494]/40 bg-[#d4c494]/5 px-6 py-2.5 text-sm font-medium text-[#d4c494] backdrop-blur-sm transition-all hover:border-[#d4c494]/70 hover:bg-[#d4c494]/10 sm:px-8 sm:py-3">
            <span className="select-none text-base transition-transform group-hover:scale-110">🎄</span>
            <span>Giriş Yap</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container relative z-10 mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 lg:gap-10">
          
          {/* Christmas Tree - Main Focus */}
          <div className="relative flex flex-col items-center px-2 pt-4 pb-6 sm:px-6 sm:pt-6 sm:pb-8 select-none">
            {/* Soft radial glow behind the SVG to blend with background */}
            <div className="pointer-events-none absolute inset-0 -z-10 mx-auto max-w-[480px] bg-[radial-gradient(ellipse_at_center,rgba(212,196,148,0.22),rgba(17,31,25,0)_60%)] blur-2xl" />
             
             {/* Tree */}
             <div className="relative">
               <div className="flex flex-col items-center gap-1">
                 {/* Tree image */}
                 <Image
                  src="/hello.svg"
                  alt="Yıldızlı Ağaç"
                  width={420}
                  height={398}
                  className="drop-shadow-2xl max-w-[320px] w-full sm:max-w-[380px] lg:max-w-[420px] h-auto"
                  priority
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 380px, 420px"
                />
              </div>
            </div>
 
            {/* Decorative elements around tree */}
            <div className="absolute -left-6 sm:-left-8 top-1/2 text-2xl sm:text-3xl opacity-40 animate-pulse" style={{animationDelay: '0.5s'}}>⭐</div>
            <div className="absolute -right-6 sm:-right-8 top-1/3 text-2xl sm:text-3xl opacity-40 animate-pulse" style={{animationDelay: '1s'}}>⭐</div>
            <div className="absolute -left-4 sm:-left-6 top-1/4 text-xl sm:text-2xl opacity-40 animate-pulse" style={{animationDelay: '1.5s'}}>⭐</div>
            <div className="absolute -right-4 sm:-right-6 top-2/3 text-xl sm:text-2xl opacity-40 animate-pulse" style={{animationDelay: '2s'}}>⭐</div>
          </div>

          {/* Content Below Tree */}
          <div className="flex max-w-2xl -mt-2 sm:mt-0 flex-col gap-6 sm:gap-7 text-center">
            <div>
              <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="font-(family-name:--font-graduate) bg-linear-to-r from-[#9db89d] to-[#c4d4a6] bg-clip-text text-transparent text-6xl sm:text-7xl lg:text-8xl">
                  YTÜ
                </span>
                <br />
                <span className="text-white ">YILDIZLI AĞAÇ</span>
              </h2>
              <p className="text-lg text-gray-300 sm:text-xl">
                Yılbaşı 2026 sezonu arkadaşlarınla hediye alışverişi yap!
              </p>
            </div>

            <div className="space-y-4 mx-auto max-w-md">
              <div className="flex items-start gap-3 text-left">
                <span className="mt-1 text-xl select-none">🎁</span>
                <div>
                  <h3 className="font-semibold text-[#d4c494]">Eşleşme Sistemi</h3>
                  <p className="text-sm text-gray-400">
                    Otomatik olarak bir arkadaşınla eşleştirileceksin
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-left">
                <span className="mt-1 text-xl select-none">⭐</span>
                <div>
                  <h3 className="font-semibold text-[#d4c494]">Gizli Kalıyor</h3>
                  <p className="text-sm text-gray-400">
                    Kime hediye alacağın sadece sen bileceksin
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-left">
                <span className="mt-1 text-xl select-none">🎄</span>
                <div>
                  <h3 className="font-semibold text-[#d4c494]">Yılbaşı Sürprizi</h3>
                  <p className="text-sm text-gray-400">
                    Hediyeni belirtilen tarihte teslim et ve sürprizi paylaş
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/signup" className="rounded-full bg-linear-to-r from-[#4a6b5a] to-[#5a7b6a] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl text-center">
                Katıl
              </Link>
              <button className="rounded-full border-2 border-[#d4c494]/50 px-8 py-4 text-lg font-semibold text-[#d4c494] transition-all hover:border-[#d4c494] hover:bg-[#d4c494]/10">
                Nasıl Çalışır?
              </button>
            </div>
          </div>
        </div>

        {/* Info Section */}
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
      </main>

      {/* Footer */}
      <footer className="container relative z-10 mx-auto px-4 py-8 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
        <p>Yıldız Teknik Üniversitesi Öğrenci Topluluğu • 2026</p>
      </footer>
      </div>
    </div>
  );
}
