import styled from 'styled-components';
import color from 'color';
import media from 'theme/media';
import colorCSS, { active, fixed } from 'colorCSS';
/**
 * A styled `div` element
 * @type {React.Component}
 */
const Nav = styled.div`
  background-color: ${color('#333').lighten(0.99).toString()};
  border-bottom: 3px solid;
  overflow: hidden;
  top: 0px;
  position: fixed;
  width: 100%;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  ${fixed}

  & a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 10px;
    text-decoration: none;
    font-size: 15px;

    ${colorCSS}
  }

  & a:hover {
    ${active}
  }

  & a.active {
    ${active}
  }

  & a.smallScreen {
    display: none;
  }

  & .icon {
    display: none;
  }

  ${media.mdDown`
    min-height: 35px;
      & a {
        display: ${(props) => (props.displayAll ? 'block' : 'none')};
        padding: ${(props) => (props.displayAll ? '20px 10px' : '10px')};
      }
      & a.icon {
        float: right;
        display: block;
      }
      & a.smallScreen {
        display: block;
      }
      &.responsive a.icon {
        position: absolute;
        right: 0;
        top: 0;
      }
      &.responsive a {
        float: none;
        display: block;
        text-align: left;
      }
    }
  `};
`;

export default Nav;
