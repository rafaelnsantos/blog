import COLORS from 'content/colors.json';
import { getColorMode, GetColorModeOptions } from './getColorMode';
import { setThemeColor } from './setThemeColor';

function setHtmlColors(theme: 'light' | 'dark', colors = COLORS): void {
  const root = document.documentElement;

  Object.entries(colors).forEach(([name, colorByTheme]) => {
    const cssVarName = `--${name}`;

    root.style.setProperty(cssVarName, colorByTheme[theme]);
  });
}

export function setHTMLColors(colors: typeof COLORS, options?: GetColorModeOptions) {
  const colorMode = getColorMode(options);

  setThemeColor(colors['bg-primary'][colorMode]);

  setHtmlColors(colorMode, colors);
}
