import styled from 'styled-components';

/**
 * A styled `h1` element
 * @type {React.Component}
 */
const H1 = styled.h1`
  font-size: 2em;
  margin-bottom: 0.25em;
  text-align: ${(props) => (props.centered ? 'center' : 'inherit')};
`;

export default H1;
