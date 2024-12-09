import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Button from 'components/Button';
import { Select, InputGroup } from 'components/FormComponents';
import AddDay from '../../AddDay';

const RefreshIcon = styled(FontAwesome).attrs({ name: 'refresh' })`
  color: ${(props) => props.theme.darkBlue};
`;

const RemoveIcon = styled(FontAwesome).attrs({ name: 'trash' })`
  color: ${(props) => props.theme.darkRed};
`;

const Control = ({ recalculateDay, removeDay, day, date, confirmAddDay, type, onChangeType, index, uuid }) => (
  <InputGroup>
    <Select value={type} onChange={onChangeType} noBlankOption>
      <option value="rest">Rest</option>
      <option value="train">Train</option>
    </Select>
    <AddDay
      meals={day}
      day={date}
      clickAddDay={confirmAddDay}
    />
    <Button
      default
      onClick={() => recalculateDay(index, type, uuid)}
      title="Refresh Day"
    >
      <RefreshIcon />
    </Button>
    <Button
      default
      onClick={() => removeDay(index)}
      title="Remove Day"
    >
      <RemoveIcon />
    </Button>
  </InputGroup>
);

Control.propTypes = {
  recalculateDay: PropTypes.func,
  removeDay: PropTypes.func,
  confirmAddDay: PropTypes.func,
  onChangeType: PropTypes.func,
  index: PropTypes.number,
  day: PropTypes.object,
  date: PropTypes.string,
  type: PropTypes.string
};

export default Control;
