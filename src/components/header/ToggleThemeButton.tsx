import { useEffect } from 'react';
import useDarkMode from 'use-dark-mode';
import { COLORS } from '~/theme/colors';

export function ToggleThemeButton() {
  const darkMode = useDarkMode(null, { storageKey: 'dark' });

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDarkFromMQ = darkMode.value !== null ? darkMode.value : mql.matches;
    const colorMode = prefersDarkFromMQ ? 'dark' : 'light';

    const root = document.documentElement;

    Object.entries(COLORS).forEach(([name, colorByTheme]) => {
      const cssVarName = `--${name}`;

      root.style.setProperty(cssVarName, colorByTheme[colorMode]);
    });
  }, [darkMode, darkMode.value]);

  if (darkMode.value === null) return null;

  return <button onClick={darkMode.toggle}>{darkMode.value ? 'light theme' : 'dark theme'}</button>;
}
