import { useState } from "react";
import {
  BsFillArrowLeftSquareFill,
  BsFillHouseFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import { useIndexedDB } from "react-indexed-db-hook";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";
import { addExercise } from "../store/slice_exercises";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

export const ExerciseAdd = () => {
  const [name, setName] = useState<string>("");
  const [breakNumber, setBreakNumber] = useState<string>("");

  const { add } = useIndexedDB("exercises");
  const dispatch = useDispatch();

  const handleAdd = () => {
    add({
      name: name,
      break: parseInt(breakNumber),
    }).then(
      (event) => {
        console.log("ID Generated: ", event);
        dispatch(
          addExercise({
            id: event,
            name: name,
            break: parseInt(breakNumber),
            undeletable: false,
          })
        );
        setName("");
        setBreakNumber("");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <Container>
      <h1>ADD EXERCISE</h1>

      <FormContainer>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <label htmlFor="break">Break:</label>
        <input
          type="number"
          id="break"
          name="break"
          onChange={(event) => setBreakNumber(event.target.value)}
          value={breakNumber}
        />
        <IconButton onTouch={handleAdd} icon={<BsFillPlusCircleFill />} />
      </FormContainer>

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
