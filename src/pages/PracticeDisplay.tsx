import { BsFillArrowLeftSquareFill, BsFillHouseFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";
import { IRootState } from "../store/store.tsx";
import { Practice } from "../types/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 0 10%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  margin: 0.7em;

  span {
    margin-bottom: 0.2em;
  }

  ul {
    margin: 0;
  }

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const Label = styled.span`
  width: 30%;
  text-align: left;
  color: var(--text-color-dark);

  @media only screen and (max-width: 700px) {
    text-align: center;
    width: 100%;
  }
`;

const Content = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const PracticeDisplay = () => {
  const { pathname } = useLocation();
  const practices = useSelector(
    (state: IRootState) => state.practices.practices
  );

  const practiceId = parseInt(pathname.split("/")[3], 10);
  const practice: Practice | undefined = practices.find(
    (el: Practice) => el.id === practiceId
  );

  if (!practice) return;

  return (
    <Container>
      <h1>{practice?.name}</h1>

      <Content key={practice.id}>
        <Row>
          <Label>Name</Label>
          <span>{practice.name}</span>
        </Row>
        <Row>
          <Label>Break</Label>
          <span>{practice.break}</span>
        </Row>
        <Row>
          <Label>Exercises</Label>
          <ul>
            {practice.exercises.map((exercise) => (
              <li>
                {exercise.name} - {exercise.repetition} times
              </li>
            ))}
          </ul>
        </Row>
      </Content>

      <ButtonContainer>
        <IconButton
          link="/svettis/practices"
          icon={<BsFillArrowLeftSquareFill />}
        />
        <IconButton link="/svettis/" icon={<BsFillHouseFill />} />
      </ButtonContainer>
    </Container>
  );
};
