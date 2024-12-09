import styled from 'styled-components';
import { fixed } from 'colorCSS';

export const Bar = styled.div`
  width: 100%;
  background-color: #dedede;
  overflow: hidden;
`;

export const Progress = styled.div`
  width: ${(props) => (props.progress ? props.progress : '0%')};
  height: 20px;
  text-align: center;
  line-height: 30px;
  color: #000;

  ${fixed}
  border-width: 1px;
  border-style: solid;
`;

export const Label = styled.span`
`;
