import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from 'components/Button';
import { Select, Input } from 'components/FormComponents';
import { FlexWrapper } from './styled';
import { updateQuantity } from '../actions';

/** Form to modify a food record */
export class ModifyRecordForm extends React.Component {
  /** Setup the form */
  constructor(props) {
    super();
    const { record } = props;
    /** The initial sequence identifier for the weight */
    this.initialSeq = record.weights.filter((weight) => weight.Description === record.Unit)[0];
    /** Component state */
    this.state = { quantity: record.Quantity, seq: record.Seq };
  }

  /**
   * Match the component state to the new props
   * @param {{record: {Quantity: number, Seq: number}}} newProps
   */
  componentWillReceiveProps = (newProps) => {
    const { record } = newProps;
    this.setState({ quantity: record.Quantity, seq: record.Seq });
  }

  /**
   * Update the quantity of the number input
   * @param {Event} ev
   */
  changeQuantity = (ev) => {
    this.setState({ quantity: ev.target.value });
  }

  /**
   * Update the value of the weight option
   * @param {Event} ev
   */
  changeSeq = (ev) => {
    this.setState({ seq: ev.target.value });
  }

  /**
   * Check if the state is different from the props. If so, update the database
   * @param {Event} ev
   */
  submitUpdate = (ev) => {
    ev.preventDefault();
    if (!this.state.quantity) return;

    const { record, updateQuant, changeUpdating } = this.props;

    if (this.state.quantity * 1 !== record.Quantity * 1 || this.state.seq * 1 !== record.Seq * 1) {
      updateQuant(record, this.state);
      changeUpdating();
    } else {
      changeUpdating();
    }
  }

  /** Display */
  render() {
    const { record: { Quantity, weights, Seq } } = this.props;
    const isSame = this.state.quantity * 1 === Quantity * 1 && this.state.seq * 1 === Seq;

    return (
      <form className="form-inline" onSubmit={this.submitUpdate}>
        <FlexWrapper align="stretch">
          <Input
            inline
            type="number"
            min="0"
            max="1000"
            step="0.01"
            placeholder={Quantity}
            onChange={this.changeQuantity}
            value={this.state.quantity}
            style={{ color: '#000' }}
          />

          <Select
            inline
            onChange={this.changeSeq}
            value={this.state.seq}
          >
            { weights.map((weight) => (
              <option key={weight.Seq} value={weight.Seq}>
                { weight.Description }
              </option>
            )) }
          </Select>

          <Button
            color={!isSame ? 'darkBlue' : null}
            disabled={!this.state.quantity}
          >
            {isSame ? 'Cancel' : 'Update'}
          </Button>
        </FlexWrapper>
      </form>
    );
  }
}

ModifyRecordForm.propTypes = {
  record: PropTypes.object,
  updateQuant: PropTypes.func,
  changeUpdating: PropTypes.func
};

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  updateQuant: (record, quant) => dispatch(updateQuantity(record, quant)),
});

export default connect(null, mapDispatchToProps)(ModifyRecordForm);
