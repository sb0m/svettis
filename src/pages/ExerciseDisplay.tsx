import { BsFillArrowLeftSquareFill, BsFillHouseFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";
import { IRootState } from "../store/store.tsx";
import { Exercise } from "../types/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

export const ExerciseDisplay = () => {
  const { pathname } = useLocation();
  const exercises = useSelector(
    (state: IRootState) => state.exercises.exercises
  );

  const exerciseId = parseInt(pathname.split("/")[3], 10);
  const exercise: Exercise | undefined = exercises.find(
    (el: Exercise) => el.id === exerciseId
  );
  return (
    <Container>
      <h1>DISPLAY {exercise?.name}</h1>
      {exercise && (
        <div key={exercise.id}>
          <span>{exercise.name}</span>
          <span>{exercise.duration}</span>
          <span>{exercise.repetition}</span>
        </div>
      )}
      <ButtonContainer>
        <IconButton
          link="/svettis/exercises"
          icon={<BsFillArrowLeftSquareFill />}
        />
        <IconButton link="/svettis/" icon={<BsFillHouseFill />} />
      </ButtonContainer>
    </Container>
  );
};
