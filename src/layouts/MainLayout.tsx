import { Outlet, Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";

export const MainLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Solid Header Bar - Mobile Only (350px-750px and below) */}
      {isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            height: "70px",
            backgroundColor: "#1f2937",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            paddingLeft: "1rem",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "transparent",
              color: "#ffffff",
              border: "none",
              padding: "10px 15px",
              cursor: "pointer",
              fontSize: "28px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "50px",
              height: "50px",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 999,
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)",
          color: "#fff",
          height: "100vh",
          padding: "2rem 1.5rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
          position: isMobile ? "fixed" : "fixed",
          left: 0,
          top: 0,
          overflowY: "auto",
          zIndex: isMobile ? (sidebarOpen ? 1001 : -1) : "auto",
          transform:
            isMobile && !sidebarOpen ? "translateX(-100%)" : "translateX(0)",
          transition: "transform 0.3s ease",
        }}
      >
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            fontFamily: "var(--heading)",
            margin: "0 0 2rem 0",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Workflow
        </h3>

        <nav
          style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
        >
          <Link
            to="/"
            style={{
              color: "#e5e7eb",
              textDecoration: "none",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              transition: "all 0.3s ease",
              fontSize: "0.95rem",
              borderLeft: "3px solid transparent",
              paddingLeft: "calc(1rem - 3px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(99, 102, 241, 0.2)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderLeftColor = "#6366f1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#e5e7eb";
              e.currentTarget.style.borderLeftColor = "transparent";
            }}
          >
            📊 Dashboard
          </Link>

          <Link
            to="/tasks"
            style={{
              color: "#e5e7eb",
              textDecoration: "none",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              transition: "all 0.3s ease",
              fontSize: "0.95rem",
              borderLeft: "3px solid transparent",
              paddingLeft: "calc(1rem - 3px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(99, 102, 241, 0.2)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderLeftColor = "#8b5cf6";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#e5e7eb";
              e.currentTarget.style.borderLeftColor = "transparent";
            }}
          >
            ✓ Tasks
          </Link>

          <Link
            to="/team"
            style={{
              color: "#e5e7eb",
              textDecoration: "none",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              transition: "all 0.3s ease",
              fontSize: "0.95rem",
              borderLeft: "3px solid transparent",
              paddingLeft: "calc(1rem - 3px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(99, 102, 241, 0.2)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderLeftColor = "#06b6d4";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#e5e7eb";
              e.currentTarget.style.borderLeftColor = "transparent";
            }}
          >
            👥 Team
          </Link>

          <Link
            to="/reports"
            style={{
              color: "#e5e7eb",
              textDecoration: "none",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              transition: "all 0.3s ease",
              fontSize: "0.95rem",
              borderLeft: "3px solid transparent",
              paddingLeft: "calc(1rem - 3px)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(99, 102, 241, 0.2)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderLeftColor = "#f59e0b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#e5e7eb";
              e.currentTarget.style.borderLeftColor = "transparent";
            }}
          >
            📊 Reports
          </Link>
        </nav>

        {/* User Profile Section */}
        {user && (
          <div
            style={{
              marginTop: "3rem",
              paddingTop: "2rem",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div
              style={{
                position: "relative",
              }}
            >
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                style={{
                  width: "100%",
                  background: "rgba(99, 102, 241, 0.1)",
                  border: "1px solid rgba(99, 102, 241, 0.3)",
                  borderRadius: "0.75rem",
                  padding: "0.75rem",
                  color: "#e5e7eb",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(99, 102, 241, 0.2)";
                  e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(99, 102, 241, 0.1)";
                  e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.3)";
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "0.5rem",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    color: "white",
                  }}
                >
                  {user.avatar}
                </div>
                <div style={{ textAlign: "left", flex: 1 }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: "600" }}>
                    {user.username}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#9ca3af" }}>
                    Current User
                  </div>
                </div>
                <span style={{ fontSize: "1rem" }}>▼</span>
              </button>

              {/* Profile Menu Dropdown */}
              {showProfileMenu && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    right: 0,
                    marginTop: "0.5rem",
                    background: "rgba(15, 23, 42, 0.95)",
                    border: "1px solid rgba(99, 102, 241, 0.3)",
                    borderRadius: "0.75rem",
                    overflow: "hidden",
                    zIndex: 1000,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  }}
                >
                  <div style={{ padding: "0.75rem" }}>
                    <div
                      style={{
                        padding: "0.75rem",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        marginBottom: "0.75rem",
                      }}
                    >
                      <div style={{ fontSize: "0.85rem", color: "#9ca3af" }}>
                        Email
                      </div>
                      <div
                        style={{
                          fontSize: "0.9rem",
                          color: "#e5e7eb",
                          marginTop: "0.25rem",
                          wordBreak: "break-all",
                        }}
                      >
                        {user.email}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        handleLogout();
                        setShowProfileMenu(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        background: "rgba(239, 68, 68, 0.2)",
                        color: "#fca5a5",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(239, 68, 68, 0.3)";
                        e.currentTarget.style.borderColor =
                          "rgba(239, 68, 68, 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(239, 68, 68, 0.2)";
                        e.currentTarget.style.borderColor =
                          "rgba(239, 68, 68, 0.3)";
                      }}
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Standalone Logout Button - Always Visible */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            padding: "0.75rem 1rem",
            background:
              "linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.9))",
            color: "#fff",
            border: "none",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontSize: "0.9rem",
            fontWeight: "600",
            transition: "all 0.3s ease",
            width: "100%",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(220, 38, 38, 1), rgba(185, 28, 28, 1))";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow =
              "0 6px 16px rgba(220, 38, 38, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.9))";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          🚪 Logout
        </button>
      </aside>

      <main
        style={{
          marginLeft: isMobile ? "0" : "220px",
          paddingTop: isMobile ? "90px" : "2rem",
          paddingLeft: isMobile ? "1rem" : "2rem",
          paddingRight: isMobile ? "1rem" : "2rem",
          paddingBottom: "2rem",
          background: "linear-gradient(135deg, #f8fafc 0%, #f0f4f8 100%)",
          minHeight: "100vh",
          flex: 1,
          transition: "margin-left 0.3s ease",
        }}
      >
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
