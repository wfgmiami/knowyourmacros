import React from 'react';
import PropTypes from 'prop-types';

import { HiddenInput, CheckBox, Label } from './styled';
/**
 * @return {React.Component}
 */
const Radio = ({ children, checked, ...rest }) => (
  <Label checked={checked}>
    <CheckBox checked={checked} />
    <HiddenInput {...rest} type="radio" />
    {children}
  </Label>
);

Radio.propTypes = {
  children: PropTypes.node,
  checked: PropTypes.bool
};

export default Radio;
