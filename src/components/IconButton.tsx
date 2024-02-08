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

const StyledButton = styled.button<{ disabled: boolean | undefined }>`
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

  ${(props) => props.disabled && "pointer-events: none;"};
  ${(props) => props.disabled && "opacity: 30%;"};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

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
  className?: string;
  disabled?: boolean;
};

// eslint-disable-next-line
// @ts-ignore
export const IconButton = ({
  link,
  icon,
  onTouch,
  className,
  disabled,
}: IconButtonProps) => {
  return icon && link ? (
    <StyledLink to={link || ""} className={className}>
      {icon}
    </StyledLink>
  ) : (
    <StyledButton
      className={className}
      //onTouchStart={() => props.onTouch && props.onTouch()}
      onClick={() => onTouch && onTouch()}
      disabled={disabled !== undefined ? disabled : false}
    >
      {icon}
    </StyledButton>
  );
};
