import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Label from '../Label';

export const compStyle = css`
  padding: 8px;
  background: #fff;
  width: 100%;
  height: 35px;
  font-weight: 300;
  font-size: 0.85rem;
  color: ${(props) => (props.valid ? props.theme.green : (props.error ? props.theme.red : (props.active ? props.theme.darkBlue : (props.noMeta ? props.darkGray : props.theme.mediumGray))))};
  border: 1px solid ${(props) => (props.error ? props.theme.red : (props.valid ? props.theme.green : (props.active ? props.theme.darkBlue : props.theme.mediumGray)))};
  transition: border 0.3s, color 0.3s;
  &:focus {
    outline: none;
  }
  &::-webkit-input-placeholder {
    color: ${(props) => props.error ? props.theme.red : props.theme.halfOpacityBlue};
  }
  &::-moz-placeholder { /* Firefox 19+ */
    color: ${(props) => props.error ? props.theme.red : props.theme.halfOpacityBlue};
  }
  &:-ms-input-placeholder { /* IE 10+ */
    color: ${(props) => props.error ? props.theme.red : props.theme.halfOpacityBlue};
  }
  &:-moz-placeholder { /* Firefox 18- */
    color: ${(props) => props.error ? props.theme.red : props.theme.halfOpacityBlue};
  }
`;

export const Wrapper = styled.div`
  margin-bottom: ${(props) => !props.noMargin && '3rem'};
  margin-top: ${(props) => props.label && '1rem'};
  position: relative;
  ${(props) => props.width && `width: ${props.width}`}
`;
export const FieldLabel = styled(Label)`
  color: ${(props) => props.error ? props.theme.red : (props.valid ? props.theme.green : (props.active ? props.theme.darkBlue : props.theme.halfOpacityBlue))};
  position: absolute;
  letter-spacing: 0;
  top: 0;
  left: 0;
  font-size: 1.133em;
  transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  transform: scale(0.75) translate(0px, -22px);
  transform-origin: left top 0px;
`;

export const Error = styled.div`
  position: absolute;
  color: ${(props) => props.theme.red};
  font-size: 0.75rem;
  top: 34px;
  opacity: ${(props) => (props.show ? '1' : '0')};
  transform: ${(props) => (props.show ? 'translate3d(0, 0, 0)' : 'translate3d(0, -15px, 0)')};
  transition: transform .15s, opacity 0.3s;
`;

export default function formComponent(ComposedComponent) {
  class WrappedComponent extends React.PureComponent {
    render() {
      const { noMargin, innerRef, meta = {}, input = {}, validateAtLength, width, ...field } = this.props;
      let readyToShow;
      let hideError;
      if (input && meta) {
        readyToShow = validateAtLength ? input.value.length === validateAtLength : meta.touched || (input.value !== '' && meta.pristine);
        hideError = meta.error === 'Invalid date' || meta.error === 'Must be 18 or older' || this.props.hideError;
      }
      return (
        <Wrapper noMargin={noMargin} label={field.label} width={width}>
          {field.label &&
            <FieldLabel
              valid={readyToShow && meta.valid}
              error={readyToShow && meta.invalid}
              active={meta.active}
            >
              {field.label}
            </FieldLabel>
          }
          <ComposedComponent
            {...this.props}
            hideError={hideError}
            valid={readyToShow && meta && meta.valid}
            error={readyToShow && meta && meta.invalid}
            active={meta && meta.active}
          />
          <Error show={readyToShow && meta && meta.invalid && !hideError}>{meta && Array.isArray(meta && meta.error) ? (meta && meta.error[0]) : (meta && meta.error)}</Error>
        </Wrapper>
      );
    }
  }
  WrappedComponent.propTypes = {
    noMargin: PropTypes.bool,
    innerRef: PropTypes.func,
    width: PropTypes.string,
    meta: PropTypes.object,
    input: PropTypes.object,
    validateAtLength: PropTypes.number,
    hideError: PropTypes.bool
  };
  return WrappedComponent;
}
