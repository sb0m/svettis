import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Bs1CircleFill } from "react-icons/bs";
import { initDB, useIndexedDB } from "react-indexed-db-hook";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { DBConfig } from "./DBConfig";
import { IconButton } from "./components/IconButton";
import { exercises as dataExercises } from "./data/exercises";
import { practices as dataPractices } from "./data/practices";
import { addExercise } from "./store/slice_exercises.tsx";
import { addPractice } from "./store/slice_practices.tsx";
import { IRootState } from "./store/store.tsx";
import { Exercise, Practice } from "./types/types";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: var(--bg-color);
  font-family: Poor Story, sans-serif;
  color: var(--text-color);
  text-align: center;
  font-size: 20px;

  li {
    list-style-type: none;
  }

  ul {
    padding-inline-start: 0;
  }

  a {
    text-decoration: none;
  }
`;

const StyledLink = styled(Link)`
  border-radius: 6px;
  background-color: var(--button-color);
  font-size: 4em;
  font-weight: 800;
  color: var(--text-color);
  box-shadow: 1px 2px 6px #202621;
  margin: 0.5em;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease-in-out;
  padding: 0.5em;

  :visited {
    color: var(--text-color);
  }

  &:hover {
    background-color: var(--button-hover-color);
  }

  &:active {
    box-shadow: 1px 2px 6px transparent;
    translate: 1px 2px;
  }
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
`;

Toaster;

initDB(DBConfig);

export default function App() {
  const { getAll: getAllPractices } = useIndexedDB("practices");
  const { getAll: getAllExercises } = useIndexedDB("exercises");
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [practicesFromDb, setPracticesFromDb] = useState<Practice[]>([]);
  const [exercisesFromDb, setExercisesFromDb] = useState<Exercise[]>([]);

  const practices = useSelector(
    (state: IRootState) => state.practices.practices
  );
  const exercises = useSelector(
    (state: IRootState) => state.exercises.exercises
  );

  useEffect(() => {
    // when store exmpty -> copy from DB & data folder -> useState
    if (practices.length === 0) {
      getAllPractices().then((fromdb: Practice[]) => {
        const allExistingPractices = [...dataPractices, ...fromdb];
        setPracticesFromDb(allExistingPractices);
      });
    }
    if (exercises.length === 0) {
      getAllExercises().then((fromdb: Exercise[]) => {
        const allExistingExercises = [...dataExercises, ...fromdb];
        setExercisesFromDb(allExistingExercises);
      });
    }
  }, []);

  useEffect(() => {
    // from useState in store
    if (practices.length === 0) {
      practicesFromDb.forEach((item) => dispatch(addPractice(item)));
    }
    if (exercises.length === 0) {
      exercisesFromDb.forEach((item) => dispatch(addExercise(item)));
    }
  }, [
    practicesFromDb,
    exercisesFromDb,
    dispatch,
    practices.length,
    exercises.length,
  ]);

  return (
    <Root>
      <div>
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "green",
              },
            },
            error: {
              style: {
                background: "var(--extra-color)",
              },
            },
          }}
        />
      </div>
      {pathname.endsWith("/") && (
        <Navigation>
          <StyledLink to="/svettis/exercises">Exercises</StyledLink>
          <StyledLink to="/svettis/practices">Practices</StyledLink>

          <IconButton
            onTouch={() => navigator.vibrate([1000, 1000, 1000, 1000])}
            icon={<Bs1CircleFill />}
          />
        </Navigation>
      )}
      <Outlet />
    </Root>
  );
}
