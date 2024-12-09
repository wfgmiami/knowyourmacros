import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';
import Container from 'components/Container';
import mapMicro from './mapMicro';
import ProgressBar from './components/ProgressBar';
import { getMicroRecord } from './actions';

const Wrapper = styled.div`
  margin-bottom: 2em;
`;

/** MicronutrientReport */
export class MicronutrientReport extends React.Component {
  /** Validate prop types */
  static propTypes = {
    record: PropTypes.array,
    getMicroRecord: PropTypes.func
  };

  static calculateDV(micro, foods) {
    const { key, dailyVal } = micro;
    const dv = foods.reduce((memo, food) => {
      const { abbrevMicro } = food;
      if (abbrevMicro && abbrevMicro[key]) {
        return memo + parseFloat(abbrevMicro[key] / dailyVal);
      }
      return memo;
    }, 0);
    return Math.round(dv * 100 * 10) / 10;
  }

  /** Component state */
  state = {
    micros: []
  };

  componentWillMount() {
    this.props.getMicroRecord(moment());
  }

  componentWillReceiveProps(props) {
    if (props.record) {
      const micros = mapMicro.map((micro) => {
        micro.percent = MicronutrientReport.calculateDV(micro, props.record); // eslint-disable-line
        return micro;
      });
      this.setState({ micros });
    }
  }

  /** Display */
  render() {
    return (
      <Container title="Micronutrient Report" subtitle={`For ${moment().format('MMMM Do, YYYY')}`}>
        {this.state.micros.map((micro) => (
          <Wrapper key={micro.key}>
            <div>
              <strong>{micro.name}</strong>: {micro.percent}%
            </div>
            <div>
              <small>{micro.description}</small>
            </div>
            <ProgressBar
              primary={micro.name !== 'Cholesterol' && micro.name !== 'Sodium'}
              danger={micro.name === 'Cholesterol' || micro.name === 'Sodium'}
              percent={micro.percent}
            />
          </Wrapper>
        ))}
      </Container>
    );
  }
}

/** Map state to props */
const mapStateToProps = ({ microreport, root }) => ({
  record: microreport.record,
  date: root.date
});

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  getMicroRecord: (date) => dispatch(getMicroRecord(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(MicronutrientReport);
