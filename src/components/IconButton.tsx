import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const StyledLink = styled(Link)`
  border-radius: 6px;
  background-color: #5b6c5d;
  width: fit-content;
  display: inline-flex;
  box-shadow: 1px 2px 6px #202621;
  color: #e7bb41;
  margin: 0.5em;
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease-in-out;

  svg {
    height: 36px;
    width: 36px;
  }

  &:hover {
    background-color: #738776;
  }

  &:active {
    box-shadow: 1px 2px 6px transparent;
    translate: 1px 2px;
  }
`;

const StyledButton = styled.button`
  border-radius: 6px;
  background-color: #5b6c5d;
  width: fit-content;
  display: inline-flex;
  box-shadow: 1px 2px 6px #202621;
  color: #e7bb41;
  margin: 0.5em;
  height: 48px;
  width: 48px;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  transition: 0.2s ease-in-out;
  cursor: pointer;

  svg {
    height: 36px;
    width: 36px;
  }

  &:hover {
    background-color: #738776;
  }

  &:active {
    box-shadow: 1px 2px 6px transparent;
    translate: 1px 2px;
  }
`;

type IconButtonProps = {
  link?: string;
  icon: ReactNode;
  onTouch?(): void;
};

export const IconButton = (props: IconButtonProps) => {
  // onTouch?
  return props.icon && props.link ? (
    <StyledLink to={props.link || ""}>{props.icon}</StyledLink>
  ) : (
    <StyledButton
      onTouchStart={() => props.onTouch && props.onTouch()}
      onClick={() => props.onTouch && props.onTouch()}
    >
      {props.icon}
    </StyledButton>
  );
};
