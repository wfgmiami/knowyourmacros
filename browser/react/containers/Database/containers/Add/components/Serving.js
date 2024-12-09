import React from 'react';
import PropTypes from 'prop-types';
import { Input, Label } from 'components/FormComponents';
import FlexWrapper from 'components/FlexWrapper';

/**
 * A serving
 * @param {Object} props
 * @param {Function} props.change
 * @param {number} props.servingSize
 * @param {number} props.servingWeight
 */
const Serving = ({ change, servingSize, servingWeight }) => (
  <div>
    <FlexWrapper align="flex-end">
      <span>
        <Label htmlFor="servingSize">Serving:</Label>
        <Input
          id="servingSize"
          type="number"
          min={0}
          max={1000}
          step={0.1}
          value={servingSize}
          onChange={(ev) => change(ev, 'servingSize')}
          placeholder="1"
          success={servingSize > 0}
          danger={servingSize <= 0}
        />
      </span>
      <Input
        type="text"
        className="form-control"
        list="servingL"
        placeholder="oz"
        id="serving"
      />
      <span>
        <Label htmlFor="servingWeight">Serving Weight <small>in grams</small>:</Label>
        <Input
          id="servingWeight"
          type="number"
          min={0}
          value={servingWeight}
          onChange={(ev) => change(ev, 'servingWeight')}
          success={servingWeight > 0 && servingWeight.length > 0}
          danger={servingWeight <= 0}
        />
      </span>
    </FlexWrapper>
    <datalist id="servingL">
      <option>g</option>
      <option>oz</option>
    </datalist>
  </div>
);

Serving.propTypes = {
  change: PropTypes.func,
  servingSize: PropTypes.number,
  servingWeight: PropTypes.number
};

export default Serving;
