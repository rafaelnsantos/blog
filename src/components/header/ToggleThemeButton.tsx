import { useEffect, useState } from 'react';
import useDarkMode from 'use-dark-mode';
import COLORS from 'content/colors.json';
import { FaSun, FaMoon } from 'react-icons/fa';
import { setHTMLColors } from '~/utils/setHtmlColors';

export function ToggleThemeButton() {
  const darkMode = useDarkMode(undefined, { storageKey: 'dark' });
  const [icon, setIcon] = useState<JSX.Element | null>(null);

  useEffect(() => {
    setHTMLColors(COLORS, { darkMode: darkMode.value });

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
