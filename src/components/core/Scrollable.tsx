export const Scrollable = `
overflow: auto;

&::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

&::-webkit-scrollbar-track {
  background: #d2d2d6;
  border-radius: 4px;
}

&::-webkit-scrollbar-thumb {
  background: #2f6fcf;
  border-radius: 4px;
}

&::-webkit-scrollbar-thumb:hover {
  background:  #d2d2d6;
  cursor: pointer;
}
`;
