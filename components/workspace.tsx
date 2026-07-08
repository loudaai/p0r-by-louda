"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExportActions } from "@/components/export-actions";

type ChatEntry = { role: "user" | "assistant"; text: string };
type ViewMode = "desktop" | "tablet" | "mobile";

const VIEW_WIDTH: Record<ViewMode, string> = {
  desktop: "100%",
  tablet: "820px",
  mobile: "390px",
};

export function Workspace({
  generatedHtml,
  projectName,
  history,
  loading,
  stage,
  onFollowUp,
  onRegenerate,
  onBack,
}: {
  generatedHtml: string;
  projectName: string;
  history: ChatEntry[];
  loading: boolean;
  stage: string;
  onFollowUp: (text: string) => void;
  onRegenerate: () => void;
  onBack: () => void;
}) {
  const [view, setView] = React.useState<ViewMode>("desktop");
  const [followUp, setFollowUp] = React.useState("");
  const historyRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    historyRef.current?.scrollTo({ top: historyRef.current.scrollHeight });
  }, [history]);

  function sendFollowUp() {
    const text = followUp.trim();
    if (!text) return;
    onFollowUp(text);
    setFollowUp("");
  }

  return (
    <div className="flex h-screen w-full overflow-hidden bg-black text-white">
      <aside className="flex w-[320px] flex-col border-r border-white/10 bg-zinc-950">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold tracking-tight">p0r by Louda</span>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-zinc-500 hover:text-white"
          >
            New
          </button>
        </div>

        <div ref={historyRef} className="flex-1 space-y-3 overflow-y-auto p-4">
          {history.map((entry, i) => (
            <div
              key={i}
              className={
                entry.role === "user"
                  ? "rounded-lg border border-white/10 bg-zinc-900 p-3 text-sm text-zinc-200"
                  : "rounded-lg bg-white/5 p-3 text-sm text-emerald-300"
              }
            >
              {entry.text}
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 p-3">
          <textarea
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) sendFollowUp();
            }}
            placeholder="Ask for a change, then Cmd/Ctrl+Enter..."
            className="min-h-16 w-full resize-none rounded-lg border border-white/10 bg-zinc-900 p-3 text-sm text-white placeholder:text-zinc-600 focus-visible:outline-none"
            disabled={loading}
          />
          <Button
            type="button"
            size="sm"
            className="mt-2 w-full"
            onClick={sendFollowUp}
            disabled={loading}
          >
            Send
          </Button>
        </div>
      </aside>

      <section className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">{projectName || "Untitled"}</span>
            <Badge variant="outline" className="border-white/10 text-zinc-400">
              Preview
            </Badge>
          </div>

          <div className="flex items-center gap-1 rounded-lg border border-white/10 p-1">
            {(["desktop", "tablet", "mobile"] as ViewMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setView(mode)}
                className={`rounded-md px-3 py-1 text-xs capitalize ${
                  view === mode
                    ? "bg-white text-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ExportActions html={generatedHtml} disabled={!generatedHtml} />
            <Button size="sm" onClick={onRegenerate} disabled={loading}>
              {loading ? "Regenerating..." : "Regenerate"}
            </Button>
          </div>
        </div>

        <div className="relative flex-1 overflow-auto bg-zinc-900">
          <div
            className="mx-auto h-full transition-all"
            style={{ maxWidth: VIEW_WIDTH[view] }}
          >
            <iframe
              srcDoc={generatedHtml}
              title="Generated landing page preview"
              className="h-full w-full border-0 bg-transparent"
            />
          </div>

          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/70 backdrop-blur-sm">
              <span className="text-sm text-white">Generating landing page</span>
              <span className="text-xs text-zinc-400">{stage}</span>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
