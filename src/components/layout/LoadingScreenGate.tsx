"use client";

import { useState, type ReactNode } from "react";
import { LoadingScreen } from "./LoadingScreen";

interface LoadingScreenGateProps {
  children: ReactNode;
}

export function LoadingScreenGate({ children }: LoadingScreenGateProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {children}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
    </>
  );
}