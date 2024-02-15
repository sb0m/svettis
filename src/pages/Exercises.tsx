import {
  BsFillHouseFill,
  BsFillPlusCircleFill,
  BsFillTrash3Fill,
  BsSearch,
} from "react-icons/bs";
import { useIndexedDB } from "react-indexed-db-hook";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";
import { deleteExercise } from "../store/slice_exercises";
import { IRootState } from "../store/store.tsx";
import { Exercise } from "../types/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ButtonContainer = styled.span`
  flex: 3;
  min-width: 140px;
  display: flex;
  justify-content: flex-end;
`;

const StyledName = styled.span`
  font-size: 2em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  align-items: center;
  flex: 6;
  text-align: left;
  align-self: center;
`;

const StyledListItem = styled.li`
  display: flex;
  justify-content: space-between;
  font-weight: 800;
  color: var(--button-color);
`;

const StyledList = styled.ul`
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 18;

  li {
    background-color: var(--highlight-color);
    margin-bottom: 1em;
    padding: 1em 1em;
    box-shadow: 1px 3px 12px #3f1b1a;
  }
`;

const StyledAddButtonRow = styled.div`
  flex: 1;
`;

const StyledHomeButtonRow = styled.div`
  flex: 1;
`;
export const Exercises = () => {
  const exercises = useSelector(
    (state: IRootState) => state.exercises.exercises
  );
  const { deleteRecord } = useIndexedDB("exercises");
  const dispatch = useDispatch();

  const openDialog = (exerciseName: string, exerciseId: number) => {
    const text =
      'Do you really want to delete practice "' + exerciseName + '"?';
    if (confirm(text) == true) {
      handleDelete(exerciseId);
    }
  };

  const handleDelete = (exerciseId: number) => {
    deleteRecord(exerciseId).then(
      (event) => {
        console.log("ID Generated: ", event);
        const deleteEl = exercises.find((el: Exercise) => el.id === exerciseId);
        if (deleteEl) {
          dispatch(deleteExercise(deleteEl.id));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  type ListProps = {
    list: Exercise[];
  };

  const List = (props: ListProps) => (
    <StyledList>
      {props.list.map((listEl, key) => (
        <StyledListItem key={key}>
          <StyledName>{listEl.name}</StyledName>
          <ButtonContainer>
            <IconButton
              link={`/svettis/exercises/${listEl.id}/display`}
              icon={<BsSearch />}
            />
            {!listEl.undeletable && (
              <IconButton
                onTouch={() => openDialog(listEl.name, listEl.id)}
                icon={<BsFillTrash3Fill />}
              />
            )}
          </ButtonContainer>
        </StyledListItem>
      ))}
    </StyledList>
  );

  return (
    <Container>
      <h1>Exercises</h1>
      <StyledAddButtonRow>
        <IconButton
          link={`/svettis/add-exercise`}
          icon={<BsFillPlusCircleFill />}
        />
      </StyledAddButtonRow>
      {exercises.length ? <List list={exercises} /> : <>No List</>}
      <StyledHomeButtonRow>
        <IconButton link="/svettis/" icon={<BsFillHouseFill />} />
      </StyledHomeButtonRow>
    </Container>
  );
};
