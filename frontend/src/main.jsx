import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { ThemeContextProvider } from "./context/ThemeContextProvider.jsx";
import { HeroUIProvider } from "@heroui/system";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <ThemeContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeContextProvider>
    </HeroUIProvider>
  </StrictMode>
);
