import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import Well from 'components/Well';
import bmrCalculation from 'utils/bmrCalculation';
import { saveMeasurements, bmrCalories } from '../../actions';
import MeasurementsForm, { FORM_NAME } from './components/form';
import { lifeStyle, invertLifeStyle } from '../../utils';

const Wrapper = styled.div`
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
`;

export class BMRCalculator extends React.Component {
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
    this.setState({ BMR }, this.calculateRecommendation);
  }

  render() {
    const { user, formValues } = this.props;
    return (
      <Wrapper>
        <Well>
          <MeasurementsForm
            btnTxt={this.props.saveMeas ? 'Save' : 'Calculate'}
            onSubmit={this.props.saveMeas ? this.onSaveMeasurements : this.calculateBMR}
            initialValues={{
              dob: moment(user.birthdate).format('YYYY-MM-DD'),
              ...user.userMeasurements[0],
              gender: `${user.userMeasurements[0].gender.charAt(0)}${user.userMeasurements[0].gender.toLowerCase().slice(1)}`
            }}
            formValues={formValues}
          />
        </Well>
      </Wrapper>
    );
  }
}

BMRCalculator.propTypes = {
  saveMeasurements: PropTypes.func,
  user: PropTypes.object,
  formValues: PropTypes.object,
  bmrCalories: PropTypes.func,
  saveMeas: PropTypes.func
};

const mapStateToProps = ({ user, form }) => ({
  user,
  formValues: getFormValues(FORM_NAME)({ form })
});

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
