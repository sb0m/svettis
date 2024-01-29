import { useEffect, useState } from "react";
import {
  BsFillArrowLeftSquareFill,
  BsFillHouseFill,
  BsFillPauseCircleFill,
  BsFillPlayBtnFill,
} from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import stop from "../assets/stop.mp3";
import { IconButton } from "../components/IconButton";
import { practices } from "../data/practices";
import { Practice } from "../types/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
`;

const ButtonRow = styled.div`
  display: flex;
  align-self: center;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  height: 2em;
  background-color: black;
`;

const ProgressBar = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 2em;
  background-color: 5b6c5d;
`;

type PlayerProps = {
  practice: Practice;
};

const Player = (props: PlayerProps) => {
  const [currentExercise, setCurrentExercise] = useState(
    props.practice.exercises[0]
  );
  const [currentTime, setCurrentTime] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentRepetition, setCurrentRepetition] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPause, setIsPause] = useState(false);
  const [currentPauseTime, setCurrentPauseTime] = useState(0);

  useEffect(() => {
    const switchExercise = () => {
      const newExerciseIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(newExerciseIndex);
      setCurrentExercise(props.practice.exercises[newExerciseIndex]);
      setCurrentTime(0);
      setCurrentRepetition(1);
      setIsPause(false);
    };
    const addRepetition = () => {
      setCurrentRepetition((prev) => prev + 1);
      setCurrentTime(0);
      setIsPause(false);
    };
    if (isPlaying) {
      if (currentTime >= currentExercise.duration) {
        // new Repetition
        if (currentRepetition < currentExercise.repetition) {
          setIsPause(true);
          setTimeout(addRepetition, currentExercise.break * 1000);
          return;
        } else {
          // end of practice
          if (currentExerciseIndex >= props.practice.exercises.length - 1) {
            setIsPlaying(false);
            setCurrentExercise(props.practice.exercises[0]);
            setCurrentTime(0);
            setCurrentExerciseIndex(0);
            setCurrentRepetition(1);
            return;
          }
          // new Exercise
          setIsPause(true);
          setTimeout(switchExercise, props.practice.break * 1000);
          return;
        }
      }
      //count
      if (
        currentExerciseIndex <= props.practice.exercises.length &&
        currentTime <= currentExercise.duration
      ) {
        const intervalId = setInterval(() => {
          setCurrentTime((t) => t + 1);
        }, 1000);

        return () => clearInterval(intervalId);
      }
    }
  }, [
    isPlaying,
    props.practice.exercises,
    currentTime,
    currentExercise,
    currentExerciseIndex,
    currentRepetition,
    props.practice.break,
  ]);

  type ProgressProps = {
    time: number;
    duration: number;
  };

  const Progress = (props: ProgressProps) => (
    <ProgressWrapper>
      <ProgressBar
        width={parseInt((props.time / props.duration) * 100 + "") + "%"}
      ></ProgressBar>
      {`Seconds - ${props.time} / ${props.duration}`}
    </ProgressWrapper>
  );

  const Break = () => (
    <>{`BREAK - ${currentPauseTime} / ${currentExercise.break}`}</>
  );

  // const audio = new Audio('http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_shoot.wav');
  // audio.play();

  const audio = new Audio(stop);
  audio.play();

  return currentExercise ? (
    <PlayerContainer>
      <span>Exercise - {currentExercise.name}</span>
      {isPause ? (
        <Break />
      ) : (
        <Progress time={currentTime} duration={currentExercise.duration} />
      )}
      {/*TODO: show break when a break*/}
      <span>
        Repetition - {currentRepetition} / {currentExercise.repetition}
      </span>
      <ButtonRow>
        <IconButton
          onTouch={() => setIsPlaying(false)}
          icon={<BsFillPauseCircleFill />}
        />
        <IconButton
          onTouch={() => setIsPlaying(true)}
          icon={<BsFillPlayBtnFill />}
        />
      </ButtonRow>
    </PlayerContainer>
  ) : (
    <>No exercise</>
  );
};

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
