"use client";

import * as React from "react";

import type { ClarifyingQuestion } from "@/lib/types";

export function ClarifyingQuestions({
  questions,
  answers,
  onAnswer,
  onSubmit,
  onSkip,
}: {
  questions: ClarifyingQuestion[];
  answers: Record<string, string>;
  onAnswer: (id: string, value: string) => void;
  onSubmit: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {questions.map((q) => {
        const selected = answers[q.id] ?? "";
        return (
          <div
            key={q.id}
            className="rounded-xl border border-white/10 bg-zinc-900 p-3"
          >
            <p className="text-sm font-medium text-white">{q.question}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {q.options.map((option) => {
                const active = selected === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onAnswer(q.id, option)}
                    className={`rounded-full border px-3 py-1 text-xs ${
                      active
                        ? "border-white bg-white text-black"
                        : "border-white/15 text-zinc-300 hover:border-white/40"
                    }`}
                  >
                    {option}
                    {q.recommendedOption === option ? (
                      <span className={active ? "ml-1 opacity-70" : "ml-1 text-emerald-400"}>
                        · recommended
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
            {q.allowCustomAnswer ? (
              <input
                value={selected && !q.options.includes(selected) ? selected : ""}
                onChange={(e) => onAnswer(q.id, e.target.value)}
                placeholder="Other..."
                className="mt-2 w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-1.5 text-xs text-white placeholder:text-zinc-600 focus:outline-none"
              />
            ) : null}
          </div>
        );
      })}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onSubmit}
          className="rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-black"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="text-xs text-zinc-500 hover:text-zinc-300"
        >
          Skip and generate
        </button>
      </div>
    </div>
  );
}
