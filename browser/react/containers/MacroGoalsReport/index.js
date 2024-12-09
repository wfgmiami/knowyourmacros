import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * Calculate the total amount of a macronutrient in a meal based on the goal
 * @param {Array<{ calories: number, protein: number, carbs: number, fat: number }>} goal
 * @param {string} macro
 * @return {number}
 */
export function macrosByMeal(goal, macro) {
  if (macro === 'calories') {
    return Math.round((macrosByMeal(goal, 'protein') * 4) + (macrosByMeal(goal, 'carbs') * 4) + (macrosByMeal(goal, 'fat') * 9));
  }
  return Math.round(goal.reduce((total, gl) => total + gl[macro], 0) * 10) / 10;
}

/**
 * Display goals consistently
 * @param {Object} props
 * @param {Object} props.goals
 * @param {string} props.param
 * @param {string} props.children
 */
export const Row = ({ goals, param, children }) => (
  <tr>
    <td>{children}</td>
    <td>{ macrosByMeal(goals.train, param) }</td>
    <td>{ macrosByMeal(goals.rest, param) }</td>
  </tr>
);

Row.propTypes = {
  goals: PropTypes.object,
  param: PropTypes.string,
  children: PropTypes.node
};

/**
 * Macronutrient goals report
 * @param {Object} props
 * @param {Array} props.goals
 */
export const MacroGoalsReport = ({ goals }) => {
  if (!goals) return (<div>Not Set</div>);
  if (!goals[0]) return (<div>Not Set</div>);

  const goal = goals[0].goals;

  return (
    <table className="table table-condensed">
      <thead>
        <tr>
          <th />
          <th>Training</th>
          <th>Resting</th>
        </tr>
      </thead>
      <tbody>
        <Row goals={goal} param="calories">Calories</Row>
        <Row goals={goal} param="protein">Protein</Row>
        <Row goals={goal} param="carbs">Carbs</Row>
        <Row goals={goal} param="fat">Fat</Row>
      </tbody>
    </table>
  );
};

MacroGoalsReport.propTypes = {
  goals: PropTypes.object
};

/** Map state to props */
const mapStateToProps = ({ user }) => ({
  goals: user.mealGoals,
});

export default connect(mapStateToProps)(MacroGoalsReport);
