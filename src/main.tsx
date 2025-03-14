import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/css/index.css";
import "regenerator-runtime";
import App from "@/App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
