import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useStudents } from "../context/StudentContext";

const COURSE_COLORS = [
  "#2d5a3d",
  "#8b4513",
  "#4a6fa5",
  "#7b3f9a",
  "#b8860b",
  "#c0392b",
];

function FormField({ label, id, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <label
        htmlFor={id}
        style={{
          fontSize: "13px",
          fontWeight: "500",
          color: "var(--clr-text-muted)",
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <span style={{ fontSize: "12px", color: "var(--clr-danger)" }}>
          {error}
        </span>
      )}
    </div>
  );
}

function AddStudentForm({ onClose }) {
  const { addStudent, allStudents } = useStudents();

  const [form, setForm] = useState({
    name: "",
    id: "",
    major: "",
    gpa: "",
    courses: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // LAB 03, Task 4 — Auto-dismiss success notification after 3 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, onClose]);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // LAB 03, Task 3 — Validation rules
  const validate = () => {
    const e = {};

    if (!form.name.trim()) {
      e.name = "Full name is required.";
    }

    if (!form.id.trim()) {
      e.id = "Student ID is required.";
    } else if (!/^\d+$/.test(form.id.trim())) {
      e.id = "ID must be numeric only.";
    } else if (allStudents.some((s) => s.id === form.id.trim())) {
      e.id = "This Student ID already exists.";
    }

    if (!form.major.trim()) {
      e.major = "Major is required.";
    }

    if (!form.gpa) {
      e.gpa = "GPA is required.";
    } else {
      const g = parseFloat(form.gpa);
      if (isNaN(g) || g < 0 || g > 4.0) {
        e.gpa = "GPA must be a number between 0.0 and 4.0.";
      }
    }

    return e;
  };

  const handleSubmit = () => {
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const courseList = form.courses
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean)
      .map((c, i) => ({
        name: c,
        color: COURSE_COLORS[i % COURSE_COLORS.length],
      }));

    const initials = form.name
      .trim()
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    addStudent({
      id: form.id.trim(),
      name: form.name.trim(),
      avatar: initials,
      gpa: parseFloat(parseFloat(form.gpa).toFixed(2)),
      major: form.major.trim(),
      courses: courseList,
    });

    setForm({ name: "", id: "", major: "", gpa: "", courses: "" });
    setErrors({});
    setSuccess(true);
  };

  const inputStyle = (hasError) => ({
    padding: "8px 12px",
    border: `1px solid ${hasError ? "var(--clr-danger)" : "var(--clr-border-strong)"}`,
    borderRadius: "var(--radius-sm)",
    background: "var(--clr-surface)",
    color: "var(--clr-text)",
    fontFamily: "var(--font-body)",
    fontSize: "14px",
    outline: "none",
    transition: "border-color 0.2s",
  });

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box">
        {success ? (
          <div
            style={{
              textAlign: "center",
              padding: "2.5rem 1rem",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "var(--clr-accent-light)",
                color: "var(--clr-accent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                margin: "0 auto 16px",
              }}
            >
              ✓
            </div>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "22px",
                color: "var(--clr-accent)",
              }}
            ></p>
            <p
              style={{
                fontSize: "14px",
                color: "var(--clr-text-muted)",
                marginTop: "8px",
              }}
            >
              The dashboard has been updated. Closing in a moment…
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "22px",
                }}
              >
                Add New Student
              </h2>
              <button
                onClick={onClose}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "22px",
                  color: "var(--clr-text-muted)",
                  lineHeight: 1,
                  padding: "4px",
                }}
              >
                ×
              </button>
            </div>

            {/* Form fields */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <FormField label="Full Name *" id="name" error={errors.name}>
                <input
                  id="name"
                  type="text"
                  placeholder="e.g. Imran Nafis"
                  value={form.name}
                  onChange={update("name")}
                  style={inputStyle(errors.name)}
                />
              </FormField>

              <FormField label="Student ID *" id="id" error={errors.id}>
                <input
                  id="id"
                  type="text"
                  placeholder="Unique numeric ID"
                  value={form.id}
                  onChange={update("id")}
                  style={inputStyle(errors.id)}
                />
              </FormField>

              <FormField label="Major *" id="major" error={errors.major}>
                <input
                  id="major"
                  type="text"
                  placeholder="e.g. Computer Science"
                  value={form.major}
                  onChange={update("major")}
                  style={inputStyle(errors.major)}
                />
              </FormField>

              <FormField label="GPA * (0.0 – 4.0)" id="gpa" error={errors.gpa}>
                <input
                  id="gpa"
                  type="number"
                  step="0.1"
                  min="0"
                  max="4"
                  placeholder="e.g. 3.7"
                  value={form.gpa}
                  onChange={update("gpa")}
                  style={inputStyle(errors.gpa)}
                />
              </FormField>

              <FormField
                label="Courses (optional, comma-separated)"
                id="courses"
                error={errors.courses}
              >
                <input
                  id="courses"
                  type="text"
                  placeholder="e.g. Algorithms, Operating Systems, Web technologies"
                  value={form.courses}
                  onChange={update("courses")}
                  style={inputStyle(errors.courses)}
                />
              </FormField>

              <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                <button
                  onClick={handleSubmit}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "var(--radius-sm)",
                    background: "var(--clr-accent)",
                    color: "#fff",
                    border: "none",
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Add Student
                </button>
                <button
                  onClick={onClose}
                  style={{
                    padding: "10px 18px",
                    borderRadius: "var(--radius-sm)",
                    background: "none",
                    border: "1px solid var(--clr-border-strong)",
                    fontFamily: "var(--font-body)",
                    fontSize: "14px",
                    cursor: "pointer",
                    color: "var(--clr-text)",
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

AddStudentForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default AddStudentForm;
