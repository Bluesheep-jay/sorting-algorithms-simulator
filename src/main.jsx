import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./scripts/animation.js";
import "./scripts/algorithms.js";
import "./scripts/mergeSortAnimation.js";
import "./scripts/headerBtn.js";

import App from "./App.jsx";
import "./components/Header.jsx";
import "./components/Bar.jsx";
import Box from "./components/Box.jsx";
import Bar from "./components/Bar.jsx";
import QuickSortBox from "./components/QuickSortBox.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ArrayProvider } from "./contexts/ArrayContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Bar />,
      },
      {
        path: "/box",
        element: <Box />,
      },
      {
        path: "/quicksort",
        element: <QuickSortBox />,
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ArrayProvider>
      <RouterProvider router={router}></RouterProvider>
    </ArrayProvider>
  </React.StrictMode>
);
