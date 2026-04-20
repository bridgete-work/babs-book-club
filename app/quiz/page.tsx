"use client";

import { useState } from "react";
import Link from "next/link";
import books from "@/data/books.json";
import { buttonVariants } from "@/components/ui/button";

type PersonalityType = "feeler" | "mystic" | "builder" | "polymath" | "unhinged";

const TYPE_INFO: Record<PersonalityType, { name: string; emoji: string; description: string }> = {
  feeler: {
    name: "The Feeler",
    emoji: "💔",
    description: "You read for emotional connection and you're not afraid to cry in public. Books are your therapy and your love language.",
  },
  mystic: {
    name: "The Mystic",
    emoji: "🌙",
    description: "Witchy, spiritual, and deeply tuned in. You believe the universe communicates and you're listening.",
  },
  builder: {
    name: "The Builder",
    emoji: "📈",
    description: "You read with purpose. Every book is a tool, a framework, or a spark. You want to change the world and you're taking notes.",
  },
  polymath: {
    name: "The Polymath",
    emoji: "📚",
    description: "Impossibly well-read across everything. History, science, culture — you can't help yourself and we respect it.",
  },
  unhinged: {
    name: "The Unhinged",
    emoji: "💀",
    description: "You're here for the chaos, the laughs, and the completely unhinged true stories. No notes.",
  },
};

const QUESTIONS = [
  {
    question: "Your ideal Sunday looks like...",
    answers: [
      { text: "Saging my home and taking a bath", type: "mystic" as PersonalityType },
      { text: "Creating a playlist to cry to or sing to depending on my mood", type: "feeler" as PersonalityType },
      { text: "Going down a rabbit hole on something you knew nothing about", type: "polymath" as PersonalityType },
      { text: "Determining your 5-year plan with a good coffee", type: "builder" as PersonalityType },
      { text: "Texting your group chat something unhinged you just read", type: "unhinged" as PersonalityType },
    ],
  },
  {
    question: "You pick up a book because...",
    answers: [
      { text: "It suggests there's life beyond what we know on Earth", type: "mystic" as PersonalityType },
      { text: "The color fits perfectly into your bookcase that's organized by color", type: "feeler" as PersonalityType },
      { text: "You heard it on a podcast about science or history", type: "polymath" as PersonalityType },
      { text: "It's on every CEO's reading list", type: "builder" as PersonalityType },
      { text: "The title is ridiculous", type: "unhinged" as PersonalityType },
    ],
  },
  {
    question: "What do you want to feel when you finish a book?",
    answers: [
      { text: "Like the universe just winked at you", type: "mystic" as PersonalityType },
      { text: "Emotionally wrecked in the best way", type: "feeler" as PersonalityType },
      { text: "Smarter than you were 300 pages ago", type: "polymath" as PersonalityType },
      { text: "Like you could change the world", type: "builder" as PersonalityType },
      { text: "Like you need to immediately tell someone what you just read", type: "unhinged" as PersonalityType },
    ],
  },
  {
    question: "Your friends would describe your reading taste as...",
    answers: [
      { text: "A little witchy", type: "mystic" as PersonalityType },
      { text: "Always meaningful", type: "feeler" as PersonalityType },
      { text: "Impossibly well-read", type: "polymath" as PersonalityType },
      { text: "Annoyingly practical", type: "builder" as PersonalityType },
      { text: "Completely unhinged", type: "unhinged" as PersonalityType },
    ],
  },
  {
    question: "The last thing you bookmarked or screenshot was...",
    answers: [
      { text: "A moon phase or birth chart", type: "mystic" as PersonalityType },
      { text: "A quote you wanted to text your ex but didn't", type: "feeler" as PersonalityType },
      { text: "A fact so wild you had to save it", type: "polymath" as PersonalityType },
      { text: "A framework, a tip, or someone's morning routine", type: "builder" as PersonalityType },
      { text: "A passage that made you laugh out loud or gasp", type: "unhinged" as PersonalityType },
    ],
  },
  {
    question: "Where are you most likely reading?",
    answers: [
      { text: "In a bath with candles and a glass of something", type: "mystic" as PersonalityType },
      { text: "Anywhere — you get emotionally transported regardless", type: "feeler" as PersonalityType },
      { text: "At a desk with tabs open to fact-check everything", type: "polymath" as PersonalityType },
      { text: "On a flight or between meetings", type: "builder" as PersonalityType },
      { text: "On your phone at 1am when you should be sleeping", type: "unhinged" as PersonalityType },
    ],
  },
];

export default function QuizPage() {
  const [phase, setPhase] = useState<"intro" | "quiz" | "results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState<Record<PersonalityType, number>>({
    feeler: 0, mystic: 0, builder: 0, polymath: 0, unhinged: 0,
  });

  function handleAnswer(type: PersonalityType) {
    const updated = { ...scores, [type]: scores[type] + 1 };
    setScores(updated);
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      setPhase("results");
    }
  }

  function restart() {
    setPhase("intro");
    setCurrentQ(0);
    setScores({ feeler: 0, mystic: 0, builder: 0, polymath: 0, unhinged: 0 });
  }

  const total = QUESTIONS.length;
  const sortedTypes = (Object.entries(scores) as [PersonalityType, number][])
    .filter(([, count]) => count > 0)
    .sort((a, b) => b[1] - a[1]);

  if (phase === "intro") {
    return (
      <main className="max-w-2xl mx-auto px-6 py-20 text-center space-y-8">
        <div className="space-y-2">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a84c] font-sans">The Quiz</p>
          <h1 className="font-heading text-5xl font-bold text-white">What&apos;s Your Babs&apos; Book Club Type?</h1>
        </div>
        <p className="text-white/50 font-sans text-lg leading-relaxed">
          6 questions. No wrong answers. Find out which of Babs&apos; 5 reader personalities you are — and get your personal book recommendations.
        </p>
        <div className="flex justify-center gap-3 flex-wrap text-sm text-white/40 font-sans">
          {Object.values(TYPE_INFO).map((t) => (
            <span key={t.name}>{t.emoji} {t.name}</span>
          ))}
        </div>
        <button
          onClick={() => setPhase("quiz")}
          className="px-8 py-3 rounded-full bg-[#ff2d78] text-white font-sans text-sm tracking-wide hover:bg-[#e0196a] transition-colors"
        >
          Let&apos;s Go
        </button>
      </main>
    );
  }

  if (phase === "quiz") {
    const q = QUESTIONS[currentQ];
    const progress = ((currentQ) / total) * 100;

    return (
      <main className="max-w-2xl mx-auto px-6 py-12 space-y-8">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-white/30 font-sans">
            <span>Question {currentQ + 1} of {total}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ff2d78] rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h2 className="font-heading text-3xl font-semibold text-white">{q.question}</h2>

        <div className="space-y-3">
          {q.answers.map((answer) => (
            <button
              key={answer.type}
              onClick={() => handleAnswer(answer.type)}
              className="w-full text-left px-5 py-4 rounded-xl border border-white/10 bg-white/5 text-white/70 font-sans text-sm hover:border-[#ff2d78]/60 hover:bg-[#ff2d78]/10 hover:text-white transition-all"
            >
              {answer.text}
            </button>
          ))}
        </div>
      </main>
    );
  }

  // Results
  const topType = sortedTypes[0]?.[0];
  const topInfo = topType ? TYPE_INFO[topType] : null;

  return (
    <main className="max-w-2xl mx-auto px-6 py-12 space-y-10">
      <div className="text-center space-y-3">
        <p className="text-xs tracking-[0.3em] uppercase text-[#c9a84c] font-sans">Your Result</p>
        {topInfo && (
          <>
            <div className="text-6xl">{topInfo.emoji}</div>
            <h1 className="font-heading text-5xl font-bold text-white">{topInfo.name}</h1>
            <p className="text-white/60 font-sans leading-relaxed">{topInfo.description}</p>
          </>
        )}
      </div>

      {/* Full breakdown */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 space-y-3">
        <p className="text-xs tracking-[0.2em] uppercase text-[#c9a84c] font-sans mb-4">Your Full Breakdown</p>
        {(Object.entries(scores) as [PersonalityType, number][])
          .sort((a, b) => b[1] - a[1])
          .map(([type, count]) => {
            const pct = Math.round((count / total) * 100);
            const info = TYPE_INFO[type];
            return (
              <div key={type} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70 font-sans">{info.emoji} {info.name}</span>
                  <span className="text-[#ff2d78] font-sans font-medium">{pct}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#ff2d78] rounded-full transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
      </div>

      {/* Book recommendations */}
      {sortedTypes.length > 0 && (
        <div className="space-y-4">
          <p className="text-xs tracking-[0.2em] uppercase text-[#c9a84c] font-sans">Books For You</p>
          <div className="space-y-2">
            {books
              .filter((b) =>
                sortedTypes
                  .slice(0, 2)
                  .some(([type]) => b.personalityTypes.includes(type))
              )
              .slice(0, 5)
              .map((book) => (
                <Link
                  key={book.id}
                  href={`/books/${book.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-[#ff2d78]/40 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-heading font-semibold truncate">{book.title}</p>
                    <p className="text-white/40 text-xs font-sans">{book.author}</p>
                  </div>
                  <div className="text-[#ff2d78] text-xs font-sans">
                    {"◆".repeat(book.rating)}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}

      <div className="flex gap-3 justify-center">
        <button
          onClick={restart}
          className="px-6 py-2.5 rounded-full border border-white/20 text-white/60 font-sans text-sm hover:border-[#ff2d78]/50 hover:text-white transition-all"
        >
          Retake Quiz
        </button>
        <Link
          href="/books"
          className={buttonVariants()}
        >
          Browse All Books
        </Link>
      </div>
    </main>
  );
}
