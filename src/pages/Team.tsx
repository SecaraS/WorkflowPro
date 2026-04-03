import { useState, useEffect } from "react";
import { useToast } from "../hooks/useToast";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  status: "active" | "away" | "offline";
  tasksAssigned: number;
  tasksCompleted: number;
  joinDate: string;
  color: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@workflow.com",
    role: "Project Manager",
    avatar: "SJ",
    status: "active",
    tasksAssigned: 8,
    tasksCompleted: 6,
    joinDate: "2024-01-15",
    color: "#6366f1",
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@workflow.com",
    role: "Developer",
    avatar: "MC",
    status: "active",
    tasksAssigned: 12,
    tasksCompleted: 10,
    joinDate: "2024-02-20",
    color: "#8b5cf6",
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma@workflow.com",
    role: "Designer",
    avatar: "ED",
    status: "away",
    tasksAssigned: 6,
    tasksCompleted: 4,
    joinDate: "2024-03-10",
    color: "#f59e0b",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james@workflow.com",
    role: "QA Engineer",
    avatar: "JW",
    status: "offline",
    tasksAssigned: 5,
    tasksCompleted: 5,
    joinDate: "2024-01-25",
    color: "#10b981",
  },
  {
    id: 5,
    name: "Lisa Rodriguez",
    email: "lisa@workflow.com",
    role: "Product Owner",
    avatar: "LR",
    status: "active",
    tasksAssigned: 4,
    tasksCompleted: 4,
    joinDate: "2023-12-01",
    color: "#06b6d4",
  },
];

export const Team = () => {
  const toast = useToast();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredMembers =
    filterStatus === "all"
      ? teamMembers
      : teamMembers.filter((m) => m.status === filterStatus);

  const totalTeamMembers = teamMembers.length;
  const activeMembers = teamMembers.filter((m) => m.status === "active").length;
  const totalTasksAssigned = teamMembers.reduce(
    (sum, m) => sum + m.tasksAssigned,
    0,
  );
  const completionRate = Math.round(
    (teamMembers.reduce((sum, m) => sum + m.tasksCompleted, 0) /
      totalTasksAssigned) *
      100 || 0,
  );

  const handleRemoveMember = (memberId: number) => {
    const member = teamMembers.find((m) => m.id === memberId);
    if (member) {
      toast.info(`${member.name} removed from team`);
      setSelectedMember(null);
    }
  };

  const handlePromote = (memberId: number) => {
    const member = teamMembers.find((m) => m.id === memberId);
    if (member) {
      toast.success(`${member.name} promoted to Team Lead! 🎉`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#10b981";
      case "away":
        return "#f59e0b";
      case "offline":
        return "#6b7280";
      default:
        return "#6b7280";
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      active: "🟢 Active",
      away: "🟡 Away",
      offline: "⚪ Offline",
    };
    return labels[status] || status;
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
          👥 Team Members
        </h1>
        <p
          style={{
            fontSize: isMobile ? "0.9rem" : "1rem",
            color: "var(--text)",
            margin: "0 0 1rem 0",
          }}
        >
          Manage and coordinate with your team
        </p>
        {/* Gradient divider */}
        <div
          style={{
            height: "4px",
            background: "linear-gradient(90deg, #06b6d4, #8b5cf6, #3b82f6)",
            borderRadius: "2px",
            boxShadow: "0 2px 8px rgba(6, 182, 212, 0.2)",
          }}
        ></div>
      </div>

      {/* Team Statistics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        <div
          style={{
            padding: "1.5rem",
            border: "2px solid #06b6d4",
            borderTop: "5px solid #06b6d4",
            borderRadius: "1rem",
            background: "rgba(6, 182, 212, 0.08)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              fontSize: "0.95rem",
              fontWeight: "600",
              color: "var(--text-h)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "0.75rem",
            }}
          >
            Total Members
          </div>
          <p
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              margin: "0",
              background: "linear-gradient(135deg, #06b6d4, #0891b2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {totalTeamMembers}
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
              fontSize: "0.95rem",
              fontWeight: "600",
              color: "var(--text-h)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "0.75rem",
            }}
          >
            Active Now
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
            {activeMembers}
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
              fontSize: "0.95rem",
              fontWeight: "600",
              color: "var(--text-h)",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "0.75rem",
            }}
          >
            Tasks Assigned
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
            {totalTasksAssigned}
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
              fontSize: "0.95rem",
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
            {completionRate}%
          </p>
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          marginBottom: "2rem",
          display: "flex",
          gap: "0.75rem",
          flexWrap: "wrap",
        }}
      >
        {["all", "active", "away", "offline"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            style={{
              padding: "0.5rem 1.25rem",
              border:
                filterStatus === status
                  ? "2px solid #6366f1"
                  : "2px solid var(--border)",
              background:
                filterStatus === status
                  ? "linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))"
                  : "white",
              borderRadius: "0.5rem",
              fontSize: "0.9rem",
              fontWeight: "500",
              color: filterStatus === status ? "#6366f1" : "var(--text)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textTransform: "capitalize",
            }}
            onMouseEnter={(e) => {
              if (filterStatus !== status) {
                e.currentTarget.style.borderColor = "#6366f1";
                e.currentTarget.style.background = "rgba(99, 102, 241, 0.05)";
              }
            }}
            onMouseLeave={(e) => {
              if (filterStatus !== status) {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "white";
              }
            }}
          >
            {status === "all"
              ? "All Members"
              : status === "active"
                ? "🟢 Active"
                : status === "away"
                  ? "🟡 Away"
                  : "⚪ Offline"}
          </button>
        ))}
      </div>

      {/* Team Members Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile
            ? "1fr"
            : "repeat(auto-fill, minmax(320px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem",
        }}
      >
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedMember(member)}
            style={{
              padding: "1.5rem",
              border: "2px solid var(--border)",
              borderLeft: `5px solid ${member.color}`,
              borderRadius: "1rem",
              background: "white",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = `0 8px 24px ${member.color}40`;
              e.currentTarget.style.borderColor = member.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            {/* Member Header */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "0.75rem",
                  background: `linear-gradient(135deg, ${member.color}, ${member.color}dd)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  color: "white",
                }}
              >
                {member.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "var(--text-h)",
                    margin: "0 0 0.25rem 0",
                  }}
                >
                  {member.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text)",
                    margin: "0",
                  }}
                >
                  {member.role}
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "0.5rem",
                  background:
                    member.status === "active"
                      ? "rgba(16, 185, 129, 0.15)"
                      : member.status === "away"
                        ? "rgba(245, 158, 11, 0.15)"
                        : "rgba(107, 114, 128, 0.15)",
                  color: getStatusColor(member.status),
                }}
              >
                {member.status === "active"
                  ? "🟢"
                  : member.status === "away"
                    ? "🟡"
                    : "⚪"}
                {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
              </div>
            </div>

            {/* Member Stats */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "rgba(99, 102, 241, 0.08)",
                  borderRadius: "0.5rem",
                  borderLeft: "3px solid #6366f1",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text)",
                    textTransform: "uppercase",
                    fontWeight: "600",
                    letterSpacing: "0.3px",
                    marginBottom: "0.25rem",
                  }}
                >
                  Tasks
                </div>
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "700",
                    color: "#6366f1",
                  }}
                >
                  {member.tasksAssigned}
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "rgba(16, 185, 129, 0.08)",
                  borderRadius: "0.5rem",
                  borderLeft: "3px solid #10b981",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text)",
                    textTransform: "uppercase",
                    fontWeight: "600",
                    letterSpacing: "0.3px",
                    marginBottom: "0.25rem",
                  }}
                >
                  Done
                </div>
                <div
                  style={{
                    fontSize: "1.4rem",
                    fontWeight: "700",
                    color: "#10b981",
                  }}
                >
                  {member.tasksCompleted}
                </div>
              </div>
            </div>

            {/* Email */}
            <p
              style={{
                fontSize: "0.85rem",
                color: "var(--text)",
                margin: "0.75rem 0",
                wordBreak: "break-all",
              }}
            >
              📧 {member.email}
            </p>

            {/* Join Date */}
            <p
              style={{
                fontSize: "0.8rem",
                color: "var(--text)",
                margin: "0 0 1rem 0",
              }}
            >
              Joined {new Date(member.joinDate).toLocaleDateString()}
            </p>

            {/* Progress Bar */}
            <div style={{ marginBottom: "1rem" }}>
              <div
                style={{
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "var(--text)",
                  marginBottom: "0.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Completion</span>
                <span>
                  {Math.round(
                    (member.tasksCompleted / member.tasksAssigned) * 100 || 0,
                  )}
                  %
                </span>
              </div>
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
                    width: `${(member.tasksCompleted / member.tasksAssigned) * 100 || 0}%`,
                    background: `linear-gradient(90deg, ${member.color}, ${member.color}dd)`,
                    borderRadius: "3px",
                    transition: "width 0.3s ease",
                  }}
                ></div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => handlePromote(member.id)}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: "0.85rem",
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
                ⭐ Promote
              </button>
              <button
                onClick={() => handleRemoveMember(member.id)}
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  background: "var(--border)",
                  color: "var(--text)",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: "0.85rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--border)";
                }}
              >
                🗑️ Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Member Detail Modal */}
      {selectedMember && (
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
            padding: "1rem",
          }}
          onClick={() => setSelectedMember(null)}
        >
          <div
            style={{
              background: "white",
              padding: "2rem",
              borderRadius: "1rem",
              width: "90%",
              maxWidth: "500px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              border: `2px solid ${selectedMember.color}`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                marginBottom: "1.5rem",
                paddingBottom: "1.5rem",
                borderBottom: `2px solid ${selectedMember.color}`,
              }}
            >
              <div
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "1rem",
                  background: `linear-gradient(135deg, ${selectedMember.color}, ${selectedMember.color}dd)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.8rem",
                  fontWeight: "700",
                  color: "white",
                }}
              >
                {selectedMember.avatar}
              </div>
              <div>
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    color: "var(--text-h)",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  {selectedMember.name}
                </h2>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--text)",
                    margin: "0",
                  }}
                >
                  {selectedMember.role}
                </p>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: getStatusColor(selectedMember.status),
                    fontWeight: "600",
                    marginTop: "0.25rem",
                  }}
                >
                  {getStatusLabel(selectedMember.status)}
                </div>
              </div>
            </div>

            {/* Details */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "var(--text)",
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                    marginBottom: "0.35rem",
                  }}
                >
                  Email
                </div>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--text-h)",
                    margin: "0",
                  }}
                >
                  {selectedMember.email}
                </p>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "var(--text)",
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                    marginBottom: "0.35rem",
                  }}
                >
                  Joined Date
                </div>
                <p
                  style={{
                    fontSize: "0.95rem",
                    color: "var(--text-h)",
                    margin: "0",
                  }}
                >
                  {new Date(selectedMember.joinDate).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </p>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "var(--text)",
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                    marginBottom: "0.75rem",
                  }}
                >
                  Performance
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      padding: "1rem",
                      background: "rgba(99, 102, 241, 0.08)",
                      borderLeft: "3px solid #6366f1",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text)",
                        textTransform: "uppercase",
                        fontWeight: "600",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Tasks Assigned
                    </div>
                    <div
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: "700",
                        color: "#6366f1",
                      }}
                    >
                      {selectedMember.tasksAssigned}
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "1rem",
                      background: "rgba(16, 185, 129, 0.08)",
                      borderLeft: "3px solid #10b981",
                      borderRadius: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--text)",
                        textTransform: "uppercase",
                        fontWeight: "600",
                        marginBottom: "0.5rem",
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
                      {selectedMember.tasksCompleted}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: "var(--text)",
                    textTransform: "uppercase",
                    letterSpacing: "0.3px",
                    marginBottom: "0.75rem",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Completion Rate</span>
                  <span>
                    {Math.round(
                      (selectedMember.tasksCompleted /
                        selectedMember.tasksAssigned) *
                        100 || 0,
                    )}
                    %
                  </span>
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "8px",
                    background: "var(--border)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(selectedMember.tasksCompleted / selectedMember.tasksAssigned) * 100 || 0}%`,
                      background: `linear-gradient(90deg, ${selectedMember.color}, ${selectedMember.color}dd)`,
                      borderRadius: "4px",
                      transition: "width 0.3s ease",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={() => handlePromote(selectedMember.id)}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "white",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
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
                ⭐ Promote
              </button>
              <button
                onClick={() => {
                  handleRemoveMember(selectedMember.id);
                }}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "var(--border)",
                  color: "var(--text)",
                  border: "none",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--border)";
                }}
              >
                🗑️ Remove
              </button>
              <button
                onClick={() => setSelectedMember(null)}
                style={{
                  flex: 1,
                  padding: "0.75rem",
                  background: "white",
                  color: "var(--text)",
                  border: `2px solid ${selectedMember.color}`,
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${selectedMember.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "white";
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
