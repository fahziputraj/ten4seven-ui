import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@ten4seven/tokens/theme.css";
import "@ten4seven/ui/styles.css";
import "./app.css";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
