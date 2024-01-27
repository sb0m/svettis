import { BsFillHouseFill, BsSearch, BsFillPlayBtnFill } from "react-icons/bs";
import { styled } from "styled-components";
import { IconButton } from "../components/IconButton";
import { practices } from "../data/practices";
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

export const Practices = () => {
  return (
    <Container>
      <h1>PRACTICES</h1>
      <br />
      {/* <IconButton link={`/svettis/add-practice`} icon={<FcPlus />} /> */}
      <List list={practices} />
      <IconButton link="/svettis/" icon={<BsFillHouseFill />} />
    </Container>
  );
};
