import styled from 'styled-components';
import FlexWrapperBase from 'components/FlexWrapper';
/**
 * @type {React.Component}
 */
export const FlexWrapper = styled(FlexWrapperBase)`
  &>*:not(:first-child) {
    border-left: none;
  }
`;
