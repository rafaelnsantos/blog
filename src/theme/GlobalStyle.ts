import { createGlobalStyle } from 'styled-components';
import COLORS from 'content/colors.json';

export const GlobalStyle = createGlobalStyle`
  :root {
    ${Object.entries(COLORS).reduce((acc, [name, colorByTheme]) => {
      return `${acc}\n--${name}: ${colorByTheme.light};`;
    }, '')}
  }

  [data-theme='dark'] {
    ${Object.entries(COLORS).reduce((acc, [name, colorByTheme]) => {
      return `${acc}\n--${name}: ${colorByTheme.dark};`;
    }, '')}
  }
`;
