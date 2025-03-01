import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </StrictMode>
);
