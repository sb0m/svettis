import { Link, Outlet, useLocation } from "react-router-dom";
import { styled } from "styled-components";

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

export default function App() {
  const { pathname } = useLocation();

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
