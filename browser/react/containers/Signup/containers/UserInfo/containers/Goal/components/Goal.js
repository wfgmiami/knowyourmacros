import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import StickManLiftWeight from 'components/Icon/People/StickMan-LiftWeight';
import StickManUseEliptical from 'components/Icon/People/StickMan-UseEliptical';
import StickManStretching from 'components/Icon/People/StickMan-Stretching';

const Button = styled.button`
  cursor: pointer;
  padding: 1rem;
  background-color: #fff;
  border: 1px solid ${(props) => (props.selected ? props.theme.green : '#fff')};
  display: block;
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
`;

const ActivityLevelComponent = ({ input }) => {
  return (
    <div>
      <Button onClick={() => input.onChange('Gain Muscle')} selected={input.value === 'Gain Muscle'}>
        <StickManLiftWeight height="120px" width="120px" fill="red" />
        <Text color={input.value === 'Gain Muscle' && 'green'}>Gain Muscle</Text>
      </Button>
      <Button onClick={() => input.onChange('Maintain')} selected={input.value === 'Maintain'}>
        <StickManStretching height="120px" width="120px" fill="darkgreen" />
        <Text color={input.value === 'Maintain' && 'green'}>Maintain Current Fitness</Text>
      </Button>
      <Button onClick={() => input.onChange('Lose Fat')} selected={input.value === 'Lose Fat'}>
        <StickManUseEliptical height="120px" width="120px" fill="gray" />
        <Text color={input.value === 'Lose Fat' && 'green'}>Lose Fat</Text>
      </Button>
    </div>
  );
};

ActivityLevelComponent.propTypes = {
  input: PropTypes.object
};

export default ActivityLevelComponent;
