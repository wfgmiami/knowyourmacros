import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import { Input } from 'components/FormComponents';
import { MarginWrapper } from '../styled';
import validation from './validation';

export const FORM_NAME = 'account-info';

export class SignupForm extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <MarginWrapper>
          <Field component={Input} autoFocus label="First Name" name="firstname" />
          <Field component={Input} label="Last Name" name="lastname" />
          <Field component={Input} label="Email" type="email" name="email" />
          <Field component={Input} label="Password" type="password" name="password" />
        </MarginWrapper>
        <Button>Next</Button>
      </form>
    );
  }
}

SignupForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func
};

export default reduxForm({
  form: FORM_NAME,
  validate: validation,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(SignupForm);
