"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

type Question = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type Props = {
  questions: Question[];
};

export default function QuizShell({ questions }: Props) {
  const [index, setIndex] = useState(-1); // -1 = idle
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [missed, setMissed] = useState<{ question: Question; selected: number }[]>([]);
  const [done, setDone] = useState(false);

  function start() {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setMissed([]);
    setDone(false);
  }

  function handleSelect(i: number) {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (i !== questions[index].correctIndex) {
      setMissed((prev) => [...prev, { question: questions[index], selected: i }]);
    }
  }

  function handleNext() {
    if (index === questions.length - 1) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
      setSelected(null);
      setRevealed(false);
    }
  }

  if (index === -1) {
    return (
      <div className="text-center space-y-4 py-8">
        <p className="text-muted-foreground">
          {questions.length} question{questions.length !== 1 ? "s" : ""} about this book
        </p>
        <Button onClick={start}>Start Quiz</Button>
      </div>
    );
  }

  if (done) {
    const score = questions.length - missed.length;
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-4xl font-bold">{score}/{questions.length}</p>
          <p className="text-muted-foreground">
            {pct === 100 ? "Perfect!" : pct >= 60 ? "Nice work!" : "Keep reading!"}
          </p>
        </div>
        {missed.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Missed questions:</h3>
            {missed.map(({ question, selected: s }) => (
              <div key={question.id} className="border rounded-lg p-4 space-y-1 text-sm">
                <p className="font-medium">{question.question}</p>
                <p className="text-red-500">Your answer: {question.options[s]}</p>
                <p className="text-green-600">Correct: {question.options[question.correctIndex]}</p>
                <p className="text-muted-foreground">{question.explanation}</p>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center">
          <Button variant="outline" onClick={start}>Retake Quiz</Button>
        </div>
      </div>
    );
  }

  const question = questions[index];
  const isLast = index === questions.length - 1;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">
          Question {index + 1} of {questions.length}
        </p>
        <Progress value={((index + 1) / questions.length) * 100} />
      </div>

      <p className="text-lg font-medium">{question.question}</p>

      <div className="grid gap-3">
        {question.options.map((option, i) => {
          let extra = "border hover:bg-accent";
          if (revealed) {
            if (i === question.correctIndex) extra = "border-green-500 bg-green-50 text-green-800";
            else if (i === selected) extra = "border-red-400 bg-red-50 text-red-700";
            else extra = "border opacity-50";
          }
          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-colors ${extra}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
          {question.explanation}
        </div>
      )}

      {revealed && (
        <div className="flex justify-end">
          <Button onClick={handleNext}>{isLast ? "See Results" : "Next Question"}</Button>
        </div>
      )}
    </div>
  );
}
