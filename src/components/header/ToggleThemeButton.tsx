import useDarkMode from 'use-dark-mode';

export function ToggleThemeButton() {
  const darkMode = useDarkMode(null, { storageKey: 'theme' });

  return <button onClick={darkMode.toggle}>{darkMode.value ? 'light theme' : 'dark theme'}</button>;
}
