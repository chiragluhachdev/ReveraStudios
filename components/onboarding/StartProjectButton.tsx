"use client";

import { ReactNode } from "react";
import { PlanId } from "@/lib/agency";
import { useOnboarding } from "./OnboardingContext";

export default function StartProjectButton({
  plan = "custom",
  className,
  children,
}: {
  plan?: PlanId;
  className?: string;
  children: ReactNode;
}) {
  const { open } = useOnboarding();
  return (
    <button onClick={() => open(plan)} className={className}>
      {children}
    </button>
  );
}
