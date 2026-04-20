"use client";

import { useState } from "react";
import books from "@/data/books.json";
import BookCard from "@/components/books/BookCard";

type Filter = "All" | "Fiction" | "Non-fiction";

export default function BooksPage() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = filter === "All" ? books : books.filter((b) => b.genre === filter);
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.dateRead).getTime() - new Date(a.dateRead).getTime()
  );

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10 space-y-4">
        <p className="text-xs tracking-[0.3em] uppercase text-[#c9a84c] font-sans">2026</p>
        <h1 className="font-heading text-5xl font-bold text-white">All Books</h1>
        <p className="text-white/40 font-sans">{books.length} books read so far</p>

        {/* Filter */}
        <div className="flex gap-2 pt-2">
          {(["All", "Fiction", "Non-fiction"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-sans tracking-wide transition-all ${
                filter === f
                  ? "bg-[#ff2d78] text-white"
                  : "border border-white/20 text-white/50 hover:border-[#ff2d78]/50 hover:text-white/80"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="text-white/30 text-center py-20 font-sans">No books yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-10">
          {sorted.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </main>
  );
}
