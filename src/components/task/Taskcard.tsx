import type { Task, TaskPriority } from "../../services/tasksMock";

const priorityConfig: Record<TaskPriority, { color: string; label: string }> = {
  low: { color: "#10b981", label: "Low" },
  medium: { color: "#f59e0b", label: "Medium" },
  high: { color: "#ef4444", label: "High" },
};

type Props = {
  task: Task;
  onDragStart: (id: number) => void;
  onDelete?: (id: number) => void;
  onEdit?: (task: Task) => void;
};

export const TaskCard = ({ task, onDragStart, onDelete, onEdit }: Props) => {
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "No date";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const priority = priorityConfig[task.priority];
  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "done";

  return (
    <div
      draggable
      onDragStart={() => onDragStart(task.id)}
      style={{
        background: "white",
        padding: "1rem",
        marginBottom: "0.75rem",
        borderRadius: "0.75rem",
        cursor: "grab",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        border: isOverdue ? "2px solid #ef4444" : "1px solid #e5e7eb",
        transition: "all 0.3s ease",
        userSelect: "none",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.12)";
        e.currentTarget.style.transform = "translateY(-4px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Header with priority and actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          marginBottom: "0.75rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "inline-block",
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: priority.color,
            }}
          ></span>
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: "600",
              color: priority.color,
              textTransform: "uppercase",
            }}
          >
            {priority.label}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
          }}
        >
          {onEdit && (
            <button
              onClick={() => onEdit(task)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                padding: "0",
              }}
              title="Edit task"
            >
              ✏️
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(task.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
                padding: "0",
                opacity: 0.6,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "0.6";
              }}
              title="Delete task"
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      {/* Title */}
      <h4
        style={{
          fontSize: "0.95rem",
          fontWeight: "600",
          color: "var(--text-h)",
          margin: "0 0 0.5rem 0",
          wordBreak: "break-word",
        }}
      >
        {task.title}
      </h4>

      {/* Description */}
      {task.description && (
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--text)",
            margin: "0 0 0.5rem 0",
            lineHeight: "1.4",
          }}
        >
          {task.description}
        </p>
      )}

      {/* Metadata */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "0.75rem",
          borderTop: "1px solid #f0f0f0",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            alignItems: "center",
          }}
        >
          {task.assignee && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "white",
                fontSize: "0.75rem",
                fontWeight: "700",
              }}
              title={task.assignee}
            >
              {task.assignee.charAt(0)}
            </div>
          )}
        </div>

        {task.dueDate && (
          <span
            style={{
              fontSize: "0.8rem",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.375rem",
              background: isOverdue
                ? "rgba(239, 68, 68, 0.2)"
                : "rgba(99, 102, 241, 0.1)",
              color: isOverdue ? "#ef4444" : "var(--text)",
              fontWeight: "500",
            }}
          >
            {isOverdue ? "⚠️ " : "📅 "}
            {formatDate(task.dueDate)}
          </span>
        )}
      </div>
    </div>
  );
};
