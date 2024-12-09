import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Panel from 'components/Panel';
import Container from 'components/Container';
import Button from 'components/Button';
import FlexWrapper from 'components/FlexWrapper';
import { Input } from 'components/FormComponents';
import { retainFood } from 'containers/MealPlanner/actions';
import { getMeals } from './actions';

/** Public meals */
export class PublicMeals extends React.Component {
  /** Validate prop types */
  static propTypes = {
    getMeals: PropTypes.func,
    retainFood: PropTypes.func,
    meals: PropTypes.array
  };

  constructor(props) {
    super();
    props.getMeals(this.state);
  }

  /** Component state */
  state = {
    keyword: '',
    meals: [],
    postWorkout: false
  };

  /**
   * Update keyword
   * @param {React.SyntheticEvent} ev
   */
  onUpdateKeyWord = (ev) => {
    this.setState({ keyword: ev.target.value });
  }

  /**
   * Update the meal to display
   * @param {number} mealId
   */
  onUpdateMeal = (mealId) => {
    if (this.state.meals.indexOf(mealId) > -1) {
      this.setState({
        meals: this
          .state
          .meals
          .filter((meal) => meal !== mealId)
      });
    } else {
      const meals = this
        .state
        .meals
        .slice();
      meals.push(mealId);
      this.setState({ meals });
    }
  }

  /**
   * Search meals
   * @param {React.SyntheticEvent} ev
   */
  searchPublicMeals = (ev) => {
    ev.preventDefault();
    this
      .props
      .getMeals(this.state);
  }

  /** Display only meals marked as post-workout */
  changePostWorkout = () => {
    this.setState({
      postWorkout: !this.state.postWorkout
    });
  }

  /**
   * Add a meal to the calculator
   * @param {number} ix
   */
  useThisMeal = (ix) => {
    const meal = this.props.meals[ix];
    meal
      .foodRecords
      .forEach((record) => {
        this.props.retainFood(record.abbrev);
      });
  }

  /** Display */
  render() {
    const mealNames = [
      'Breakfast',
      'Morning Snack',
      'Lunch',
      'Afternoon Snack',
      'Dinner',
      'Evening Snack'
    ];
    return (
      <Container>
        <div className="text-center">
          <h3>Public Meals</h3>
          <h4>Meals recently published by other members</h4>
        </div>
        <form onSubmit={this.searchPublicMeals}>
          <div className="form-group">
            <Input
              type="text"
              placeholder="Meals With Foods Containing This Phrase"
              value={this.state.keyword}
              onChange={this.onUpdateKeyWord}
            />
          </div>
          <FlexWrapper>
            {mealNames.map((meal, ix) => (
              <div className="col-md-2 text-center" key={ix}>
                <label htmlFor="meal">
                  <Input
                    id="meal"
                    type="checkbox"
                    className="btn btn-default"
                    selected={this.state.meals.indexOf(ix + 1) > -1}
                    onChange={() => this.onUpdateMeal(ix + 1)}
                  />
                  <br /> {mealNames[ix]}
                </label>
              </div>
            ))}
          </FlexWrapper>
          <div className="form-group">
            <Button color="darkBlue">Filter</Button>
          </div>
          <label htmlFor="postWorkout">
            <Input
              id="postWorkout"
              type="checkbox"
              selected={this.state.postWorkout}
              onChange={this.changePostWorkout}
            />
            Post Workout
          </label>
        </form>
        <FlexWrapper wrap align="stretch">
          {this.props.meals.map((meal, ix) => (
            <div
              key={meal.id}
              className="col-md-4"
              style={{
                width: '32%',
                overflowY: 'hidden'
              }}
            >
              <Panel info title={mealNames[meal.meal - 1]}>
                <Button xs onClick={() => this.useThisMeal(ix)}>
                  Like
                </Button>
                {meal
                  .foodRecords
                  .map((record) => (
                    <h5 key={record.id}>
                      {record.abbrev.longname}
                    </h5>
                  ))}
              </Panel>
            </div>
          ))}
        </FlexWrapper>
      </Container>
    );
  }
}

/** Map state to props */
const mapStateToProps = ({ meals }) => ({ meals: meals.meals });

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  getMeals: (filter) => dispatch(getMeals(filter)),
  retainFood: (food) => dispatch(retainFood(food))
});

export default connect(mapStateToProps, mapDispatchToProps)(PublicMeals);
