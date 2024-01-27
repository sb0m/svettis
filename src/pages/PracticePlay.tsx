import {
  BsFillHouseFill,
  BsFillArrowLeftSquareFill,
  BsFillPauseCircleFill,
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
          setCurrentRepetition((prev) => prev + 1);
          setCurrentTime(0);
          return;
        } else {
          // end of practice
          if (currentExerciseIndex >= props.practice.exercises.length - 1) {
            console.log("end ");
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
          setCurrentTime((t) => t + 10);
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

  console.log("currentExercise ", currentExercise, isPlaying);

  return currentExercise ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span>currentExercise {currentExercise.name}</span>
      <span>currentTime {currentTime}</span>
      <span>currentExerciseIndex {currentExerciseIndex}</span>
      <span>currentExercise.duration {currentExercise.duration}</span>
      <span>currentRepetition {currentRepetition}</span>
      <span>currentExercise.repetition {currentExercise.repetition}</span>
      <span>props.practice.break * 10000 {props.practice.break * 1000}</span>
      <IconButton
        onTouch={() => setIsPlaying(false)}
        icon={<BsFillPauseCircleFill />}
      />
    </div>
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
      <IconButton
        link="/svettis/practices"
        icon={<BsFillArrowLeftSquareFill />}
      />
      <IconButton link="/svettis/" icon={<BsFillHouseFill />} />
    </Container>
  );
};
