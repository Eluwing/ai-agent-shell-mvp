import { useState } from "react";

export function useDisclosure(defaultOpen = false) {
  const [open, setOpen] = useState(defaultOpen);

  return {
    open,
    close: () => setOpen(false),
    toggle: () => setOpen((current) => !current),
    setOpen,
  };
}
