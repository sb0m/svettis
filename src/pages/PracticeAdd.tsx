import { BsFillHouseFill } from "react-icons/bs";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PracticeAdd = () => {
  return (
    <Container>
      <h1>ADD PRACTICE</h1>
      <br />
      <IconButton link="/svettis/" icon={<BsFillHouseFill />} />
    </Container>
  );
};