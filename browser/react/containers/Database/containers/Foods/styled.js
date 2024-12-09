import styled from 'styled-components';

export const Percent = styled.small`
  background-color: ${(props) => props.theme.lightGray};
  border: 1px solid ${(props) => props.theme.darkGray};
  padding: 3px 10px;

  &+& {
    margin-left: 10px;
  }
`;
