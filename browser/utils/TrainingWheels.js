import React from 'react';

const enable = __DEV__;

class TrainingWheels extends React.Component {
  static logStyle = 'color: magenta;';

  componentWillMount() {
    if (enable) console.log(`%c${this.constructor.name} will mount`, TrainingWheels.logStyle);
  }

  componentDidMount() {
    if (enable) console.log(`%c${this.constructor.name} did mount`, TrainingWheels.logStyle);
  }

  componentWillReceiveProps() {
    if (enable) console.log(`%c${this.constructor.name} will receive props`, TrainingWheels.logStyle);
  }

  componentWillUpdate() {
    if (enable) console.log(`%c${this.constructor.name} will update`, TrainingWheels.logStyle);
  }

  componentWillUnmount() {
    if (enable) console.log(`%c${this.constructor.name} will unmount`, TrainingWheels.logStyle);
  }

  componentDidCatch(err, errInfo) {
    if (enable) console.log(`%c${this.constructor.name} caught an error: ${errInfo}`, TrainingWheels.logStyle);
  }
}

window.TrainingWheels = TrainingWheels;

export default TrainingWheels;
