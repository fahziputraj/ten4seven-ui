import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@ten4seven/tokens/theme.css";
import "@ten4seven/ui/styles.css";

import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
