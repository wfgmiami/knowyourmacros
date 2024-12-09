import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select } from 'components/FormComponents';
import Button from 'components/Button';
import FlexWrapper from 'components/FlexWrapper';
import { handleAddMeal } from '../actions';

/** Add to meals */
export class AddToMeals extends React.Component {
  state = {
    mealId: 1
  };

  onChangeMealId = (ev) => {
    this.setState({ mealId: ev.target.value });
  }

  onSaveMeal = () => {
    this.props.handleAddMeal(this.props.meal, this.state.mealId, this.props.day);
  }

  render() {
    return (
      <FlexWrapper align="stretch">
        <Select className="pull-right" label="Meal" onChange={this.onChangeMealId}>
          <option value={1}>Breakfast</option>
          <option value={2}>Morning Snack</option>
          <option value={3}>Lunch</option>
          <option value={4}>Afternoon Snack</option>
          <option value={5}>Dinner</option>
          <option value={6}>Evening Snack</option>
        </Select>
        <Button success className="pull-right" onClick={this.onSaveMeal}>
          Add To Daily Meals
        </Button>
      </FlexWrapper>
    );
  }
}

AddToMeals.propTypes = {
  handleAddMeal: PropTypes.func,
  meal: PropTypes.array,
  day: PropTypes.object
};

const mapStateToProps = ({ root }) => ({ day: root.date });

const mapDispatchToProps = (dispatch) => ({
  handleAddMeal: (meal, mealId, day) => dispatch(handleAddMeal(meal, mealId, day))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToMeals);
