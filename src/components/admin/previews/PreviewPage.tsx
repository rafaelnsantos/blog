import { ReactNode, useState } from 'react';
import { PreviewStyles } from '~/theme/PreviewStyles';
import COLORS from 'content/colors.json';

interface PreviewProps {
  children: ReactNode;
  colors?: typeof COLORS;
}

export function PreviewPage({ children, colors = COLORS }: PreviewProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <>
      <PreviewStyles colors={colors} theme={theme} />
      <button onClick={toggleTheme}>theme</button>
      {children}
    </>
  );
}
