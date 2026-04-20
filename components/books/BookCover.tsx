import Image from "next/image";

type Props = {
  title: string;
  author: string;
  isbn: string | null;
  coverUrl: string | null;
  coverColor: string;
  fill?: boolean;
  sizes?: string;
};

export default function BookCover({ title, author, isbn, coverUrl, coverColor, fill = true, sizes }: Props) {
  const src = coverUrl || (isbn ? `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg` : null);

  if (src) {
    return (
      <Image
        src={src}
        alt={`${title} by ${author}`}
        fill={fill}
        className="object-cover"
        sizes={sizes || "(max-width: 768px) 50vw, 25vw"}
      />
    );
  }

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center"
      style={{ background: `linear-gradient(145deg, ${coverColor}, #0a0a1a)` }}
    >
      <div className="text-[#c9a84c] text-xs mb-2 opacity-60">◆</div>
      <p className="text-white text-xs font-heading font-semibold leading-tight line-clamp-3">{title}</p>
      <p className="text-white/50 text-xs mt-1 font-sans">{author}</p>
    </div>
  );
}
