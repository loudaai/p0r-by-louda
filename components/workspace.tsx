"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExportActions } from "@/components/export-actions";
import { ChatComposer } from "@/components/chat-composer";
import { ClarifyingQuestions } from "@/components/clarifying-questions";
import type {
  ChatMessage,
  ClarifyingQuestion,
  GenerationStatus,
} from "@/lib/types";

type ViewMode = "desktop" | "tablet" | "mobile";

const VIEW_WIDTH: Record<ViewMode, string> = {
  desktop: "100%",
  tablet: "820px",
  mobile: "390px",
};

const STATUS_LABEL: Record<GenerationStatus, string> = {
  idle: "Ready",
  thinking: "Thinking through the page direction...",
  asking: "I need a few details before building.",
  generating: "Writing the landing page copy...",
  ready: "Ready. You can copy or download the HTML.",
  error: "Something went wrong. Try again.",
};

export function Workspace({
  generatedHtml,
  projectName,
  chat,
  status,
  questions,
  answers,
  onAnswer,
  onSubmitAnswers,
  onSkip,
  followUp,
  onFollowUpChange,
  onFollowUp,
  onRegenerate,
  onBack,
}: {
  generatedHtml: string;
  projectName: string;
  chat: ChatMessage[];
  status: GenerationStatus;
  questions: ClarifyingQuestion[];
  answers: Record<string, string>;
  onAnswer: (id: string, value: string) => void;
  onSubmitAnswers: () => void;
  onSkip: () => void;
  followUp: string;
  onFollowUpChange: (value: string) => void;
  onFollowUp: () => void;
  onRegenerate: () => void;
  onBack: () => void;
}) {
  const [view, setView] = React.useState<ViewMode>("desktop");
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [chat, questions]);

  const showingQuestions = status === "asking" && questions.length > 0;
  const busy = status === "thinking" || status === "generating";

  return (
    <div className="flex h-screen w-full overflow-hidden bg-black text-white">
      <aside className="flex w-[340px] flex-col border-r border-white/10 bg-zinc-950">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
          <span className="text-sm font-semibold tracking-tight">p0r by Louda</span>
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-zinc-500 hover:text-white"
          >
            New
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
          {chat.map((msg) => (
            <div
              key={msg.id}
              className={
                msg.role === "user"
                  ? "rounded-lg border border-white/10 bg-zinc-900 p-3 text-sm text-zinc-200"
                  : msg.role === "system"
                    ? "text-xs text-zinc-500"
                    : "rounded-lg bg-white/5 p-3 text-sm text-emerald-300"
              }
            >
              {msg.content}
              {msg.status === "thinking" || msg.status === "working" ? (
                <span className="ml-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400 align-middle" />
              ) : null}
            </div>
          ))}

          {showingQuestions ? (
            <ClarifyingQuestions
              questions={questions}
              answers={answers}
              onAnswer={onAnswer}
              onSubmit={onSubmitAnswers}
              onSkip={onSkip}
            />
          ) : null}
        </div>

        <div className="border-t border-white/5 p-3">
          <ChatComposer
            value={followUp}
            onChange={onFollowUpChange}
            onSubmit={onFollowUp}
            placeholder="Ask for a change, then Enter..."
            disabled={busy}
            submitLabel="Send"
          />
        </div>
      </aside>

      <section className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">{projectName || "Untitled"}</span>
            <Badge variant="outline" className="border-white/10 text-zinc-400">
              {status === "ready" ? "Preview" : STATUS_LABEL[status]}
            </Badge>
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-white/10 p-1">
            {(["desktop", "tablet", "mobile"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setView(mode)}
                className={`rounded-md px-3 py-1 text-xs capitalize ${
                  view === mode ? "bg-white text-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ExportActions html={generatedHtml} disabled={!generatedHtml} />
            <Button size="sm" onClick={onRegenerate} disabled={busy}>
              {busy ? "Working..." : "Regenerate"}
            </Button>
          </div>
        </div>

        <div className="relative flex-1 overflow-auto bg-zinc-900">
          <div className="mx-auto h-full transition-all" style={{ maxWidth: VIEW_WIDTH[view] }}>
            {generatedHtml ? (
              <iframe
                srcDoc={generatedHtml}
                title="Generated landing page preview"
                className="h-full w-full border-0 bg-transparent"
              />
            ) : (
              <div className="flex h-full items-center justify-center px-6">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/15 border-t-white" />
                  <p className="text-sm text-zinc-400">{STATUS_LABEL[status]}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
