import styled from 'styled-components';
import media from 'theme/media';

/**
 * A styled `div` element
 * @type {React.Component}
 */
const FlexWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
  align-items: ${(props) => (props.align ? props.align : 'flex-start')};
  flex-wrap: ${(props) => (props.wrap ? 'wrap' : 'no-wrap')};
  justify-content: ${(props) => props.justify || 'space-between'};
  ${(props) => (props.flex ? `flex: ${props.flex};` : null)}
  ${media.lgDown`
    flex-wrap: wrap;
  `};
`;

export default FlexWrapper;
