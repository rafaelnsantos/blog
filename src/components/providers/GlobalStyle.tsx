import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    --min-tap-target-height: 48px;

    @media (min-width: 1024px) {
      --min-tap-target-height: 32px;
    }
  }
`