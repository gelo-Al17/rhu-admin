import { useState, useCallback } from "react";
import type { ToastData, ToastType } from "../types";

export function useToast() {
  const [toast, setToast] = useState<ToastData | null>(null);

  const show = useCallback((message: string, type: ToastType = "info", duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  }, []);

  const hide = useCallback(() => setToast(null), []);

  return { toast, show, hide };
}
