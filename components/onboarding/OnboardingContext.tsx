"use client";

import { createContext, useCallback, useContext, useState, ReactNode } from "react";
import { PlanId } from "@/lib/agency";
import OnboardingModal from "./OnboardingModal";

type Ctx = {
  open: (planId?: PlanId) => void;
  close: () => void;
};

const OnboardingCtx = createContext<Ctx | null>(null);

export function useOnboarding() {
  const ctx = useContext(OnboardingCtx);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [openState, setOpenState] = useState<{ open: boolean; plan: PlanId }>({
    open: false,
    plan: "launch",
  });

  const open = useCallback((planId: PlanId = "launch") => {
    setOpenState({ open: true, plan: planId });
  }, []);
  const close = useCallback(() => setOpenState((s) => ({ ...s, open: false })), []);

  return (
    <OnboardingCtx.Provider value={{ open, close }}>
      {children}
      <OnboardingModal open={openState.open} initialPlan={openState.plan} onClose={close} />
    </OnboardingCtx.Provider>
  );
}
