import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/auth";
import { useUser } from "../context/UserContext";
import { useToast } from "../hooks/useToast";

interface ValidationErrors {
  email?: string;
  password?: string;
  username?: string;
}

export const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const toast = useToast();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  // Email validation regex
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation - min 6 characters
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  // Real-time validation
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password = `Password must be at least 6 characters (${password.length}/6)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setServerError("");

    // Real-time validation
    if (value.trim() && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.email;
        return newErrors;
      });
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setServerError("");

    // Real-time validation
    if (value && value.length < 3) {
      setErrors((prev) => ({
        ...prev,
        username: "Username must be at least 3 characters",
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.username;
        return newErrors;
      });
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setServerError("");

    // Real-time validation
    if (value && !validatePassword(value)) {
      setErrors((prev) => ({
        ...prev,
        password: `Password must be at least 6 characters (${value.length}/6)`,
      }));
    } else {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.password;
        return newErrors;
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const success = auth.login(email, password, username);

      if (success) {
        const user = auth.getCurrentUser();
        if (user) {
          setUser(user);
          toast.success(`Welcome back, ${user.username}! 🎉`);
          navigate("/");
        }
      } else {
        const errorMsg = "Invalid credentials. Please try again.";
        setServerError(errorMsg);
        toast.error(errorMsg);
      }
    } catch (error) {
      const errorMsg = "An error occurred. Please try again later.";
      setServerError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid =
    email && username && password && Object.keys(errors).length === 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)",
        padding: "1rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Animated background blobs */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: "0",
          pointerEvents: "none",
          animation: "float 6s ease-in-out infinite",
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          bottom: "-150px",
          right: "-100px",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.25) 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: "0",
          pointerEvents: "none",
          animation: "float 8s ease-in-out infinite reverse",
        }}
      ></div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(30px); }
        }
      `}</style>

      {/* Header */}
      <div
        style={{
          position: "relative",
          zIndex: "1",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "3rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: isMobile ? "50px" : "70px",
            height: isMobile ? "50px" : "70px",
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
            borderRadius: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: isMobile ? "1rem" : "1.5rem",
            boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
            fontSize: isMobile ? "1.5rem" : "2rem",
          }}
        >
          ✓
        </div>

        <h1
          style={{
            fontSize: isMobile ? "2rem" : "3rem",
            fontWeight: "700",
            fontFamily: "var(--heading)",
            margin: "0 0 0.5rem 0",
            background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Workflow Pro
        </h1>

        <p
          style={{
            fontSize: isMobile ? "0.95rem" : "1.1rem",
            background: "linear-gradient(135deg, #93c5fd, #c4b5fd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: "0.5rem 0 0 0",
            fontWeight: "500",
          }}
        >
          Manage your tasks efficiently
        </p>
      </div>

      {/* Login Form Card */}
      <div
        style={{
          position: "relative",
          zIndex: "1",
          width: "100%",
          maxWidth: "450px",
          background: "rgba(15, 23, 42, 0.7)",
          backdropFilter: "blur(10px)",
          padding: isMobile ? "1.5rem" : "2.5rem",
          borderRadius: isMobile ? "1rem" : "1.5rem",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.1)",
          border: "1px solid rgba(99, 102, 241, 0.2)",
          margin: isMobile ? "1rem" : "0",
        }}
      >
        {/* Server Error */}
        {serverError && (
          <div
            style={{
              background: "rgba(239, 68, 68, 0.15)",
              color: "#fca5a5",
              padding: "1rem",
              borderRadius: "0.75rem",
              marginBottom: "1.5rem",
              fontSize: "0.9rem",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>⚠️</span>
            {serverError}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {/* Username Field */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}
          >
            <label
              htmlFor="username"
              style={{
                fontSize: "0.95rem",
                fontWeight: "600",
                background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              disabled={isLoading}
              style={{
                padding: "0.875rem 1.125rem",
                border: errors.username
                  ? "2px solid rgba(239, 68, 68, 0.6)"
                  : "2px solid rgba(99, 102, 241, 0.3)",
                borderRadius: "0.75rem",
                background: "rgba(30, 27, 75, 0.5)",
                color: "#f0f9ff",
                fontFamily: "var(--sans)",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                if (!errors.username) {
                  e.currentTarget.style.borderColor = "#6366f1";
                  e.currentTarget.style.background = "rgba(30, 27, 75, 0.8)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(99, 102, 241, 0.2)";
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.background = "rgba(30, 27, 75, 0.5)";
                if (!errors.username) {
                  e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.3)";
                }
              }}
            />

            {errors.username && (
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#fca5a5",
                  fontWeight: "500",
                }}
              >
                ✕ {errors.username}
              </span>
            )}

            {username && !errors.username && (
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#86efac",
                  fontWeight: "500",
                }}
              >
                ✓ Username looks good
              </span>
            )}
          </div>

          {/* Email Field */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}
          >
            <label
              htmlFor="email"
              style={{
                fontSize: "0.95rem",
                fontWeight: "600",
                background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              disabled={isLoading}
              style={{
                padding: "0.875rem 1.125rem",
                border: errors.email
                  ? "2px solid rgba(239, 68, 68, 0.6)"
                  : "2px solid rgba(99, 102, 241, 0.3)",
                borderRadius: "0.75rem",
                background: "rgba(30, 27, 75, 0.5)",
                color: "#f0f9ff",
                fontFamily: "var(--sans)",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  e.currentTarget.style.borderColor = "#6366f1";
                  e.currentTarget.style.background = "rgba(30, 27, 75, 0.8)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(99, 102, 241, 0.2)";
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.background = "rgba(30, 27, 75, 0.5)";
                if (!errors.email) {
                  e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.3)";
                }
              }}
            />

            {errors.email && (
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#fca5a5",
                  fontWeight: "500",
                }}
              >
                ✕ {errors.email}
              </span>
            )}

            {email && !errors.email && (
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#86efac",
                  fontWeight: "500",
                }}
              >
                ✓ Email looks good
              </span>
            )}
          </div>

          {/* Password Field */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}
          >
            <label
              htmlFor="password"
              style={{
                fontSize: "0.95rem",
                fontWeight: "600",
                background: "linear-gradient(135deg, #60a5fa, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              disabled={isLoading}
              style={{
                padding: "0.875rem 1.125rem",
                border: errors.password
                  ? "2px solid rgba(239, 68, 68, 0.6)"
                  : "2px solid rgba(99, 102, 241, 0.3)",
                borderRadius: "0.75rem",
                background: "rgba(30, 27, 75, 0.5)",
                color: "#f0f9ff",
                fontFamily: "var(--sans)",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                if (!errors.password) {
                  e.currentTarget.style.borderColor = "#8b5cf6";
                  e.currentTarget.style.background = "rgba(30, 27, 75, 0.8)";
                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(139, 92, 246, 0.2)";
                }
              }}
              onBlur={(e) => {
                e.currentTarget.style.background = "rgba(30, 27, 75, 0.5)";
                if (!errors.password) {
                  e.currentTarget.style.borderColor = "rgba(99, 102, 241, 0.3)";
                }
              }}
            />

            {errors.password && (
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#fca5a5",
                  fontWeight: "500",
                }}
              >
                ✕ {errors.password}
              </span>
            )}

            {password && !errors.password && (
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#86efac",
                  fontWeight: "500",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}
              >
                ✓ Secure password ({password.length} characters)
              </span>
            )}

            {/* Password strength indicator */}
            {password && (
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginTop: "0.75rem",
                }}
              >
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: "6px",
                      flex: 1,
                      background:
                        password.length >= (i + 1) * 4
                          ? `linear-gradient(90deg, #6366f1, #8b5cf6)`
                          : "rgba(99, 102, 241, 0.1)",
                      borderRadius: "3px",
                      transition: "all 0.3s ease",
                      boxShadow:
                        password.length >= (i + 1) * 4
                          ? "0 0 8px rgba(99, 102, 241, 0.4)"
                          : "none",
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            style={{
              padding: "1rem 1.5rem",
              background: isFormValid
                ? "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
                : "rgba(99, 102, 241, 0.2)",
              color: "white",
              border: "none",
              borderRadius: "0.75rem",
              fontFamily: "var(--sans)",
              fontSize: "1.05rem",
              fontWeight: "700",
              cursor: isFormValid ? "pointer" : "not-allowed",
              transition: "all 0.3s ease",
              boxShadow: isFormValid
                ? "0 8px 20px rgba(99, 102, 241, 0.5)"
                : "none",
              opacity: isLoading ? 0.8 : 1,
              marginTop: "0.5rem",
            }}
            onMouseEnter={(e) => {
              if (isFormValid && !isLoading) {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 28px rgba(99, 102, 241, 0.7)";
              }
            }}
            onMouseLeave={(e) => {
              if (isFormValid && !isLoading) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(99, 102, 241, 0.5)";
              }
            }}
          >
            {isLoading ? "✨ Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Helper text */}
        <p
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            fontSize: "0.9rem",
            marginTop: "1.5rem",
          }}
        >
          Demo: any username (3+ chars) + email + password (6+ chars)
        </p>
      </div>

      {/* Footer */}
      <p
        style={{
          position: "relative",
          zIndex: "1",
          marginTop: "3rem",
          color: "#94a3b8",
          fontSize: "0.9rem",
          textAlign: "center",
        }}
      >
        © 2026 Workflow Pro. Build better together.
      </p>
    </div>
  );
};
