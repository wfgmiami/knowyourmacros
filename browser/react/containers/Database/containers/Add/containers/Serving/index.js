import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Container from 'components/Container';
import { submitServing } from 'containers/Database/actions';
import Form from './components/ServingForm';

/** A styled `div` component */
const Wrapper = styled(Container)`
  max-width: 500px;
`;

/** Specify the new food serving size */
export class Serving extends React.Component {
  /** Validate prop types */
  static propTypes = {
    submitServing: PropTypes.func
  };

  /** Add serving info to redux state */
  onSubmitServing = (data) => {
    const { servingSize, servingDescription, servingWeight } = data;
    if (!servingSize || !servingDescription || !servingWeight) {
      return;
    }
    if (servingSize <= 0 || !servingDescription.length || servingWeight <= 0) {
      return;
    }
    this.props.submitServing(data);
  };

  /** Display */
  render() {
    return (
      <Wrapper>
        <Form onSubmit={this.onSubmitServing} />
      </Wrapper>
    );
  }
}

/** Map dispatch to props */
const mapDispatchToProps = (dispatch) => ({
  submitServing: (data) => dispatch(submitServing(data))
});

export default connect(null, mapDispatchToProps)(Serving);
