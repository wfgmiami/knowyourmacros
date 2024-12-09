import styled from 'styled-components';

const Text = styled.div`
  color: ${(props) => props.theme[props.color]};
  font-size: ${(props) => (props.small ? '0.75rem' : '1rem')};
  text-align: ${(props) => props.centered && 'center'};
  font-weight: ${(props) => props.bold && 'bold'};
  margin-top: ${(props) => (props.marginTop || '0px')}
`;

export default Text;
