import { GlobalStyle } from './GlobalStyle';

export function Providers(props) {
  return (
    <>
      <GlobalStyle />
      {props.children}
    </>
  );
}
