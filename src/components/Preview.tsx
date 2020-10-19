import { ReactNode, useState } from 'react';
import { FallbackStyles } from '~/theme/InlineCssVariables';
import COLORS from 'content/colors.json';

interface PreviewProps {
  children: ReactNode;
  colors?: typeof COLORS;
}

export function Preview({ children, colors = COLORS }: PreviewProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <>
      <FallbackStyles colors={colors} theme={theme} />
      <button onClick={toggleTheme}>theme</button>
      {children}
    </>
  );
}
