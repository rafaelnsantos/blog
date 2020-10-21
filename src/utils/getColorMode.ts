export interface GetColorModeOptions {
  darkMode?: boolean;
  localStorageKey?: boolean;
}

export function getColorMode(options?: GetColorModeOptions) {
  const mql = window.matchMedia('(prefers-color-scheme: dark)');

  let colorMode: 'light' | 'dark' = 'light';

  if (!options) return colorMode;

  if (options.darkMode) {
    const prefersDarkFromMQ = options.darkMode !== null ? options.darkMode : mql.matches;
    colorMode = prefersDarkFromMQ ? 'dark' : 'light';
  } else if (options.localStorageKey) {
    const hasUsedToggle = window.localStorage.getItem('dark');

    if (hasUsedToggle) {
      colorMode = hasUsedToggle === 'true' ? 'dark' : 'light';
    }
  }

  return colorMode;
}
