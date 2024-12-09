import styled from 'styled-components';
import { fixed } from 'colorCSS';

/**
 * A styled `th` element
 * @type {React.Component}
 */
const Th = styled.th`
  ${fixed}

  tr &:not(:last-child) {
    border-right: 1px solid white;
  }

`;

export default Th;
