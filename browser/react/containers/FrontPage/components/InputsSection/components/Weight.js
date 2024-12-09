import React from 'react';
import { Input } from 'components/FormComponents';
import OptionGroup from 'components/OptionGroup';
import PropTypes from 'prop-types';
import { InlineH3 } from '../styled';

/**
 * Front page weight input section
 * @param {Object} props
 * @param {string} props.weight
 * @param {string} props.units
 * @param {Function} props.onChangeWeight
 * @param {Function} props.onChangeUnits
 */
const Weight = ({ weight, units, onChangeWeight, onChangeUnits }) => (
  <div>
    <InlineH3>
      My weight is
    </InlineH3>
    {' '}
    <Input
      type="number"
      min="0"
      max="500"
      inline
      value={weight}
      onChange={onChangeWeight}
    />
    <OptionGroup
      inline
      value={units}
      onChange={onChangeUnits}
      options={['lbs', 'kg']}
    />
  </div>
);

Weight.propTypes = {
  onChangeWeight: PropTypes.func,
  onChangeUnits: PropTypes.func,
  weight: PropTypes.string,
  units: PropTypes.string
};

export default Weight;
