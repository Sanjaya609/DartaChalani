import { css } from "styled-components";

export const scroll = css`
  overflow: auto;

  /* width */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: #d2d2d6;
    border-radius: 4px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background:#70a9ff;
    border-radius: 4px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #70a9ff;
    cursor: pointer;
  }
`;