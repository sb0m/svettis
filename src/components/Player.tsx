import { useEffect, useState } from "react";
import {
  BsFastForwardBtnFill,
  BsFillPauseCircleFill,
  BsFillPlayBtnFill,
} from "react-icons/bs";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";
import { Practice } from "../types/types";

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  height: 2em;
  background-color: var(--button-color);
  margin-bottom: 3em;
  border-radius: 4px;
  margin: 0.5em 0;
  display: block;
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
  margin-bottom: 1em;
`;

export const StyledProgress = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CurrentExerciseSpan = styled.span<{ current: boolean }>`
  color: ${(props) =>
    props.current ? "var(--highlight-color)" : "var(--text-color-dark)"};
  font-weight: bold;
  font-size: ${(props) => (props.current ? "1.4em" : "1em")};

  span {
    display: block;
  }
`;

export const ExerciseName = styled.span`
  color: var(--highlight-color);
  font-size: 1.7em;
`;

export const ExerciseNameRow = styled.span`
  color: var(--text-color);
`;

export const Repetition = styled.span`
  color: var(--highlight-color);
`;

export const CurrentTime = styled.span`
  color: var(--highlight-color);
  font-weight: bold;
  font-size: 1.7em;
  display: block;
`;

export const IconButtonBack = styled(IconButton)`
  svg {
    transform: rotate(180deg);
  }
`;

export const Exercises = styled.div`
  color: var(--text-color-dark);
  display: flex;
  flex-direction: column;
  margin: 1em 0;

  h3 {
    color: var(--text-color);
    margin: 0.2em;
  }
`;

export const ImgContainer = styled.div`
  margin: 1em 0;

  img {
    width: 90%;
  }
`;

type PlayerProps = {
  practice: Practice;
};

export const Player = (props: PlayerProps) => {
  const vibrationPattern = [1500, 500, 1500, 500, 1500];
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
  const [imageDataUrl, setImageDataUrl] = useState<string | ArrayBuffer | null>(
    null
  );

  useEffect(() => {
    const exercise = props.practice.exercises[currentExerciseIndex];
    setImageDataUrl(null);

    if (!exercise || (!exercise.image && !exercise.imageAsset)) {
      return;
    }
    if (exercise.imageAsset) {
      setImageDataUrl("/svettis/pictures/" + exercise.imageAsset);
    } else if (exercise.image) {
      const reader = new FileReader();
      reader.readAsDataURL(exercise.image);
      reader.onload = () => {
        const imageDataUrl = reader.result;
        setImageDataUrl(imageDataUrl);
      };
    }
  }, [currentExerciseIndex, props.practice.exercises]);

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
      setImageDataUrl(null);
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
          navigator.vibrate(vibrationPattern);
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
            setImageDataUrl(null);
            return;
          }
          // new Exercise
          setIsPause(true);
          setCurrentBreakDuration(props.practice.break);
          navigator.vibrate(vibrationPattern);
          setTimeout(switchExercise, props.practice.break * 1000);
          setImageDataUrl(null);
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
      </ProgressWrapper>
      <CurrentTime>{`${props.time} sec`}</CurrentTime>
      <audio id="my-audio">
        <source src="./sounds/alarm.mp3" type="audio/mpeg" />
        <p>
          Download<a href="audiofile.mp3">audiofile.mp3</a>
        </p>
      </audio>
      <button id="play">play</button>
    </StyledProgress>
  );

  const changeExercise = (ind: number): void => {
    setCurrentExerciseIndex(ind);
    setCurrentExercise(props.practice.exercises[ind]);
    setCurrentTime(0);
    setCurrentRepetition(1);
    setIsPause(false);
    setCurrentPauseTime(0);
    setCurrentBreakDuration(props.practice.break);
  };

  return currentExercise ? (
    <PlayerContainer>
      <ButtonRow>
        <IconButtonBack
          onTouch={() => changeExercise(currentExerciseIndex - 1)}
          icon={<BsFastForwardBtnFill />}
          disabled={isPause || currentExerciseIndex === 0}
        />
        <IconButton
          onTouch={() => setIsPlaying((prev) => !prev)}
          icon={isPlaying ? <BsFillPauseCircleFill /> : <BsFillPlayBtnFill />}
          disabled={isPause}
        />
        <IconButton
          onTouch={() => changeExercise(currentExerciseIndex + 1)}
          icon={<BsFastForwardBtnFill />}
          disabled={
            isPause ||
            currentExerciseIndex === props.practice.exercises.length - 1
          }
        />
      </ButtonRow>

      {isPause ? (
        <ExerciseNameRow>
          <ExerciseName>BREAK</ExerciseName>
        </ExerciseNameRow>
      ) : (
        <ExerciseNameRow>
          <ExerciseName>{currentExercise.name}</ExerciseName>
          <span>{` | ${currentExercise.duration} sec | `}</span>
          <span>{`breaks ${currentExercise.break} sec`}</span>
        </ExerciseNameRow>
      )}
      {isPause ? (
        <Progress time={currentPauseTime} duration={currentBreakDuration} />
      ) : (
        <Progress time={currentTime} duration={currentExercise.duration} />
      )}

      <Repetition>
        Repetition {currentRepetition} | {currentExercise.repetition}
      </Repetition>

      <ImgContainer>
        {imageDataUrl && <img src={imageDataUrl?.toString()} />}
      </ImgContainer>

      <Exercises>
        <h3>Training Program</h3>
        {props.practice?.exercises.map((exercise, index) => {
          return (
            <>
              <CurrentExerciseSpan
                current={
                  index === currentExerciseIndex &&
                  !(currentRepetition === currentExercise.repetition && isPause)
                }
              >
                {exercise.name}
              </CurrentExerciseSpan>
              <CurrentExerciseSpan
                current={
                  index === currentExerciseIndex &&
                  currentRepetition === currentExercise.repetition &&
                  isPause
                }
              >
                - break {props.practice.break} sec -
              </CurrentExerciseSpan>
            </>
          );
        })}
      </Exercises>
    </PlayerContainer>
  ) : (
    <>No exercise</>
  );
};
