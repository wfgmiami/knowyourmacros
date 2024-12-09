import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Text from 'components/Text';
import StickManWalk from 'components/Icon/People/StickMan-Walk';
import StickManRun from 'components/Icon/People/StickMan-Run';
import StickManUseComputer from 'components/Icon/People/StickMan-UseComputer';

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
      <Button onClick={() => input.onChange('Active')} selected={input.value === 'Active'}>
        <StickManRun height="120px" width="120px" fill="red" />
        <Text color={input.value === 'Active' && 'green'}>Active</Text>
      </Button>
      <Button onClick={() => input.onChange('Normal')} selected={input.value === 'Normal'}>
        <StickManWalk height="120px" width="120px" fill="darkgreen" />
        <Text color={input.value === 'Normal' && 'green'}>Normal</Text>
      </Button>
      <Button onClick={() => input.onChange('Sedentary')} selected={input.value === 'Sedentary'}>
        <StickManUseComputer height="120px" width="120px" fill="gray" />
        <Text color={input.value === 'Sedentary' && 'green'}>Sedentary</Text>
      </Button>
    </div>
  );
};

ActivityLevelComponent.propTypes = {
  input: PropTypes.object
};

export default ActivityLevelComponent;
