// ThemeContext.js
import { createContext, useState } from "react";

export const ThemeContext = createContext();

// export function useTheme() {
//   return useContext(ThemeContext);
// }

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(
    () =>
      localStorage.getItem("color-theme") === "dark" ||
      (!("color-theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
