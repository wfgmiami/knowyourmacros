import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Input } from 'components/FormComponents';
import Button from 'components/Button';

const FORM_NAME = 'updateAccountInfoForm';

class UpdateAccountInfoForm extends React.Component {
  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field component={Input} label="First Name" name="firstname" />
        <Field component={Input} label="Last Name" name="lastname" />
        <Field component={Input} label="Email" type="email" name="email" />
        <Field component={Input} label="Username" name="username" />
        <Button color="darkBlue">Save</Button>
      </form>
    );
  }
}

UpdateAccountInfoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
  form: FORM_NAME
})(UpdateAccountInfoForm);
