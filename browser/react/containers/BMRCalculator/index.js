import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import bmrCalculation from 'utils/bmrCalculation';
import { saveMeasurements, bmrCalories } from './actions';
import MeasurementsForm from './components/MeasurementsForm';
import ModifyMaintenanceCals from './components/ModifyMaintenanceCals';
import { lifeStyle, invertLifeStyle } from './utils';

export class BMRCalculator extends React.Component {
  /** If there's a user with measurements, update state accordingly */
  componentDidMount() {
    // if (this.props.user && this.props.user.userMeasurements && this.props.user.userMeasurements[0]) {
    //   this.makeUserState();
    // }
  }

  /**
   * If the component receives a user, update state
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    // if (nextProps.user && nextProps.user.userMeasurements && nextProps.user.userMeasurements[0]) {
    //   this.makeUserState(nextProps.user);
    // }
  }

  /**
   * Handle saving the user's measurements
   * @param {React.SyntheticEvent} ev Synthetic click event
   */
  onSaveMeasurements = (ev) => {
    if (ev) ev.preventDefault();
    const lifestyle = invertLifeStyle(this.state);
    const toSend = Object.assign(this.state, { lifestyle });
    delete toSend.id;
    this.props.saveMeasurements(toSend, this.props.user);
  }

  /**
   * Change the state lifestyle value, then recalculate the recommendation
   * @param {React.SyntheticEvent} ev Synthetic change event
   */
  updateLifestyle = (ev) => {
    this.setState({ lifestyle: ev.target.value }, this.calculateRecommendation);
  }

  /**
   * Change the state BMR value, then recalculate the recommendation
   * @param {React.SyntheticEvent} ev Synthetic change event
   */
  updateBMR = (ev) => {
    this.setState({ BMR: ev.target.value }, this.calculateRecommendation);
  }

  /**
   * Calculate the recommendations based on the state values
   */
  calculateRecommendation = () => {
    const calories = Math.round(this.state.BMR * this.state.lifestyle);
    const protein = Math.round((calories * 0.3) / 4);
    const carbs = Math.round((calories * 0.4) / 4);
    const fat = Math.round((calories * 0.3) / 9);
    this.setState({ recommendation: {
      calories,
      protein,
      carbs,
      fat
    } });
    this.props.bmrCalories(calories);
  }

  /**
   * Transfer the user from props to state, then calculate the BMR
   * @param {Object} nextUser Synthetic change event
   */
  makeUserState = (nextUser) => {
    let { user } = this.props;
    if (nextUser) {
      user = nextUser;
    }
    const measurements = user.userMeasurements;
    const lifestyle = lifeStyle(user);
    this.setState(Object.assign(this.state,
      measurements[measurements.length - 1],
      {
        age: user.birthdate ? user.birthdate.slice(0, 10) : null,
        lifestyle
      }
    ), this.calculateBMR);
  }

  /**
   * Change the state BMR value based on other state values, then recalculate the recommendation
   * @param {React.SyntheticEvent} [ev] Synthetic click event
   */
  calculateBMR = (data) => {
    const { dob, gender, height, weight, units } = data;
    const age = moment().diff(dob, 'years');
    const BMR = bmrCalculation(age, gender, parseFloat(height), parseFloat(weight), units);
    console.log({ age, gender, height, weight, units });
    console.log(BMR);
    this.setState({ BMR }, this.calculateRecommendation);
  }

  render() {
    return (
      <div>
        <MeasurementsForm
          btnTxt={this.props.saveMeas ? 'Save' : 'Calculate'}
          onSubmit={this.props.saveMeas ? this.onSaveMeasurements : this.calculateBMR}
        />
        {
          this.props.saveMeas ? '' : <ModifyMaintenanceCals BMR={this.state.BMR} />
        }
      </div>
    );
  }
}

BMRCalculator.propTypes = {
  saveMeasurements: PropTypes.func,
  user: PropTypes.object,
  bmrCalories: PropTypes.func,
  saveMeas: PropTypes.func
};

/** Get the user from redux state */
const mapStateToProps = ({ user }) => ({
  user
});

/** Map some dispatch functions */
const mapDispatchToProps = (dispatch) => ({
  /**
   * @param {measurementType} measurements
   * @param {userType} user
   */
  saveMeasurements: (measurements, user) => dispatch(saveMeasurements(measurements, user)),
  /** @param {number} calories */
  bmrCalories: (calories) => dispatch(bmrCalories(calories))
});

export default connect(mapStateToProps, mapDispatchToProps)(BMRCalculator);
