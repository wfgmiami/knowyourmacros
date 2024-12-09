import styled from 'styled-components';
import Label from '../Label';

/* eslint-disable no-nested-ternary */

export const Toggler = styled.div`
  cursor: pointer;
  min-height: 35px;
  padding: 8px;
  flex-direction: row;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: ${(props) => (props.toggled ? '1px solid #E1E1E1' : 'none')};
  /* padding-bottom: ${(props) => (props.toggled ? '8px' : 'none')}; */
  /* margin-bottom: ${(props) => (props.toggled ? '8px' : 'none')}; */
  /* color: ${(props) => ((props.placeholder && !props.value) ? props.theme.mediumGray : 'inherit')}; */
  color: ${(props) => (props.error ? props.theme.red : (props.valid ? props.theme.green : props.theme.blue))};
`;

export const Wrapper = styled.div`
  width: 100%;
  border: 1px solid;
  /* min-height: 35px; */
  border-color: ${(props) => (props.error ? props.theme.red : (props.valid ? props.theme.green : (props.active ? props.theme.darkBlue : props.theme.mediumGray)))};
  /* color: ${(props) => (props.error ? props.theme.red : (props.valid ? props.theme.green : props.theme.blue))}; */
  /* padding: 8px; */
  /* border-radius: 4px; */
  transition: border 0.3s, color 0.3s;
  background: white;
  z-index: 2;
  position: relative;
  font-weight: 300;
  appearance: none;
  &:focus {
    outline: none;
  }
  &::-webkit-input-placeholder {
    color: ${(props) => (props.error ? props.theme.red : props.theme.halfOpacityBlue)};
  }
  &::-moz-placeholder { /* Firefox 19+ */
    color: ${(props) => (props.error ? props.theme.red : props.theme.halfOpacityBlue)};
  }
  &:-ms-input-placeholder { /* IE 10+ */
    color: ${(props) => (props.error ? props.theme.red : props.theme.halfOpacityBlue)};
  }
  &:-moz-placeholder { /* Firefox 18- */
    color: ${(props) => (props.error ? props.theme.red : props.theme.halfOpacityBlue)};
  }
  margin-bottom: ${(props) => !props.noMargin && '3rem'};
  /* margin-top: ${(props) => !props.noMargin && '1rem'}; */
  position: relative;
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

export const ChildWrapper = styled.div`
  padding: ${(props) => (props.optionWidth === '100%' ? '8px' : '0px')};
  border-top: ${(props) => ((props.ix !== 0 && props.optionWidth === '100%') ? '1px solid #f2f2f2' : 'none')};
  display: inline-block;
  width: ${(props) => (props.optionWidth ? props.optionWidth : '100%')};
  :hover {
    background-color: rgba(0, 0, 0, 0.02);
    cursor: pointer;
  }
`;

export const Clear = styled.span`
  color: #E1E1E1;
  font-size: 10pt;
  padding-left: 10px;
  padding-bottom: 10px;
  :hover {
    color: gray;
  }
`;
