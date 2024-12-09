import styled, { keyframes } from 'styled-components';
import { Input, Label } from 'components/FormComponents';

/** Change the border */
const borderChange = keyframes`
0% {
  border-color: #ccc;
}
100% {
  border-color: red;
}
`;

/** Change the font color */
const colorChange = keyframes`
0% {
  color: gray;
}
100% {
  color: red;
}
`;

/** @type {JSX.Element} */
export const ErrorMsg = styled.div`
color: red;
font-size: 0.7em;
position: absolute;
`;

/** @type {JSX.Element} */
export const FBInput = styled(Input)`
${(props) => (props.danger && `animation: 300ms ${borderChange} ease-out forwards;`)}
${(props) => (!props.danger && props.visited && `animation: 300ms ${borderChange} ease-out backwards`)}
`;

/** @type {JSX.Element} */
export const FBLabel = styled(Label)`
${(props) => (props.danger && `animation: 300ms ${colorChange} ease-out forwards;`)}
${(props) => (!props.danger && props.visited && `animation: 300ms ${colorChange} ease-out backwards`)}
`;
