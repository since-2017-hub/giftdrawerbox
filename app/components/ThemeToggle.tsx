"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>("light");
  useEffect(() => {
    const localTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    if (localTheme) {
      setTheme(localTheme);
      document.documentElement.classList.toggle("dark", localTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };
  return (
    <button
      aria-label="Toggle dark mode"
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-3 py-2 rounded shadow hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
