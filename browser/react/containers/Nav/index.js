import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import StyledNav from 'components/Nav';
import FlexWrapperBase from 'components/FlexWrapper';
// import Icon from 'components/Icon';
import media from 'theme/media';
import { logout } from 'containers/Login/actions';

const Icon = styled(FontAwesome)`
  color: #fff;
`;

/** @type {JSX.Element} */
export const TextContainer = styled.div`
  padding-left: 4px;
`;

export const FlexWrapper = FlexWrapperBase.extend`
  justify-content: initial;
`;

/** @type {JSX.Element} */
export const MainFlexWrapper = FlexWrapperBase.extend`
  min-width: 60%;
  align-items: flex-end;

  ${media.smDown`
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    & a {
      width: 100%;
    }
    
    & a:not(:first-child) {
      border-top: 1px dashed white;
    }
  `}
`;

/** The nav bar */
export class Nav extends React.Component {
  /** Validate prop types */
  static propTypes = {
    logout: PropTypes.func
  };

  /** Component state */
  state = {
    extended: false
  };

  /** Toggle the display on small screens */
  updateExtended = () => {
    this.setState((state) => ({ extended: !state.extended }));
  }

  /** Display */
  render() {
    return (
      <StyledNav className={this.state.extended ? 'responsive' : null} primary>
        <MainFlexWrapper>
          {this.state.extended && (
            <a className="smallScreen" onClick={this.updateExtended}>X</a>
          )}
          <Link to="/" activeClassName="active" onClick={this.updateExtended}>
            <FlexWrapper>
              <Icon name="home" />
              <TextContainer>Home</TextContainer>
            </FlexWrapper>
          </Link>
          <Link to="/modify-goals" activeClassName="active" onClick={this.updateExtended}>
            <FlexWrapper>
              <Icon name="star" />
              <TextContainer>Goals</TextContainer>
            </FlexWrapper>
          </Link>
          <Link to="/meal-planner" activeClassName="active" onClick={this.updateExtended}>
            <FlexWrapper>
              <Icon name="balance-scale" />
              <TextContainer>Single Meal Planner</TextContainer>
            </FlexWrapper>
          </Link>
          <Link to="/shopping-list" activeClassName="active" onClick={this.updateExtended}>
            <FlexWrapper>
              <Icon name="bullseye" />
              <TextContainer>Day Meal Planner</TextContainer>
            </FlexWrapper>
          </Link>
          <Link to="/micronutrient-report" activeClassName="active" onClick={this.updateExtended}>
            <FlexWrapper>
              <Icon name="flag" />
              <TextContainer>Micronutrient Report</TextContainer>
            </FlexWrapper>
          </Link>
          {/* <Link to="/public-meals" name="globe" activeClassName="active" onClick={this.updateExtended}>
            Public Meals
          </Link> */}
          <Link to="/list" activeClassName="active" onClick={this.updateExtended}>
            <FlexWrapper>
              <Icon name="th-list" />
              <TextContainer>Shopping List</TextContainer>
            </FlexWrapper>
          </Link>
          <Link to="/database" activeClassName="active" onClick={this.updateExtended}>
            <FlexWrapper>
              <Icon name="database" />
              <TextContainer>Database</TextContainer>
            </FlexWrapper>
          </Link>
          <Link to="/profile" activeClassName="active" onClick={this.updateExtended}>
            <FlexWrapper>
              <Icon name="user" />
              <TextContainer>Profile</TextContainer>
            </FlexWrapper>
          </Link>
          <a onClick={this.props.logout}>
            <FlexWrapper>
              <Icon name="sign-out" />
              <TextContainer>Log Out</TextContainer>
            </FlexWrapper>
          </a>
          {!this.state.extended &&
            <a className="icon" onClick={this.updateExtended} style={{ flex: 1 }}>
              &#9776;
            </a>
          }
        </MainFlexWrapper>
      </StyledNav>
    );
  }
}


/** Map state to props */
const mapStateToProps = ({ user }) => ({ user });

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
