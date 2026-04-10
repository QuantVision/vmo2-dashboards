import { Loader2 } from "lucide-react";

import { AskResponse } from "@/lib/types";
import { InsightResponseCard } from "@/components/ask-network/InsightResponseCard";
import { Card } from "@/components/ui/card";

export type ConversationViewProps = {
  question: string | null;
  response: AskResponse | null;
  loading: boolean;
  onPrimaryAction: (response: AskResponse) => void;
};

export const ConversationView = ({ question, response, loading, onPrimaryAction }: ConversationViewProps) => {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border/60 bg-white/70 px-3 py-3">
        <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Latest question</p>
        <p className="mt-2 text-sm font-semibold text-foreground">
          {question || "Ask a question to generate an insight."}
        </p>
      </div>

      {loading && (
        <Card className="border border-border/60 bg-white/70 p-3">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Analysing current dashboard context...
          </div>
        </Card>
      )}

      {!loading && response && (
        <InsightResponseCard response={response} onPrimaryAction={onPrimaryAction} />
      )}
    </div>
  );
};
