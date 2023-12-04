import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PhaserGame from "./gameeeeeee/PhaserGame.jsx";
import "./index.scss";
import LogIn from "./menu/login/LogIn.jsx";
import App from "./menu/main/App.jsx";
import SignUp from "./menu/signup/SignUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/phaser",
    element: <PhaserGame />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <router />
    </RouterProvider>
  </React.StrictMode>
);
