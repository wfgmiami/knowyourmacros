import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../FormComponents';
import FlexWrapper from '../FlexWrapper';

class HeightField extends React.Component {
  state = {
    cm: 0,
    ft: 0,
    inch: 0,
    totalInches: 0
  };

  getFeet = () => {
    const { cm } = this.state;
    const inches = cm / 2.54;
    return Math.floor(inches / 12);
  }

  getInches = () => {
    const { cm } = this.state;
    const totalInches = cm / 2.54;
    return Math.round(totalInches % 12);
  }

  setFeet = (ev) => {
    let value = ev.target.value;
    if (value === '') value = 0;
    this.setState({ ft: parseFloat(value) }, () => {
      this.convertCm();
      this.convertTotalInches();
    });
  }

  setInches = (ev) => {
    let value = ev.target.value;
    if (value === '') value = 0;
    this.setState({ inch: parseFloat(value) }, () => {
      this.convertCm();
      this.convertTotalInches();
    });
  }

  setCm = (ev) => {
    let value = ev.target.value;
    if (value === '') value = 0;
    this.setState({ cm: parseFloat(value) }, () => {
      const [ft, inch] = [this.getFeet(), this.getInches()];
      this.setState({ ft, inch }, this.convertTotalInches);
      this.props.input.onChange(this.state.cm);
    });
  }

  convertCm = () => {
    const { ft, inch } = this.state;
    const cm = (ft * 12 * 2.54) + (inch * 2.54);
    this.setState({ cm }, () => {
      if (this.props.units === 'imperial') {
        this.props.input.onChange(this.state.cm);
      }
    });
  }

  convertTotalInches = () => {
    const { ft, inch } = this.state;
    const totalInches = (ft * 12) + inch;
    this.setState({ totalInches }, () => {
      if (this.props.units === 'imperial') {
        this.props.input.onChange(this.state.totalInches);
      }
    });
  }

  render() {
    const { units, autoFocus } = this.props;
    return (
      <div>
        {units === 'imperial' && (
          <FlexWrapper justify="flex-start">
            <Input label="feet" autoFocus={autoFocus} placeholder="feet" value={this.state.ft} onChange={this.setFeet} />
            &nbsp;
            <Input label="inches" placeholder="inches" value={this.state.inch} onChange={this.setInches} />
          </FlexWrapper>
        )}
        {units === 'metric' && (
          <Input label="centimeters" autoFocus={autoFocus} placeholder="centimeters" value={this.state.cm} onChange={this.setCm} />
        )}
      </div>
    );
  }
}

HeightField.propTypes = {
  units: PropTypes.string,
  input: PropTypes.object
};

export default HeightField;
