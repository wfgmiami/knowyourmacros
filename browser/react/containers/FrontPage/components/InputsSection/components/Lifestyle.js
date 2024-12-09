import React from 'react';
import OptionGroup from 'components/OptionGroup';
import PropTypes from 'prop-types';
import { InlineH3 } from '../styled';

const Lifestyle = ({ lifestyle, onChangeLifestyle }) => (
  <div>
    <InlineH3>
      My lifestyle is
    </InlineH3>
    {' '}
    <OptionGroup
      inline
      value={lifestyle}
      onChange={onChangeLifestyle}
      options={['Normal', 'Active', 'Sedentary']}
    />
  </div>
);

Lifestyle.propTypes = {
  onChangeLifestyle: PropTypes.func,
  lifestyle: PropTypes.string
};

export default Lifestyle;
