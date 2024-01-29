import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Exercises } from "./pages/Exercises.tsx";
import { PracticeAdd } from "./pages/PracticeAdd.tsx";
import { PracticeDisplay } from "./pages/PracticeDisplay.tsx";
import { PracticePlay } from "./pages/PracticePlay.tsx";
import { Practices } from "./pages/Practices.tsx";
import store from "./store/store.tsx";

const router = createBrowserRouter([
  {
    path: "/svettis/",
    element: <App />,
    children: [
      {
        path: "/svettis/exercises",
        element: <Exercises />,
      },
      {
        path: "/svettis/practices",
        element: <Practices />,
      },
      {
        path: "/svettis/:practiceName/play",
        element: <PracticePlay />,
      },
      {
        path: "/svettis/:practiceName/display",
        element: <PracticeDisplay />,
      },
      {
        path: "/svettis/add-practice",
        element: <PracticeAdd />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
