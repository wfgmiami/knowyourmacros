import styled from 'styled-components';

export { default as Label } from './Label';
export { default as Input } from './Input';
export { default as Select } from './Select';
export { default as Dropdown } from './Dropdown';

/**
 * A styled `div` element.
 * Children should be displayed as blocks.
 * @type {React.Component}
 */
export const InputGroup = styled.div`
  display : flex;
  flex-wrap : no-wrap;
  justify-content : space-between;
  >div {
    width: 100%;
  }
  &>*:not(:first-child) {
    border-left: none;
  }
  `;
