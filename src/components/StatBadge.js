import PropTypes from "prop-types";

function StatBadge({ label, value, accent }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "8px 14px",
        background: "var(--clr-surface2)",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--clr-border)",
      }}
    >
      <span
        style={{
          fontSize: "16px",
          fontWeight: "600",
          color: accent || "var(--clr-accent)",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontSize: "11px",
          color: "var(--clr-text-muted)",
          marginTop: "1px",
        }}
      >
        {label}
      </span>
    </div>
  );
}

StatBadge.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  accent: PropTypes.string,
};

StatBadge.defaultProps = {
  accent: null,
};

export default StatBadge;
