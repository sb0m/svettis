import { BsFillArrowLeftSquareFill, BsFillHouseFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";
import { ButtonRow, Player } from "../components/Player";
import { IRootState } from "../store/store.tsx";
import { Practice } from "../types/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 0 2em;
`;

export const PracticePlay = () => {
  const { pathname } = useLocation();
  const practices = useSelector(
    (state: IRootState) => state.practices.practices
  );

  const practiceId = parseInt(pathname.split("/")[3], 10);
  const practice: Practice | undefined = practices.find(
    (el: Practice) => el.id === practiceId
  );

  return (
    <Container>
      <h1>{practice?.name.toUpperCase()}</h1>
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
