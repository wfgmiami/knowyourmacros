import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Scale from 'components/Icon/Misc/Scale';
import { Input } from 'components/FormComponents';
import FlexWrapper from 'components/FlexWrapper';

const Wrapper = styled.div`
  padding-left: 5px;
  width: 100%;
`;

const WeightComponent = ({ input, meta, units, ...rest }) => {
  return (
    <FlexWrapper>
      <Scale height="60px" width="60px" />
      <Wrapper>
        <Input
          input={input}
          meta={meta}
          label={units === 'imperial' ? 'pounds' : 'kilograms'}
          width="100%"
          {...rest}
        />
      </Wrapper>
    </FlexWrapper>
  );
};

WeightComponent.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  units: PropTypes.string
};

export default WeightComponent;
