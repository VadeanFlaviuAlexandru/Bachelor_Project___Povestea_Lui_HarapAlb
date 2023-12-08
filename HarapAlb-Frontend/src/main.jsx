import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LogIn from "./menu/login/LogIn.jsx";
import App from "./menu/main/App.jsx";
import SignUp from "./menu/signup/SignUp.jsx";
import PhaserConfig from "./scenes/PhaserConfig.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    path: "/leaderboard",
    element: <App />,
  },
  {
    path: "/phaser",
    element: <PhaserConfig />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router}>
      <router />
    </RouterProvider>
  </React.StrictMode>
);
