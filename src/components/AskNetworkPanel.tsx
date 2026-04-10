"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MessageSquare } from "lucide-react";

import { activities } from "@/data/activities";
import { matchResponse, suggestedQuestions } from "@/data/askResponses";
import { useNetwork } from "@/context/NetworkContext";
import { AskResponse } from "@/lib/types";
import { ContextSummary } from "@/components/ask-network/ContextSummary";
import { SuggestedQuestions } from "@/components/ask-network/SuggestedQuestions";
import { ConversationView } from "@/components/ask-network/ConversationView";
import { PromptComposer } from "@/components/ask-network/PromptComposer";

export const AskNetworkPanel = () => {
  const {
    selectedActivityId,
    aggregation,
    question,
    setQuestion,
    activeInsight,
    setActiveInsight,
    overlayEnabled,
    setOverlayEnabled
  } = useNetwork();
  const [isLoading, setIsLoading] = useState(false);
  const [lastQuestion, setLastQuestion] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const selectedActivity = useMemo(
    () => activities.find((activity) => activity.id === selectedActivityId),
    [selectedActivityId]
  );

  const handleSubmit = () => {
    const trimmed = question.trim();
    if (!trimmed || isLoading) {
      return;
    }
    setIsLoading(true);
    setLastQuestion(trimmed);
    setQuestion("");
    setOverlayEnabled(false);
    window.setTimeout(() => {
      const response = matchResponse(trimmed);
      setActiveInsight(response);
      setIsLoading(false);
    }, 700);
  };

  const handleSuggestion = (value: string) => {
    setQuestion(value);
    inputRef.current?.focus();
  };

  const handlePrimaryAction = (response: AskResponse) => {
    setActiveInsight(response);
    if (!overlayEnabled) {
      setOverlayEnabled(true);
    }
  };

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }
    const container = scrollRef.current;
    const frame = window.requestAnimationFrame(() => {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [activeInsight, isLoading, lastQuestion]);

  return (
    <div className="flex h-full flex-col">
      <div className="border-b pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Ask the Network</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Ask for explanation, drill-down, before/after comparison, impacted sites, or KPI-specific insights.
            </p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MessageSquare className="h-4 w-4" />
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-auto py-4 pr-2 scrollbar-thin">
        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">Current context</p>
            <ContextSummary
              items={[
                { label: "Activity", value: selectedActivity?.name ?? "" },
                { label: "Vendor", value: selectedActivity?.vendor ?? "" },
                { label: "Tech", value: selectedActivity?.tech ?? "" },
                { label: "Aggregation", value: aggregation }
              ]}
            />
          </div>

          <SuggestedQuestions questions={suggestedQuestions} onSelect={handleSuggestion} />

          <ConversationView
            question={lastQuestion}
            response={activeInsight}
            loading={isLoading}
            onPrimaryAction={handlePrimaryAction}
          />
        </div>
      </div>

      <PromptComposer
        value={question}
        onChange={setQuestion}
        onSubmit={handleSubmit}
        disabled={isLoading}
        inputRef={inputRef}
      />
    </div>
  );
};
