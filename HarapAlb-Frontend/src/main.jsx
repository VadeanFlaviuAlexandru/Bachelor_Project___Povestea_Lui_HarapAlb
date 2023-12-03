import React from "react";
import ReactDOM from "react-dom/client";
import App from "./game/App.jsx";
import Game from "./game/Game.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Test from "./game/Test.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Game />,
  },
  {
    path: "/signup",
    element: <Game />,
  },
  {
    path: "/phaser",
    element: <Test />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <router />
    </RouterProvider>
  </React.StrictMode>
);
