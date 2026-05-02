import PropTypes from "prop-types";

function CourseTag({ courseName, color }) {
  const bgColor = color + "22";

  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: "99px",
        fontSize: "11px",
        fontWeight: "500",
        background: bgColor,
        color: color,
        border: `1px solid ${color}44`,
        lineHeight: "1.6",
        whiteSpace: "nowrap",
      }}
    >
      {courseName}
    </span>
  );
}

CourseTag.propTypes = {
  courseName: PropTypes.string.isRequired,
  color: PropTypes.string,
};

CourseTag.defaultProps = {
  color: "#2d5a3d",
};

export default CourseTag;
