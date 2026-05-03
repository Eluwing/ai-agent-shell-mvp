import { createContext, useContext, type ReactNode } from "react";

type TitleBarLayoutContextValue = {
  tabAreaWidth: number;
};

const TitleBarLayoutContext = createContext<TitleBarLayoutContextValue | null>(
  null,
);

type TitleBarLayoutProviderProps = {
  children: ReactNode;
  tabAreaWidth: number;
};

export function TitleBarLayoutProvider({
  children,
  tabAreaWidth,
}: TitleBarLayoutProviderProps) {
  return (
    <TitleBarLayoutContext.Provider value={{ tabAreaWidth }}>
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
