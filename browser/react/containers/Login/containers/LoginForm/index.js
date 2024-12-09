import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/Button';
import Well from 'components/Well';
// import Container from 'components/Container';
import { Input } from 'components/FormComponents';
import { login } from 'containers/Login/actions';
import { connect } from 'react-redux';
import { Wrapper, MarginWrapper } from './styled';

/** The login form */
export class LoginForm extends Component {
  /** Validate prop types */
  static propTypes = {
    login: PropTypes.func,
    hide: PropTypes.func,
    username: PropTypes.string,
    password: PropTypes.string,
    invalidLogin: PropTypes.bool,
  };

  /** Component state */
  state = {
    username: '',
    password: '',
    oauth: ''
  };

  /**
   * Change the name
   * @param {React.SyntheticEvent} event
   */
  onNameChange = (ev) => {
    this.setState({ username: ev.target.value });
  }

  /**
   * Change the password
   * @param {React.SyntheticEvent} event
   */
  onPasswordChange = (ev) => {
    this.setState({ password: ev.target.value });
  }

  /**
   * Submit the credentials
   * @param {React.SyntheticEvent} event
   */
  submitCredentials = (ev) => {
    ev.preventDefault();
    this.props.login(this.state)
      .then(() => {
        if (!this.props.invalidLogin) {
          this.setState({ username: '', password: '' });
          this.props.hide();
        }
      });
  }

  /** Display */
  render() {
    const { invalidLogin, username, password } = this.props;

    return (
      <Wrapper>
        <Well>
          <h3><i>Log in to My Account</i></h3>
          <div className="buffer forms"></div>
          {invalidLogin && <div style={{ color: 'red' }}>Invalid Login</div>}
          <MarginWrapper>
            <Input placeholder="name" value={username} onChange={this.onNameChange} />
          </MarginWrapper>
          <MarginWrapper>
            <Input type="password" placeholder="password" value={password} onChange={this.onPasswordChange} />
          </MarginWrapper>
          <MarginWrapper />
          <MarginWrapper>
            <Button color="darkBlue" block onClick={this.submitCredentials}>
              <i className="fa fa-sign-in" />
              <span>Log In</span>
            </Button>
          </MarginWrapper>
          <div className="buffer local">
            <div className="buffer forms"></div>
            <div className="back-line">
              <span>OR</span><br />
            </div>
            <div className="buffer forms"></div>
          </div>
          <MarginWrapper>
            <a href="/api/auth/google">
              <i className="fa fa-google" />
              {' '}
              <span>Log In With Google</span>
            </a>
          </MarginWrapper>
          <MarginWrapper>
            <a href="/api/auth/fitbit">
              <img src="/images/Fitbit_app_icon.png" height="15" alt="" />
              {' '}
              <span>Log In With Fitbit</span>
            </a>
          </MarginWrapper>
        </Well>
      </Wrapper>
    );
  }
}

/** Map state to props */
const mapStateToProps = ({ root, user }) => ({
  /** @type {userType} */
  user,
  /** @type {boolean} */
  invalidLogin: root.invalidLogin
});

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(login(credentials))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
