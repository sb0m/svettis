import { useEffect, useState } from "react";
import { BsFillPauseCircleFill, BsFillPlayBtnFill } from "react-icons/bs";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";
import { Practice } from "../types/types";

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  span {
    margin-bottom: 2em;
  }
`;

const ProgressWrapper = styled.div`
  width: 100%;
  height: 2em;
  background-color: var(--button-color);
  margin-bottom: 2em;
  border-radius: 4px;
`;

const ProgressBar = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  height: 2em;
  background-color: var(--highlight-color);
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
`;

export const ButtonRow = styled.div`
  display: flex;
  align-self: center;
`;

export const StyledProgress = styled.div`
  display: flex;
  flex-direction: column;
`;

type PlayerProps = {
  practice: Practice;
};

export const Player = (props: PlayerProps) => {
  const [currentExercise, setCurrentExercise] = useState(
    props.practice.exercises[0]
  );
  const [currentTime, setCurrentTime] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentRepetition, setCurrentRepetition] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPause, setIsPause] = useState(false);
  const [currentPauseTime, setCurrentPauseTime] = useState(0);
  const [currentBreakDuration, setCurrentBreakDuration] = useState(0);

  useEffect(() => {
    //count break
    if (isPause) {
      const intervalIdPause = setInterval(() => {
        setCurrentPauseTime((t) => t + 1);
      }, 1000);

      return () => {
        setCurrentPauseTime(0);
        clearInterval(intervalIdPause);
      };
    }
  }, [isPause]);

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
          setCurrentBreakDuration(currentExercise.break);
          navigator.vibrate(200);
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
          setCurrentBreakDuration(props.practice.break);
          navigator.vibrate(200);
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
    <StyledProgress>
      <ProgressWrapper>
        <ProgressBar
          width={parseInt((props.time / props.duration) * 100 + "") + "%"}
        ></ProgressBar>
        <span>{`${props.time} sec / ${props.duration} sec`}</span>
      </ProgressWrapper>
    </StyledProgress>
  );

  return currentExercise ? (
    <PlayerContainer>
      {isPause ? (
        <span>BREAK</span>
      ) : (
        <span>Exercise - {currentExercise.name}</span>
      )}
      {isPause ? (
        <Progress time={currentPauseTime} duration={currentBreakDuration} />
      ) : (
        <Progress time={currentTime} duration={currentExercise.duration} />
      )}
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
