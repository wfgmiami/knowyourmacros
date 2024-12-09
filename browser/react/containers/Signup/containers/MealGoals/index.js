import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { getFormValues } from 'redux-form';

import Container from 'components/Container';
import { saveGoals } from 'containers/SetGoals/actions';
import Form, { FORM_NAME } from './containers/MealGoalsForm';

console.log('Meal goals');

export class SetGoals extends React.Component {
  static propTypes = {
    saveGoals: PropTypes.func,
    user: PropTypes.object,
    formValues: PropTypes.object
  };

  onSaveGoals = (data) => {
    this.props.saveGoals(data);
    browserHistory.push('/');
  }

  render() {
    const { user, formValues } = this.props;
    if (!user || !user.userMeasurements) {
      return null;
    }
    return (
      <Container title="Meal Goals">
        <Form
          onSubmit={this.onSaveGoals}
          formValues={formValues}
          initialValues={{ numMeals: '4', beforeAfter: 'after', workoutId: 2 }}
          bmr={user.userMeasurements[0].bmrTraditional}
          lifestyle={user.userMeasurements[0].lifestyle}
          goal={user.userMeasurements[0].goal}
        />
      </Container>
    );
  }
}

const mapStateToProps = ({ root, user, form }) => ({
  bmrCalories: root.bmrCalories,
  user,
  formValues: getFormValues(FORM_NAME)({ form })
});

const mapDispatchToProps = (dispatch) => ({
  saveGoals: (st) => dispatch(saveGoals(st))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetGoals);
