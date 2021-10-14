import React from "react";
import { OverlayProvider } from "react-aria";
import { render } from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
render(
  <OverlayProvider>
    <App />
  </OverlayProvider>,
  rootElement
);
