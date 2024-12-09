/**
 * @module AddRecordContainer
 */

import React from 'react';

class AddRecordContainer extends React.Component {
  state = { inputVal: '' };

  changeInput = (ev) => {
    this.setState({ inputVal: ev.target.value });
  }

  /** Display */
  render() {
    return (
      <div>
        <input
          className="form-control"
          value={this.state.inputVal}
          onChange={this.changeInput}
        />
      </div>
    );
  }
}

export default AddRecordContainer;
