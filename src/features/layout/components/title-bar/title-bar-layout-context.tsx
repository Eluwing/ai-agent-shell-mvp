import { createContext, useContext, type ReactNode } from "react";

type TitleBarLayoutContextValue = {
  tabAreaWidth: number;
  maxTabWidth: number;
};

const TitleBarLayoutContext = createContext<TitleBarLayoutContextValue | null>(
  null,
);

type TitleBarLayoutProviderProps = {
  children: ReactNode;
  tabAreaWidth: number;
  maxTabWidth: number;
};

export function TitleBarLayoutProvider({
  children,
  tabAreaWidth,
  maxTabWidth,
}: TitleBarLayoutProviderProps) {
  return (
    <TitleBarLayoutContext.Provider value={{ tabAreaWidth, maxTabWidth }}>
      {children}
    </TitleBarLayoutContext.Provider>
  );
}

export function useTitleBarLayout() {
  const value = useContext(TitleBarLayoutContext);

  if (!value) {
    throw new Error(
      "useTitleBarLayout must be used within TitleBarLayoutProvider",
    );
  }

  return value;
}
