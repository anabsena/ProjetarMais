import styled from 'styled-components'; 

export const NavigationMenuContainer = styled.div`
  background: ${({ type }) => type === 'nested' ? '#8f00ff' : '#008061'}; 
  position: fixed; 
  top: 0; 
  left: 0; 
  height: 100vh; 
  width: 100%; 
  color: white; 
  z-index: 500; 
  @media (min-width: 740px) { 
    box-shadow: 1px 0px 10px black;
    width: 30%; 
    z-index: ${({ type }) => type === 'nested' ? 100 : 200};
    left: ${({ type }) => type === 'nested' ? '30%' : 0}; 
  }
`;

export const CloseBtn = styled.div`
  position: absolute; 
  right: 5px; 
  top: 0; 
  font-size: 30px; 
  cursor: pointer; 
`;

export const SpinnerWrapper = styled.div`
  display: flex; 
  justify-content: center;  
  margin: 50px 0; 
`; 

export const MenuItem = styled.li`
  padding: 1em; 
  background: rgba(0, 0, 0, 0.5); 
  cursor: pointer;
  transition: all 0.35s ; 
  &:hover { 
    background: rgba(0, 0, 0, 0.7); 
  } 
`; 

export const Title = styled.h1`
  padding-left: 1rem; 
`; 

export const Icon = styled.i`
  font-style: normal; 
`; 

export const List = styled.ul`
  list-style: none; 
  padding: 0; 
`; 

