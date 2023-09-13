import { useContext, useEffect } from "react";
import DarkModeToggle from "../components/Sidebar/DarkModeToggle";
import { ThemeContext } from "../contexts/ThemeContext";

const Theme = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const themeToggleDarkIcon = document.getElementById(
      "theme-toggle-dark-icon"
    );
    const themeToggleLightIcon = document.getElementById(
      "theme-toggle-light-icon"
    );

    if (isDarkMode) {
      // Add the 'dark' class to enable dark mode
      themeToggleLightIcon?.classList.add("hidden");
      themeToggleDarkIcon?.classList.remove("hidden");
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      // Remove the 'dark' class to disable dark mode
      themeToggleLightIcon?.classList.remove("hidden");
      themeToggleDarkIcon?.classList.add("hidden");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div>
      <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
    </div>
  );
};

export default Theme;
