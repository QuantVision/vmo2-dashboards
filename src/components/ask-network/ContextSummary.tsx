import { Badge } from "@/components/ui/badge";

const labelStyles = "text-[10px] uppercase tracking-wide text-muted-foreground";

export type ContextSummaryItem = {
  label: string;
  value: string;
};

type ContextSummaryProps = {
  items: ContextSummaryItem[];
};

export const ContextSummary = ({ items }: ContextSummaryProps) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-border/60 bg-white/70 px-2 py-2">
          <p className={labelStyles}>{item.label}</p>
          <Badge variant="secondary" className="mt-1 w-fit text-[11px] font-semibold">
            {item.value}
          </Badge>
        </div>
      ))}
    </div>
  );
};
