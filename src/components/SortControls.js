import { useStudents } from "../context/StudentContext";

const SORT_OPTIONS = [
  { key: "default", label: "Default" },
  { key: "name", label: "A–Z" },
  { key: "gpa", label: "Top GPA" },
];

function SortControls() {
  const { sortPref, setSortPref } = useStudents();

  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
      <span
        style={{
          fontSize: "12px",
          color: "var(--clr-text-muted)",
          marginRight: "4px",
        }}
      >
        Sort:
      </span>

      {SORT_OPTIONS.map(({ key, label }) => {
        const isActive = sortPref === key;
        return (
          <button
            key={key}
            onClick={() => setSortPref(key)}
            style={{
              padding: "6px 12px",
              borderRadius: "var(--radius-sm)",
              fontSize: "13px",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontWeight: isActive ? "600" : "400",
              background: isActive ? "var(--clr-accent)" : "var(--clr-surface)",
              color: isActive ? "#fff" : "var(--clr-text)",
              border: isActive
                ? "1px solid var(--clr-accent)"
                : "1px solid var(--clr-border-strong)",
              transition: "all 0.2s",
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}

export default SortControls;
