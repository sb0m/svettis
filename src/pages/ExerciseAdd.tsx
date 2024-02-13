import { useState } from "react";
import {
  BsArrowUpSquareFill,
  BsFillArrowLeftSquareFill,
  BsFillFloppyFill,
  BsFillHouseFill,
} from "react-icons/bs";
import { useIndexedDB } from "react-indexed-db-hook";
import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";
import { addExercise } from "../store/slice_exercises";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  font-weight: bold;

  input {
    height: 3em;
    width: 50%;
    border-radius: 4px;
    background-color: var(--button-color);
    box-shadow: 1px 2px 6px #202621;
    color: var(--text-color);
    border: none;
    outline: none;
    padding: 0 0.5em;
  }

  input:active,
  input:focus {
    border: 1px solid var(--text-color);
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
  overflow-y: auto;
  overflow-x: hidden;
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

const FormInput = styled.input`
  opacity: 0%;
  width: 0px;
  height: 0px;
  display: none;
`;

const SelectedFile = styled.span`
  display: inline-block;
  align-self: center;
  margin-left: 0.5em;
`;

const InputRow = styled.div`
  display: flex;
`;

const InputLabel = styled.label`
  border-radius: 6px;
  background-color: var(--button-color);
  width: fit-content;
  display: inline-flex;
  box-shadow: 1px 2px 6px #202621;
  color: var(--text-color);
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  transition: 0.2s ease-in-out;

  svg {
    height: 36px;
    width: 36px;
  }

  &:hover {
    background-color: #738776;
  }

  &:active {
    box-shadow: 1px 2px 6px transparent;
    translate: 1px 2px;
  }
`;

export const ExerciseAdd = () => {
  const [name, setName] = useState<string>("");
  const [breakNumber, setBreakNumber] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [repetition, setRepetition] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [img, setImg] = useState<File | null>(null);

  const { add } = useIndexedDB("exercises");
  const dispatch = useDispatch();

  const handleAdd = () => {
    add({
      name: name,
      break: parseInt(breakNumber),
      duration: parseInt(duration),
      repetition: parseInt(repetition),
      description: description,
      image: img || null,
      // image
    }).then(
      (event) => {
        console.log("ID Generated: ", event);
        dispatch(
          addExercise({
            id: event,
            name: name,
            break: parseInt(breakNumber),
            duration: parseInt(duration),
            repetition: parseInt(repetition),
            description: description,
            image: img || null,
            undeletable: false,
          })
        );
        setName("");
        setBreakNumber("");
        setDuration("");
        setRepetition("");
        setDescription("");
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
          <FormLabel htmlFor="break">Break</FormLabel>
          <input
            type="number"
            id="break"
            name="break"
            onChange={(event) => setBreakNumber(event.target.value)}
            value={breakNumber}
          />
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="duration">Duration</FormLabel>
          <input
            type="number"
            id="duration"
            name="duration"
            onChange={(event) => setDuration(event.target.value)}
            value={duration}
          />
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="repetition">Repetition</FormLabel>
          <input
            type="number"
            id="repetition"
            name="repetition"
            onChange={(event) => setRepetition(event.target.value)}
            value={repetition}
          />
        </FormRow>
        <FormRow>
          <FormLabel htmlFor="description">Description</FormLabel>
          <input
            type="text"
            id="description"
            name="description"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
        </FormRow>
        <FormRow>
          <FormLabel>Image Upload</FormLabel>
          <InputRow>
            <InputLabel htmlFor="img">
              <BsArrowUpSquareFill />
            </InputLabel>
            <FormInput
              type="file"
              id="img"
              name="img"
              onChange={(event) => {
                const selectedFile =
                  event.target.files && event.target.files.length > 0
                    ? event.target.files[0]
                    : null;
                selectedFile && setImg(selectedFile);
              }}
              accept="image/png, image/jpeg"
            />
            <SelectedFile>
              {img === null ? "No file selected" : img.name}
            </SelectedFile>
          </InputRow>
        </FormRow>
      </FormContainer>

      <ButtonContainer>
        <IconButton
          link="/svettis/exercises"
          icon={<BsFillArrowLeftSquareFill />}
        />
        <IconButton link="/svettis/" icon={<BsFillHouseFill />} />
        <IconButton
          disabled={
            !name || !breakNumber || !duration || !repetition || !description
          }
          onTouch={handleAdd}
          icon={<BsFillFloppyFill />}
        />
      </ButtonContainer>
    </Container>
  );
};
