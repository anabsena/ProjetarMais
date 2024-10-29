import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { AppRoutes } from "./routers/routes";
import { ThemeProvider } from "./components/theme-provider";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <AppRoutes />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>
);
