import styled from 'styled-components';
import media from 'theme/media';
/**
 * @type {React.Component}
 */
export const LeftWrapper = styled.div`
  width: 25%;
  padding-right: 0.5rem;
  ${media.smDown`
    width: 100%;
    padding: 0px 0px;
  `}
`;
/**
 * @type {React.Component}
 */
export const RightWrapper = styled.div`
  width: 75%;
  padding-left: 0.5rem;
  ${media.smDown `
    width: 100%;
    padding: 0px 0px;
  `}
`;
