import styled from 'styled-components';

/**
 * A styled `h3` element
 * @type {React.Component}
 */
const H3 = styled.h3`
  margin-top: 0px;
  text-align: ${(props) => (props.centered ? 'center' : 'initial')};
  color: ${(props) => (props.color ? props.theme[props.color] : props.theme.darkBlue)};
  transition: color 500ms;
`;

export default H3;
