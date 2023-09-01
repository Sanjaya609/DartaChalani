import { scroll } from "../../utils/mixins";
import React from "react";
import styled from "styled-components";
import { Box } from "../core";

interface Props {
  children?: React.ReactNode;
  scrollable?: boolean;
  className?: string;
}
const Absolute = styled(Box)<Props>`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  ${({ scrollable }) => scrollable && `${scroll}`}
`;
function AbsoluteLayout(props: Props): React.ReactElement {
  return (
    <Absolute className={props.className} scrollable={props.scrollable}>
      {props.children}
    </Absolute>
  );
}

export default AbsoluteLayout;
