import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';
import ListGroup from 'components/ListGroup';
import Well from 'components/Well';
import Badge from 'components/Badge';

const Remove = styled(FontAwesome)`
  color: red;
  cursor: pointer;
  &:hover {
    color: darkred;
  }
`;

/**
 * The list of foods retained for the calculation
 * @param {Object} props
 * @param {Array<abbrevType>} props.retainedFoods
 * @param {function} props.removeFood
 */
export const RetainedFoodsList = ({ retainedFoods, removeFood }) => {
  if (!retainedFoods.length) {
    return null;
  }

  return (
    <Well>
      <ListGroup>
        {retainedFoods.map((fd) => (<div key={fd.id} className="list-group-item list-group-item-info">
          <Remove name="remove" onClick={() => removeFood(fd)} />
          {' '}
          {fd.longname}
          <Badge>{fd.maxMacro}</Badge>
        </div>))}
      </ListGroup>
    </Well>
  );
};

RetainedFoodsList.propTypes = {
  retainedFoods: PropTypes.array,
  removeFood: PropTypes.func
};

/** Map state to props */
const mapStateToProps = ({ mealplanner }) => ({ retainedFoods: mealplanner.retainedFoods });

export default connect(mapStateToProps)(RetainedFoodsList);
