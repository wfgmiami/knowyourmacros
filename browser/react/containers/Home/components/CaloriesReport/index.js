import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import calculateDayMacros from 'containers/FoodRecord/utils/calculateDayMacros';

const CalorieReport = styled.span`
  padding: 1px 3px;
  border: 1px solid gray;
  border-radius: 4px;
`;

const Burned = CalorieReport.extend`
  background-color: rgba(0, 0, 255, 0.1);
`;

const Consumed = CalorieReport.extend`
  background-color: rgba(255, 0, 0, 0.1);
`;

const Balance = CalorieReport.extend`
  background-color: rgba(0, 255, 0, 0.1);
`;

const Calories = ({ user, foodrecord, date, calories }) => {
  const consumed = calculateDayMacros(foodrecord).raw.calories;
  const YMD = date.format('Y-MM-DD');
  if (!calories) {
    return null;
  }

  return (
    <div>
      {user.fitbitToken &&
        <span>
          <Burned>Calories burned: {calories[YMD]}</Burned>
          &nbsp;
          <Consumed>Calories consumed: {consumed}</Consumed>
          &nbsp;
          <Balance>Balance: {!isNaN(calories[YMD] - consumed) ? calories[YMD] - consumed : 0}</Balance>
        </span>
      }
    </div>
  );
};

Calories.propTypes = {
  user: PropTypes.object,
  foodrecord: PropTypes.array,
  date: PropTypes.object,
  calories: PropTypes.object
};

const mapStateToProps = ({ foodrecord, user, root }) => ({
  foodrecord: foodrecord.record,
  calories: foodrecord.calories,
  user,
  date: root.date
});

export default connect(mapStateToProps)(Calories);
