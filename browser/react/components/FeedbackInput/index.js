import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { FBLabel, FBInput, ErrorMsg } from './styled';

/**
 * A styled `input` element with feedback capability
 * @return {React.Component}
 */
class FeedbackInput extends React.Component {
  /** Component state */
  state = {
    visited: false
  };

  /**
   * Should component update
   * @param {Object} nextProps
   * @param {Object} nextState
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (!this.state.visited && nextState.visited && !nextProps.danger) {
      return false;
    }
    return true;
  }

  /** Set the state to visited */
  setVisited = () => this.setState({ visited: true });

  render() {
    const { label, success, warn, danger, message, required, ...rest } = this.props;
    const showRequiredMsg = required && this.state.visited && danger;
    const dangerMsg = showRequiredMsg || (this.state.visited && danger);
    return (
      <div>
        {label &&
        <FBLabel danger={dangerMsg}>
          {label}
        </FBLabel>
        }
        <FBInput
          danger={dangerMsg}
          visited={this.state.visited}
          onBlur={this.setVisited}
          {...rest}
        />
        <CSSTransitionGroup
          transitionName="fade"
          transitionAppear
          transitionAppearTimeout={100}
          transitionLeaveTimeout={100}
          transitionEnterTimeout={100}
        >
          {showRequiredMsg &&
            <ErrorMsg key="required">
              Required
            </ErrorMsg>
          }
          {!showRequiredMsg && danger && message &&
            <ErrorMsg key="message">
              {message}
            </ErrorMsg>
          }
        </CSSTransitionGroup>
      </div>
    );
  }
}

FeedbackInput.propTypes = {
  success: PropTypes.bool,
  warn: PropTypes.bool,
  danger: PropTypes.bool,
  required: PropTypes.bool,
  message: PropTypes.string,
  label: PropTypes.string
};

export default FeedbackInput;
