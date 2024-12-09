import React from 'react';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Input } from 'components/FormComponents';
import FlexWrapper from 'components/FlexWrapper';
import Button from 'components/Button';
import { required, minNumber } from 'utils/validation';

export const FORM_NAME = 'mealplanner-goalform';

const minVal = minNumber(1);

/** The goal form */
const GoalForm = ({ handleSubmit, onSubmit }) => (
  <form onSubmit={handleSubmit(onSubmit)}>
    <FlexWrapper>
      <Field component={Input} name="proteinGoal" label="Protein Goal:" type="number" validate={[required, minVal]} />
      <Field component={Input} name="carbGoal" label="Carb Goal:" type="number" validate={[required, minVal]} />
      <Field component={Input} name="fatGoal" label="Fat Goal:" type="number" validate={[required, minVal]} />
    </FlexWrapper>
    <Button color="darkBlue">Calculate</Button>
  </form>
);

GoalForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func
};

export default reduxForm({
  form: FORM_NAME
})(GoalForm);
