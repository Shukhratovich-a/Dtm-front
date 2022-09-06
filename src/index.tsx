import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { Provider as TokenProvider } from "./Context/Token";
import { Provider as SelectedSciencesProvider } from "./Context/Sciences";
import { Provider as SelectedDirectionsProvider } from "./Context/Direction";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <TokenProvider>
        <SelectedSciencesProvider>
          <SelectedDirectionsProvider>
            <App />
          </SelectedDirectionsProvider>
        </SelectedSciencesProvider>
      </TokenProvider>
    </BrowserRouter>
  </React.StrictMode>
);
