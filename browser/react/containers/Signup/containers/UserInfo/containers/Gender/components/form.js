import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { FORM_NAME } from 'containers/Signup/containers/UserInfo';
import MaleFemale from './MaleFemale';

export class GenderForm extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field component={MaleFemale} label="Gender" options={['male', 'female']} name="gender" />
      </form>
    );
  }
}

GenderForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func
};

export default reduxForm({
  form: FORM_NAME,
  destroyOnUnmount: false
})(GenderForm);
