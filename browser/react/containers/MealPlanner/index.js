import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'components/Container';
import Well from 'components/Well';

import debounce from 'utils/debounce';

import { removeFood, addToSearchList } from './actions';
import ReportTable from './components/ReportTable';
import FoodsList from './components/FoodsList';
import RetainedFoodsList from './components/RetainedFoodsList';
import GoalForm from './containers/GoalForm';
import SearchForm from './containers/SearchForm';

/** The meal planner */
export class MealPlanner extends React.Component {
  static propTypes = {
    addToSearchList: PropTypes.func,
    removeFood: PropTypes.func,
    retainedFoods: PropTypes.array,
  };

  state = {
    err: null
  };

  /**
   * Remove a food
   * @param {abbrevType} food
   */
  removeFood = (food) => {
    this.props.removeFood(food);
    this.props.addToSearchList(food);
  }

  render() {
    const { retainedFoods } = this.props;
    return (
      <Container title="Meal Planner" subtitle="Reach your goals to within a gram">
        {retainedFoods.length < 3 && <small>Pick at least three foods</small>}
        <ReportTable error={this.state.err} />
        {retainedFoods.length >= 3 && (
          <GoalForm />
        )}
        <RetainedFoodsList removeFood={this.removeFood} />
        <Well>
          <SearchForm />
        </Well>
        <FoodsList />
      </Container>
    );
  }
}

const mapStateToProps = ({ mealplanner, root }) => ({
  lastSearch: mealplanner.lastSearch,
  retainedFoods: mealplanner.retainedFoods,
  date: root.date
});

const mapDispatchToProps = (dispatch) => ({
  addToSearchList: (food) => dispatch(addToSearchList(food)),
  removeFood: (id) => dispatch(removeFood(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MealPlanner);
