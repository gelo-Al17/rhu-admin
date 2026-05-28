import { useEffect } from "react";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import type { ToastData } from "../types";

interface ToastProps extends ToastData {
  onDismiss: () => void;
  duration?: number;
}

const icons = {
  success: CheckCircle,
  error:   XCircle,
  warning: AlertTriangle,
  info:    Info,
};

export default function Toast({ message, type, onDismiss, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const t = setTimeout(onDismiss, duration);
    return () => clearTimeout(t);
  }, [onDismiss, duration]);

  const Icon = icons[type];

  return (
    <div className={`toast toast-${type}`}>
      <Icon size={18} />
      {message}
    </div>
  );
}
