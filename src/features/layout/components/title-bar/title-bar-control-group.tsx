import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type TitleBarControlGroupProps = {
  children: ReactNode;
  className?: string;
};

export function TitleBarControlGroup({
  children,
  className,
}: TitleBarControlGroupProps) {
  return <div className={cn("inline-flex items-center", className)}>{children}</div>;
}
