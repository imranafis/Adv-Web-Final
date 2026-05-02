import { useState, useEffect } from "react";
import DashboardHeader from "./components/DashboardHeader";
import StudentCard from "./components/StudentCard";
import SearchBar from "./components/SearchBar";
import SortControls from "./components/SortControls";
import StatBadge from "./components/StatBadge";
import AddStudentForm from "./components/AddStudentForm";
import { useStudents } from "./context/StudentContext";

function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 0",
        gap: "16px",
      }}
    >
      <div className="spinner" />
      <p style={{ color: "var(--clr-text-muted)", fontSize: "14px" }}>
        Loading students…
      </p>
    </div>
  );
}

function App() {
  const { students, allStudents, loading } = useStudents();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!loading) {
      document.title = `Dashboard — ${students.length} Student${
        students.length !== 1 ? "s" : ""
      }`;
    }
  }, [students.length, loading]);

  const avgGpa =
    students.length > 0
      ? (students.reduce((sum, s) => sum + s.gpa, 0) / students.length).toFixed(
          2,
        )
      : "–";
  const majorCount = new Set(students.map((s) => s.major)).size;

  return (
    <div style={{ minHeight: "100vh", background: "var(--clr-bg)" }}>
      <DashboardHeader onAddStudent={() => setShowForm(true)} />

      <main className="main-layout">
        <div className="toolbar">
          <SearchBar />
          <SortControls />
        </div>

        <div className="stats-row">
          <StatBadge label="Showing" value={loading ? "…" : students.length} />
          <StatBadge
            label="Avg GPA"
            value={loading ? "…" : avgGpa}
            accent="var(--clr-accent2)"
          />
          <StatBadge
            label="Majors"
            value={loading ? "…" : majorCount}
            accent="var(--clr-gold)"
          />
        </div>

        {loading ? (
          <Spinner />
        ) : students.length === 0 ? (
          <div className="empty-state">
            <p>⌕</p>
            <p className="empty-title">No students found</p>
            <p style={{ fontSize: "14px", marginTop: "6px" }}>
              {allStudents.length === 0
                ? "Add a student to get started."
                : "Try a different search term."}
            </p>
          </div>
        ) : (
          <div className="student-grid">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </main>

      {showForm && <AddStudentForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default App;
