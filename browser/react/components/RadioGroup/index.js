import React from 'react';
import FlexWrapper from 'components/FlexWrapper';
import PropTypes from 'prop-types';
import Button from '../Button';

const Wrapper = FlexWrapper.extend`
  margin-bottom: 1rem;
`;

function RadioGroup({ options, input, ...rest }) {
  return (
    <Wrapper>
      {options.map((option) => (
        <Button
          key={option.value}
          onClick={(ev) => { ev.preventDefault(); input.onChange(option.value); }}
          color={input.value === option.value ? 'darkBlue' : null}
          {...rest}
        >
          {option.label}
        </Button>
      ))}
    </Wrapper>
  );
}

RadioGroup.propTypes = {
  options: PropTypes.array,
  input: PropTypes.object
};

export default RadioGroup;
