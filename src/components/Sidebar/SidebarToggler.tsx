import React from 'react';
import styled from 'styled-components';

interface Props {
  icon?: string;
  toggleSidebar?:React.Dispatch<React.SetStateAction<boolean>>;
}

const Toggler = styled.button`
  height: 100%;
  background-color: #143566;
  margin-right: 1.5rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--appbar-width);
  height: var(--header-height);
  cursor: pointer;
  font-size: 1rem;
  border: none;
`;

function SidebarToggler({ icon, toggleSidebar }: Props) {
  return (
    <Toggler onClick={()=>{if(toggleSidebar)toggleSidebar(toggle=>!toggle)}}>
      <i className={icon}></i>
    </Toggler>
  );
}

export default SidebarToggler;
