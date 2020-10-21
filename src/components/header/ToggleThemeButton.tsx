import { useEffect, useState } from 'react';
import useDarkMode from 'use-dark-mode';
import COLORS from 'content/colors.json';
import { FaSun, FaMoon } from 'react-icons/fa';
import { setThemeColor } from '~/utils/setThemeColor';
import { setHtmlColors } from '~/utils/setHtmlColors';
import { getColorMode } from '~/utils/getColorMode';

export function ToggleThemeButton() {
  const darkMode = useDarkMode(undefined, { storageKey: 'dark' });
  const [icon, setIcon] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const colorMode = getColorMode({ darkMode: darkMode.value });

    setThemeColor(COLORS['bg-primary'][colorMode]);

    setHtmlColors(COLORS, colorMode);

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
