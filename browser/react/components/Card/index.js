import styled from 'styled-components';

const Card = styled.div`
  padding: 1rem;
  box-shadow: 0px 0px 25px ${(props) => (props.shadowColor ? props.theme[props.shadowColor] : 'rgba(0, 0, 0, 0.2)')};
  background: ${(props) => (props.background ? props.theme[props.background] : props.theme.white)};
  margin-bottom: ${(props) => (props.noMargin ? 'none' : '2rem')};
`;

export default Card;
