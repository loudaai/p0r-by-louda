"use client";

import * as React from "react";

import type { ClarifyingQuestion } from "@/lib/types";

export function ClarifyingQuestions({
  question,
  onSelect,
  onOther,
  onSkip,
}: {
  question: ClarifyingQuestion;
  onSelect: (value: string) => void;
  onOther: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-zinc-200">{question.question}</p>
      <div className="mt-1 flex flex-col">
        {question.options.map((option) => {
          const recommended = question.recommendedOption === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className="-mx-2 rounded-md px-2 py-1.5 text-left text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
            >
              {option}
              {recommended ? (
                <span className="ml-1 text-zinc-500">· recommended</span>
              ) : null}
            </button>
          );
        })}
        {question.allowCustomAnswer ? (
          <button
            type="button"
            onClick={onOther}
            className="-mx-2 rounded-md px-2 py-1.5 text-left text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            Other...
          </button>
        ) : null}
      </div>

      <button
        type="button"
        onClick={onSkip}
        className="mt-0.5 self-start text-xs text-zinc-500 hover:text-zinc-300"
      >
        Skip
      </button>
    </div>
  );
}
