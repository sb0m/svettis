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

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

export const PracticeAdd = () => {
  const [name, setName] = useState<string>("");
  const [breakNumber, setBreakNumber] = useState<string>("");

  const { add } = useIndexedDB("practices");
  const dispatch = useDispatch();
  // A function to handle the add button.
  const handleAdd = () => {
    // Dispatch an action to add a todo.
    console.log("add ", name, breakNumber);
    dispatch(
      addPractice({
        name: name,
        break: parseInt(breakNumber),
        exercises: [exercises[1], exercises[2]],
      })
    );
    add({
      name: name,
      break: parseInt(breakNumber),
      exercises: [exercises[1], exercises[2]],
    }).then(
      (event) => {
        console.log("ID Generated: ", event);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  console.log("name ", name, breakNumber);

  return (
    <Container>
      <h1>ADD PRACTICE</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <br />
        <input
          type="text"
          id="name"
          name="name"
          // value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        <label htmlFor="break">Break:</label>
        <br />
        <input
          type="number"
          id="break"
          name="break"
          // value={breakNumber}
          onChange={(event) => setBreakNumber(event.target.value)}
        />
        <br />
        {/* <input type="submit" /> */}
        <IconButton onTouch={handleAdd} icon={<BsFillPlusCircleFill />} />
      </form>

      <br />
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
