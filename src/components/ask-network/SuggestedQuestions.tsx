"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Button } from "@/components/ui/button";

const DEFAULT_COUNT = 3;

type SuggestedQuestionsProps = {
  questions: string[];
  onSelect: (value: string) => void;
};

export const SuggestedQuestions = ({ questions, onSelect }: SuggestedQuestionsProps) => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? questions : questions.slice(0, DEFAULT_COUNT);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground">Suggested questions</p>
        {questions.length > DEFAULT_COUNT && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setExpanded((prev) => !prev)}
            className="h-7 px-2 text-xs"
          >
            {expanded ? "Show less" : "Show more"}
            {expanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {visible.map((question) => (
          <Button
            key={question}
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => onSelect(question)}
            className="h-7 rounded-full px-3 text-xs font-medium"
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
};
