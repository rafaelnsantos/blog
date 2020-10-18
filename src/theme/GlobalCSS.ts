import { createGlobalStyle } from 'styled-components';

export const GlobalCSS = createGlobalStyle`

html {
  background: var(--bg-primary);
  transition: all 300ms ease;
}

body {
  color: var(--text-primary);
  font-family: "Fira Mono", monospace;
  padding: 1rem;
}

a {
  color: var(--text-link);
}
`;
