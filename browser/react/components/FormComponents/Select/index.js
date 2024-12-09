/**
* SelectFieldBox
*/
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import formComponent, { compStyle } from '../formComponent';

export const Select = styled.select`
  ${compStyle}
`;

function SelectFieldBox({ innerRef, options, meta, input, children, noBlankOption, ...field }) {
  return (
    <Select
      {...field}
      {...input}
      noMeta={meta.notHere}
      ref={innerRef}
    >
      {!noBlankOption && <option value="" />}
      {children}
      {options && options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </Select>
  );
}

SelectFieldBox.propTypes = {
  rest: PropTypes.object,
  onChange: PropTypes.func,
  noBlankOption: PropTypes.bool,
  innerRef: PropTypes.func,
  meta: PropTypes.object,
  input: PropTypes.object,
  options: PropTypes.array,
  children: PropTypes.node
};

SelectFieldBox.defaultProps = {
  input: {
    notHere: true
  },
  meta: {
    notHere: true
  }
};

export default formComponent(SelectFieldBox);
