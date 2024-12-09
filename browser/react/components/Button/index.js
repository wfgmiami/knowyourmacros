import styled from 'styled-components';
import colorCSS from 'colorCSS';

/**
 * A styled `button` element
 * @type {React.Component}
 */
const Button = styled.button`
  font-size: ${(props) => ((props.small || props.sm) ? '12px' : '14px')};
  /* line-height: 1.42857143; */
  display: ${(props) => (props.block ? 'block' : 'inline-block')};
  width: ${(props) => (props.block && '100%')};
  margin-bottom: 0;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  background-color: ${(props) => (props.color ? props.theme[props.color] : '#fff')};
  color: ${(props) => (props.color ? '#fff' : '#000')};
  border: 1px solid #ccc;
  white-space: nowrap;
  border-radius: 0px;
  padding: 5px 10px;
  height: ${(props) => ((props.small || props.sm) ? '25px' : '35px')};
  :hover {
    background: #f2f2f2;
  }

  ${(props) => (props.sm
    ? `
    padding: 3px 7px;
    font-size: 14px;
    line-height: 1.5;
    `
    : null)
};

  ${(props) => (props.xs
    ? `
    padding: 1px 5px;
    font-size: 12px;
    line-height: 1.5;
    `
    : null)
};

  /* ${colorCSS} */
`;

export default Button;
