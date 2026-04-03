import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }

  const success = (message: string, duration?: number) =>
    context.addToast(message, "success", duration ?? 3000);
  const error = (message: string, duration?: number) =>
    context.addToast(message, "error", duration ?? 4000);
  const info = (message: string, duration?: number) =>
    context.addToast(message, "info", duration ?? 3000);
  const warning = (message: string, duration?: number) =>
    context.addToast(message, "warning", duration ?? 3500);

  return {
    toasts: context.toasts,
    addToast: context.addToast,
    removeToast: context.removeToast,
    success,
    error,
    info,
    warning,
  };
};
