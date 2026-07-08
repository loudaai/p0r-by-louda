"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  hasErrors,
  validateLandingPageForm,
  type FormErrors,
} from "@/lib/validation";
import type {
  LandingPageContent,
  LandingPageDesignInput,
  LandingPageFormInput,
} from "@/lib/types";
import { AdvancedOptions } from "@/components/advanced-options";

export function StartScreen({
  prompt,
  onPromptChange,
  form,
  onFormChange,
  design,
  onDesignChange,
  errors,
  loading,
  onGenerate,
}: {
  prompt: string;
  onPromptChange: (value: string) => void;
  form: LandingPageFormInput;
  onFormChange: (form: LandingPageFormInput) => void;
  design: LandingPageDesignInput;
  onDesignChange: (design: LandingPageDesignInput) => void;
  errors: FormErrors;
  loading: boolean;
  onGenerate: () => void;
}) {
  const [showAdvanced, setShowAdvanced] = React.useState(false);
  const canGenerate = prompt.trim().length > 0 || !hasErrors(validateLandingPageForm(form));

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <header className="flex items-center justify-between border-b border-white/5 px-6 py-4">
        <div className="flex items-baseline gap-3">
          <span className="text-sm font-semibold tracking-tight text-white">
            p0r by Louda
          </span>
          <span className="hidden text-xs text-zinc-500 sm:inline">
            Build Landing Page with AI
          </span>
        </div>
        <Badge variant="outline" className="border-white/10 text-zinc-400">
          Beta
        </Badge>
      </header>

      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl">
          <h1 className="text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            What do you want to create?
          </h1>
          <p className="mt-3 text-center text-sm text-zinc-500">
            Describe a business, product, or idea. We&apos;ll build the landing page.
          </p>

          <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-950 p-3 shadow-2xl">
            <Textarea
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              placeholder="Describe the landing page you want to build..."
              className="min-h-28 w-full resize-none border-0 bg-transparent text-base text-white placeholder:text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={loading}
            />
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/5 pt-3">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvanced((v) => !v)}
                  disabled={loading}
                  className="text-zinc-400 hover:text-white"
                >
                  {showAdvanced ? "Hide options" : "Design options"}
                </Button>
                {design.logoDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={design.logoDataUrl}
                    alt="Logo"
                    className="h-7 w-7 rounded-md border border-white/10 object-contain"
                  />
                ) : null}
                <span className="text-xs text-zinc-600">
                  {design.siteTheme === "dark" ? "Dark" : "Light"} theme
                </span>
              </div>
              <Button
                type="button"
                size="sm"
                onClick={onGenerate}
                disabled={loading || !canGenerate}
              >
                {loading ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>

          {Object.keys(errors).length > 0 ? (
            <p className="mt-3 text-center text-sm text-destructive">
              Add a prompt or fill the required options below.
            </p>
          ) : null}

          {showAdvanced ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-zinc-950 p-5">
              <AdvancedOptions
                form={form}
                onFormChange={onFormChange}
                design={design}
                onDesignChange={onDesignChange}
                errors={errors}
                loading={loading}
              />
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}
