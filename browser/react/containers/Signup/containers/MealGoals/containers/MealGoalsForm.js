import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';

import FlexWrapper from 'components/FlexWrapper';
import Button from 'components/Button';
import Well from 'components/Well';
import { Select, Label } from 'components/FormComponents';
import OptionGroup from 'components/OptionGroup';
import { lifeStyle as convertLifestyle } from 'utils/lifestyleConversion';
import { getGoals } from 'containers/SetGoals/utils';
import Goal from './components/Goal';

const InlineWrapper = FlexWrapper.extend`
  justify-content: flex-start;
`;

export class SetGoals extends React.Component {
  state = {
    schedule: [1, 1, 'Workout', 1, 1],
  };

  componentDidMount = () => {
    const { bmr, lifestyle } = this.props;
    const mCal = bmr * convertLifestyle(lifestyle);

    const pGoal = Math.round((mCal * 3) / 4) / 10;
    const cGoal = Math.round((mCal * 4) / 4) / 10;
    const fGoal = Math.round((mCal * 3) / 9) / 10;

    this.goals = { pGoal, cGoal, fGoal };
    if (this.props.formValues) {
      this.calculateGoals();
    }
  }

  /**
   * Change the index of the workout in the schedule
   * @param {String} workoutId
   * @return {Array<number>}
   */
  makeSchedule = (workoutId) => {
    const schedule = [];
    for (let i = 0; i < this.props.formValues.numMeals; i++) {
      schedule[i] = 1;
    }
    if (this.props.formValues.beforeAfter === 'before') {
      schedule.splice(workoutId * 1, 0, 'Workout');
    } else {
      schedule.splice((workoutId * 1) + 1, 0, 'Workout');
    }
    return schedule;
  }

  /** Calculate goals */
  calculateGoals = (ev) => {
    if (ev && ev.preventDefault) ev.preventDefault();
    const { goal } = this.props;
    const schedule = this.makeSchedule(this.props.formValues.workoutId);

    const { cGoal, pGoal } = this.goals; // Calculated on mount

    this.setState({
      trainingGoals: getGoals(schedule, this.goals, true, goal, cGoal, pGoal),
      restingGoals: getGoals(schedule.filter((item) => item !== 'Workout'), this.goals, false, goal, cGoal, pGoal)
    });
  }

  mealNames = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
  goals = {};

  render() {
    const { handleSubmit, onSubmit, formValues } = this.props;
    const { trainingGoals, restingGoals } = this.state;
    const meals = [];
    if (formValues) {
      for (let i = 0; i < parseInt(formValues.numMeals, 10); i++) {
        meals.push(this.mealNames[i]);
      }
    }
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Well>
          <Field component={Select} label="Meals per day" name="numMeals" inline small>
            <option value={3}>three</option>
            <option value={4}>four</option>
            <option value={5}>five</option>
            <option value={6}>six</option>
          </Field>
          <div>
            <InlineWrapper align="center">
              <Label>I workout</Label>
              &nbsp;
              <Field component={OptionGroup} inline small name="beforeAfter" noMargin options={['before', 'after']} />
              &nbsp;
              <Label>my</Label>
              &nbsp;
              <Field component={Select} name="workoutId" inline small noMargin defaultValue={1}>
                {meals.map((meal, ix) => <option key={meal} value={ix}>{meal}</option>)}
              </Field>
              &nbsp;
              <Label>meal</Label>
            </InlineWrapper>
          </div>
        </Well>
        <Button
          color={!(trainingGoals && restingGoals) && 'darkBlue'}
          onClick={this.calculateGoals}
        >
          Determine Goals
        </Button>
        <Field component={Goal} goals={trainingGoals} name="trainingGoals" title="Training Goals" />
        <Field component={Goal} goals={restingGoals} name="restingGoals" title="Resting Goals" />
        {trainingGoals && restingGoals && (
          <Button color="darkBlue">Save and Continue</Button>
        )}
      </form>
    );
  }
}

SetGoals.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  formValues: PropTypes.object,
  lifestyle: PropTypes.string,
  goal: PropTypes.string,
  bmr: PropTypes.number
};

SetGoals.defaultProps = {
  formValues: { numMeals: '4', beforeAfter: 'after', workoutId: 2 }
};

export const FORM_NAME = 'meal-goals';

export default reduxForm({
  form: FORM_NAME
})(SetGoals);
