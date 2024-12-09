import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'components/FormComponents';
/**
 * @return {React.Component}
 */
const OptionGroup = ({ options, ...rest }) => (
  <Select {...rest}>
    {options.map((option) => (
      <option key={option}>{option}</option>
    ))}
  </Select>
);

OptionGroup.propTypes = {
  options: PropTypes.array
};

export default OptionGroup;
