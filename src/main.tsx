import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastBar, Toaster } from "react-hot-toast";

import { DataProvider } from "./context/data-context";

import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.Fragment>
    <Toaster
      gutter={8}
      toastOptions={{
        duration: 1500,
      }}
    >
      {(t) => (
        <ToastBar
          toast={t}
          style={{
            ...t.style,
            animation: t.visible
              ? "custom-enter 1s ease"
              : "custom-exit 1s ease",
          }}
        />
      )}
    </Toaster>
    <DataProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataProvider>
  </React.Fragment>
);
