import { useEffect, useState } from "react";
import type { RuntimeVersions } from "@/features/runtime/types/runtime-types";

export function useRuntimeVersions() {
  const [versions, setVersions] = useState<RuntimeVersions | null>(null);

  useEffect(() => {
    window.agentShell?.runtime.versions().then(setVersions);
  }, []);

  return versions;
}
