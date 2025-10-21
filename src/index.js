import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SchoolProvider } from "./context/SchoolContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SchoolProvider>
      <App />
    </SchoolProvider>
  </React.StrictMode>
);
