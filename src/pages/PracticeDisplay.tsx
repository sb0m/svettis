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
`;

const ButtonContainer = styled.div`
  display: flex;
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

  return (
    <Container>
      <h1>DISPLAY {practice?.name}</h1>
      {practice &&
        practice.exercises.map((exercise) => (
          <div key={exercise.id}>
            <span>{exercise.name}</span>
            <span>{exercise.duration}</span>
            <span>{exercise.repetition}</span>
          </div>
        ))}
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
