import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { FORM_NAME } from 'containers/Signup/containers/UserInfo';
import ActivityLevel from './Activitylevel';

export class ActivityLevelForm extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field component={ActivityLevel} name="lifestyle" />
      </form>
    );
  }
}

ActivityLevelForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func
};

export default reduxForm({
  form: FORM_NAME,
  destroyOnUnmount: false
})(ActivityLevelForm);
