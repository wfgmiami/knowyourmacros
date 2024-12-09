import styled from 'styled-components';
/**
 * A styled `input` element
 * @type {React.Component}
 */
export const HiddenInput = styled.input`
  opacity: 0;
  height: 0px;
  width: 0px;
  display: inline;
  margin: 0px !important;
  padding: 0px !important;
`;
/**
 * A styled `span` element
 * @type {React.Component}
 */
export const CheckBox = styled.span`
  display: block;
  position: absolute;
  top: -6px;
  left: -6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: green;
  opacity: ${(props) => (props.checked ? '1' : '0')};
  transition: opacity 0.3s ease;
`;
/**
 * A styled `label` element
 * @type {React.Component}
 */
export const Label = styled.label`
  position: relative;
  border: 1px solid ${(props) => (props.checked ? 'green' : '#dedede')};
  transition: border 0.3s ease;
  cursor: pointer;
  border-radius: 4px;
  padding: 5px 10px;
  margin-bottom: 10px;
  display: block;
  background: #fff;
`;
