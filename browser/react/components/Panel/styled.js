import styled from 'styled-components';
import { fixed } from 'colorCSS';
/** @type {string} */
const borderRadius = '0px';
/**
 * A styled `div` element
 * @type {React.Component}
 */
export const Wrapper = styled.div`
  margin-bottom: 1rem;
  background-color: #fff;
  border-color: #ddd;
  border: 0px solid transparent;
  border-radius: ${borderRadius};
  ${(props) => (props.flex ? `flex: ${props.flex}` : null)}
`;
/**
 * A styled `div` element
 * @type {React.Component}
 */
export const Heading = styled.div`
  border: 1px solid;
  background: #f5f5f5;
  border-color: #ddd;
  color: #333;
  ${fixed}
  padding: 6px 9px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: ${borderRadius};
  border-top-right-radius: ${borderRadius};
  &:last-child {
    border-bottom-left-radius: ${borderRadius};
    border-bottom-right-radius: ${borderRadius};
  }
  & > * {
    border-top-left-radius: ${borderRadius};
    border-top-right-radius: ${borderRadius};
    margin-top: 0;
    margin-bottom: 0;
    padding: 0px;
    font-size: 16px;
    font-weight: bold;
    color: inherit;
  }
`;
/**
 * A styled `div` element
 * @type {React.Component}
 */
export const Body = styled.div`
  border: 1px solid;
  border-color: #ddd;
  ${fixed}
  border-top: 0px solid transparent;
  background-color: #fff;
  color: #000;
  padding: 15px;
  &:last-child {
    border-bottom-left-radius: ${borderRadius};
    border-bottom-right-radius: ${borderRadius};
  }
`;
/**
 * A styled `div` element
 * @type {React.Component}
 */
export const Footer = styled.div`
  ${fixed}
  &:last-child {
    border-bottom-left-radius: ${borderRadius};
    border-bottom-right-radius: ${borderRadius};
  }
`;
