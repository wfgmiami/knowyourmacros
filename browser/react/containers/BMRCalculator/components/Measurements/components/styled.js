import styled from 'styled-components';
import { Input } from 'components/FormComponents';
/**
 * @type {React.Component}
 */
export const MarginTop = styled.div`
  margin-top: 0.5rem;
`;
/**
 * @type {React.Component}
 */
export const Radio = styled(Input)`
  opacity: 0;
  height: 0px;
`;
/**
 * @type {React.Component}
 */
export const RadioLabel = styled.label`
  font-size: 1.1rem;
  background-color: ${(props) => (props.checked ? '#dedede' : '#fff')};
  border: 1px solid black;
`;
