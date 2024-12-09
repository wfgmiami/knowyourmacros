import React, { Component } from 'react';
import { getFormSyncErrors } from 'redux-form';
import PropTypes from 'prop-types';
import { login } from 'containers/Login/actions';
import { connect } from 'react-redux';
import H3 from 'components/H3';
import { updateAccount } from 'containers/Signup/actions';
import Form, { FORM_NAME } from './components/AccountInfoForm';

/** The signup form */
export class AccountInfo extends Component { // eslint-disable-line
  render() {
    return (
      <div>
        <H3 centered>Account Info</H3>
        <br />
        <Form onSubmit={this.props.submit} />
      </div>
    );
  }
}

AccountInfo.propTypes = {
  submit: PropTypes.func,
};

/** Map state to props */
const mapStateToProps = ({ root, signup, form }) => ({
  invalidLogin: root.invalidLogin,
  signup,
  errors: getFormSyncErrors(FORM_NAME)({ form })
});

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(login(credentials)),
  updateAccount: (accountInfo) => dispatch(updateAccount(accountInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
