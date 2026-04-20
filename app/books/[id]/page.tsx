import { notFound } from "next/navigation";
import Link from "next/link";
import books from "@/data/books.json";
import BookCover from "@/components/books/BookCover";
import DiamondRating from "@/components/books/DiamondRating";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return books.map((b) => ({ id: b.id }));
}

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = books.find((b) => b.id === id);
  if (!book) notFound();

  const dateLabel = new Date(book.dateRead).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const typeLabels: Record<string, string> = {
    feeler: "The Feeler",
    mystic: "The Mystic",
    builder: "The Builder",
    polymath: "The Polymath",
    unhinged: "The Unhinged",
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Link
        href="/books"
        className="text-xs text-white/40 hover:text-[#ff2d78] transition-colors mb-8 inline-block font-sans tracking-wide"
      >
        ← All Books
      </Link>

      <div className="flex gap-10 flex-col sm:flex-row">
        {/* Cover */}
        <div
          className="relative w-44 h-64 flex-shrink-0 rounded-xl overflow-hidden shadow-2xl self-start"
          style={{ boxShadow: "0 25px 50px rgba(0,0,0,0.6)" }}
        >
          <BookCover
            title={book.title}
            author={book.author}
            isbn={book.isbn}
            coverUrl={book.coverUrl}
            coverColor={book.coverColor}
            sizes="176px"
          />
        </div>

        {/* Info */}
        <div className="space-y-4 flex-1">
          <div>
            <h1 className="font-heading text-4xl font-bold text-white leading-tight">{book.title}</h1>
            <p className="text-white/50 text-lg mt-1 font-sans">{book.author}</p>
          </div>

          <DiamondRating rating={book.rating} size="lg" showLabel />

          <div className="flex flex-wrap gap-2 items-center">
            <Badge className="bg-white/10 text-white/60 border-0 text-xs">{book.genre}</Badge>
            <span className="text-white/30 text-xs font-sans">Finished {dateLabel}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {book.personalityTypes.map((type) => (
              <span
                key={type}
                className="text-xs px-3 py-1 rounded-full border border-[#ff2d78]/30 text-[#ff2d78] font-sans"
              >
                {typeLabels[type]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Review */}
      <div className="mt-12 space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-[#c9a84c] text-sm">◆</span>
          <p className="text-xs tracking-[0.2em] uppercase text-[#c9a84c] font-sans">Babs&apos; Review</p>
          <span className="text-[#c9a84c] text-sm">◆</span>
        </div>
        <p className="text-white/80 leading-relaxed text-lg font-sans whitespace-pre-wrap">{book.description}</p>
      </div>

      {/* Quiz CTA */}
      <div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-white font-heading text-lg font-semibold">Not sure what to read next?</p>
          <p className="text-white/40 text-sm font-sans mt-1">Take the quiz to find your Babs&apos; Book Club personality type.</p>
        </div>
        <Link
          href="/quiz"
          className={buttonVariants()}
          style={{ whiteSpace: "nowrap" }}
        >
          Take the Quiz
        </Link>
      </div>
    </main>
  );
}
