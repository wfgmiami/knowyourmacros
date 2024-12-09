import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import Text from 'components/Text';
import Button from 'components/Button';
import { MEALS } from 'browser/redux/constants';
import { makeSelectUser } from './selectors';
import InfoRow from './components/InfoRow';

const Wrapper = styled.div`
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
`;

const MarginTop = styled.div`
  margin-top: 2rem;
`;

class User extends React.Component { // eslint-disable-line
  static navigationOptions = {
    title: 'User'
  }

  render() {
    const { user, children } = this.props;
    return (
      <Wrapper>
        {children}
        <strong>Account Info</strong>
        <InfoRow label="First Name" data={user.firstname} />
        <InfoRow label="Last Name" data={user.lastname} />
        <InfoRow label="Username" data={user.username} />
        <InfoRow label="Birthdate" data={moment(user.birthdate).format('MMMM Do, YYYY')} />
        <InfoRow label="Email" data={user.email} />
        <InfoRow label="Goal" data={user.userMeasurements[0].goal} />
        <Button onClick={() => browserHistory.push('/profile/update')}>Update</Button>
        <MarginTop>
          <strong>Measurements</strong>
          <InfoRow label="Lifestyle" data={user.userMeasurements[0].lifestyle} />
          <InfoRow label="Units" data={user.userMeasurements[0].units} />
          <InfoRow label="Height" data={user.userMeasurements[0].height} />
          <InfoRow label="Weight" data={user.userMeasurements[0].weight} />
          <InfoRow label="Gender" data={user.userMeasurements[0].gender} />
        </MarginTop>
        <MarginTop>
          <strong>Meal Macro Goals</strong>
          <Text>Training Day</Text>
          {MEALS.map((meal, ix) => (
            <div style={{ marginLeft: '15px' }}>
              <Text marginTop="9px">{meal}</Text>
              {Object.keys(user.mealGoals[0].goals.train[ix]).map((key) => (
                <InfoRow label={key} data={user.mealGoals[0].goals.train[ix][key]} indent />
              ))}
            </div>
          ))}
          <Text>Resting Day</Text>
          {MEALS.map((meal, ix) => (
            <div style={{ marginLeft: '15px' }}>
              <Text marginTop="9px">{meal}</Text>
              {Object.keys(user.mealGoals[0].goals.rest[ix]).map((key) => (
                <InfoRow label={key} data={user.mealGoals[0].goals.rest[ix][key]} indent />
              ))}
            </div>
          ))}
        </MarginTop>
        <MarginTop>
          <Text>{JSON.stringify(user)}</Text>
        </MarginTop>
      </Wrapper>
    );
  }
}

User.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser()
});

export default connect(mapStateToProps)(User);
