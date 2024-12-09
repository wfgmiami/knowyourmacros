import styled from 'styled-components';
import media from 'theme/media';
import Button from 'components/Button';

export const InlineH3 = styled.h3`
  display: inline;
`;

export const Wrapper = styled.div`
  margin-bottom: 1em;
`;

export const HalfCol = styled.div`
  width: 50%;
  ${media.mdDown`
    width: 100%;
  `}
`;

export const GetRecommendation = styled(Button)`
  ${media.mdDown`
    margin: auto;
    display: block;
    width: 100%;
  `}
`;
