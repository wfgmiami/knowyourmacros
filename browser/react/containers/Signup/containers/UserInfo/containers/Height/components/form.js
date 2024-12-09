import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import HeightField from 'components/HeightField';
import { FORM_NAME } from 'containers/Signup/containers/UserInfo';

export class HeightWeightUnitsForm extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { handleSubmit, onSubmit, units } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Field component={HeightField} autoFocus name="height" units={units} />
        <Button>
          <span>Next</span>
        </Button>
      </form>
    );
  }
}

HeightWeightUnitsForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  units: PropTypes.string
};

export default reduxForm({
  form: FORM_NAME,
  destroyOnUnmount: false
})(HeightWeightUnitsForm);
