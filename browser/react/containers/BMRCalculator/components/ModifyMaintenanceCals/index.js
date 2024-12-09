import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Container from 'components/Container';
import Well from 'components/Well';
import bmrCalculation from 'utils/bmrCalculation';
import { bmrCalories } from 'containers/BMRCalculator/actions';
import Form from './components/form';
import Recommendation from './components/Recommendation';

export class BMRCalculator extends React.Component {
  state = {
    lifestyle: 1.375,
    recommendation: {}
  };

  componentWillReceiveProps(props) {
    if (props.BMR !== this.props.BMR) {
      this.calculateRecommendation(props.BMR);
    }
  }

  updateLifestyle = (ev) => {
    this.setState({ lifestyle: ev.target.value }, this.calculateRecommendation);
  }

  bmr = () => {
    const { user } = this.props;
    const age = moment().diff(user.birthdate, 'years');
    const gender = `${user.userMeasurements[0].gender.charAt(0)}${user.userMeasurements[0].gender.toLowerCase().slice(1)}`;

    const { height, weight, units } = user.userMeasurements[0];
    const bmr = bmrCalculation(age, gender, parseFloat(height), parseFloat(weight), units);
    return bmr;
  }

  calculateRecommendation = (formData) => {
    const bmr = this.bmr();
    const calories = Math.round(bmr * formData.lifestyle);
    const protein = Math.round((calories * 0.3) / 4);
    const carbs = Math.round((calories * 0.4) / 4);
    const fat = Math.round((calories * 0.3) / 9);
    this.setState({ recommendation: { calories, protein, carbs, fat } });
    this.props.bmrCalories(calories);
  }

  render() {
    const { recommendation } = this.state;
    return (
      <Container>
        <Well>
          <Form onSubmit={this.calculateRecommendation} />
          {recommendation.calories > 0 && (
            <Recommendation recommendation={recommendation} />
          )}
        </Well>
      </Container>
    );
  }
}

BMRCalculator.propTypes = {
  BMR: PropTypes.number,
  bmrCalories: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = ({ user }) => ({
  user
});

const mapDispatchToProps = (dispatch) => ({
  bmrCalories: (calories) => dispatch(bmrCalories(calories))
});

export default connect(mapStateToProps, mapDispatchToProps)(BMRCalculator);
