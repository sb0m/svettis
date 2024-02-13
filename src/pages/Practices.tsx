import {
  BsFillHouseFill,
  BsFillPlayBtnFill,
  BsFillPlusCircleFill,
  BsFillTrash3Fill,
  BsSearch,
} from "react-icons/bs";
import { useIndexedDB } from "react-indexed-db-hook";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";
import { deletePractice } from "../store/slice_practices";
import { IRootState } from "../store/store.tsx";
import { Practice } from "../types/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ButtonContainer = styled.span`
  flex: 3;
  min-width: 210px;
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

type ListProps = {
  list: Practice[];
};

export const Practices = () => {
  const practices = useSelector(
    (state: IRootState) => state.practices.practices
  );
  const { deleteRecord } = useIndexedDB("practices");
  const dispatch = useDispatch();

  const openDialog = (practiceName: string, practiceId: number) => {
    const text =
      'Do you really want to delete practice "' + practiceName + '"?';
    if (confirm(text) == true) {
      handleDelete(practiceId);
    }
  };

  const handleDelete = (practiceId: number) => {
    deleteRecord(practiceId).then(
      (event) => {
        console.log("ID Generated: ", event);
        const deleteEl = practices.find((el: Practice) => el.id === practiceId);
        if (deleteEl) {
          dispatch(deletePractice(deleteEl.id));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const List = (props: ListProps) => (
    <StyledList>
      {props.list.map((listEl, key) => (
        <StyledListItem key={key}>
          <StyledName>{listEl.name}</StyledName>
          <ButtonContainer>
            <IconButton
              link={`/svettis/practices/${listEl.id}/play`}
              icon={<BsFillPlayBtnFill />}
            />
            <IconButton
              link={`/svettis/practices/${listEl.id}/display`}
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
      <h1>PRACTICES</h1>
      <StyledAddButtonRow>
        <IconButton
          // onTouch={handleAdd}
          link={`/svettis/add-practice`}
          icon={<BsFillPlusCircleFill />}
        />
      </StyledAddButtonRow>
      {practices.length ? <List list={practices} /> : <>No List</>}
      <StyledHomeButtonRow>
        <IconButton link="/svettis/" icon={<BsFillHouseFill />} />
      </StyledHomeButtonRow>
    </Container>
  );
};
