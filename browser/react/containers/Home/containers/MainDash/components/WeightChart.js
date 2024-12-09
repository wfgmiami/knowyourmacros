import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactHighcharts from 'react-highcharts';
import FontAwesome from 'react-fontawesome';
import moment from 'moment';
import ButtonBase from 'components/Button';
import FlexWrapper from 'components/FlexWrapper';
import UpdateWeight from 'containers/BMRCalculator/UpdateWeight';
import Icon from 'components/Icon';
import { destroyMeasurement } from 'containers/Home/actions';
import linedata from './_linedata';

/** A styled `button` component */
const Button = styled(ButtonBase)`
  width: 48%;
`;

/** Weight chart */
export class WeightChart extends React.Component {
  /** Setup the chart */
  constructor(props) {
    super();
    /** The data */
    this.linedata = linedata(props.user.userMeasurements, props.user.programs);
  }
  /** Component state */
  state = { display: 'chart' };

  /** Chart information */
  chartSeries = [{
    field: 'weight',
    name: 'Weight',
    color: '#ff7f0e',
    style: {
      strokeWidth: 2,
    }
  }];

  /** @param {string} display */
  changeDisplay = (display) => {
    this.setState({ display });
  }

  /** Display */
  render() {
    const { user } = this.props;
    return (
      <div>
        <FlexWrapper>
          <Button
            info={this.state.display === 'chart'}
            onClick={() => this.state.display === 'table' && this.changeDisplay('chart')}
          >
            <FontAwesome name="line-chart" /> Chart
          </Button>
          <Button
            info={this.state.display === 'table'}
            onClick={() => this.state.display === 'chart' && this.changeDisplay('table')}
          >
            <FontAwesome name="table" /> Table
          </Button>
        </FlexWrapper>
        <UpdateWeight />
        {
          this.state.display === 'chart'
            ? <ReactHighcharts config={linedata(user.userMeasurements, user.programs)} />
            : <div style={{ marginTop: '15px' }}>
              {
                user.userMeasurements.sort((aa, bb) => {
                  if (new Date(aa.createdAt) > new Date(bb.createdAt)) return 1;
                  if (new Date(aa.createdAt) < new Date(bb.createdAt)) return -1;
                  return 0;
                }).map((meas) => (
                  <p key={`${meas.id}_${meas.createdAt}_${meas.weight}`}>
                    <Icon
                      icon="cross"
                      fill="red"
                      strokeWidth="15"
                      onClick={() => this.props.destroyMeasurement(meas.id)}
                    />
                    {' '}
                    {meas.weight} {meas.units === 'imperial' ? 'lbs' : 'kg'}
                    <span className="pull-right">
                      {moment(meas.createdAt).format('dddd, Y-M-D')}
                    </span>
                  </p>
                )
                )}
            </div>
        }
      </div>
    );
  }
}

WeightChart.propTypes = {
  user: PropTypes.object,
  destroyMeasurement: PropTypes.func
};

/** Map state to props */
const mapStateToProps = ({ user }) => ({
  user
});

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  destroyMeasurement: (id) => dispatch(destroyMeasurement(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(WeightChart);
