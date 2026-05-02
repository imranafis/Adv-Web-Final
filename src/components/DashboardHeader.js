import PropTypes from "prop-types";
import { useTheme } from "../context/ThemeContext";
import { useStudents } from "../context/StudentContext";

function DashboardHeader({ onAddStudent }) {
  const { theme, toggleTheme } = useTheme();
  const { favorites, students } = useStudents();

  const favCount = Object.values(favorites).filter(Boolean).length;

  return (
    <header
      style={{
        background: "var(--clr-surface)",
        borderBottom: "1px solid var(--clr-border)",
        padding: "0 2rem",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "16px",
          height: "64px",
        }}
      >
        <div style={{ flex: 1 }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              letterSpacing: "-0.3px",
              lineHeight: 1,
            }}
          >
            Student Dashboard
          </h1>
          <p
            style={{
              fontSize: "12px",
              color: "var(--clr-text-muted)",
              marginTop: "1px",
            }}
          >
            Academic management portal
          </p>
        </div>

        {/* Nav actions */}
        <nav style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {favCount > 0 && (
            <span
              style={{
                padding: "4px 10px",
                background: "var(--clr-gold-light)",
                color: "var(--clr-gold)",
                borderRadius: "99px",
                fontSize: "12px",
                fontWeight: "600",
                border: "1px solid rgba(184,134,11,0.2)",
              }}
            >
              ★ {favCount} favourite{favCount !== 1 ? "s" : ""}
            </span>
          )}

          <span style={{ fontSize: "12px", color: "var(--clr-text-muted)" }}>
            {students.length} student{students.length !== 1 ? "s" : ""}
          </span>

          <button
            onClick={onAddStudent}
            style={{
              padding: "7px 14px",
              borderRadius: "var(--radius-sm)",
              border: "none",
              background: "var(--clr-accent)",
              color: "#fff",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            + Add Student
          </button>

          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            style={{
              padding: "6px 10px",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--clr-border-strong)",
              background: "var(--clr-surface2)",
              cursor: "pointer",
              fontSize: "15px",
              color: "var(--clr-text)",
              lineHeight: 1,
            }}
          >
            {theme === "light" ? "🌙" : "☀"}
          </button>
        </nav>
      </div>
    </header>
  );
}

DashboardHeader.propTypes = {
  onAddStudent: PropTypes.func.isRequired,
};

export default DashboardHeader;
