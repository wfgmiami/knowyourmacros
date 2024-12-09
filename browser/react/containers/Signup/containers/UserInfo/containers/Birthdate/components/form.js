import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Input } from 'components/FormComponents';
import Button from 'components/Button';
import { FORM_NAME } from 'containers/Signup/containers/UserInfo';

export class BirthdateForm extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field component={Input} autoFocus name="birthdate" label="Birthdate" type="date" />
        <Button color="darkBlue">Done!</Button>
      </form>
    );
  }
}

BirthdateForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func
};

export default reduxForm({
  form: FORM_NAME,
  destroyOnUnmount: false
})(BirthdateForm);
