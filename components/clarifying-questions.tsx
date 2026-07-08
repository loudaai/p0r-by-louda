"use client";

import * as React from "react";

import type { ClarifyingQuestion } from "@/lib/types";

export function ClarifyingQuestions({
  question,
  index,
  total,
  onSelect,
  onOther,
  onSkip,
  onPrev,
  onNext,
}: {
  question: ClarifyingQuestion;
  index: number;
  total: number;
  onSelect: (value: string) => void;
  onOther: () => void;
  onSkip: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const options = question.options.slice(0, 3);
  const canPrev = index > 0;
  const isLast = index >= total - 1;

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm text-zinc-200">
        <span className="mr-1.5 text-zinc-500">
          {index + 1}/{total}
        </span>
        {question.question}
      </p>
      <div className="mt-1 flex flex-col">
        {options.map((option, i) => {
          const recommended = question.recommendedOption === option;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              className="-mx-2 rounded-md px-2 py-1.5 text-left text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
            >
              <span className="mr-1.5 text-zinc-500">{i + 1}.</span>
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
            <span className="mr-1.5 text-zinc-500">{options.length + 1}.</span>
            Other...
          </button>
        ) : null}
      </div>

      <div className="mt-1.5 flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={!canPrev}
          className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-zinc-300 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          &lt; Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-zinc-300 transition hover:bg-white/5 hover:text-white"
        >
          {isLast ? "Generate >" : "Next >"}
        </button>
        <button
          type="button"
          onClick={onSkip}
          className="ml-auto text-xs text-zinc-500 hover:text-zinc-300"
        >
          Skip all
        </button>
      </div>
    </div>
  );
}
