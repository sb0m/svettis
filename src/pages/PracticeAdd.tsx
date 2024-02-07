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
import { exercises } from "../data/exercises";
import { addPractice } from "../store/slice_practices";
import { Exercise } from "../types/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SelectRow = styled.div`
  display: flex;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

export const PracticeAdd = () => {
  const [name, setName] = useState<string>("");
  const [breakNumber, setBreakNumber] = useState<string>("");
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [selectedExerciseName, setSelectedExerciseName] = useState<string>(
    exercises[0].name
  );

  const { add } = useIndexedDB("practices");
  const dispatch = useDispatch();

  const handleAdd = () => {
    add({
      name: name,
      break: parseInt(breakNumber),
      exercises: selectedExercises,
    }).then(
      (event) => {
        console.log("ID Generated: ", event);
        dispatch(
          addPractice({
            id: event,
            name: name,
            break: parseInt(breakNumber),
            exercises: selectedExercises,
            undeletable: false,
          })
        );
        setName("");
        setBreakNumber("");
        setSelectedExercises([]);
        setSelectedExerciseName(exercises[0].name);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleAddExercise = (): void => {
    const ex: Exercise | undefined = exercises.find(
      (ex) => ex.name === selectedExerciseName
    );
    if (ex) {
      const newSelectedExercises = [...selectedExercises];
      newSelectedExercises.push(ex);
      setSelectedExercises(newSelectedExercises);
    }
  };

  return (
    <Container>
      <h1>ADD PRACTICE</h1>

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
        <label htmlFor="exercises">Exercises:</label>
        {selectedExercises.length ? (
          selectedExercises.map((exercise, key) => (
            <p key={key + exercise.name}>{exercise.name}</p>
          ))
        ) : (
          <>No List</>
        )}
        <SelectRow>
          <select
            name="exercises"
            id="exercises"
            onChange={(event) => setSelectedExerciseName(event.target.value)}
          >
            {exercises.map((exercise) => (
              <option key={exercise.name} value={exercise.name}>
                {exercise.name}
              </option>
            ))}
          </select>
          <IconButton
            onTouch={() => handleAddExercise()}
            icon={<BsFillPlusCircleFill />}
          />
        </SelectRow>
        <IconButton onTouch={handleAdd} icon={<BsFillPlusCircleFill />} />
      </FormContainer>

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
