import { useState, useEffect } from "react";

interface UseQueueOptions {
  initial?: number;
  autoAdvanceMs?: number | null;
}

export function useQueue({ initial = 1, autoAdvanceMs = null }: UseQueueOptions = {}) {
  const [currentServing, setCurrentServing] = useState(initial);

  useEffect(() => {
    if (!autoAdvanceMs) return;
    const interval = setInterval(() => setCurrentServing((n) => n + 1), autoAdvanceMs);
    return () => clearInterval(interval);
  }, [autoAdvanceMs]);

  const callNext = () => setCurrentServing((n) => n + 1);
  const reset = () => setCurrentServing(initial);

  return { currentServing, callNext, reset };
}
