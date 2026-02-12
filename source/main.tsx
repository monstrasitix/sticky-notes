import "./style/main.scss";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "@/view/app";
import { NotesProvider } from "@/context/notes/component";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotesProvider>
      <App />
    </NotesProvider>
  </StrictMode>,
);
