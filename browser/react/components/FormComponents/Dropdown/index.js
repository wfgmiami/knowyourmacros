/**
* TextFieldBox
*/
import React from 'react';
import PropTypes from 'prop-types';
import FlexWrapper from 'components/FlexWrapper';
import { Toggler, Wrapper, ChildWrapper, Clear } from './styled';
import formComponent from '../formComponent';

export class Dropdown extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  state = {
    dropdownVisible: false
  };

  onChange = (value) => {
    if (this.props.input.value === value) {
      this.props.input.onChange(null);
    } else {
      this.props.input.onChange(value);
    }
  }

  clearVal = (ev) => {
    ev.stopPropagation();
    this.onChange(null);
  }

  toggleDropdown = () => {
    this.setState((state) => ({ dropdownVisible: !state.dropdownVisible }), () => {
      if (!this.state.dropdownVisible) {
        this.props.input.onBlur();
      }
    });
  }

  render() {
    const { noMargin, innerRef, input, children, optionWidth, valid, error, active, ...field } = this.props;
    const childrenWithProps = React.Children.map(children, (child) =>
      React.cloneElement(child, { onClick: () => this.onChange(child.props.value), selected: input.value === child.props.value }));
    return (
      <Wrapper noMargin={noMargin} valid={valid} error={error} active={active}>
        <Toggler
          toggled={this.state.dropdownVisible}
          onClick={this.toggleDropdown}
          placeholder={field.placeholder}
          value={input.value}
          {...field}
        >
          {(input.value ? React.Children.map(children, (child) => child.props.value === input.value && child) : null) || field.placeholder}
          {input.value && (
            <Clear onClick={this.clearVal}>
              Clear
            </Clear>
          )}
        </Toggler>
        {this.state.dropdownVisible && (
          optionWidth && (
            <FlexWrapper align="stretch" wrap="wrap">
              {childrenWithProps.map((child, ix) => (
                <ChildWrapper key={`${child.props.value}-${ix}`} ix={ix} optionWidth={optionWidth}>
                  {child}
                </ChildWrapper>
              ))}
            </FlexWrapper>
          )
        )}
        {/* <Error show={readyToShow && meta && meta.invalid && !hideError}>{meta && Array.isArray(meta && meta.error) ? (meta && meta.error[0]) : (meta && meta.error)}</Error> */}
      </Wrapper>
    );
  }
}

Dropdown.defaultProps = {
  input: {
    onChange: () => {},
    onBlur: () => {}
  },
  onChange: () => {},
  optionWidth: '100%'
};

Dropdown.propTypes = {
  noMargin: PropTypes.bool,
  valid: PropTypes.bool,
  error: PropTypes.bool,
  active: PropTypes.bool,
  innerRef: PropTypes.func,
  optionWidth: PropTypes.string,
  children: PropTypes.node,
  input: PropTypes.object,
  hideError: PropTypes.bool,
  onChange: PropTypes.func
};

export default formComponent(Dropdown);
