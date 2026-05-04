import type { ReactNode } from "react";

type TitleBarSectionProps = {
  children: ReactNode;
  withSeparator?: boolean;
};

export function TitleBarSection({
  children,
  withSeparator = false,
}: TitleBarSectionProps) {
  return (
    <div className="flex items-center gap-2">
      {children}
      {withSeparator ? (
        <div
          className="h-5 w-px bg-[color:var(--chrome-border)]/30"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
