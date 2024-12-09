import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';

import FlexWrapper from 'components/FlexWrapper';
import Button from 'components/Button';
import Well from 'components/Well';
import { Select, Label } from 'components/FormComponents';
import OptionGroup from 'components/OptionGroup';
import { saveGoals } from '../actions';
import GoalsReport from '../components/GoalsReport';
import { getGoals } from '../utils';

const InlineWrapper = FlexWrapper.extend`
  justify-content: flex-start;
`;

/** Set goals */
export class SetGoals extends React.Component {
  /** Validate prop types */
  static propTypes = {
    saveGoals: PropTypes.func,
  };

  state = {
    goals: {
      pGoal: 150,
      cGoal: 150,
      fGoal: 72
    },
    numMeals: 4,
    schedule: [1, 1, 'Workout', 1, 1],
    workoutId: 2,
    beforeAfter: 'after',
    maintenanceCal: 0,
    goal: 'Lose Fat',
    trainingGoals: null,
    restingGoals: null,
    bmrCals: 0
  };

  /** Save goals */
  onSaveGoals = () => {
    this.props.saveGoals(this.state);
    browserHistory.push('/shopping-list');
  }

  /**
   * Set goals
   * @param {Object} props
   * @param {number} props.maintenanceCal
   * @param {string} props.goal
   * @param {number} props.weight
   * @param {string} props.units
   */
  setGoals = ({ maintenanceCal, goal, weight, units }) => {
    let pGoal;
    let cal;
    const wght = units === 'metric' ? weight * 2.2 : weight;
    if (goal === 'Build Muscle') {
      pGoal = wght * 1.2;
      cal = maintenanceCal + 300;
    } else if (goal === 'Maintain') {
      pGoal = wght * 1;
      cal = maintenanceCal;
    } else {
      pGoal = wght * 0.8;
      cal = maintenanceCal - 500;
    }
    const fGoal = Math.round(((cal * 0.32) * 10) / 9) / 10;

    const cGoal = Math.round(((cal - (fGoal * 9) - (pGoal * 4)) * 10) / 4) / 10;
    this.setState({
      maintenanceCal: cal,
      goals: {
        pGoal,
        cGoal,
        fGoal
      }
    });
    return { cal, pGoal, cGoal, fGoal };
  }

  /**
   * Update the user's schedule
   * @param {number} mealId
   */
  changeSchedule = (mealId) => {
    if (this.state.schedule.indexOf(mealId) > -1) {
      this.setState({ schedule: this.state.schedule.filter((item) => item !== mealId) });
    } else {
      let schedule = this.state.schedule.slice();
      schedule.push(mealId);
      schedule = schedule.sort();
      this.setState({ schedule });
    }
  }

  /**
   * Change the number of meals
   * @param {React.SyntheticEvent} ev
   */
  changeNumberMeals = (ev) => {
    this.setState({ numMeals: ev.target.value }, () => this.changeWorkoutId({
      target: {
        value: this.state.workoutId
      }
    }));
  }

  /**
   * Change whether the workout comes before or after the specified meal
   * @param {React.SyntheticEvent} ev
   */
  changeBeforeAfter = (ev) => {
    this.setState({ beforeAfter: ev.target.value });
  }

  /**
   * Change the index of the workout in the schedule
   * @param {React.SyntheticEvent} ev
   */
  changeWorkoutId = (ev) => {
    const schedule = [];
    for (let i = 0; i < this.state.numMeals; i++) {
      schedule[i] = 1;
    }
    if (this.state.beforeAfter === 'before') {
      schedule.splice(ev.target.value * 1, 0, 'Workout');
    } else {
      schedule.splice((ev.target.value * 1) + 1, 0, 'Workout');
    }
    this.setState({ schedule });
  }

  /**
   * Change the goal
   * @param {React.SyntheticEvent} ev
   */
  changeGoal = (ev) => {
    this.setState({ goal: ev.target.value });
  }

  /**
   * Calculate goals
   * @param {number} maintenanceCal
   * @param {Array<number|string>} schedule
   * @param {string} goal
   */
  calculateGoals = (maintenanceCal, schedule, goal) => {
    const mCal = maintenanceCal;

    const pGoal = Math.round((mCal * 3) / 4) / 10;
    const cGoal = Math.round((mCal * 4) / 4) / 10;
    const fGoal = Math.round((mCal * 3) / 9) / 10;

    const goals = { pGoal, cGoal, fGoal };

    this.setState({
      trainingGoals: getGoals(schedule, goals, true, goal, cGoal, pGoal),
      restingGoals: getGoals(schedule.filter((item) => item !== 'Workout'), goals, false, goal, cGoal, pGoal)
    });
  }

  /** Display */
  render() {
    const mealNames = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
    const meals = [];
    for (let i = 0; i < this.state.numMeals; i++) {
      meals.push(mealNames[i]);
    }
    return (
      <div>
        <Well>
          <Label>I want to:</Label>
          <OptionGroup
            value={this.state.goal}
            onChange={this.changeGoal}
            options={['Lose Fat', 'Gain Muscle', 'Maintain']}
          />
        </Well>
        <Well shadowColor="lightOpacityBlue">
          <Select label="Meals per day" inline small value={this.state.numMeals} onChange={this.changeNumberMeals}>
            <option value={3}>three</option>
            <option value={4}>four</option>
            <option value={5}>five</option>
            <option value={6}>six</option>
          </Select>
        </Well>
        <div>
          <InlineWrapper align="center">
            <Label>I workout</Label>
            &nbsp;
            <OptionGroup
              inline
              small
              value={this.state.beforeAfter}
              onChange={this.changeBeforeAfter}
              noMargin
              options={['before', 'after']}
            />
            &nbsp;
            <Label>my</Label>
            &nbsp;
            <Select inline small noMargin defaultValue={1} onChange={this.changeWorkoutId}>
              {meals.map((meal, ix) => <option key={meal} value={ix}>{meal}</option>)}
            </Select>
            &nbsp;
            <Label>meal</Label>
          </InlineWrapper>
        </div>
        <Button
          color="darkBlue"
          onClick={() => this.calculateGoals(this.state.maintenanceCal, this.state.schedule, this.state.goal)}
        >
          Determine Goals
        </Button>
        <GoalsReport goals={this.state.trainingGoals} title="Training Goals" />
        <GoalsReport goals={this.state.restingGoals} title="Resting Goals" />
        {this.state.trainingGoals && this.state.restingGoals && <Button color="darkBlue" onClick={this.onSaveGoals}>Save Meal Goals</Button>}
      </div>
    );
  }
}

/** Map state to props */
const mapStateToProps = ({ root }) => ({
  bmrCalories: root.bmrCalories
});

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  saveGoals: (st) => dispatch(saveGoals(st))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetGoals);
