import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'components/FormComponents';

/**
 * @param {Object} props
 * @param {string} props.foodName
 * @param {Function} props.onchange
 * @param {string} props.nameError
 */
const ItemDescription = ({ foodName, onchange, nameError }) => (
  <div>
    <Label htmlFor="mainname">Main Description:</Label>
    <Input
      id="mainname"
      value={foodName}
      onChange={onchange}
      success={!nameError.length && foodName.length > 0}
      warning={nameError.length > 0 && foodName.length > 0}
    />
    <Label htmlFor="subname">Specific Description:</Label>
    <Input
      id="subname"
      value={foodName}
      onChange={onchange}
      success={!nameError.length && foodName.length > 0}
      warning={nameError.length > 0 && foodName.length > 0}
    />
    <div className="text-warning">
      {nameError}
    </div>
  </div>
);

ItemDescription.propTypes = {
  foodName: PropTypes.string,
  onchange: PropTypes.func,
  nameError: PropTypes.oneOfType([PropTypes.string, PropTypes.boolean])
};

export default ItemDescription;
