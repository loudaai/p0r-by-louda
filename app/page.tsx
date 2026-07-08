"use client";

import * as React from "react";

import { StartScreen } from "@/components/start-screen";
import { Workspace } from "@/components/workspace";
import { generateStandaloneHtml } from "@/lib/html-export";
import {
  DEFAULT_DESIGN,
  EMPTY_FORM_INPUT,
  type LandingPageContent,
  type LandingPageDesignInput,
  type LandingPageFormInput,
} from "@/lib/types";

type AppMode = "start" | "workspace";
type ChatEntry = { role: "user" | "assistant"; text: string };

const STAGES = [
  "Understanding your request",
  "Writing sharper copy",
  "Building your preview",
];

function summarize(input: LandingPageFormInput, prompt: string): string {
  if (prompt.trim()) return prompt.trim();
  if (input.brandName.trim()) return `Build a landing page for ${input.brandName.trim()}`;
  return "Build a landing page";
}

export default function Home() {
  const [mode, setMode] = React.useState<AppMode>("start");
  const [prompt, setPrompt] = React.useState("");
  const [form, setForm] = React.useState<LandingPageFormInput>(EMPTY_FORM_INPUT);
  const [design, setDesign] = React.useState<LandingPageDesignInput>(DEFAULT_DESIGN);

  const [content, setContent] = React.useState<LandingPageContent | null>(null);
  const [generatedHtml, setGeneratedHtml] = React.useState("");
  const [history, setHistory] = React.useState<ChatEntry[]>([]);

  const [loading, setLoading] = React.useState(false);
  const [stage, setStage] = React.useState(0);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!loading) return;
    setStage(0);
    const interval = window.setInterval(() => {
      setStage((s) => (s + 1) % STAGES.length);
    }, 1400);
    return () => window.clearInterval(interval);
  }, [loading]);

  async function generate(currentPrompt: string, currentForm: LandingPageFormInput) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...currentForm, prompt: currentPrompt }),
      });
      const data = await res.json();
      if (!res.ok || !data?.content) {
        throw new Error(data?.error ?? "Generation failed. Please try again.");
      }
      const nextContent = data.content as LandingPageContent;
      setContent(nextContent);
      setGeneratedHtml(generateStandaloneHtml(nextContent, design));
      setHistory((h) => [
        ...h,
        { role: "user", text: summarize(currentForm, currentPrompt) },
        { role: "assistant", text: `Generated a landing page for ${nextContent.brandName || "your project"}.` },
      ]);
      setMode("workspace");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Generation failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleGenerate() {
    generate(prompt, form);
  }

  function handleRegenerate() {
    generate(prompt, form);
  }

  function handleFollowUp(text: string) {
    const nextPrompt = prompt.trim() ? `${prompt.trim()}\n${text}` : text;
    setPrompt(nextPrompt);
    generate(nextPrompt, form);
  }

  function handleBack() {
    setMode("start");
  }

  if (mode === "workspace") {
    return (
      <Workspace
        generatedHtml={generatedHtml}
        projectName={content?.brandName ?? ""}
        history={history}
        loading={loading}
        stage={STAGES[stage]}
        onFollowUp={handleFollowUp}
        onRegenerate={handleRegenerate}
        onBack={handleBack}
      />
    );
  }

  return (
    <StartScreen
      prompt={prompt}
      onPromptChange={setPrompt}
      form={form}
      onFormChange={setForm}
      design={design}
      onDesignChange={setDesign}
      errors={error ? { brandName: error } : {}}
      loading={loading}
      onGenerate={handleGenerate}
    />
  );
}
