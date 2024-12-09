import React, { Component } from 'react';
import PropTypes from 'prop-types';
import H3 from 'components/H3';
import Form from './components/form';

export class HeightWeightUnits extends Component {
  render() {
    const { formValues, submit } = this.props;
    return (
      <div>
        <H3 centered>How tall are you?</H3>
        <br />
        <Form onSubmit={submit} units={formValues && formValues.units} />
      </div>
    );
  }
}

HeightWeightUnits.propTypes = {
  formValues: PropTypes.object,
  submit: PropTypes.func
};

export default HeightWeightUnits;
