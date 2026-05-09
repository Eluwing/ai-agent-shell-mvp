import type { ReactNode } from "react";

type PipRegionProps = {
  children: ReactNode;
};

export function PipRegion({ children }: PipRegionProps) {
  return (
    <aside className="absolute right-layout-gutter top-pip-agent-panel z-20 w-pip-agent-panel max-w-pip-agent-panel rounded-lg border border-card-border bg-card p-3 text-card-fg shadow-lg shadow-black/20">
      {children}
    </aside>
  );
}
