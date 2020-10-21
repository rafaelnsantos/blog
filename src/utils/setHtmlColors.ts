import COLORS from 'content/colors.json';

export function setHtmlColors(colors = COLORS, theme: 'light' | 'dark') {
  const root = document.documentElement;

  Object.entries(colors).forEach(([name, colorByTheme]) => {
    const cssVarName = `--${name}`;

    root.style.setProperty(cssVarName, colorByTheme[theme]);
  });
}
