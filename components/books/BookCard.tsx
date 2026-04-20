import Link from "next/link";
import BookCover from "./BookCover";
import DiamondRating from "./DiamondRating";
import { Badge } from "@/components/ui/badge";

type Book = {
  id: string;
  title: string;
  author: string;
  isbn: string | null;
  coverUrl: string | null;
  coverColor: string;
  rating: number;
  ratingLabel: string;
  genre: string;
};

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/books/${book.id}`} className="group block">
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-white/5 mb-3 shadow-lg group-hover:shadow-[#ff2d78]/20 group-hover:scale-[1.02] transition-all duration-300">
        <BookCover
          title={book.title}
          author={book.author}
          isbn={book.isbn}
          coverUrl={book.coverUrl}
          coverColor={book.coverColor}
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 16vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="space-y-1 px-0.5">
        <p className="text-white font-heading font-semibold text-sm leading-tight line-clamp-2 group-hover:text-[#ff2d78] transition-colors">
          {book.title}
        </p>
        <p className="text-white/50 text-xs font-sans">{book.author}</p>
        <div className="flex items-center justify-between">
          <DiamondRating rating={book.rating} size="sm" />
          <Badge
            variant="secondary"
            className="text-xs bg-white/5 text-white/40 border-0 hover:bg-white/5"
          >
            {book.genre}
          </Badge>
        </div>
      </div>
    </Link>
  );
}
