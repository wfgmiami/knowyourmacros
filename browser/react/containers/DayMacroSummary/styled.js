import styled from 'styled-components';
import FlexWrapper from 'components/FlexWrapper';

/**
 * @type {React.Component}
 */
export const Wrapper = styled(FlexWrapper)`
  align-items: stretch;
`;

/**
 * @type {React.Component}
 */
export const Left = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${700 / 12}%;
`;

/**
 * @type {React.Component}
 */
export const Right = styled.div`
  text-align: center;
  width: ${500 / 12}%;
`;

