import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { calculateFood } from 'containers/MealPlanner/actions';
import Form from './components/GoalForm';

/** The goal form */
class GoalForm extends React.PureComponent {
  handleCalulation = (formData) => {
    this.props.calculateFood({
      id: this.props.retainedFoods.map((food) => food.id),
      proteinGoal: formData.proteinGoal,
      carbGoal: formData.carbGoal,
      fatGoal: formData.fatGoal
    });
  };

  render() {
    return (
      <div style={{ display: 'inline' }}>
        <Form onSubmit={this.handleCalulation} />
      </div>
    );
  }
}

GoalForm.propTypes = {
  calculateFood: PropTypes.func,
  retainedFoods: PropTypes.array
};

const mapStateToProps = ({ mealplanner }) => ({
  retainedFoods: mealplanner.retainedFoods,
});

const mapDispatchToProps = (dispatch) => ({
  calculateFood: (params) => dispatch(calculateFood(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(GoalForm);
