import React, { createContext, useContext, useState } from "react";

interface CursorContextValue {
  cursorText: string | null;
  cursorVariant: "default" | "link" | "project" | "drag";
  setCursorText: (text: string | null) => void;
  setCursorVariant: (variant: "default" | "link" | "project" | "drag") => void;
}

const CursorContext = createContext<CursorContextValue | undefined>(undefined);

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [cursorVariant, setCursorVariant] = useState<"default" | "link" | "project" | "drag">("default");

  return (
    <CursorContext.Provider value={{ cursorText, cursorVariant, setCursorText, setCursorVariant }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within a CursorProvider");
  }
  return context;
}
