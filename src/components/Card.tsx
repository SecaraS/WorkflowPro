export const Card = ({
  title,
  value,
  icon,
  color = "#6366f1",
  bgColor = "rgba(99, 102, 241, 0.1)",
}: {
  title: string;
  value: string | number;
  icon?: string;
  color?: string;
  bgColor?: string;
}) => {
  return (
    <div
      style={{
        padding: "1.5rem",
        border: `2px solid ${color}`,
        borderTop: `5px solid ${color}`,
        borderRadius: "1rem",
        background: bgColor,
        flex: 1,
        minWidth: "200px",
        transition: "all 0.3s ease",
        boxShadow: `0 4px 12px rgba(0,0,0,0.08)`,
        backdropFilter: "blur(10px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 8px 24px ${color}40`;
        e.currentTarget.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = `0 4px 12px rgba(0,0,0,0.08)`;
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <h4
          style={{
            fontSize: "0.95rem",
            fontWeight: "600",
            color: "var(--text-h)",
            margin: "0",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          {title}
        </h4>
        {icon && (
          <span
            style={{
              fontSize: "1.5rem",
              opacity: 0.8,
            }}
          >
            {icon}
          </span>
        )}
      </div>
      <p
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          margin: "0",
          background: `linear-gradient(135deg, ${color}, ${color}dd)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {value}
      </p>
    </div>
  );
};
