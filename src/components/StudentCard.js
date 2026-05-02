import { useState } from "react";
import PropTypes from "prop-types";
import CourseTag from "./CourseTag";
import StatBadge from "./StatBadge";
import { useStudents } from "../context/StudentContext";

function StudentCard({ student }) {
  const { favorites, toggleFavorite, removeStudent } = useStudents();

  const [removeHovered, setRemoveHovered] = useState(false);

  const isFav = !!favorites[student.id];

  const gpaColor =
    student.gpa >= 3.7
      ? "var(--clr-accent)"
      : student.gpa >= 3.3
        ? "var(--clr-gold)"
        : "var(--clr-accent2)";

  return (
    <div
      style={{
        background: "var(--clr-surface)",
        border: "1px solid var(--clr-border)",
        borderRadius: "var(--radius)",
        padding: "1.25rem",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxShadow: "var(--shadow)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "var(--shadow-md)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "var(--shadow)";
      }}
    >
      {/* Avatar + Name + Favorite */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            background: "var(--clr-accent-light)",
            color: "var(--clr-accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "600",
            fontSize: "14px",
            flexShrink: 0,
            letterSpacing: "0.5px",
          }}
        >
          {student.avatar}
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontWeight: "600",
              fontSize: "15px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {student.name}
          </p>
          <p
            style={{
              fontSize: "12px",
              color: "var(--clr-text-muted)",
              marginTop: "1px",
            }}
          >
            {student.major}
          </p>
        </div>

        {/* LAB 02, Task 3 — Favorite toggle button */}
        <button
          onClick={() => toggleFavorite(student.id)}
          title={isFav ? "Remove from favourites" : "Add to favourites"}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            color: isFav ? "#e8a020" : "var(--clr-border-strong)",
            padding: "4px",
            transition: "color 0.2s, transform 0.15s",
            lineHeight: 1,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          {isFav ? "★" : "☆"}
        </button>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <StatBadge
          label="GPA"
          value={student.gpa.toFixed(1)}
          accent={gpaColor}
        />
        <StatBadge label="Student ID" value={student.id} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
        {student.courses.map((c) => (
          <CourseTag key={c.name} courseName={c.name} color={c.color} />
        ))}
      </div>

      <button
        onClick={() => removeStudent(student.id)}
        onMouseEnter={() => setRemoveHovered(true)}
        onMouseLeave={() => setRemoveHovered(false)}
        style={{
          marginTop: "4px",
          padding: "6px",
          border: `1px solid ${removeHovered ? "var(--clr-danger)" : "var(--clr-border-strong)"}`,
          borderRadius: "var(--radius-sm)",
          background: removeHovered ? "var(--clr-danger-light)" : "none",
          color: removeHovered ? "var(--clr-danger)" : "var(--clr-text-muted)",
          cursor: "pointer",
          fontSize: "12px",
          fontFamily: "var(--font-body)",
          transition: "all 0.2s",
        }}
      >
        Remove student
      </button>
    </div>
  );
}

StudentCard.propTypes = {
  student: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    gpa: PropTypes.number.isRequired,
    major: PropTypes.string.isRequired,
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        color: PropTypes.string,
      }),
    ).isRequired,
  }).isRequired,
};

export default StudentCard;
