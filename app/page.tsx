import Link from "next/link";
import books from "@/data/books.json";
import { buttonVariants } from "@/components/ui/button";
import DiamondRating from "@/components/books/DiamondRating";

export default function Home() {
  const avgRating = books.length
    ? (books.reduce((sum, b) => sum + b.rating, 0) / books.length).toFixed(1)
    : "—";

  const fictionCount = books.filter((b) => b.genre === "Fiction").length;
  const nonFictionCount = books.filter((b) => b.genre === "Non-fiction").length;

  const recent = [...books]
    .sort((a, b) => new Date(b.dateRead).getTime() - new Date(a.dateRead).getTime())
    .slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="relative py-28 px-6 text-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, #ff2d78 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, #1d4ed8 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a84c] font-sans">2026 Reading List</p>
          <h1 className="font-heading text-6xl md:text-7xl font-bold text-white leading-none">
            Babs&apos; Book Club
          </h1>
          <p className="text-white/50 text-lg font-sans">
            Every book I read this year, rated and reviewed. No filter.
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
            <div
              key={label}
              className="rounded-xl border border-white/10 bg-white/5 p-6 text-center"
            >
              <p className="font-heading text-4xl font-bold text-[#ff2d78]">{value}</p>
              <p className="text-white/40 text-xs mt-1 uppercase tracking-widest font-sans">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Diamond legend */}
      <section className="max-w-3xl mx-auto px-6 pb-10">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs tracking-[0.2em] uppercase text-[#c9a84c] font-sans mb-4">The Rating Scale</p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { rating: 1, label: "Raw" },
              { rating: 2, label: "Cut" },
              { rating: 3, label: "Polished" },
              { rating: 4, label: "Radiant" },
              { rating: 5, label: "Marry Me" },
            ].map(({ rating, label }) => (
              <div key={rating} className="text-center space-y-1">
                <DiamondRating rating={rating} size="sm" />
                <p className="text-white/40 text-xs font-sans">{label}</p>
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
