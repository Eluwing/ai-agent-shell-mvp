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
    <div className="flex items-center">
      {children}
      {withSeparator ? (
        <div
          className="h-5 w-px bg-shell-border/30 ml-2 mr-2"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
