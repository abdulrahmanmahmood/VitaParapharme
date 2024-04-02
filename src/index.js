import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, HashRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/js/bootstrap.esm";
import Sign from "./pages/auth/Sign";
import store from "./rtk/Store";
import { Provider } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Use createRoot instead of ReactDOM.render
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <Provider store={store}>
          <div dir={store.getState().translation.direction}>
            <App />
          </div>
        </Provider>
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
