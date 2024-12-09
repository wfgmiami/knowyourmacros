import styled from 'styled-components';

/**
 * A styled `div` element
 * @type {React.Component}
 */
const HeightCollapse = styled.div`
  &.collapse-enter {
    height: 0;
    overflow: hidden;
  }

  &.collapse-enter-active {
    height: ${(props) => (props.height ? `${props.height}` : '45px')};
    transition: height ${(props) => (props.ms ? props.ms : 200)}ms ease-out;
  }
  
  &.collapse-leave {
    height: ${(props) => (props.height ? `${props.height}` : '45px')};
  }
  
  &.collapse-leave-active {
    height: 0;
    overflow: hidden;
    transition: height ${(props) => (props.ms ? props.ms : 200)}ms ease-out;
  }
`;

export default HeightCollapse;
