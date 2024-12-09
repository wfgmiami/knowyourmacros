import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Input } from 'components/FormComponents';
import { required, minLength } from 'utils/validation';

export const FORM_NAME = 'mealplanner-searchform';

const minLengthThree = minLength(3);

/** The search form */
export const SearchForm = ({ onSubmit, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field component={Input} noMargin placeholder="Search Food" name="searchVal" validate={[required, minLengthThree]} />
    </form>
  );
};

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
  handleSubmit: PropTypes.func
};

export default reduxForm({
  form: FORM_NAME,
  enableReinitialize: true
})(SearchForm);
