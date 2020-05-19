import useDarkMode from 'use-dark-mode';

export function ToggleThemeButton() {
  const darkMode = useDarkMode(null, { storageKey: 'theme' });

  if (darkMode.value === null) return null;

  return <button onClick={darkMode.toggle}>{darkMode.value ? 'light theme' : 'dark theme'}</button>;
}
