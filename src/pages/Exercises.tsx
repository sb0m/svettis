import { BsFillHouseFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Exercises = () => {
  // eslint-disable-next-line
  // @ts-ignore
  const exercises = useSelector((state) => state.exercises.exercises);

  console.log("exercises ", exercises);

  return (
    <Container>
      <div>EXERCICES</div>
      <br />
      <IconButton link="/svettis/" icon={<BsFillHouseFill />} />
    </Container>
  );
};
