import styled from 'styled-components';
import { fixed } from 'colorCSS';

/**
 * A styled `span` element
 * @type {React.Component}
 */
const Label = styled.span`
  font-size: 0.8rem;
  border-radius: 3px;
  padding: 0.1rem 0.3rem;
  ${fixed}
`;

export default Label;
