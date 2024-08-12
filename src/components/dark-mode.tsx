import { useState, useEffect } from "react";
import { FaMoon } from "react-icons/fa";

const DarkMode = () => {
  const [mode, setMode] = useState("system");
  const [isOpen, setIsopen] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") || "system";
    setMode(savedMode);
    applyMode(savedMode);
  }, []);

  const toggleDropdown = () => {
    setIsopen(!isOpen);
  };

  const applyMode = (mode: string) => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else if (mode === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  const toggleDarkMode = (newMode: string) => {
    setMode(newMode);
    applyMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="p-2 border border-gray-900 dark:border-white rounded"
      >
        <FaMoon size={24} />
      </button>
      {isOpen && (
        <div className="absolute z-20 right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <button
            onClick={() => toggleDarkMode("light")}
            className={`block px-4 py-2 text-sm w-full text-left ${
              mode === "light" ? "bg-gray-100 dark:bg-gray-700" : ""
            }`}
          >
            Light
          </button>
          <button
            onClick={() => toggleDarkMode("dark")}
            className={`block px-4 py-2 text-sm w-full text-left ${
              mode === "dark" ? "bg-gray-100 dark:bg-gray-700" : ""
            }`}
          >
            Dark
          </button>
          <button
            onClick={() => toggleDarkMode("system")}
            className={`block px-4 py-2 text-sm w-full text-left ${
              mode === "system" ? "bg-gray-100 dark:bg-gray-700" : ""
            }`}
          >
            System
          </button>
        </div>
      )}
    </div>
  );
};

export default DarkMode;
