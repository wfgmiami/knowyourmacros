import React from 'react';
import { Input, Select, InputGroup } from 'components/FormComponents';
import Container from 'components/Container';
import FlexWrapper from 'components/FlexWrapper';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import NutrientTable from './components/NutrientTable';
import Charts from './components/Charts';
import { getFood } from '../../actions';

/** @type {JSX.Element} */
const HalfWrapper = styled.div`
  flex: 1;
  &:first-child {
    padding-right: 0.5rem;
  }
  &:last-child {
    padding-left: 0.5rem;
  }
  text-align: ${(props) => (props.textRight ? 'right' : 'initial')};
`;

/** @type {JSX.Element} */
export class ViewFood extends React.Component {
  static propTypes = {
    getFood: PropTypes.func,
    food: PropTypes.object,
    params: PropTypes.object
  };

  /** Component state */
  state = {
    weight: 100,
    amount: 1
  };

  /** Get the food information */
  componentWillMount() {
    if (this.props.params.id) {
      this.props.getFood(this.props.params.id);
    }
  }

  /** Update the component state weight */
  componentWillReceiveProps(props) {
    const { food } = props;
    if (food && food.weights[0]) {
      this.setState({ weight: food.weights[0].normalized.weight });
    }
  }

  /** Change the component state weight */
  changeWeight = (ev) => {
    this.setState({ weight: ev.target.value });
  }

  /** Change the component state amount */
  changeAmount = (ev) => {
    this.setState({ amount: ev.target.value });
  }

  /** Calculate the macro amount based on amount per 100 grams */
  calculate100 = (param) => {
    const { food } = this.props;
    return Math.round(10 * this.state.amount * parseFloat(food[param]) * (this.state.weight / 100)) / 10;
  }

  /** Calculate the micro amount based on amount per 100 grams */
  calculateMicro = (param) => {
    const { food } = this.props;
    return Math.round(10 * this.state.amount * parseFloat(food.abbrevMicro[param]) * (this.state.weight / 100)) / 10;
  }

  calculatePercent = (item) => {
    const percent = item.location ? this.calculateMicro(item.key) : this.calculate100(item.key);
    if (item.dailyVal) {
      return Math.round(100 * (percent / item.dailyVal) * 10) / 10;
    }
    return false;
  }

  /** Display */
  render() {
    const { food } = this.props;
    if (!food || !food.Main) {
      return (
        <Container>
          <h1>Loading</h1>
        </Container>
      );
    }

    return (
      <Container>
        <h2>{food.Main}</h2>
        <h4>{food.Sub}</h4>
        <FlexWrapper>
          <HalfWrapper>
            <InputGroup>
              <Input
                type="number"
                className="form-control"
                step="0.1"
                min="0.1"
                max="1000"
                style={{ width: '30%' }}
                onChange={this.changeAmount}
                value={this.state.amount}
              />
              <Select value={this.state.weight} onChange={this.changeWeight}>
                {food.weights.map((weight) => (
                  <option
                    value={weight.normalized.weight}
                    key={weight.normalized.txt}
                  >
                    {weight.normalized.txt}
                  </option>
                ))}
              </Select>
            </InputGroup>
            <NutrientTable
              food={food}
              calculate100={this.calculate100}
              calculateMicro={this.calculateMicro}
              calculatePercent={this.calculatePercent}
            />
          </HalfWrapper>
          <HalfWrapper>
            <Charts
              food={food}
              calculatePercent={this.calculatePercent}
            />
          </HalfWrapper>
        </FlexWrapper>
      </Container>
    );
  }
}

/** Map state to props */
const mapStateToProps = ({ database }) => ({
  food: database.view.food
});

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  getFood: (id) => dispatch(getFood(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewFood);
