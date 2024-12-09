import React from 'react';
import PropTypes from 'prop-types';
import Nav from 'containers/Nav';
import styled from 'styled-components';
import FrontPage from 'containers/FrontPage';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getCookie } from 'utils/cookie';
import getToken from 'utils/getToken';
import { getUser } from './containers/User/actions';

/** @type {JSX.Element} */
const Wrapper = styled.div`
`;

/** @type {JSX.Element} */
const App = styled.div`
  margin-top: 65px;
`;

/** The parent of all routes */
export class Main extends React.Component {
  /** Validate prop types */
  static propTypes = {
    children: PropTypes.node,
    exchangeTokenForUser: PropTypes.func
  };

  /** Check if there should be a login action. If so, exchange token for user */
  componentDidMount() {
    if (!getToken() && browserHistory.getCurrentLocation().query.login) {
      localStorage.setItem('token', getCookie('token'));
      this.props.exchangeTokenForUser();
      browserHistory.push('/');
    }
  }

  /** Display */
  render() {
    return (
      <Wrapper>
        {!getToken()
          ? <FrontPage />
          : <div>
            <Nav pathname={browserHistory.getCurrentLocation().pathname} />
            <App>
              {this.props.children}
            </App>
          </div>
        }
      </Wrapper>
    );
  }
}

/** Take the user from the redux state */
const mapStateToProps = ({ user }) => ({
  user
});

/** Pass in a method to get user from token */
const mapDispatchToProps = (dispatch) => ({
  exchangeTokenForUser: () => dispatch(getUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
