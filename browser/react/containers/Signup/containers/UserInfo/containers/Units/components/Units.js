import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import FlexWrapper from 'components/FlexWrapper';
import EU from 'components/Icon/Flags/EU';
import US from 'components/Icon/Flags/US';

const Button = styled.button`
  cursor: pointer;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid ${(props) => (props.selected ? props.theme.green : '#fff')};
  width: 45%;
  text-align: center;
  margin-bottom: 1rem;
`;

const ActivityLevelComponent = ({ input }) => {
  return (
    <FlexWrapper>
      <Button onClick={() => input.onChange('metric')} selected={input.value === 'metric'}>
        <EU height="60px" width="90px" fill="red" />
        <Text color={input.value === 'metric' && 'green'}>Metric</Text>
      </Button>
      <Button onClick={() => input.onChange('imperial')} selected={input.value === 'imperial'}>
        <US height="60px" width="90px" fill="darkgreen" />
        <Text color={input.value === 'imperial' && 'green'}>US Customary</Text>
      </Button>
    </FlexWrapper>
  );
};

ActivityLevelComponent.propTypes = {
  input: PropTypes.object
};

export default ActivityLevelComponent;
