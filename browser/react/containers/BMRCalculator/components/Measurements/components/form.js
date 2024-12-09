import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import Button from 'components/Button';
import FlexWrapper from 'components/FlexWrapper';
import { Input, Label, Select } from 'components/FormComponents';
import { required, createValidator } from 'utils/validation';
import RadioGroup from 'components/RadioGroup';
import HeightField from 'components/HeightField';
import { MarginTop } from './styled';

const MeasurementForm = ({ onSubmit, handleSubmit, formValues, btnTxt }) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label>Units</Label>
      <FlexWrapper>
        <Field
          component={RadioGroup}
          name="units"
          options={[
            { label: 'U.S. Customary', value: 'imperial' },
            { label: 'Metric', value: 'metric' }
          ]}
        />
      </FlexWrapper>
      <MarginTop>
        <Field label="Date of Birth" component={Input} name="dob" type="date" />
      </MarginTop>
      <Field component={Select} label="Gender" name="gender">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </Field>
      <Field
        label={`Weight (${formValues && formValues.units === 'imperial' ? 'lbs' : 'kg'})`}
        component={Input}
        name="weight"
        type="number"
      />
      <Field component={HeightField} name="height" units={formValues && formValues.units} />
      <Button color="darkBlue">{btnTxt}</Button>
    </form>
  );
};

MeasurementForm.propTypes = {
  onSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  formValues: PropTypes.object,
  btnTxt: PropTypes.string
};

export const FORM_NAME = 'measurements';

export default reduxForm({
  form: FORM_NAME,
  validate: createValidator({
    units: required,
    dob: required,
    gender: required,
    weight: required,
    height: required
  })
})(MeasurementForm);
