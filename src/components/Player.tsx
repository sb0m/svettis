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
  padding: 0 2em;
`;

const PlayContent = styled.div`
  border: 1px solid var(--extra-color);
  border-radius: 8px;
  padding: 0.5em;
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
  justify-content: center;
`;

export const StyledProgress = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CurrentExerciseSpan = styled.span<{ isCurrent: boolean }>`
  color: ${(props) =>
    props.isCurrent ? "var(--highlight-color)" : "var(--text-color)"};
  font-weight: bold;
  font-size: ${(props) => (props.isCurrent ? "1.4em" : "1em")};
`;

export const CurrentBreakSpan = styled.span<{ isCurrent: boolean }>`
  color: ${(props) =>
    props.isCurrent ? "var(--highlight-color)" : "var(--text-color-dark)"};
  font-weight: bold;
  font-size: ${(props) => (props.isCurrent ? "1.4em" : "1em")};
`;

export const ExerciseSpan = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ExerciseName = styled.span`
  color: var(--highlight-color);
  font-size: 1.7em;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
  border: 1px solid var(--extra-color);
  border-radius: 6px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;

  h3 {
    color: var(--text-color);
    margin: 0.2em;
  }

  @media only screen and (max-height: 900px) {
    overflow-y: unset;
    overflow-x: unset;
  }
`;

export const ImgContainer = styled.div`
  max-height: 300px;
  height: 300px;
  padding: 0.5em 0;

  img {
    aspect-ratio: auto;
    max-width: 95%;
    max-height: 300px;
  }

  @media only screen and (max-height: 900px) {
    max-height: 200px;
    height: 200px;
    padding: 0.5em 0;

    img {
      aspect-ratio: auto;
      max-width: 95%;
      max-height: 200px;
    }
  }
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPause, setIsPause] = useState(false);
  const [currentPauseTime, setCurrentPauseTime] = useState(0);
  const [currentBreakDuration, setCurrentBreakDuration] = useState(0);
  const [imageDataUrl, setImageDataUrl] = useState<string | ArrayBuffer | null>(
    null
  );

  const audioUrl = "../../sounds/alarm.mp3";

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
    const vibrationPattern = [1500, 500, 1500];
    const audio = new Audio(audioUrl);

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
          navigator.vibrate(vibrationPattern);
          audio.play();
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
          navigator.vibrate(vibrationPattern);
          audio.play();
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
      </ProgressWrapper>
      <CurrentTime>{`${props.time} sec`}</CurrentTime>
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
      <PlayContent>
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
            <ExerciseName>Break</ExerciseName>
            <span>{`| ${currentBreakDuration} sec |`}</span>
          </ExerciseNameRow>
        ) : (
          <ExerciseNameRow>
            <ExerciseName>{currentExercise.name}</ExerciseName>
            <span>{`| ${currentExercise.duration} Sec - `}</span>
            <span>{`Breaks ${currentExercise.break} Sec |`}</span>
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
      </PlayContent>

      <ImgContainer>
        {imageDataUrl && <img src={imageDataUrl?.toString()} />}
      </ImgContainer>

      <Exercises>
        {props.practice?.exercises.map((exercise, index) => {
          return (
            <ExerciseSpan key={index}>
              <CurrentExerciseSpan
                isCurrent={
                  index === currentExerciseIndex &&
                  !(currentRepetition === currentExercise.repetition && isPause)
                }
              >
                {exercise.name}
              </CurrentExerciseSpan>
              <CurrentBreakSpan
                isCurrent={
                  index === currentExerciseIndex &&
                  currentRepetition === currentExercise.repetition &&
                  isPause
                }
              >
                | Break {props.practice.break} Sec |
              </CurrentBreakSpan>
            </ExerciseSpan>
          );
        })}
      </Exercises>
    </PlayerContainer>
  ) : (
    <>No exercise</>
  );
};
