import Link from "next/link";
import books from "@/data/books.json";
import { buttonVariants } from "@/components/ui/button";
import DiamondRating from "@/components/books/DiamondRating";
import RubiksCube from "@/components/RubiksCube";

const SPARKLES = [
  { top: "10%", left: "8%", size: "1rem", delay: "0s", duration: "3s" },
  { top: "20%", left: "88%", size: "0.7rem", delay: "0.8s", duration: "2.5s" },
  { top: "35%", left: "5%", size: "0.5rem", delay: "1.5s", duration: "4s" },
  { top: "15%", left: "75%", size: "1.2rem", delay: "0.3s", duration: "3.5s" },
  { top: "60%", left: "92%", size: "0.8rem", delay: "1.2s", duration: "2.8s" },
  { top: "70%", left: "3%", size: "0.6rem", delay: "0.6s", duration: "3.2s" },
  { top: "45%", left: "95%", size: "0.9rem", delay: "2s", duration: "2.6s" },
  { top: "80%", left: "12%", size: "0.5rem", delay: "1.8s", duration: "3.8s" },
  { top: "25%", left: "50%", size: "0.4rem", delay: "0.4s", duration: "4.2s" },
  { top: "55%", left: "60%", size: "0.6rem", delay: "2.2s", duration: "3s" },
  { top: "8%", left: "40%", size: "0.8rem", delay: "1s", duration: "2.4s" },
  { top: "90%", left: "45%", size: "0.5rem", delay: "0.2s", duration: "3.6s" },
];

const RATING_TIERS = [
  { rating: 1, label: "Raw" },
  { rating: 2, label: "Cut" },
  { rating: 3, label: "Polished" },
  { rating: 4, label: "Radiant" },
  { rating: 5, label: "Marry Me" },
];

export default function Home() {
  const avgRating = books.length
    ? (books.reduce((sum, b) => sum + b.rating, 0) / books.length).toFixed(1)
    : "—";

  const fictionCount = books.filter((b) => b.genre === "Fiction").length;
  const nonFictionCount = books.filter((b) => b.genre === "Non-fiction").length;

  const recent = ["the-correspondent", "strangers", "signs"]
    .map((id) => books.find((b) => b.id === id))
    .filter(Boolean) as typeof books;

  return (
    <main>
      <RubiksCube />
      {/* Hero */}
      <section className="relative py-28 px-6 text-center overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, #ff2d78 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, #1d4ed8 0%, transparent 50%)",
          }}
        />

        {/* Floating sparkles */}
        {SPARKLES.map((s, i) => (
          <span
            key={i}
            className="sparkle"
            style={{
              top: s.top,
              left: s.left,
              fontSize: s.size,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          >
            {i % 3 === 0 ? "◆" : i % 3 === 1 ? "✦" : "★"}
          </span>
        ))}

        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a84c] font-sans">2026 Reading List</p>
          <h1 className="font-heading text-6xl md:text-7xl font-bold text-white leading-none">
            Babs&apos; Book Club
          </h1>
          <p className="text-white/50 text-lg font-sans">
            Every book I&apos;ve read this year (so far), rated and reviewed.
          </p>
          <div className="flex gap-4 justify-center flex-wrap pt-2">
            <Link href="/books" className={buttonVariants({ size: "lg" })}>
              Browse Books
            </Link>
            <Link
              href="/quiz"
              className={buttonVariants({ variant: "outline", size: "lg" })}
              style={{ borderColor: "rgba(255,255,255,0.2)", color: "white" }}
            >
              Find Your Type
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-3xl mx-auto px-6 py-10">
        <div className="grid grid-cols-3 gap-4">
          {[
            { value: books.length, label: "Books Read" },
            { value: avgRating, label: "Avg Rating" },
            { value: `${fictionCount}F / ${nonFictionCount}NF`, label: "Fiction / Non-fiction" },
          ].map(({ value, label }) => (
            <div key={label} className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
              <p className="font-heading text-4xl font-bold text-[#ff2d78]">{value}</p>
              <p className="text-white/40 text-xs mt-1 uppercase tracking-widest font-sans">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Animated Diamond Rating Scale */}
      <section className="max-w-3xl mx-auto px-6 pb-10">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs tracking-[0.2em] uppercase text-[#c9a84c] font-sans mb-6">The Diamond Rating Scale</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {RATING_TIERS.map(({ rating, label }) => (
              <div key={rating} className="text-center space-y-3">
                <div className="flex justify-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className={i <= rating ? "diamond-animated" : ""}
                      style={{
                        fontSize: "1.3rem",
                        opacity: i <= rating ? 1 : 0.1,
                        animationDelay: i <= rating ? `${(i - 1) * 0.35}s` : "0s",
                        display: "inline-block",
                      }}
                    >
                      {i <= rating ? "💎" : "◇"}
                    </span>
                  ))}
                </div>
                <p className="text-white/50 text-xs font-sans">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent reads */}
      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-5">
          <p className="text-xs tracking-[0.2em] uppercase text-[#c9a84c] font-sans">Recently Read</p>
          <Link href="/books" className="text-xs text-white/40 hover:text-[#ff2d78] transition-colors font-sans">
            View all →
          </Link>
        </div>
        <div className="space-y-3">
          {recent.map((book) => (
            <Link
              key={book.id}
              href={`/books/${book.id}`}
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#ff2d78]/40 hover:bg-white/8 transition-all"
            >
              <div className="flex-1 min-w-0">
                <p className="text-white font-heading font-semibold truncate">{book.title}</p>
                <p className="text-white/40 text-xs font-sans">{book.author}</p>
              </div>
              <div className="flex-shrink-0">
                <DiamondRating rating={book.rating} size="sm" showLabel />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
