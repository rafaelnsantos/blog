/*
This code comes from https://joshwcomeau.com/gatsby/dark-mode/
It uses the users' prefers-color-scheme media query to inline
CSS variables into the :root of the page before any content is 
rendered.
*/

import Terser from 'terser';
import COLORS from 'content/colors.json';
import { setHTMLColors } from '~/utils/setHtmlColors';

export function setColorsByTheme(): void {
  const colors = '🌈';

  setHTMLColors(colors as any, {
    localStorageKey: true,
  });
}

export function MagicScriptTag({ colors }: FallbackStyles) {
  const boundFn = String(setColorsByTheme).replace("'🌈'", JSON.stringify(colors));

  let calledFunction = `(${boundFn})()`;

  calledFunction = Terser.minify(calledFunction).code as string;

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: calledFunction }} />;
}

interface FallbackStyles {
  colors: typeof COLORS;
  theme?: 'light' | 'dark';
}

// if user doesn't have JavaScript enabled, set variables properly in a
// head style tag anyways (light mode)
export function FallbackStyles({ colors, theme = 'light' }: FallbackStyles) {
  const cssVariableString = Object.entries(colors).reduce((acc, [name, colorByTheme]) => {
    return `${acc}\n--${name}: ${colorByTheme[theme]};`;
  }, '');

  const wrappedInSelector = `html { ${cssVariableString} }`;

  return <style>{wrappedInSelector}</style>;
}
