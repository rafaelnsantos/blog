import COLORS from 'content/colors.json';

interface PreviewStylesProps {
  colors: typeof COLORS;
  theme?: 'light' | 'dark';
}

export function PreviewStyles({ colors, theme = 'light' }: PreviewStylesProps) {
  const cssVariableString = Object.entries(colors).reduce((acc, [name, colorByTheme]) => {
    return `${acc}\n--${name}: ${colorByTheme[theme]};`;
  }, '');

  const wrappedInSelector = `html { ${cssVariableString} }
`;

  return <style>{wrappedInSelector}</style>;
}
