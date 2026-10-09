import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StudioApp } from "@/components/studio/Studio";
import "./styles.css";

const root = document.getElementById("app");
if (!root) throw new Error("No se encontró el contenedor de Helix.");

createRoot(root).render(
  <StrictMode>
    <StudioApp />
  </StrictMode>,
);
