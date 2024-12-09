import React from 'react';
import { Link } from 'react-router';
import Icon from 'components/Icon';
import FlexWrapper from 'components/FlexWrapper';
import NavBase from 'components/Nav';
import styled from 'styled-components';
import media from 'theme/media';
import Logo from 'components/Logo';

const Goto = styled(Link)`
  align-self: flex-end;
`;

const Signup = styled(Link)`
  background-color: ${(props) => props.theme.green} !important;
`;

const Nav = NavBase.extend`
  ${media.mdDown`
    position: fixed;
    bottom: 0px;
    top: initial;
  `}
`;

/** NavFrontPage */
const NavFrontPage = () => (
  <div>
    <Nav primary displayAll>
      <FlexWrapper>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Logo height="2em" width="2em" />
          &nbsp;
          <span><strong>Know Your Macros</strong></span>
        </div>
        <Goto to="login">
          <Icon icon="login" fill="#fff" /> Log In
        </Goto>
        <Signup to="signup/user-info/gender">
          <Icon icon="user-add" fill="#fff" /> Sign Up
        </Signup>
      </FlexWrapper>
    </Nav>
  </div>
);

export default NavFrontPage;

