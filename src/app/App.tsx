import { AppShell } from "@/app/components/app-shell";
import { Providers } from "@/app/providers/providers";

export function App() {
  return (
    <Providers>
      <AppShell />
    </Providers>
  );
}
