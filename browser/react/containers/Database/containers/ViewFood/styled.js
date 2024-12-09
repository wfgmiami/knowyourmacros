import styled from 'styled-components';

/** @type {JSX.Element} */
export const Section = styled.div`
  border: 1px solid black;
  line-height: 2em;
  font-size: 10.5pt;
  padding: 0 0.5em;
  & + & {
    border-top: none;
  }
`;

/** @type {JSX.Element} */
export const BlackSpace = styled.div`
  background-color: #000;
  height: ${(props) => (props.height ? props.height : '0.25em')};
`;
