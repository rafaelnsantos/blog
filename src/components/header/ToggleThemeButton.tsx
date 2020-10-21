import { useState } from 'react';
import COLORS from 'content/colors.json';
import { FaSun, FaMoon } from 'react-icons/fa';
import { setHTMLColors } from '~/utils/setHtmlColors';
import { useThemeMode } from '~/hooks/useThemeMode';

export function ToggleThemeButton() {
  const [icon, setIcon] = useState<JSX.Element | null>(null);

  const { toggle } = useThemeMode((darkMode) => {
    setHTMLColors(COLORS, { darkMode: darkMode.value });

    setIcon(
      darkMode.value ? (
        <FaSun size={50} color="var(--accent-yellow)" />
      ) : (
        <FaMoon size={50} color="var(--accent-blue)" />
      )
    );
  });

  return <button onClick={toggle}>{icon}</button>;
}
