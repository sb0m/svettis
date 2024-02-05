import { useEffect, useState } from "react";
import { initDB, useIndexedDB } from "react-indexed-db-hook";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { DBConfig } from "./DBConfig";
import { addPractice } from "./store/slice_practices.tsx";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: #465775;
  font-family: Poor Story, sans-serif;
  color: #e7bb41;
  text-align: center;

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
  font-size: 4em;
  font-weight: 800;
  color: #efcb5d;
`;

initDB(DBConfig);

export default function App() {
  const { getAll } = useIndexedDB("practices");
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [fromdb, setfromdb] = useState([]);
  // eslint-disable-next-line
  // @ts-ignore
  const practices = useSelector((state) => state.practices.practices);

  console.log("fromdb ", fromdb);

  useEffect(() => {
    // eslint-disable-next-line
    // @ts-ignore
    if (practices.length === 0) {
      // eslint-disable-next-line
      // @ts-ignore
      getAll().then((fromdb) => setfromdb(fromdb));
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line
    // @ts-ignore
    if (practices.length === 0) {
      fromdb.forEach((item) => dispatch(addPractice(item)));
    }
  }, [fromdb, dispatch, practices.length]);

  return (
    <Root>
      {pathname.endsWith("/") && (
        <nav>
          <StyledLink to="/svettis/exercises">Exercises</StyledLink>
          <br />
          <StyledLink to="/svettis/practices">Practices</StyledLink>
        </nav>
      )}
      <Outlet />
    </Root>
  );
}
