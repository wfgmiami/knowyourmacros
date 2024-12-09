/**
* TextFieldBox
*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import formComponent, { compStyle } from '../formComponent';

export const Input = styled.input`
  ${compStyle}
`;

export class TextFieldBox extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { innerRef, input, ...field } = this.props;
    return (
      <Input
        {...input}
        ref={innerRef}
        type={field.type || 'text'}
        {...field}
      />
    );
  }
}

TextFieldBox.defaultProps = {
  input: {},
};

TextFieldBox.propTypes = {
  innerRef: PropTypes.func,
  input: PropTypes.object
};

export default formComponent(TextFieldBox);
