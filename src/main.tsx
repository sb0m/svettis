import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { ExerciseAdd } from "./pages/ExerciseAdd.tsx";
import { ExerciseDisplay } from "./pages/ExerciseDisplay.tsx";
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
        path: "/svettis/add-exercise",
        element: <ExerciseAdd />,
      },
      {
        path: "/svettis/exercises/:exerciseId/display",
        element: <ExerciseDisplay />,
      },
      {
        path: "/svettis/practices",
        element: <Practices />,
      },
      {
        path: "/svettis/add-practice",
        element: <PracticeAdd />,
      },
      {
        path: "/svettis/practices/:practiceId/play",
        element: <PracticePlay />,
      },
      {
        path: "/svettis/practices/:practiceId/display",
        element: <PracticeDisplay />,
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
