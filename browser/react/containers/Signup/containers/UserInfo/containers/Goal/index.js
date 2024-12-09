import React, { Component } from 'react';
import PropTypes from 'prop-types';
import H3 from 'components/H3';
import Form from './components/form';

export class Gender extends Component {
  render() {
    const { submit } = this.props;

    return (
      <div>
        <H3 centered>What is your goal?</H3>
        <br />
        <Form onSubmit={submit} />
      </div>
    );
  }
}

Gender.propTypes = {
  submit: PropTypes.func
};

export default Gender;
