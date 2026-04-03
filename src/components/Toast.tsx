import React, { useEffect } from "react";
import { useToast } from "../hooks/useToast";

const getToastStyles = (type: "success" | "error" | "info" | "warning") => {
  const baseStyles = {
    padding: "1rem 1.5rem",
    borderRadius: "0.75rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    fontSize: "0.95rem",
    fontWeight: "500",
    fontFamily: "var(--sans)",
    border: "2px solid transparent",
    animation: "slideIn 0.3s ease-out",
    maxWidth: "400px",
    backdropFilter: "blur(10px)",
    color: "#ffffff",
  };

  const typeStyles = {
    success: {
      background: "rgba(16, 185, 129, 0.95)",
      borderColor: "#10b981",
    },
    error: {
      background: "rgba(239, 68, 68, 0.95)",
      borderColor: "#ef4444",
    },
    info: {
      background: "rgba(59, 130, 246, 0.95)",
      borderColor: "#3b82f6",
    },
    warning: {
      background: "rgba(245, 158, 11, 0.95)",
      borderColor: "#f59e0b",
    },
  };

  return { ...baseStyles, ...typeStyles[type] };
};

const getIcon = (type: "success" | "error" | "info" | "warning") => {
  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
    warning: "!",
  };
  return icons[type];
};

interface ToastItemProps {
  toast: {
    id: string;
    message: string;
    type: "success" | "error" | "info" | "warning";
    duration?: number;
  };
}

const ToastItem: React.FC<ToastItemProps> = ({ toast }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    if (toast.duration && toast.duration > 0) {
      const timer = setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast, removeToast]);

  return (
    <div style={getToastStyles(toast.type)} role="alert" aria-live="polite">
      <span style={{ fontSize: "1.25rem", fontWeight: "700" }}>
        {getIcon(toast.type)}
      </span>
      <span>{toast.message}</span>
    </div>
  );
};

export const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  return (
    <>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          zIndex: 10000,
          pointerEvents: "none",
        }}
      >
        {toasts.map((toast) => (
          <div key={toast.id} style={{ pointerEvents: "auto" }}>
            <ToastItem toast={toast} />
          </div>
        ))}
      </div>
    </>
  );
};
