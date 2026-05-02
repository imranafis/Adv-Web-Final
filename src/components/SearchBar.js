import { useStudents } from "../context/StudentContext";

function SearchBar() {
  const { searchQuery, setSearchQuery } = useStudents();

  return (
    <div style={{ position: "relative", flex: 1, maxWidth: "340px" }}>
      <span
        style={{
          position: "absolute",
          left: "12px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "var(--clr-text-muted)",
          fontSize: "16px",
          pointerEvents: "none",
          lineHeight: 1,
        }}
      >
        ⌕
      </span>

      <input
        type="text"
        placeholder="Search by name or major…"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: "100%",
          padding: "8px 12px 8px 34px",
          border: "1px solid var(--clr-border-strong)",
          borderRadius: "var(--radius-sm)",
          background: "var(--clr-surface)",
          color: "var(--clr-text)",
          fontFamily: "var(--font-body)",
          fontSize: "14px",
          outline: "none",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--clr-accent)")}
        onBlur={(e) =>
          (e.target.style.borderColor = "var(--clr-border-strong)")
        }
      />
    </div>
  );
}

export default SearchBar;
