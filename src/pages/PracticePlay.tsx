import { BsFillArrowLeftSquareFill, BsFillHouseFill } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";
import { ButtonRow, Player } from "../components/Player";
import { practices } from "../data/practices";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PracticePlay = () => {
  const { pathname } = useLocation();
  const practiceName = pathname.split("/")[2];
  const practice = practices.find((el) => el.name === practiceName);

  return (
    <Container>
      <h1>PLAY {practiceName}</h1>
      {practice && <Player practice={practice} />}

      <ButtonRow>
        <IconButton
          link="/svettis/practices"
          icon={<BsFillArrowLeftSquareFill />}
        />
        <IconButton link="/svettis/" icon={<BsFillHouseFill />} />
      </ButtonRow>
    </Container>
  );
};
