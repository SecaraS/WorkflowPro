import { projects } from "../services/MockData";
import { tasks } from "../services/tasksMock";
import { Card } from "../components/Card";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";

export const Dashboard = () => {
  const { user } = useUser();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Project stats
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === "active").length;
  const completedProjects = projects.filter(
    (p) => p.status === "completed",
  ).length;

  // Task stats
  const totalTasks = tasks.length;
  const todoTasks = tasks.filter((t) => t.status === "todo").length;
  const inProgressTasks = tasks.filter((t) => t.status === "inprogress").length;
  const doneTasks = tasks.filter((t) => t.status === "done").length;
  const completionPercentage = Math.round((doneTasks / totalTasks) * 100 || 0);

  // Assigned tasks
  const assignedTasks = user
    ? tasks.filter((t) => t.assignee === user.username)
    : [];
  const assignedTodoTasks = assignedTasks.filter(
    (t) => t.status === "todo",
  ).length;
  const assignedInProgressTasks = assignedTasks.filter(
    (t) => t.status === "inprogress",
  ).length;
  const assignedDoneTasks = assignedTasks.filter(
    (t) => t.status === "done",
  ).length;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: isMobile ? "flex-start" : "space-between",
            marginBottom: "1rem",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "1rem" : "0",
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? "1.75rem" : "2.5rem",
              fontWeight: "700",
              fontFamily: "var(--heading)",
              color: "var(--text-h)",
              margin: "0",
            }}
          >
            📊 Dashboard Overview
          </h1>
          {user && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background:
                  "linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))",
                padding: "0.75rem 1.25rem",
                borderRadius: "0.75rem",
                border: "1px solid rgba(99, 102, 241, 0.2)",
                width: isMobile ? "100%" : "auto",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "0.5rem",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.95rem",
                  fontWeight: "700",
                  color: "white",
                }}
              >
                {user.avatar}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text)",
                  }}
                >
                  Welcome back
                </div>
                <div
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: "700",
                    color: "var(--text-h)",
                  }}
                >
                  {user.username}
                </div>
              </div>
            </div>
          )}
        </div>
        <p
          style={{
            fontSize: isMobile ? "0.9rem" : "1rem",
            color: "var(--text)",
            margin: "0 0 1rem 0",
          }}
        >
          Track your projects and tasks performance
        </p>
        {/* Gradient divider line */}
        <div
          style={{
            height: "4px",
            background: "linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)",
            borderRadius: "2px",
            boxShadow: "0 2px 8px rgba(99, 102, 241, 0.2)",
          }}
        ></div>
      </div>

      {/* ASSIGNED TO YOU SECTION */}
      {user && assignedTasks.length > 0 && (
        <div
          style={{
            marginBottom: "3rem",
            borderLeft: "4px solid #8b5cf6",
            paddingLeft: "1.5rem",
          }}
        >
          <h2
            style={{
              fontSize: "1.3rem",
              fontWeight: "600",
              fontFamily: "var(--heading)",
              color: "var(--text-h)",
              margin: "0 0 1rem 0",
            }}
          >
            👤 Assigned to You
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
              marginBottom: "2rem",
            }}
          >
            <Card
              title="Total Assigned"
              value={assignedTasks.length}
              icon="📌"
              color="#8b5cf6"
              bgColor="rgba(139, 92, 246, 0.1)"
            />
            <Card
              title="To Do"
              value={assignedTodoTasks}
              icon="📝"
              color="#f59e0b"
              bgColor="rgba(245, 158, 11, 0.1)"
            />
            <Card
              title="In Progress"
              value={assignedInProgressTasks}
              icon="⚡"
              color="#3b82f6"
              bgColor="rgba(59, 130, 246, 0.1)"
            />
            <Card
              title="Completed"
              value={assignedDoneTasks}
              icon="✅"
              color="#10b981"
              bgColor="rgba(16, 185, 129, 0.1)"
            />
          </div>

          {/* Assigned Tasks List */}
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              border: "1px solid #e5e7eb",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                padding: "0",
                margin: "0",
              }}
            >
              {assignedTasks.map((task, index) => (
                <li
                  key={task.id}
                  style={{
                    padding: isMobile ? "1rem" : "1.25rem 1.5rem",
                    borderBottom:
                      index !== assignedTasks.length - 1
                        ? "1px solid #e5e7eb"
                        : "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: isMobile ? "flex-start" : "center",
                    flexDirection: isMobile ? "column" : "row",
                    gap: isMobile ? "0.5rem" : "0",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.background = "#f8fafc";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isMobile) {
                      e.currentTarget.style.background = "transparent";
                    }
                  }}
                >
                  <div style={{ flex: 1, width: isMobile ? "100%" : "auto" }}>
                    <h4
                      style={{
                        fontSize: isMobile ? "0.9rem" : "1rem",
                        fontWeight: "600",
                        color: "var(--text-h)",
                        margin: "0 0 0.25rem 0",
                      }}
                    >
                      {task.title}
                    </h4>
                    <p
                      style={{
                        fontSize: isMobile ? "0.75rem" : "0.85rem",
                        color: "var(--text)",
                        margin: "0.25rem 0 0 0",
                      }}
                    >
                      {task.description && isMobile === false && (
                        <span>
                          {task.description}
                          <br />
                        </span>
                      )}
                      <span
                        style={{
                          display: "inline-flex",
                          gap: "0.5rem",
                          flexWrap: "wrap",
                        }}
                      >
                        <span
                          style={{
                            display: "inline-block",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "1rem",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            background: `${
                              task.status === "todo"
                                ? "rgba(251, 191, 36, 0.2)"
                                : task.status === "inprogress"
                                  ? "rgba(59, 130, 246, 0.2)"
                                  : "rgba(16, 185, 129, 0.2)"
                            }`,
                            color: `${
                              task.status === "todo"
                                ? "#92400e"
                                : task.status === "inprogress"
                                  ? "#1e40af"
                                  : "#065f46"
                            }`,
                          }}
                        >
                          {task.status === "todo"
                            ? "📝 To Do"
                            : task.status === "inprogress"
                              ? "⚡ In Progress"
                              : "✨ Done"}
                        </span>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "0.25rem 0.75rem",
                            borderRadius: "1rem",
                            fontSize: "0.75rem",
                            fontWeight: "600",
                            background: `${
                              task.priority === "low"
                                ? "rgba(16, 185, 129, 0.2)"
                                : task.priority === "medium"
                                  ? "rgba(245, 158, 11, 0.2)"
                                  : "rgba(239, 68, 68, 0.2)"
                            }`,
                            color: `${
                              task.priority === "low"
                                ? "#065f46"
                                : task.priority === "medium"
                                  ? "#92400e"
                                  : "#7f1d1d"
                            }`,
                          }}
                        >
                          {task.priority === "low"
                            ? "🟢 Low"
                            : task.priority === "medium"
                              ? "🟠 Medium"
                              : "🔴 High"}
                        </span>
                        {task.dueDate && (
                          <span
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--text)",
                            }}
                          >
                            📅{" "}
                            {new Date(task.dueDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                        )}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {user && assignedTasks.length === 0 && (
        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(16, 185, 129, 0.1))",
            padding: "2rem",
            borderRadius: "1rem",
            border: "1px solid rgba(16, 185, 129, 0.2)",
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>✨</div>
          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "var(--text-h)",
              margin: "0 0 0.5rem 0",
            }}
          >
            Great job! No tasks assigned to you
          </p>
          <p
            style={{
              fontSize: "0.9rem",
              color: "var(--text)",
              margin: "0",
            }}
          >
            You can start a new task by clicking "Add Task" in the Task Board
          </p>
        </div>
      )}

      {/* TASK STATS */}
      <div
        style={{
          marginBottom: "3rem",
          borderLeft: "4px solid #3b82f6",
          paddingLeft: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.3rem",
            fontWeight: "600",
            fontFamily: "var(--heading)",
            color: "var(--text-h)",
            margin: "0 0 1rem 0",
          }}
        >
          ✓ Task Statistics
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginBottom: "2rem",
          }}
        >
          <Card
            title="Total Tasks"
            value={totalTasks}
            icon="📋"
            color="#6366f1"
            bgColor="rgba(99, 102, 241, 0.1)"
          />
          <Card
            title="To Do"
            value={todoTasks}
            icon="📝"
            color="#fbbf24"
            bgColor="rgba(251, 191, 36, 0.1)"
          />
          <Card
            title="In Progress"
            value={inProgressTasks}
            icon="⚡"
            color="#3b82f6"
            bgColor="rgba(59, 130, 246, 0.1)"
          />
          <Card
            title="Completed"
            value={doneTasks}
            icon="✨"
            color="#10b981"
            bgColor="rgba(16, 185, 129, 0.1)"
          />
          <Card
            title="Completion"
            value={`${completionPercentage}%`}
            icon="🎯"
            color="#8b5cf6"
            bgColor="rgba(139, 92, 246, 0.1)"
          />
        </div>

        {/* Task Progress Bar */}
        <div
          style={{
            background: "rgba(99, 102, 241, 0.05)",
            padding: "1.5rem",
            borderRadius: "1rem",
            border: "1px solid rgba(99, 102, 241, 0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "0.75rem",
            }}
          >
            <span
              style={{
                fontWeight: "600",
                color: "var(--text-h)",
              }}
            >
              Overall Progress
            </span>
            <span
              style={{
                fontWeight: "700",
                color: "#8b5cf6",
              }}
            >
              {completionPercentage}% Complete
            </span>
          </div>
          <div
            style={{
              width: "100%",
              height: "8px",
              background: "rgba(99, 102, 241, 0.1)",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${completionPercentage}%`,
                background: "linear-gradient(90deg, #6366f1, #8b5cf6, #10b981)",
                borderRadius: "4px",
                transition: "width 0.4s ease",
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* PROJECT STATS */}
      <div
        style={{
          marginBottom: "3rem",
          borderLeft: "4px solid #10b981",
          paddingLeft: "1.5rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.3rem",
            fontWeight: "600",
            fontFamily: "var(--heading)",
            color: "var(--text-h)",
            margin: "0 0 1rem 0",
          }}
        >
          📁 Project Statistics
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          <Card
            title="Total Projects"
            value={totalProjects}
            icon="📦"
            color="#6366f1"
            bgColor="rgba(99, 102, 241, 0.1)"
          />
          <Card
            title="Active"
            value={activeProjects}
            icon="🚀"
            color="#3b82f6"
            bgColor="rgba(59, 130, 246, 0.1)"
          />
          <Card
            title="Completed"
            value={completedProjects}
            icon="✅"
            color="#10b981"
            bgColor="rgba(16, 185, 129, 0.1)"
          />
        </div>
      </div>

      {/* PROJECT LIST */}
      <div>
        <h2
          style={{
            fontSize: "1.3rem",
            fontWeight: "600",
            fontFamily: "var(--heading)",
            color: "var(--text-h)",
            margin: "0 0 1rem 0",
          }}
        >
          📋 Projects List
        </h2>

        <div
          style={{
            background: "white",
            borderRadius: "1rem",
            border: "1px solid #e5e7eb",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          {projects.length === 0 ? (
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "var(--text)",
              }}
            >
              No projects yet
            </div>
          ) : (
            <ul
              style={{
                listStyle: "none",
                padding: "0",
                margin: "0",
              }}
            >
              {projects.map((project, index) => (
                <li
                  key={project.id}
                  style={{
                    padding: "1.25rem 1.5rem",
                    borderBottom:
                      index !== projects.length - 1
                        ? "1px solid #e5e7eb"
                        : "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f8fafc";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <div>
                    <h4
                      style={{
                        fontSize: "1rem",
                        fontWeight: "600",
                        color: "var(--text-h)",
                        margin: "0 0 0.25rem 0",
                      }}
                    >
                      {project.name}
                    </h4>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text)",
                        margin: "0",
                      }}
                    >
                      Status:{" "}
                      <span
                        style={{
                          display: "inline-block",
                          padding: "0.25rem 0.75rem",
                          borderRadius: "1rem",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          background:
                            project.status === "active"
                              ? "rgba(59, 130, 246, 0.2)"
                              : "rgba(16, 185, 129, 0.2)",
                          color:
                            project.status === "active" ? "#1e40af" : "#065f46",
                        }}
                      >
                        {project.status === "active"
                          ? "🚀 Active"
                          : "✅ Completed"}
                      </span>
                    </p>
                  </div>
                  <div
                    style={{
                      textAlign: "right",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#6366f1",
                      }}
                    >
                      {project.progress}%
                    </div>
                    <div
                      style={{
                        width: "100px",
                        height: "6px",
                        background: "rgba(99, 102, 241, 0.1)",
                        borderRadius: "3px",
                        marginTop: "0.5rem",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${project.progress}%`,
                          background:
                            "linear-gradient(90deg, #6366f1, #8b5cf6)",
                          borderRadius: "3px",
                          transition: "width 0.3s ease",
                        }}
                      ></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
