import { useEffect, useState } from 'react';
import useDarkMode from 'use-dark-mode';
import COLORS from 'content/colors.json';
import { FaSun, FaMoon } from 'react-icons/fa';

export function ToggleThemeButton() {
  const darkMode = useDarkMode(undefined, { storageKey: 'dark' });
  const [icon, setIcon] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const prefersDarkFromMQ = darkMode.value !== null ? darkMode.value : mql.matches;
    const colorMode = prefersDarkFromMQ ? 'dark' : 'light';

    const root = document.documentElement;

    const meta = document.querySelector('meta[name=theme-color]');

    meta && meta.setAttribute('content', COLORS['bg-primary'][darkMode.value ? 'dark' : 'light']);

    Object.entries(COLORS).forEach(([name, colorByTheme]) => {
      const cssVarName = `--${name}`;

      root.style.setProperty(cssVarName, colorByTheme[colorMode]);
    });

    setIcon(
      darkMode.value ? (
        <FaSun size={50} color="var(--accent-yellow)" />
      ) : (
        <FaMoon size={50} color="var(--accent-blue)" />
      )
    );
  }, [darkMode.value]);

  if (darkMode.value === null) return null;

  return <button onClick={darkMode.toggle}>{icon}</button>;
}
