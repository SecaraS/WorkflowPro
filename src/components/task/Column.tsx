import { useState, useEffect } from "react";
import { TaskCard } from "./Taskcard";
import type { Task, TaskStatus } from "../../services/tasksMock";

const statusColors: Record<
  TaskStatus,
  { bg: string; border: string; title: string; emoji: string }
> = {
  todo: { bg: "#fef3c7", border: "#fbbf24", title: "#92400e", emoji: "📝" },
  inprogress: {
    bg: "#dbeafe",
    border: "#3b82f6",
    title: "#1e40af",
    emoji: "⚡",
  },
  done: { bg: "#dcfce7", border: "#10b981", title: "#065f46", emoji: "✨" },
};

type Props = {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onDropTask: (id: number, status: TaskStatus) => void;
  onDragStart: (id: number) => void;
  onAddTask?: (status: TaskStatus) => void;
  onDeleteTask?: (id: number) => void;
  onEditTask?: (task: Task) => void;
};

export const Column = ({
  title,
  status,
  tasks,
  onDropTask,
  onDragStart,
  onAddTask,
  onDeleteTask,
  onEditTask,
}: Props) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const colors = statusColors[status];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      onDragOver={(e) => {
        if (!isMobile) {
          e.preventDefault();
          setIsDragOver(true);
        }
      }}
      onDragLeave={() => {
        if (!isMobile) {
          setIsDragOver(false);
        }
      }}
      onDrop={(e) => {
        if (!isMobile) {
          e.preventDefault();
          setIsDragOver(false);
          const taskId = Number(e.dataTransfer.getData("taskId"));
          onDropTask(taskId, status);
        }
      }}
      style={{
        minWidth: isMobile ? "100%" : "320px",
        background: "#fff",
        padding: isMobile ? "1rem" : "1.5rem",
        borderRadius: "1rem",
        minHeight: isMobile ? "400px" : "600px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        border: `2px solid ${isDragOver ? colors.border : "#e5e7eb"}`,
        borderLeft: `5px solid ${colors.border}`,
        transition: "all 0.3s ease",
        backgroundColor: isDragOver ? colors.bg : "#fff",
        opacity: isDragOver ? 0.95 : 1,
      }}
    >
      {/* Column Header */}
      <div
        style={{
          background: colors.bg,
          padding: isMobile ? "0.5rem 0.75rem" : "0.75rem 1rem",
          borderRadius: "0.75rem",
          marginBottom: "1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? "0.5rem" : "0.75rem",
          }}
        >
          <span style={{ fontSize: isMobile ? "1rem" : "1.25rem" }}>
            {colors.emoji}
          </span>
          <h3
            style={{
              margin: "0",
              fontSize: isMobile ? "0.9rem" : "1.1rem",
              fontWeight: "700",
              fontFamily: "var(--heading)",
              color: colors.title,
            }}
          >
            {title}
          </h3>
        </div>
        <span
          style={{
            background: colors.border,
            color: "#fff",
            padding: isMobile ? "0.2rem 0.6rem" : "0.3rem 0.8rem",
            borderRadius: "1rem",
            fontSize: isMobile ? "0.75rem" : "0.85rem",
            fontWeight: "700",
            minWidth: isMobile ? "24px" : "28px",
            textAlign: "center",
          }}
        >
          {tasks.length}
        </span>
      </div>

      {/* Add Task Button */}
      {onAddTask && (
        <button
          onClick={() => onAddTask(status)}
          style={{
            width: "100%",
            padding: isMobile ? "0.5rem" : "0.75rem",
            background: "transparent",
            border: `2px dashed ${colors.border}`,
            borderRadius: "0.75rem",
            color: colors.border,
            fontSize: isMobile ? "0.8rem" : "0.9rem",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            marginBottom: "1rem",
          }}
          onMouseEnter={(e) => {
            if (!isMobile) {
              e.currentTarget.style.background = colors.bg;
            }
          }}
          onMouseLeave={(e) => {
            if (!isMobile) {
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          + New Task
        </button>
      )}

      {/* Tasks List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {tasks.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "2rem 1rem",
              color: "#9ca3af",
              fontSize: "0.9rem",
              fontStyle: "italic",
            }}
          >
            No tasks yet
            <br />
            <span
              style={{
                fontSize: "2rem",
                marginTop: "0.5rem",
                display: "block",
              }}
            >
              📭
            </span>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = "move";
                e.dataTransfer.setData("taskId", String(task.id));
                onDragStart(task.id);
              }}
              draggable
            >
              <TaskCard
                task={task}
                onDragStart={() => {}}
                onDelete={onDeleteTask}
                onEdit={onEditTask}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
