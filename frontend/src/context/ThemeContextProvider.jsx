import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export const ThemeContextProvider = ({ children }) => {
  const initialTheme = () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) return savedTheme;

    const isSystemDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return isSystemDark ? "dark" : "light";
  };

  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => {
    localStorage.setItem("theme", theme);

    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      isDarkMode: theme === "dark",
      toggleTheme: () =>
        setTheme((prev) => (prev === "dark" ? "light" : "dark")),
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
