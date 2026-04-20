import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Link from "next/link";
import SkaterGirl from "@/components/SkaterGirl";
import SkaterGirlBlue from "@/components/SkaterGirlBlue";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Babs' Book Club",
  description: "My 2026 reading journey — every book, rated and reviewed.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-background text-foreground antialiased">
        <header className="border-b border-white/10 sticky top-0 z-20 bg-background/80 backdrop-blur">
          <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-heading text-2xl font-bold tracking-wide text-white">
              Babs&apos; Book Club
            </Link>
            <div className="flex gap-8 text-sm tracking-wide">
              <Link href="/books" className="text-white/60 hover:text-[#ff2d78] transition-colors">
                Books
              </Link>
              <Link href="/quiz" className="text-white/60 hover:text-[#ff2d78] transition-colors">
                Quiz
              </Link>
            </div>
          </nav>
        </header>

        <div className="flex-1 relative overflow-hidden">
          {children}
          <SkaterGirl />
          <SkaterGirlBlue />
        </div>

        <footer className="border-t border-white/10 py-6 text-center text-xs text-white/30 tracking-widest uppercase">
          Babs&apos; Book Club &nbsp;·&nbsp; 2026
        </footer>
      </body>
    </html>
  );
}
