import React from 'react';
import PropTypes from 'prop-types';

/**
 * Meal calories report
 * @param {Object} props
 * @param {Array<number>} props.mealCalories
 */
const MealCaloriesReport = ({ mealCalories }) => (
  <div className="row" id="mealCals">
    {
      mealCalories.map((cal, ix) => (
        <div key={`${cal}_${ix}`} className="col-xs-2 text-center">
          Meal {ix + 1}
          <div>{ cal }</div>
        </div>)
      )
    }
  </div>
);

MealCaloriesReport.propTypes = {
  mealCalories: PropTypes.array
};

export default MealCaloriesReport;
