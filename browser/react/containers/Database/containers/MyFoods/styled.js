import styled from 'styled-components';
import FlexWrapper from 'components/FlexWrapper';

export const Row = styled(FlexWrapper)`
  &:not(:last-child) {
    border-bottom: 1px solid lightgray;
  }
  font-size: 10.5pt;
  line-height: 2.5em;
`;

export const FoodCol = styled.div`
  flex: 12;
  text-align: left;
`;

export const IconCol = styled.div`
  flex: 1;
  text-align: center;
`;

export const MacroWrapper = styled(FlexWrapper)`
  flex: 7;
  text-align: center;
`;

export const MacroCol = styled.div`
  flex: 1;
`;
