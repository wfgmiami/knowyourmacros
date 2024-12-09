import styled from 'styled-components';
import media from 'theme/media';
import FlexWrapper from 'components/FlexWrapper';
/**
 * @type {React.Component}
 */
export const FlexW = styled(FlexWrapper)`
  ${media.smDown`
    &>* {
      /* width: 100%; */
    }
    & * {
      font-size: 10pt;
    }
  `}
`;
