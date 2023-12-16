import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import Leaderboard from "./menu/leaderboard/Leaderboard.jsx";
import LogIn from "./menu/login/LogIn.jsx";
import App from "./menu/main/App.jsx";
import SignUp from "./menu/signup/SignUp.jsx";
import PhaserConfig from "./scenes/PhaserConfig.jsx";
import { persistor, store } from "./store/Store.jsx";

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
    element: <Leaderboard />,
  },
  {
    path: "/phaser",
    element: <PhaserConfig />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContainer />
    <PersistGate loading={null} persistor={persistor}>
      <RouterProvider router={router}>
        <router />
      </RouterProvider>
    </PersistGate>
  </Provider>
);
