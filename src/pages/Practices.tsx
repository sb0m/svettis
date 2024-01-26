import { FcHome, FcSearch, FcStart } from "react-icons/fc";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";
import { practice1, practice2, practice3 } from "../data/practices";
import { Practice } from "../types/types";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledName = styled.span`
  font-size: 3em;
`;

const StyledListItem = styled.ul`
  font-weight: 800;
  color: #5b6c5d;
`;

const StyledList = styled.li`
  width: 100%;

  ul {
    background-color: #ef6f6c;
    margin-bottom: 1em;
    padding: 1em 0;
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
        <span>
          <IconButton
            link={`/svettis/${listEl.name}/play`}
            icon={<FcStart />}
          />
        </span>
        <span>
          <IconButton
            link={`/svettis/${listEl.name}/display`}
            icon={<FcSearch />}
          />
        </span>
      </StyledListItem>
    ))}
  </StyledList>
);

export const Practices = () => {
  return (
    <Container>
      <h1>PRACTICES</h1>
      <br />
      {/* <IconButton link={`/svettis/add-practice`} icon={<FcPlus />} /> */}
      <List list={[practice1, practice2, practice3]} />
      <IconButton link="/svettis/" icon={<FcHome />} />
    </Container>
  );
};
