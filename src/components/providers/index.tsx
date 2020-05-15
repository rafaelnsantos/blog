import { SEO } from "./seo";
import { DarkModeProvider } from "./DarkMode";
import { GlobalStyle } from "./GlobalStyle";

export function Providers (props) {
  return (
    <>
      <DarkModeProvider />
      <SEO />
      <GlobalStyle />
      {props.children}
    </>
  )
}