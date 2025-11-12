import type { Metadata } from "next";
import { Work_Sans, Graduate, Quicksand, Inter, Modak } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  fallback: ["system-ui", "sans-serif"],
});

const graduate = Graduate({
  weight: ["400"],
  variable: "--font-graduate",
  subsets: ["latin"],
  fallback: ["Georgia", "serif"],
});

const quicksand = Quicksand({
  weight: ["600", "700"],
  variable: "--font-quicksand",
  subsets: ["latin"],
  fallback: ["system-ui", "sans-serif"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  fallback: ["system-ui", "sans-serif"],
});

const modak = Modak({
  variable: "--font-modak",
  subsets: ["latin"],
  weight: ["400"],
  fallback: ["cursive", "fantasy"],
});

export const metadata: Metadata = {
  title: "Yıldızlı Ağaç 2026 - YTÜ Hediye Eşleştirme",
  description: "YTÜ Yılbaşı 2026 hediye değişim etkinliği",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${workSans.variable} ${graduate.variable} ${quicksand.variable} ${inter.variable} ${modak.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
