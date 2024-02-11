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
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  margin: 0.5em;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const Label = styled.span`
  color: #aa8a30;
`;

const Content = styled.div`
  height: 100%;
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
      <h1>{practice?.name.toUpperCase()}</h1>

      <Content key={practice.id}>
        <Row>
          <Label>Name</Label>
          <span>{practice.name}</span>
        </Row>
        <Row>
          <Label>Break</Label>
          <span>{practice.break}</span>
        </Row>
        <Label>Exercises</Label>
        {practice.exercises.map((exercise) => (
          <Row>
            <span>
              {exercise.name} - {exercise.repetition} times
            </span>
          </Row>
        ))}
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
