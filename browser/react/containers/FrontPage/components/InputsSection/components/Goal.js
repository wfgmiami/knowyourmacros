import React from 'react';
import OptionGroup from 'components/OptionGroup';
import PropTypes from 'prop-types';
import { InlineH3 } from '../styled';

const Goal = ({ goal, onChange }) => (
  <div>
    <InlineH3>
      I want to
    </InlineH3>
    {' '}
    <OptionGroup
      style={{ width: '215px', display: 'inline' }}
      value={goal}
      onChange={onChange}
      options={['lose 4 pounds in 1 month', 'lose 8 pounds in 1 month']}
    />
  </div>
);

Goal.propTypes = {
  onChange: PropTypes.func,
  goal: PropTypes.string
};

export default Goal;
