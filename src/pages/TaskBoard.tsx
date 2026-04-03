import { useState, useRef, useEffect } from "react";
import { tasks as initialTasks } from "../services/tasksMock";
import type { Task, TaskPriority, TaskStatus } from "../services/tasksMock";
import { Column } from "../components/task/Column";
import { useToast } from "../hooks/useToast";

export const TaskBoard = () => {
  const toast = useToast();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [modalStatus, setModalStatus] = useState<TaskStatus>("todo");
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const containerRef = useRef<HTMLDivElement>(null);
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50 && containerRef.current) {
      // Swipe detected, scroll container
      if (diff > 0) {
        containerRef.current.scrollLeft += 300;
      } else {
        containerRef.current.scrollLeft -= 300;
      }
    }
  };

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium" as TaskPriority,
    dueDate: "",
    assignee: "",
  });

  const todo = tasks.filter((t) => t.status === "todo");
  const inprogress = tasks.filter((t) => t.status === "inprogress");
  const done = tasks.filter((t) => t.status === "done");

  const moveTask = (taskId: number, newStatus: TaskStatus) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task && task.status !== newStatus) {
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
      );
      const statusLabels: Record<TaskStatus, string> = {
        todo: "To Do",
        inprogress: "In Progress",
        done: "Done",
      };
      toast.info(`Task moved to ${statusLabels[newStatus]}`);
    }
  };

  const openAddModal = (status: TaskStatus) => {
    setEditingTask(null);
    setModalStatus(status);
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setModalStatus(task.status);
    setFormData({
      title: task.title,
      description: task.description || "",
      priority: task.priority,
      dueDate: task.dueDate || "",
      assignee: task.assignee || "",
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      assignee: "",
    });
    setEditingTask(null);
  };

  const saveTask = () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a task title");
      return;
    }

    if (editingTask) {
      // Update existing task
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                title: formData.title,
                description: formData.description,
                priority: formData.priority,
                dueDate: formData.dueDate,
                assignee: formData.assignee,
                status: modalStatus,
              }
            : task,
        ),
      );
      toast.success("Task updated successfully!");
    } else {
      // Create new task
      const newTask: Task = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        status: modalStatus,
        priority: formData.priority,
        dueDate: formData.dueDate,
        assignee: formData.assignee,
      };
      setTasks((prev) => [...prev, newTask]);
      toast.success("Task created successfully!");
    }

    resetForm();
    setIsModalOpen(false);
  };

  const deleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
    setDeleteConfirm(null);
    toast.success("Task deleted successfully!");
  };

  const handleDragStart = () => {
    // optional for future upgrades
  };

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            fontFamily: "var(--heading)",
            color: "var(--text-h)",
            margin: "0 0 0.5rem 0",
          }}
        >
          📋 Task Board
        </h1>
        <p
          style={{
            color: "var(--text)",
            margin: "0 0 1rem 0",
            fontSize: "1rem",
          }}
        >
          Organize and manage your tasks efficiently
        </p>
        {/* Gradient divider line */}
        <div
          style={{
            height: "4px",
            background:
              "linear-gradient(90deg, #3b82f6, #8b5cf6, #f59e0b, #10b981)",
            borderRadius: "2px",
            boxShadow: "0 2px 8px rgba(99, 102, 241, 0.2)",
          }}
        ></div>
      </div>

      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "repeat(auto-fit, minmax(300px, 1fr))"
            : "repeat(3, 1fr)",
          gap: "1.5rem",
          marginTop: "2rem",
          overflowX: isMobile ? "auto" : "visible",
          overflowY: "hidden",
          paddingBottom: "1rem",
          WebkitOverflowScrolling: "touch",
          scrollBehavior: "smooth",
        }}
      >
        <Column
          title="To Do"
          status="todo"
          tasks={todo}
          onDropTask={moveTask}
          onDragStart={handleDragStart}
          onAddTask={openAddModal}
          onDeleteTask={deleteTask}
          onEditTask={openEditModal}
        />

        <Column
          title="In Progress"
          status="inprogress"
          tasks={inprogress}
          onDropTask={moveTask}
          onDragStart={handleDragStart}
          onAddTask={openAddModal}
          onDeleteTask={deleteTask}
          onEditTask={openEditModal}
        />

        <Column
          title="Done"
          status="done"
          tasks={done}
          onDropTask={moveTask}
          onDragStart={handleDragStart}
          onAddTask={openAddModal}
          onDeleteTask={deleteTask}
          onEditTask={openEditModal}
        />
      </div>

      {/* DELETE CONFIRMATION DIALOG */}
      {deleteConfirm !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1001,
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setDeleteConfirm(null)}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "1rem",
              width: "90%",
              maxWidth: "400px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "700",
                fontFamily: "var(--heading)",
                color: "#dc2626",
                margin: "0 0 1rem 0",
              }}
            >
              ⚠️ Delete Task
            </h3>
            <p style={{ color: "var(--text)", marginBottom: "1.5rem" }}>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "var(--border)",
                  color: "var(--text)",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#d1d5db";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--border)";
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => deleteTask(deleteConfirm)}
                style={{
                  padding: "0.75rem 1.5rem",
                  background:
                    "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(220, 38, 38, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(220, 38, 38, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(220, 38, 38, 0.4)";
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TASK FORM MODAL */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
          }}
          onClick={() => {
            setIsModalOpen(false);
            resetForm();
          }}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "1rem",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                fontFamily: "var(--heading)",
                color: "var(--text-h)",
                margin: "0 0 1.5rem 0",
              }}
            >
              {editingTask ? "✏️ Edit Task" : "✨ Create New Task"}
            </h3>

            {/* Title */}
            <label
              style={{
                display: "block",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  color: "var(--text-h)",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Title *
              </span>
              <input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                onKeyPress={(e) => e.key === "Enter" && saveTask()}
                placeholder="Enter task title..."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  fontFamily: "var(--sans)",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#6366f1";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(99, 102, 241, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
                autoFocus
              />
            </label>

            {/* Description */}
            <label
              style={{
                display: "block",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  color: "var(--text-h)",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Description
              </span>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Add task description..."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  fontFamily: "var(--sans)",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                  minHeight: "100px",
                  resize: "vertical",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#6366f1";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(99, 102, 241, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </label>

            {/* Priority */}
            <label
              style={{
                display: "block",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  color: "var(--text-h)",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Priority
              </span>
              <select
                value={formData.priority}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    priority: e.target.value as TaskPriority,
                  })
                }
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  fontFamily: "var(--sans)",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                  cursor: "pointer",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#6366f1";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(99, 102, 241, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟠 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </label>

            {/* Due Date */}
            <label
              style={{
                display: "block",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  color: "var(--text-h)",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Due Date
              </span>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  fontFamily: "var(--sans)",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                  cursor: "pointer",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#6366f1";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(99, 102, 241, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </label>

            {/* Assignee */}
            <label
              style={{
                display: "block",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  fontWeight: "600",
                  color: "var(--text-h)",
                  display: "block",
                  marginBottom: "0.5rem",
                }}
              >
                Assignee
              </span>
              <input
                value={formData.assignee}
                onChange={(e) =>
                  setFormData({ ...formData, assignee: e.target.value })
                }
                placeholder="Name of person assigned..."
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "2px solid var(--border)",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  fontFamily: "var(--sans)",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#6366f1";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(99, 102, 241, 0.1)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </label>

            {/* Buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "var(--border)",
                  color: "var(--text)",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#d1d5db";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--border)";
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveTask}
                style={{
                  padding: "0.75rem 1.5rem",
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 16px rgba(99, 102, 241, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(99, 102, 241, 0.4)";
                }}
              >
                {editingTask ? "Update Task" : "Create Task"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
