import { AppShell } from "@/app/components/shell/app-shell";
import { Providers } from "@/app/providers/providers";

export function App() {
  return (
    <Providers>
      <AppShell />
    </Providers>
  );
}
