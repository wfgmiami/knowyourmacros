import React, { Component } from 'react';
import PropTypes from 'prop-types';
import H3 from 'components/H3';
import Form from './components/form';

export class Units extends Component {
  render() {
    const { submit } = this.props;

    return (
      <div>
        <H3 centered>What units do you prefer?</H3>
        <br />
        <Form onSubmit={submit} />
      </div>
    );
  }
}

Units.propTypes = {
  submit: PropTypes.func
};

export default Units;
