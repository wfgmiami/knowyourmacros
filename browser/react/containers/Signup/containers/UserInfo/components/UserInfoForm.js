import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import FlexWrapper from 'components/FlexWrapper';
import Button from 'components/Button';
import { Input, Select } from 'components/FormComponents';
import { MarginWrapper, FlexInput, FlexSelect } from '../styled';

export const FORM_NAME = 'account-info';

export class UserInfoForm extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <MarginWrapper>
          <Field component={Select} label="Gender" options={['male', 'female']} name="gender" />
          <div>Male</div>
          <div>Female</div>
        </MarginWrapper>

        <MarginWrapper>
          <Field component={Input} name="birthdate" label="Birthdate" type="date" />
        </MarginWrapper>

        <MarginWrapper>
          <FlexWrapper>
            <Field component={FlexInput} type="number" label="Height" name="height" />
            <Field component={FlexSelect} options={['inch', 'cm']} name="hunit" label="Units" />
          </FlexWrapper>
        </MarginWrapper>
        <MarginWrapper>
          <FlexWrapper>
            <Field component={FlexInput} type="number" label="Weight" name="weight" />
            <Field component={FlexSelect} options={['lbs', 'kg']} name="wunit" label="Units" />
          </FlexWrapper>
        </MarginWrapper>

        <MarginWrapper>
          <Field component={Input} label="Body Fat Percent" name="bodyfat" />
        </MarginWrapper>

        <MarginWrapper>
          <Field
            component={Select}
            label="Your Lifestyle"
            name="lifestyle"
            options={['Normal', 'Active', 'Sedentary']}
          />
        </MarginWrapper>

        <MarginWrapper>
          <Field
            label="Your Goal"
            component={Select}
            name="goal"
            options={['Lose Fat', 'Gain Muscle', 'Maintain']}
          />
        </MarginWrapper>
        <Button color="darkBlue">
          <i className="fa fa-caret-square-o-up" />
          &nbsp;
          <span>Sign Up</span>
        </Button>
      </form>
    );
  }
}

UserInfoForm.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func
};

export default reduxForm({
  form: FORM_NAME
})(UserInfoForm);
