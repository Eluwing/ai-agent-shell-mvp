import { BrowserWorkspaceFrame } from "@/features/workspace/components/browser/browser-workspace-frame";

type BrowserRegionProps = {
  viewportClassName?: string;
};

export function BrowserRegion({ viewportClassName }: BrowserRegionProps) {
  return <BrowserWorkspaceFrame viewportClassName={viewportClassName} />;
}
