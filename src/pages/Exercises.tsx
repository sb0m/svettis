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

const ButtonContainer = styled.span``;

const StyledName = styled.span`
  font-size: 3em;
`;

const StyledListItem = styled.ul`
  display: flex;
  justify-content: space-between;
  font-weight: 800;
  color: #5b6c5d;
`;

const StyledList = styled.li`
  width: 100%;
  overflow: scroll;
  flex: 18;

  ul {
    background-color: #ef6f6c;
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
      "Do you really want to delete practice with name " +
      { exerciseName } +
      "?";
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
      <h1>EXERCISES</h1>
      <StyledAddButtonRow>
        <IconButton
          // onTouch={handleAdd}
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
