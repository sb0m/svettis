import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const HomeLink = styled(Link)`
  border-radius: 50%;
  background-color: #59c9a5;
  width: fit-content;
  padding: 0.8em;
  box-shadow: 12px 12px 2px 1px black;
`;

type IconButtonProps = {
  link?: string;
  icon?: ReactNode;
};

export const IconButton = (props: IconButtonProps) =>
  props.icon ? <HomeLink to={props?.link || ""}>{props.icon}</HomeLink> : <></>;
