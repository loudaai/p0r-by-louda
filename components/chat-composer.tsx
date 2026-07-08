"use client";

import * as React from "react";

export function ChatComposer({
  value,
  onChange,
  onSubmit,
  placeholder = "Message...",
  plusContent,
  disabled = false,
  submitLabel = "Generate",
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  plusContent?: React.ReactNode;
  disabled?: boolean;
  submitLabel?: string;
}) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  function resize() {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 180)}px`;
  }

  React.useEffect(resize, [value]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (!disabled) onSubmit();
    }
  }

  return (
    <div className="relative">
      {plusContent ? (
        <div
          className={`absolute bottom-full left-0 mb-2 w-56 rounded-xl border border-white/10 bg-zinc-950 p-1 shadow-2xl ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          {plusContent}
        </div>
      ) : null}

      <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-zinc-900 p-2">
        <button
          type="button"
          onClick={() => plusContent && setMenuOpen((v) => !v)}
          disabled={disabled || !plusContent}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white disabled:opacity-40"
          aria-label="Add options"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>

        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          className="chat-textarea min-h-[48px] max-h-[180px] flex-1 resize-none bg-transparent py-2 text-sm text-white placeholder:text-zinc-600 focus:outline-none"
        />

        <button
          type="button"
          onClick={onSubmit}
          disabled={disabled || value.trim().length === 0}
          className="flex h-9 flex-none items-center justify-center rounded-xl bg-white px-3 text-sm font-medium text-black disabled:opacity-40"
        >
          {submitLabel}
        </button>
      </div>
    </div>
  );
}
