"use client";

import type { Ref } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type PromptComposerProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  inputRef?: Ref<HTMLTextAreaElement>;
};

export const PromptComposer = ({ value, onChange, onSubmit, disabled, inputRef }: PromptComposerProps) => {
  return (
    <div className="border-t bg-white/95 px-3 py-3">
      <div className="relative">
        <textarea
          ref={inputRef}
          value={value}
          disabled={disabled}
          rows={3}
          placeholder="Ask about this activity, KPI change, impacted TACs, before/after comparison..."
          className={cn(
            "w-full resize-none rounded-lg border border-border/70 bg-white/80 px-3 py-2 pr-12 text-sm text-foreground shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            disabled && "opacity-70"
          )}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSubmit();
            }
          }}
        />
        <Button
          size="icon"
          className="absolute right-2 top-2 h-8 w-8"
          onClick={onSubmit}
          disabled={disabled}
          type="button"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Press Enter to send, Shift + Enter for a new line.
      </p>
    </div>
  );
};
