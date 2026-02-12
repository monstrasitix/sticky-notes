import "./style/main.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/view/app";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
