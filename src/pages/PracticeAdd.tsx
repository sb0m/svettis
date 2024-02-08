import { useEffect, useState } from "react";
import {
  BsArrowCounterclockwise,
  BsFillArrowLeftSquareFill,
  BsFillFloppyFill,
  BsFillHouseFill,
  BsFillPlusCircleFill,
} from "react-icons/bs";
import { useIndexedDB } from "react-indexed-db-hook";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";
import { addPractice } from "../store/slice_practices";
import { IRootState } from "../store/store.tsx";
import { Exercise } from "../types/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-weight: bold;

  input {
    height: 3em;
    width: 50%;
    border-radius: 4px;
    background-color: #5b6c5d;
    box-shadow: 1px 2px 6px #202621;
    color: #e7bb41;
    border: none;
    outline: none;
    padding: 0 0.5em;
  }

  input:active,
  input:focus {
    border: 1px solid #e7bb41;
    outline: 1px;
    box-shadow: none;
    box-shadow: 1px 2px 6px #202621;
  }

  @media only screen and (max-width: 700px) {
    input {
      width: 100%;
    }
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2em;
  flex: 12;
  gap: 1em;
  text-align: left;
`;

const FormRow = styled.div`
  display: flex;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SelectedExercisesList = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(231, 187, 65, 0.2);
  border-radius: 4px;
  padding: 0.5em;
`;

const FormLabel = styled.label`
  width: 47%;
  justify-content: flex-start;
  display: flex;
  padding-right: 1em;
  margin: 0.5em 0;

  @media only screen and (max-width: 700px) {
    width: 100%;
  }
`;

const AddExerciseButton = styled(IconButton)`
  height: 3em;
  width: 3em;
  margin: 0;
  padding: 4px;
  border-radius: 0px;
  &:active {
    box-shadow: 0px transparent;
    translate: 0px 0px;
  }
`;

const ResetExercisesButton = styled(IconButton)`
  height: 3em;
  width: 3em;
  margin: 0;
  padding: 4px;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;

  &:active {
    box-shadow: 0px transparent;
    translate: 0px 0px;
  }
`;

const FormLabelSelect = styled(FormLabel)`
  justify-content: space-between;

  span {
    display: flex;
  }

  @media only screen and (max-width: 700px) {
    flex-direction: column;

    span {
      width: 100%;
    }
  }
`;

const FormLabelSelectText = styled.span`
  flex: 1;
  margin: 0.5em 0;
`;

const FormLabelSelectComponent = styled.span`
  flex: 3;

  select:focus {
    border-color: #e7bb41;
    outline: 1px;
    box-shadow: none;
  }
`;

const FormLabelHtmlSelect = styled.select`
  height: 3em;
  width: -webkit-fill-available;
  color: #e7bb41;
  background-color: #5b6c5d;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  box-shadow: 1px 2px 6px #202621;
`;

export const PracticeAdd = () => {
  const exercises = useSelector(
    (state: IRootState) => state.exercises.exercises
  );

  const [name, setName] = useState<string>("");
  const [breakNumber, setBreakNumber] = useState<string>("");
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
  const [selectedExerciseName, setSelectedExerciseName] = useState<string>("");

  useEffect(() => {
    setSelectedExerciseName(exercises[0]?.name);
  }, [exercises]);

  const { add } = useIndexedDB("practices");
  const dispatch = useDispatch();

  const handleResetExercises = () => setSelectedExercises([]);

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
            break: parseInt(breakNumber) || 0,
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
        <FormRow>
          <FormLabel htmlFor="name">Name</FormLabel>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="break">
            Break between different exercises in seconds
          </FormLabel>
          <input
            type="number"
            id="break"
            name="break"
            onChange={(event) => setBreakNumber(event.target.value)}
            value={breakNumber}
          />
        </FormRow>
        <FormRow>
          <FormLabelSelect htmlFor="exercises">
            <FormLabelSelectText>Exercises</FormLabelSelectText>
            <FormLabelSelectComponent>
              <FormLabelHtmlSelect
                name="exercises"
                id="exercises"
                onChange={(event) =>
                  setSelectedExerciseName(event.target.value)
                }
              >
                {exercises.map((exercise) => (
                  <option key={exercise.name} value={exercise.name}>
                    {exercise.name}
                  </option>
                ))}
              </FormLabelHtmlSelect>
              <AddExerciseButton
                onTouch={handleAddExercise}
                icon={<BsFillPlusCircleFill />}
              />
              <ResetExercisesButton
                onTouch={handleResetExercises}
                icon={<BsArrowCounterclockwise />}
              />
            </FormLabelSelectComponent>
          </FormLabelSelect>
          <SelectedExercisesList>
            {selectedExercises.length ? (
              selectedExercises.map((exercise, key) => (
                <label key={key + exercise.name}>{exercise.name}</label>
              ))
            ) : (
              <>No selected exercises</>
            )}
          </SelectedExercisesList>
        </FormRow>
      </FormContainer>

      <ButtonContainer>
        <IconButton
          link="/svettis/practices"
          icon={<BsFillArrowLeftSquareFill />}
        />
        <IconButton link="/svettis/" icon={<BsFillHouseFill />} />
        <IconButton
          disabled={!name || !breakNumber || !selectedExercises.length}
          onTouch={handleAdd}
          icon={<BsFillFloppyFill />}
        />
      </ButtonContainer>
    </Container>
  );
};
