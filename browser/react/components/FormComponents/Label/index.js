/**
* Label
*/

import styled from 'styled-components';

const Label = styled.div`
  color: ${(props) => (props.color ? props.theme[props.color] : props.theme.halfOpacityBlue)};
  font-size: 0.75rem;
  /* letter-spacing: 1px; */
  font-weight: ${(props) => (props.bold ? 'bold' : 'normal')};
  text-align: ${(props) => props.centered && 'center'};
  border-bottom: ${(props) => (props.underlined ? `1px solid ${props.theme.mediumGray}` : 'none')};
`;

export default Label;
