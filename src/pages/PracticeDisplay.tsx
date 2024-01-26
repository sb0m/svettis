import { FcHome, FcPrevious } from "react-icons/fc";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PracticeDisplay = () => {
  return (
    <Container>
      <h1>DISPLAY</h1>
      <br />
      <IconButton link="/svettis/practices" icon={<FcPrevious />} />
      <IconButton link="/svettis/" icon={<FcHome />} />
    </Container>
  );
};
