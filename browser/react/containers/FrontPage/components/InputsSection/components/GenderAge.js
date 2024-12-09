import React from 'react';
import { Input } from 'components/FormComponents';
import OptionGroup from 'components/OptionGroup';
import PropTypes from 'prop-types';
import { InlineH3 } from '../styled';

const GenderAge = ({ gender, age, onChangeGender, onChangeAge }) => (
  <div>
    <InlineH3>
      I am
    </InlineH3>
    {' '}
    <OptionGroup
      inline
      value={gender}
      onChange={onChangeGender}
      options={['Male', 'Female']}
    />
    {' '}
    <InlineH3>
      age
    </InlineH3>
    {' '}
    <Input
      type="number"
      min="0"
      max="150"
      inline
      placeholder="age"
      value={age}
      onChange={onChangeAge}
    />
  </div>
);

GenderAge.propTypes = {
  onChangeGender: PropTypes.func,
  onChangeAge: PropTypes.func,
  gender: PropTypes.string,
  age: PropTypes.string
};

export default GenderAge;
