import { BsFillHouseFill, BsFillArrowLeftSquareFill } from "react-icons/bs";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";
import { useLocation } from "react-router-dom";
import { practices } from "../data/practices";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

export const PracticeDisplay = () => {
  const { pathname } = useLocation();
  const practiceName = pathname.split("/")[2];
  const practice = practices.find((el) => el.name === practiceName);

  return (
    <Container>
      <h1>DISPLAY {practiceName}</h1>
      {practice &&
        practice.exercises.map((exercise) => (
          <div>
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
