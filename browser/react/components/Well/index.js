import styled from 'styled-components';
// import { fixed } from 'colorCSS';
/**
 * A styled `div` element
 * @type {React.Component}
 */
const Well = styled.div`
  background-color: ${(props) => (props.theme.white)};
  border: 1px solid ${(props) => (props.theme.mediumGray)};
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.2);
  /* border-radius: 4px; */
  padding: ${(props) => (props.small ? '9px' : '12px')};
  margin-bottom: 1rem;
`;

export default Well;
