import { useEffect, useState } from "react";
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
  justify-content: space-between;
  width: 100%;
  padding: 0 10%;
`;

const Row = styled.div`
  display: flex;
  margin: 0.7em;

  img {
    width: 90%;
  }

  span {
    margin-bottom: 0.2em;
  }

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const ImgSpan = styled.span`
  width: 70%;
  display: flex;

  @media only screen and (max-width: 700px) {
    width: 100%;
    justify-content: center;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const ExerciseDisplay = () => {
  const [imageDataUrl, setImageDataUrl] = useState<string | ArrayBuffer | null>(
    null
  );

  const { pathname } = useLocation();
  const exercises = useSelector(
    (state: IRootState) => state.exercises.exercises
  );

  const exerciseId = parseInt(pathname.split("/")[3], 10);
  const exercise: Exercise | undefined = exercises.find(
    (el: Exercise) => el.id === exerciseId
  );

  useEffect(() => {
    if (!exercise || (!exercise.image && !exercise.imageAsset)) {
      return;
    }
    if (exercise.imageAsset) {
      setImageDataUrl("/svettis/pictures/" + exercise.imageAsset);
    } else if (exercise.image) {
      const reader = new FileReader();
      reader.readAsDataURL(exercise.image);
      reader.onload = () => {
        const imageDataUrl = reader.result;
        setImageDataUrl(imageDataUrl);
      };
    }
  }, [exercise]);

  return (
    <Container>
      <h1>{exercise?.name.toUpperCase()}</h1>
      {exercise && (
        <Content key={exercise.id}>
          <Row>
            <Label>Name</Label>
            <span>{exercise.name}</span>
          </Row>
          <Row>
            <Label>Break</Label>
            <span>{exercise.break}</span>
          </Row>
          <Row>
            <Label>Duration</Label>
            <span>{exercise.duration}</span>
          </Row>
          <Row>
            <Label>Repetition</Label>
            <span>{exercise.repetition}</span>
          </Row>
          <Row>
            <Label>Description</Label>
            <span>{exercise.description}</span>
          </Row>
          <Row>
            <Label>Image</Label>
            <ImgSpan>
              {imageDataUrl ? (
                <img src={imageDataUrl?.toString()} />
              ) : (
                "No image"
              )}
            </ImgSpan>
          </Row>
        </Content>
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
