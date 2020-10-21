import { useEffect } from 'react';
import useDarkMode, { DarkMode } from 'use-dark-mode';

export function useThemeMode(callbackx: ((theme: DarkMode) => void) | undefined): DarkMode {
  const darkMode = useDarkMode(undefined, { storageKey: 'dark' });

  useEffect(() => {
    if (callbackx) callbackx(darkMode);
  }, [darkMode.value]);

  return darkMode;
}
