import {
  BsFillHouseFill,
  BsFillArrowLeftSquareFill,
  BsFillPauseCircleFill,
  BsFillPlayBtnFill,
} from "react-icons/bs";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";
import { useLocation } from "react-router-dom";
import { practices } from "../data/practices";
import { Practice } from "../types/types";
import { useState, useEffect } from "react";

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

const ProgressBar = styled.div<{ test: string }>`
  width: ${(props) => props.test};
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

  useEffect(() => {
    const switchExercise = () => {
      const newExerciseIndex = currentExerciseIndex + 1;
      setCurrentExerciseIndex(newExerciseIndex);
      setCurrentExercise(props.practice.exercises[newExerciseIndex]);
      setCurrentTime(0);
      setCurrentRepetition(1);
    };
    if (isPlaying) {
      if (currentTime >= currentExercise.duration) {
        // new Repetition
        if (currentRepetition < currentExercise.repetition) {
          const test = () => {
            setCurrentRepetition((prev) => prev + 1);
            setCurrentTime(0);
          };
          setTimeout(test, currentExercise.break * 1000);
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
        test={parseInt((props.time / props.duration) * 100 + "") + "%"}
      ></ProgressBar>
    </ProgressWrapper>
  );

  return currentExercise ? (
    <PlayerContainer>
      <span>current exercise - {currentExercise.name}</span>
      <Progress time={currentTime} duration={currentExercise.duration} />
      {/*TODO: show break when a break*/}
      <span>currentTime {currentTime}</span>
      <span>currentExercise.duration {currentExercise.duration}</span>
      <span>currentRepetition {currentRepetition}</span>
      <span>currentExercise.repetition {currentExercise.repetition}</span>
      <span>props.practice.break * 10000 {props.practice.break * 1000}</span>
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
