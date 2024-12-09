import React, { Component } from 'react';
import H3 from 'components/H3';
import PropTypes from 'prop-types';
import Form from './components/form';

export class Birthdate extends Component {
  render() {
    const { submit } = this.props;
    return (
      <div>
        <H3 centered>What&apos;s your birthdate?</H3>
        <br />
        <Form onSubmit={submit} />
      </div>
    );
  }
}

Birthdate.propTypes = {
  submit: PropTypes.func
};

export default Birthdate;
