import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from 'next-themes';

export function ToggleThemeButton() {
  const [icon, setIcon] = useState<JSX.Element | null>(null);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setIcon(
      theme === 'dark' ? (
        <FaSun size={50} color="var(--accent-yellow)" />
      ) : (
        <FaMoon size={50} color="var(--accent-blue)" />
      )
    );
  }, [theme]);

  const toggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button style={{ width: 50 }} onClick={toggle}>
      {icon}
    </button>
  );
}
