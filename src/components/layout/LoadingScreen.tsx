"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { designTokens } from "../../lib/design-tokens";

const bootSequence = [
  "Booting Analytics OS...",
  "Loading SQL Engine...",
  "Loading Power BI Modules...",
  "Loading Data Models...",
  "Access Granted...",
] as const;

const totalDurationMs = 3000;

interface LoadingScreenProps {
  onComplete?: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const exitFadeDuration = shouldReduceMotion ? 0 : designTokens.animation.duration.standard;
  const exitFadeDurationMs = exitFadeDuration * 1000;
  const sequenceDurationMs = totalDurationMs - exitFadeDurationMs;
  const stepDurationMs = sequenceDurationMs / bootSequence.length;
  const motionDuration = shouldReduceMotion
    ? designTokens.animation.reducedMotionDuration
    : designTokens.animation.duration.deliberate;

  useEffect(() => {
    const stepTimer = window.setInterval(() => {
      setActiveStep((step) => Math.min(step + 1, bootSequence.length - 1));
    }, stepDurationMs);
    const fadeTimer = window.setTimeout(() => setIsFading(true), sequenceDurationMs);
    const completionTimer = window.setTimeout(() => setIsComplete(true), totalDurationMs);

    return () => {
      window.clearInterval(stepTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(completionTimer);
    };
  }, [sequenceDurationMs, stepDurationMs]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isComplete && (
        <motion.div
          key="analytics-loading-screen"
          aria-busy="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: isFading ? 0 : 1 }}
          exit={{ opacity: 0, transition: { duration: 0 } }}
          transition={{ duration: motionDuration }}
          className="fixed inset-0 z-[100] flex min-h-[100svh] justify-center overflow-x-hidden overflow-y-auto bg-[#050816] px-5 py-8 text-[#F8FAFC]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.13),transparent_58%)]"
          />

          <div className="relative my-auto w-full max-w-md">
            <span className="sr-only" role="status" aria-live="polite" aria-atomic="true">
              {bootSequence[activeStep]}
            </span>

            <div className="mb-7 flex items-center justify-between gap-4">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#94A3B8]">
                Analytics Command Center
              </p>
              <span className="font-mono text-xs tabular-nums text-[#94A3B8]" aria-hidden="true">
                {String(activeStep + 1).padStart(2, "0")} / {String(bootSequence.length).padStart(2, "0")}
              </span>
            </div>

            <div
              role="progressbar"
              aria-label="Startup progress"
              aria-valuemin={0}
              aria-valuemax={bootSequence.length}
              aria-valuenow={activeStep + 1}
              aria-valuetext={`Stage ${activeStep + 1} of ${bootSequence.length}: ${bootSequence[activeStep]}`}
              className="mb-7 h-1 overflow-hidden rounded-full bg-white/10"
            >
              <motion.div
                className="h-full origin-left rounded-full bg-[#22D3EE]"
                animate={{ scaleX: (activeStep + 1) / bootSequence.length }}
                transition={{
                  duration: motionDuration,
                  ease: designTokens.animation.easing.standard,
                }}
              />
            </div>

            <ol className="space-y-3" aria-label="Startup sequence">
              {bootSequence.map((message, index) => {
                const isCurrentStep = index === activeStep;
                const isFinishedStep = index < activeStep;

                return (
                  <li
                    key={message}
                    aria-current={isCurrentStep ? "step" : undefined}
                    className={`flex min-h-10 items-center gap-3 rounded-md px-3 py-2 font-mono text-sm transition-colors sm:text-base ${
                      isCurrentStep
                        ? "bg-white/[0.06] text-[#F8FAFC]"
                        : "text-[#94A3B8]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                        isCurrentStep
                          ? "border-[#22D3EE] text-[#22D3EE]"
                          : isFinishedStep
                            ? "border-[#6366F1] bg-[#6366F1]/15 text-[#A5B4FC]"
                            : "border-white/15 text-transparent"
                      }`}
                    >
                      {isFinishedStep ? "✓" : isCurrentStep ? "•" : ""}
                    </span>
                    <span className="min-w-0 break-words">{message}</span>
                    {isCurrentStep && (
                      <motion.span
                        aria-hidden="true"
                        className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-[#22D3EE]"
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: [0.35, 1, 0.35] }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 1.2,
                          repeat: shouldReduceMotion ? 0 : Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
