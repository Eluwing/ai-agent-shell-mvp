import * as React from "react";
import { cn } from "@/shared/lib/cn";

export type ToolbarDensity = "compact" | "comfortable";

type ToolbarGroupContextValue = {
  density: ToolbarDensity;
};

const ToolbarGroupContext = React.createContext<ToolbarGroupContextValue | null>(
  null,
);

export type ToolbarGroupProps = {
  children: React.ReactNode;
  className?: string;
  density?: ToolbarDensity;
} & React.HTMLAttributes<HTMLDivElement>;

export function ToolbarGroup({
  children,
  className,
  density = "comfortable",
  ...props
}: ToolbarGroupProps) {
  return (
    <ToolbarGroupContext.Provider value={{ density }}>
      <div
        className={cn(
          "inline-flex items-stretch rounded-lg border border-zinc-200 bg-zinc-50 p-1",
          density === "compact" ? "h-8 gap-0.5" : "h-9 gap-1",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </ToolbarGroupContext.Provider>
  );
}

export function useToolbarGroup() {
  const value = React.useContext(ToolbarGroupContext);

  if (!value) {
    throw new Error("useToolbarGroup must be used within ToolbarGroup");
  }

  return value;
}
