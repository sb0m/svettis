import {
  BsFillHouseFill,
  BsFillPlayBtnFill,
  BsFillPlusCircleFill,
  BsSearch,
} from "react-icons/bs";
import { useIndexedDB } from "react-indexed-db-hook";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";
import { addPractice } from "../store/slice";
import { Practice } from "../types/types";

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
  justify-content: space-around;
  font-weight: 800;
  color: #5b6c5d;
`;

const StyledList = styled.li`
  width: 100%;

  ul {
    background-color: #ef6f6c;
    margin-bottom: 1em;
    padding: 1em 0;
    box-shadow: 1px 3px 12px #3f1b1a;
  }
`;

type ListProps = {
  list: Practice[];
};

const List = (props: ListProps) => (
  <StyledList>
    {props.list.map((listEl) => (
      <StyledListItem key={listEl.name}>
        <StyledName>{listEl.name}</StyledName>
        <ButtonContainer>
          <IconButton
            link={`/svettis/${listEl.name}/play`}
            icon={<BsFillPlayBtnFill />}
          />
          <IconButton
            link={`/svettis/${listEl.name}/display`}
            icon={<BsSearch />}
          />
        </ButtonContainer>
      </StyledListItem>
    ))}
  </StyledList>
);

// function ByID() {
//   const { getByID } = useIndexedDB("people");
//   const [person, setPerson] = useState();

//   useEffect(() => {
//     getById(1).then((personFromDB) => {
//       setPerson(personFromDB);
//     });
//   }, []);

//   return <div>{person}</div>;
// }

export const Practices = () => {
  // A hook to access the redux dispatch function.
  // This is the only way to trigger a state change.
  const dispatch = useDispatch();

  // A hook to access the redux store's state.
  // This hook takes a selector function as an argument.
  // The selector is called with the store state.
  // state.todos.todos - todos is the name of the reducer and the name of the variable in the initialState.

  // eslint-disable-next-line
  // @ts-ignore
  const practices = useSelector((state) => state.practices.practices);
  // A function to handle the add button.
  const handleAdd = () => {
    // Dispatch an action to add a todo.
    dispatch(
      addPractice({
        id: Math.floor(Math.random() * 1000),
      })
    );
  };

  const db = useIndexedDB("exercises");
  const db2 = useIndexedDB("practices");
  console.log("JSON.stringify(db) ", JSON.stringify(db), JSON.stringify(db2));
  return (
    <Container>
      <h1>PRACTICES</h1>
      <br />
      <IconButton
        onTouch={handleAdd}
        link={`/svettis/add-practice`}
        icon={<BsFillPlusCircleFill />}
      />
      <List list={practices} />
      <IconButton link="/svettis/" icon={<BsFillHouseFill />} />
    </Container>
  );
};
