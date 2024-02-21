import { useEffect } from "react";
import { BsFillArrowLeftSquareFill, BsFillHouseFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";
import { Player } from "../components/Player.tsx";
import { IRootState } from "../store/store.tsx";
import { Practice } from "../types/types.ts";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
`;

const ButtonRow = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
`;

export const PracticePlay = () => {
  const { pathname } = useLocation();
  const practices = useSelector(
    (state: IRootState) => state.practices.practices
  );

  useEffect(() => {
    // eslint-disable-next-line
    // @ts-ignore
    let wakeLock = null;

    const requestWakeLock = async () => {
      console.log("requestWakeLock");
      try {
        wakeLock = await navigator.wakeLock.request("screen");
        console.log("requestWakeLock try");
      } catch (err) {
        console.log("error");
      }
    };

    const releaseWakeLock = () => {
      console.log("releaseWakeLock");
      // eslint-disable-next-line
      // @ts-ignore
      wakeLock && wakeLock.release();
      wakeLock = null;
    };

    requestWakeLock();
    return () => releaseWakeLock();
  }, []);

  const practiceId = parseInt(pathname.split("/")[3], 10);
  const practice: Practice | undefined = practices.find(
    (el: Practice) => el.id === practiceId
  );

  return (
    <Container>
      <h1>{practice?.name}</h1>
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
