import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const calculateElapsedTime = (activeTime) => {
  const activeTimeMs = new Date(activeTime).getTime();
  const nowMs = Date.now();
  const elapsedMs = nowMs - activeTimeMs;

  return {
    milliseconds: elapsedMs,
    seconds: Math.floor(elapsedMs / 1000),
    minutes: Math.floor(elapsedMs / (1000 * 60)),
    hours: Math.floor(elapsedMs / (1000 * 60 * 60)),
    days: Math.floor(elapsedMs / (1000 * 60 * 60 * 24)),
  };
};
