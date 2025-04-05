import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  isDarkMode: false,
});

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  }

  return context;
};
