import { useState, useEffect } from "react";
import { tasks } from "../services/tasksMock";
import { useToast } from "../hooks/useToast";

interface ReportData {
  period: string;
  taskCreated: number;
  taskCompleted: number;
  activeProjects: number;
  completionRate: number;
}

interface MemberPerformance {
  name: string;
  tasksCompleted: number;
  tasksTotal: number;
  completionRate: number;
  trend: "up" | "down" | "stable";
}

const reportHistory: ReportData[] = [
  {
    period: "Week 1",
    taskCreated: 12,
    taskCompleted: 8,
    activeProjects: 3,
    completionRate: 67,
  },
  {
    period: "Week 2",
    taskCreated: 15,
    taskCompleted: 12,
    activeProjects: 3,
    completionRate: 80,
  },
  {
    period: "Week 3",
    taskCreated: 11,
    taskCompleted: 10,
    activeProjects: 4,
    completionRate: 91,
  },
  {
    period: "Week 4",
    taskCreated: 18,
    taskCompleted: 14,
    activeProjects: 4,
    completionRate: 78,
  },
  {
    period: "Week 5",
    taskCreated: 20,
    taskCompleted: 18,
    activeProjects: 5,
    completionRate: 90,
  },
];

const memberPerformance: MemberPerformance[] = [
  {
    name: "Sarah Johnson",
    tasksCompleted: 6,
    tasksTotal: 8,
    completionRate: 75,
    trend: "up",
  },
  {
    name: "Mike Chen",
    tasksCompleted: 10,
    tasksTotal: 12,
    completionRate: 83,
    trend: "up",
  },
  {
    name: "Emma Davis",
    tasksCompleted: 4,
    tasksTotal: 6,
    completionRate: 67,
    trend: "stable",
  },
  {
    name: "James Wilson",
    tasksCompleted: 5,
    tasksTotal: 5,
    completionRate: 100,
    trend: "stable",
  },
  {
    name: "Lisa Rodriguez",
    tasksCompleted: 4,
    tasksTotal: 4,
    completionRate: 100,
    trend: "up",
  },
];

export const Reports = () => {
  const toast = useToast();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeTab, setActiveTab] = useState<
    "overview" | "performance" | "trends"
  >("overview");
  const [selectedPeriod, setSelectedPeriod] = useState("Week 5");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentReport =
    reportHistory.find((r) => r.period === selectedPeriod) || reportHistory[4];

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === "done").length;
  const overallCompletionRate = Math.round(
    (completedTasks / totalTasks) * 100 || 0,
  );
  const highPriorityTasks = tasks.filter((t) => t.priority === "high").length;
  const overdueTasks = tasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done",
  ).length;

  const topPerformer = memberPerformance.reduce((max, current) =>
    current.completionRate > max.completionRate ? current : max,
  );

  const handleExportReport = () => {
    toast.success("Report exported successfully! 📊");
  };

  const handleGenerateChart = () => {
    toast.info("Generating detailed analytics chart...");
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            fontSize: isMobile ? "1.75rem" : "2.5rem",
            fontWeight: "700",
            fontFamily: "var(--heading)",
            color: "var(--text-h)",
            margin: "0 0 0.5rem 0",
          }}
        >
          📊 Reports & Analytics
        </h1>
        <p
          style={{
            fontSize: isMobile ? "0.9rem" : "1rem",
            color: "var(--text)",
            margin: "0 0 1rem 0",
          }}
        >
          Comprehensive analytics and performance metrics
        </p>
        {/* Gradient divider */}
        <div
          style={{
            height: "4px",
            background:
              "linear-gradient(90deg, #f59e0b, #8b5cf6, #3b82f6, #06b6d4)",
            borderRadius: "2px",
            boxShadow: "0 2px 8px rgba(245, 158, 11, 0.2)",
          }}
        ></div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginBottom: "2rem",
          flexWrap: "wrap",
        }}
      >
        {["overview", "performance", "trends"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as typeof activeTab)}
            style={{
              padding: "0.65rem 1.5rem",
              border:
                activeTab === tab
                  ? "2px solid #6366f1"
                  : "2px solid var(--border)",
              background:
                activeTab === tab
                  ? "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))"
                  : "white",
              borderRadius: "0.5rem",
              fontSize: "0.95rem",
              fontWeight: "600",
              color: activeTab === tab ? "#6366f1" : "var(--text)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textTransform: "capitalize",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab) {
                e.currentTarget.style.borderColor = "#6366f1";
                e.currentTarget.style.background = "rgba(99, 102, 241, 0.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab) {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "white";
              }
            }}
          >
            {tab === "overview"
              ? "🎯 Overview"
              : tab === "performance"
                ? "⭐ Performance"
                : "📈 Trends"}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          {/* Key Metrics */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem",
              marginBottom: "3rem",
            }}
          >
            <div
              style={{
                padding: "1.5rem",
                border: "2px solid #3b82f6",
                borderTop: "5px solid #3b82f6",
                borderRadius: "1rem",
                background: "rgba(59, 130, 246, 0.08)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "var(--text-h)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "0.75rem",
                }}
              >
                Total Tasks
              </div>
              <p
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  margin: "0",
                  background: "linear-gradient(135deg, #3b82f6, #1e40af)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {totalTasks}
              </p>
            </div>

            <div
              style={{
                padding: "1.5rem",
                border: "2px solid #10b981",
                borderTop: "5px solid #10b981",
                borderRadius: "1rem",
                background: "rgba(16, 185, 129, 0.08)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "var(--text-h)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "0.75rem",
                }}
              >
                Completed
              </div>
              <p
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  margin: "0",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {completedTasks}
              </p>
            </div>

            <div
              style={{
                padding: "1.5rem",
                border: "2px solid #8b5cf6",
                borderTop: "5px solid #8b5cf6",
                borderRadius: "1rem",
                background: "rgba(139, 92, 246, 0.08)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "var(--text-h)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "0.75rem",
                }}
              >
                Completion Rate
              </div>
              <p
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  margin: "0",
                  background: "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {overallCompletionRate}%
              </p>
            </div>

            <div
              style={{
                padding: "1.5rem",
                border: "2px solid #f59e0b",
                borderTop: "5px solid #f59e0b",
                borderRadius: "1rem",
                background: "rgba(245, 158, 11, 0.08)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "var(--text-h)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "0.75rem",
                }}
              >
                High Priority
              </div>
              <p
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  margin: "0",
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {highPriorityTasks}
              </p>
            </div>

            <div
              style={{
                padding: "1.5rem",
                border: "2px solid #ef4444",
                borderTop: "5px solid #ef4444",
                borderRadius: "1rem",
                background: "rgba(239, 68, 68, 0.08)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <div
                style={{
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  color: "var(--text-h)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  marginBottom: "0.75rem",
                }}
              >
                Overdue Tasks
              </div>
              <p
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  margin: "0",
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {overdueTasks}
              </p>
            </div>
          </div>

          {/* Current Period Analysis */}
          <div
            style={{
              padding: "2rem",
              background: "white",
              borderRadius: "1rem",
              border: "1px solid var(--border)",
              marginBottom: "2rem",
              borderLeft: "5px solid #06b6d4",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <h2
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "700",
                  color: "var(--text-h)",
                  margin: "0",
                }}
              >
                Period Analysis
              </h2>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                style={{
                  padding: "0.65rem 1rem",
                  border: "2px solid #06b6d4",
                  borderRadius: "0.5rem",
                  background: "white",
                  color: "var(--text-h)",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {reportHistory.map((report) => (
                  <option key={report.period} value={report.period}>
                    {report.period}
                  </option>
                ))}
              </select>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  padding: "1.25rem",
                  background: "rgba(99, 102, 241, 0.08)",
                  borderLeft: "4px solid #6366f1",
                  borderRadius: "0.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text)",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  Tasks Created
                </div>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#6366f1",
                  }}
                >
                  {currentReport.taskCreated}
                </div>
              </div>

              <div
                style={{
                  padding: "1.25rem",
                  background: "rgba(16, 185, 129, 0.08)",
                  borderLeft: "4px solid #10b981",
                  borderRadius: "0.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text)",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  Tasks Completed
                </div>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#10b981",
                  }}
                >
                  {currentReport.taskCompleted}
                </div>
              </div>

              <div
                style={{
                  padding: "1.25rem",
                  background: "rgba(139, 92, 246, 0.08)",
                  borderLeft: "4px solid #8b5cf6",
                  borderRadius: "0.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text)",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  Active Projects
                </div>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#8b5cf6",
                  }}
                >
                  {currentReport.activeProjects}
                </div>
              </div>

              <div
                style={{
                  padding: "1.25rem",
                  background: "rgba(245, 158, 11, 0.08)",
                  borderLeft: "4px solid #f59e0b",
                  borderRadius: "0.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text)",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem",
                  }}
                >
                  Completion Rate
                </div>
                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#f59e0b",
                  }}
                >
                  {currentReport.completionRate}%
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === "performance" && (
        <div>
          {/* Top Performer */}
          <div
            style={{
              padding: "2rem",
              background:
                "linear-gradient(135deg, rgba(251, 191, 36, 0.15), rgba(236, 72, 153, 0.1))",
              borderRadius: "1rem",
              border: "2px solid #fbbf24",
              marginBottom: "2rem",
              borderLeft: "5px solid #fbbf24",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <span style={{ fontSize: "2.5rem" }}>🏆</span>
              <div>
                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    color: "var(--text-h)",
                    margin: "0",
                  }}
                >
                  Top Performer
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text)",
                    margin: "0.25rem 0 0 0",
                  }}
                >
                  Highest completion rate this period
                </p>
              </div>
            </div>
            <div
              style={{
                fontSize: "1.8rem",
                fontWeight: "700",
                color: "#f59e0b",
                marginBottom: "0.5rem",
              }}
            >
              {topPerformer.name}
            </div>
            <div
              style={{
                display: "flex",
                gap: "2rem",
                flexWrap: "wrap",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text)",
                    fontWeight: "600",
                  }}
                >
                  Completion Rate
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#f59e0b",
                  }}
                >
                  {topPerformer.completionRate}%
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text)",
                    fontWeight: "600",
                  }}
                >
                  Tasks Completed
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#f59e0b",
                  }}
                >
                  {topPerformer.tasksCompleted}/{topPerformer.tasksTotal}
                </div>
              </div>
            </div>
          </div>

          {/* Member Performance List */}
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "1.5rem",
                borderBottom: "2px solid var(--border)",
                background: "var(--bg)",
                borderLeft: "5px solid #8b5cf6",
              }}
            >
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "700",
                  color: "var(--text-h)",
                  margin: "0",
                }}
              >
                Team Performance Breakdown
              </h3>
            </div>

            <div>
              {memberPerformance.map((member, index) => (
                <div
                  key={index}
                  style={{
                    padding: "1.5rem",
                    borderBottom:
                      index < memberPerformance.length - 1
                        ? "1px solid var(--border)"
                        : "none",
                    borderLeft: `4px solid ${
                      member.completionRate === 100
                        ? "#10b981"
                        : member.completionRate >= 80
                          ? "#3b82f6"
                          : "#f59e0b"
                    }`,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                      flexWrap: "wrap",
                      gap: "1rem",
                    }}
                  >
                    <div style={{ flex: 1, minWidth: "150px" }}>
                      <h4
                        style={{
                          fontSize: "1rem",
                          fontWeight: "700",
                          color: "var(--text-h)",
                          margin: "0 0 0.25rem 0",
                        }}
                      >
                        {member.name}
                      </h4>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--text)",
                          margin: "0",
                        }}
                      >
                        {member.tasksCompleted} of {member.tasksTotal} tasks
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "1.5rem",
                          fontWeight: "700",
                          color:
                            member.completionRate === 100
                              ? "#10b981"
                              : member.completionRate >= 80
                                ? "#3b82f6"
                                : "#f59e0b",
                        }}
                      >
                        {member.completionRate}%
                      </div>
                      <span
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          color:
                            member.trend === "up"
                              ? "#10b981"
                              : member.trend === "down"
                                ? "#ef4444"
                                : "#9ca3af",
                        }}
                      >
                        {member.trend === "up"
                          ? "↑ Improving"
                          : member.trend === "down"
                            ? "↓ Declining"
                            : "→ Stable"}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div
                    style={{
                      width: "100%",
                      height: "6px",
                      background: "var(--border)",
                      borderRadius: "3px",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${member.completionRate}%`,
                        background: `linear-gradient(90deg, ${
                          member.completionRate === 100
                            ? "#10b981"
                            : member.completionRate >= 80
                              ? "#3b82f6"
                              : "#f59e0b"
                        }, ${
                          member.completionRate === 100
                            ? "#059669"
                            : member.completionRate >= 80
                              ? "#1e40af"
                              : "#d97706"
                        })`,
                        borderRadius: "3px",
                        transition: "width 0.3s ease",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Trends Tab */}
      {activeTab === "trends" && (
        <div>
          {/* Line Chart Trend */}
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              border: "1px solid var(--border)",
              padding: "2rem",
              marginBottom: "2rem",
              borderLeft: "5px solid #8b5cf6",
            }}
          >
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "var(--text-h)",
                margin: "0 0 1.5rem 0",
              }}
            >
              📉 Completion Rate Trend Line
            </h3>

            <svg
              width="100%"
              height="300"
              viewBox="0 0 1000 300"
              style={{ marginBottom: "1rem" }}
            >
              {/* Grid lines */}
              {[0, 20, 40, 60, 80, 100].map((value) => (
                <g key={`grid-${value}`}>
                  <line
                    x1="60"
                    y1={300 - (value / 100) * 260 - 20}
                    x2="980"
                    y2={300 - (value / 100) * 260 - 20}
                    stroke={value === 0 ? "#000" : "#e5e7eb"}
                    strokeWidth={value === 0 ? "2" : "1"}
                    strokeDasharray={value === 0 ? "0" : "4"}
                  />
                  <text
                    x="50"
                    y={300 - (value / 100) * 260 - 10}
                    fontSize="12"
                    fill="var(--text)"
                    textAnchor="end"
                  >
                    {value}%
                  </text>
                </g>
              ))}

              {/* Y-axis */}
              <line
                x1="60"
                y1="20"
                x2="60"
                y2="280"
                stroke="#000"
                strokeWidth="2"
              />

              {/* X-axis */}
              <line
                x1="60"
                y1="280"
                x2="980"
                y2="280"
                stroke="#000"
                strokeWidth="2"
              />

              {/* Line path */}
              <polyline
                points={reportHistory
                  .map((report, index) => {
                    const x = 60 + (index / (reportHistory.length - 1)) * 920;
                    const y = 280 - (report.completionRate / 100) * 260;
                    return `${x},${y}`;
                  })
                  .join(" ")}
                fill="none"
                stroke="url(#gradientLine)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient
                  id="gradientLine"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>

              {/* Data points and labels */}
              {reportHistory.map((report, index) => {
                const x = 60 + (index / (reportHistory.length - 1)) * 920;
                const y = 280 - (report.completionRate / 100) * 260;
                return (
                  <g key={`point-${index}`}>
                    {/* Point circle */}
                    <circle cx={x} cy={y} r="6" fill="#8b5cf6" />
                    <circle cx={x} cy={y} r="3" fill="white" />

                    {/* Value label */}
                    <text
                      x={x}
                      y={y - 20}
                      fontSize="14"
                      fontWeight="700"
                      fill="#8b5cf6"
                      textAnchor="middle"
                    >
                      {report.completionRate}%
                    </text>

                    {/* Period label */}
                    <text
                      x={x}
                      y="300"
                      fontSize="12"
                      fill="var(--text)"
                      textAnchor="middle"
                    >
                      {report.period}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Trend Indicators */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  padding: "1rem",
                  background: "rgba(16, 185, 129, 0.08)",
                  borderLeft: "4px solid #10b981",
                  borderRadius: "0.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "var(--text)",
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                    marginBottom: "0.5rem",
                  }}
                >
                  Highest Rate
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#10b981",
                  }}
                >
                  {Math.max(...reportHistory.map((r) => r.completionRate))}%
                </div>
              </div>

              <div
                style={{
                  padding: "1rem",
                  background: "rgba(239, 68, 68, 0.08)",
                  borderLeft: "4px solid #ef4444",
                  borderRadius: "0.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "var(--text)",
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                    marginBottom: "0.5rem",
                  }}
                >
                  Lowest Rate
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#ef4444",
                  }}
                >
                  {Math.min(...reportHistory.map((r) => r.completionRate))}%
                </div>
              </div>

              <div
                style={{
                  padding: "1rem",
                  background: "rgba(6, 182, 212, 0.08)",
                  borderLeft: "4px solid #06b6d4",
                  borderRadius: "0.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "var(--text)",
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                    marginBottom: "0.5rem",
                  }}
                >
                  Average Rate
                </div>
                <div
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "#06b6d4",
                  }}
                >
                  {Math.round(
                    reportHistory.reduce(
                      (sum, r) => sum + r.completionRate,
                      0,
                    ) / reportHistory.length,
                  )}
                  %
                </div>
              </div>
            </div>
          </div>

          {/* Task Creation Trend */}
          <div
            style={{
              background: "white",
              borderRadius: "1rem",
              border: "1px solid var(--border)",
              padding: "2rem",
              marginBottom: "2rem",
              borderLeft: "5px solid #f59e0b",
            }}
          >
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "var(--text-h)",
                margin: "0 0 1.5rem 0",
              }}
            >
              📝 Task Creation vs Completion
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile
                  ? "1fr"
                  : "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1.5rem",
              }}
            >
              {reportHistory.map((report) => (
                <div
                  key={report.period}
                  style={{
                    padding: "1.25rem",
                    background: "var(--bg)",
                    borderRadius: "0.75rem",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: "700",
                      color: "var(--text-h)",
                      textTransform: "uppercase",
                      marginBottom: "1rem",
                    }}
                  >
                    {report.period}
                  </div>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text)",
                        fontWeight: "600",
                        marginBottom: "0.35rem",
                      }}
                    >
                      Created
                    </div>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#6366f1",
                      }}
                    >
                      {report.taskCreated}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text)",
                        fontWeight: "600",
                        marginBottom: "0.35rem",
                      }}
                    >
                      Completed
                    </div>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#10b981",
                      }}
                    >
                      {report.taskCompleted}
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: "0.75rem",
                      paddingTop: "0.75rem",
                      borderTop: "1px solid var(--border)",
                      fontSize: "0.85rem",
                      color:
                        report.taskCompleted >= report.taskCreated * 0.8
                          ? "#10b981"
                          : "#f59e0b",
                      fontWeight: "600",
                    }}
                  >
                    {report.taskCompleted >= report.taskCreated * 0.8
                      ? "✓ On track"
                      : "⚠ Behind"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Export Options */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={handleExportReport}
              style={{
                padding: "0.85rem 1.75rem",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                fontSize: "0.95rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(99, 102, 241, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              📥 Export Report
            </button>
            <button
              onClick={handleGenerateChart}
              style={{
                padding: "0.85rem 1.75rem",
                background: "white",
                color: "#6366f1",
                border: "2px solid #6366f1",
                borderRadius: "0.5rem",
                fontSize: "0.95rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(99, 102, 241, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "white";
              }}
            >
              📊 Generate Chart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
