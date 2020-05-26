import { SEO } from './seo';
import { GlobalStyle } from './GlobalStyle';

export function Providers(props) {
  return (
    <>
      <SEO />
      <GlobalStyle />
      {props.children}
    </>
  );
}
