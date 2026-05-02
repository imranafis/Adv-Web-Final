import { createContext, useContext, useState, useEffect } from "react";

export const StudentContext = createContext();

const INITIAL_STUDENTS = [
  {
    id: "10001",
    name: "Ayesha Rahman",
    avatar: "AR",
    gpa: 3.9,
    major: "Computer Science",
    courses: [
      { name: "Algorithms", color: "#2d5a3d" },
      { name: "AI & ML", color: "#8b4513" },
      { name: "Networks", color: "#4a6fa5" },
    ],
  },
  {
    id: "10002",
    name: "Tanvir Hossain",
    avatar: "TH",
    gpa: 3.5,
    major: "Electrical Engineering",
    courses: [
      { name: "Circuit Design", color: "#7b3f9a" },
      { name: "Signal Processing", color: "#2d5a3d" },
    ],
  },
  {
    id: "10003",
    name: "Nusrat Jahan",
    avatar: "NJ",
    gpa: 3.8,
    major: "Business Admin",
    courses: [
      { name: "Marketing", color: "#b8860b" },
      { name: "Finance", color: "#8b4513" },
      { name: "Management", color: "#2d5a3d" },
    ],
  },
  {
    id: "10004",
    name: "Rafiq Islam",
    avatar: "RI",
    gpa: 3.2,
    major: "Mathematics",
    courses: [
      { name: "Linear Algebra", color: "#4a6fa5" },
      { name: "Calculus III", color: "#7b3f9a" },
    ],
  },
  {
    id: "10005",
    name: "Sadia Akter",
    avatar: "SA",
    gpa: 3.7,
    major: "Physics",
    courses: [
      { name: "Quantum Mech", color: "#4a6fa5" },
      { name: "Thermodynamics", color: "#c0392b" },
    ],
  },
];

export function StudentProvider({ children }) {
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem("dashboard_students");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(!students);

  const [searchQuery, setSearchQuery] = useState("");

  const [sortPref, setSortPref] = useState("default");

  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    if (!students) {
      const timer = setTimeout(() => {
        setStudents(INITIAL_STUDENTS);
        setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (students) {
      try {
        localStorage.setItem("dashboard_students", JSON.stringify(students));
      } catch (e) {
        console.warn("localStorage write failed:", e);
      }
    }
  }, [students]);

  const addStudent = (newStudent) =>
    setStudents((prev) => [...prev, newStudent]);

  const removeStudent = (id) =>
    setStudents((prev) => prev.filter((s) => s.id !== id));

  const toggleFavorite = (id) =>
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));

  const filtered = (students || []).filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.major.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortPref === "name") return a.name.localeCompare(b.name);
    if (sortPref === "gpa") return b.gpa - a.gpa;
    return 0;
  });

  return (
    <StudentContext.Provider
      value={{
        students: sorted,
        allStudents: students || [],
        loading,
        searchQuery,
        setSearchQuery,
        sortPref,
        setSortPref,
        favorites,
        toggleFavorite,
        addStudent,
        removeStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  return useContext(StudentContext);
}
