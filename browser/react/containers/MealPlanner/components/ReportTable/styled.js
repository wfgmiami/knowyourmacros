import styled from 'styled-components';
import FlexWrapper from 'components/FlexWrapper';

export const Wrapper = styled.div`
margin-top: 1.5em;
margin-bottom: 1.5em;
background: ${(props) => props.theme.white}
`;
export const Row = styled(FlexWrapper)`
border-top: 1px solid gray;
font-size: 10.5pt;
&:last-child {
  border-bottom: 1px solid gray;
}
`;
export const FoodName = styled.div`
width: 30%;
border-left: 1px solid gray;
padding: 0.6em;
`;
export const Amount = styled.div`
width: 30%;
border-left: 1px solid gray;
padding: 0.6em;
`;
export const AmountDesc = styled.div`
&:nth-child(even) {
  color: darkblue;
}
`;
export const Macro = styled.div`
width: 10%;
border-left: 1px solid gray;
&:last-child {
  border-right: 1px solid gray;
}
padding: 0.6em;
`;
export const Total = styled.div`
width: 70%;
font-weight: bold;
border-left: 1px solid gray;
padding: 0.6em;
`;
