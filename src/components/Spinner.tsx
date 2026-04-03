interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  fullScreen?: boolean;
}

const sizes = {
  sm: "24px",
  md: "40px",
  lg: "60px",
};

export const Spinner = ({
  size = "md",
  color = "#6366f1",
  fullScreen = false,
}: SpinnerProps) => {
  const spinnerElement = (
    <div
      style={{
        width: sizes[size],
        height: sizes[size],
        border: `3px solid rgba(99, 102, 241, 0.2)`,
        borderTop: `3px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    >
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  if (fullScreen) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 5000,
          backdropFilter: "blur(4px)",
        }}
      >
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
};
