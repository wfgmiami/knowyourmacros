import React from 'react';
import { Input } from 'components/FormComponents';
import PropTypes from 'prop-types';
import { InlineH3 } from '../styled';

const Height = ({ height, units, onChangeHeight }) => (
  <div>
    <InlineH3>
      My height is
    </InlineH3>
    {' '}
    <Input
      type="text"
      style={{ maxWidth: '80px' }}
      min="0"
      inline
      placeholder="#'# or #"
      value={height}
      onChange={onChangeHeight}
    />
    {' '}
    <InlineH3>
      {units}
    </InlineH3>
  </div>
);

Height.propTypes = {
  onChangeHeight: PropTypes.func,
  height: PropTypes.string,
  units: PropTypes.string
};

export default Height;
