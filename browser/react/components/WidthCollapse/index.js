import styled from 'styled-components';
/**
 * A styled `div` element
 * @type {React.Component}
 */
const WidthCollapse = styled.div`
  &.collapse-enter {
    width: 0;
    overflow: hidden;
  }

  &.collapse-enter-active {
    width: ${(props) => (props.width ? `${props.width}px` : '45px')};
    transition: width ${(props) => (props.ms ? props.ms : 200)}ms ease-out;
  }
  
  &.collapse-leave {
    width: ${(props) => (props.width ? `${props.width}px` : '45px')};
  }
  
  &.collapse-leave-active {
    width: 0;
    overflow: hidden;
    transition: width ${(props) => (props.ms ? props.ms : 200)}ms ease-out;
  }
`;

export default WidthCollapse;
