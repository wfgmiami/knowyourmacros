import { css } from 'styled-components';
import color from 'color';
import theme from 'theme';

/** @type {Function} */
const darken = (clr, dec = 0.18) => color(clr).darken(dec).string();

/**
 * @type {Function}
 */
export const active = css`
${(props) => {
    let thm;
    Object.keys(theme).forEach((th) => {
      if (props[th]) thm = th;
    });

    if (!thm) return null;

    return `
    color: ${props.theme[thm].color};
    background: ${props.theme[thm].background === 'hsl(0,0%,60%)' ? darken(props.theme[thm].background, 0.1) : darken(props.theme[thm].background)};
    border-color: ${darken(props.theme[thm].borderColor)};
  `;
  }}
  `;

/**
 * @type {Function}
 */
export const fixed = css`
${(props) => {
    let thm;
    Object.keys(theme).forEach((th) => {
      if (props[th]) thm = th;
    });

    if (!thm) return null;

    return `
    color: ${props.theme[thm].color || '#fff'};
    background: ${props.theme[thm].background};
    border-color: ${props.theme[thm].borderColor};

    &.active {
      ${active}
    }
    `;
  }}
  `;

/**
 * @type {Function}
 */
export default css`
${(props) => {
    let thm;
    Object.keys(theme).forEach((th) => {
      if (props[th]) thm = th;
    });

    if (!thm) return null;

    return `
    color: ${props.theme[thm].color};
    background: ${props.theme[thm].background};
    border-color: ${props.theme[thm].borderColor};
    
    &:hover, &:active, &:focus, &.active {
      ${`
          color: ${color(darken(props.theme[thm].background)).light() ? '#000' : '#fff'};
          background: ${props.theme[thm].background === 'hsl(0,0%,60%)' ? darken(props.theme[thm].background, 0.1) : darken(props.theme[thm].background)};
          border-color: ${darken(props.theme[thm].borderColor)};
  `
}}
    }
    `;
  }}
`;
