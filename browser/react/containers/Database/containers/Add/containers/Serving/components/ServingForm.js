import React from 'react';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Input } from 'components/FormComponents';
import Button from 'components/Button';
import Well from 'components/Well';

/** A styled `div` component */
const Margin = styled.div`
  margin-top: 1rem;
  &:first-child {
    margin-top: 0;
  }
`;

/** Specify the new food serving size */
export class Serving extends React.Component {
  /** Validate prop types */
  static propTypes = {
    submitServing: PropTypes.func,
    handleSubmit: PropTypes.func,
    onSubmit: PropTypes.func
  };

  /** Add serving info to redux state */
  onSubmitServing = (ev) => {
    ev.preventDefault();
    const { servingSize, servingDescription, servingWeight } = this.state;
    if (!servingSize || !servingDescription || !servingWeight) {
      return;
    }
    if (servingSize <= 0 || !servingDescription.length || servingWeight <= 0) {
      return;
    }
    this.props.submitServing(servingSize, servingDescription, servingWeight);
  };

  /** Display */
  render() {
    const { handleSubmit, onSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Well>
          <Margin>
            <Field
              component={Input}
              label="Serving Size"
              name="servingSize"
              type="number"
              min={0}
              max={1000}
              step={0.1}
              placeholder="1"
            />
          </Margin>
          <Margin>
            <Field
              component={Input}
              label="Serving Description"
              type="text"
              className="form-control"
              list="servingL"
              placeholder="oz"
              name="servingDescription"
            />
          </Margin>
          <Margin>
            <Field
              component={Input}
              label="Serving Weight in grams"
              name="servingWeight"
              type="number"
              min={0}
            />
          </Margin>
        </Well>
        <datalist id="servingL">
          <option>g</option>
          <option>oz</option>
        </datalist>
        <Button>
          Continue
        </Button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'serving'
})(Serving);
