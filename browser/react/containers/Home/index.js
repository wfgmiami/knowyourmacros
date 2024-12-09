import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// import BMRCalculator from '../BMRCalculator';
import MainDash from './containers/MainDash';

/**
 * Home
 * @param {Object} props
 * @param {userType} props.user
 */
export const Home = ({ user }) => {
  // const measurementsForm = (
  //   <div className="container">
  //     <BMRCalculator saveMea />
  //   </div>
  // );

  return (
    <div>
      {
        // Make sure user has given their measurements
        // (user && user.userMeasurements && !user.userMeasurements.length)
          // ? measurementsForm
          /* :  */(user && user.userMeasurements && <MainDash />)
      }
    </div>
  );
};

Home.propTypes = {
  user: PropTypes.object
};

/** Map state to props */
const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(Home);
