import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Select } from 'components/FormComponents';
import Button from 'components/Button';

export class BMRCalculatorForm extends React.Component {
  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field component={Select} name="lifestyle" label="Lifestyle">
          <option value={1.2}>Sedentary</option>
          <option value={1.375}>Normal</option>
          <option value={1.55}>Active</option>
        </Field>
        <Button color="darkBlue">Get Recommendation</Button>
      </form>
    );
  }
}

BMRCalculatorForm.propTypes = {
  onSubmit: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: 'maintenance-calories'
})(BMRCalculatorForm);
