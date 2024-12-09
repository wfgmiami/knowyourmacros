import styled from 'styled-components';
import { Input, Select } from 'components/FormComponents';
/**
 * @type {React.Component}
 */
export const MarginWrapper = styled.div`
  margin-top: 1rem;
`;
/**
 * @type {React.Component}
 */
export const FlexInput = styled(Input)`
  /* width: 66%; */
  &:first-child {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-right: none;
  }
  &:last-child {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-left: none;
  }
`;
/**
 * @type {React.Component}
 */
export const FlexSelect = styled(Select)`
  /* width: 34%; */
  &:first-child {
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    /* border-right: none; */
  }
  &:last-child {
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    border-left: none;
  }
`;
/**
 * @type {React.Component}
 */
export const Wrapper = styled.div`
  width: 100%;
`;
