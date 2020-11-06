import { Tokens } from 'tokens';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Tokens {}
}

declare module 'styled-system' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface RequiredTheme extends Tokens, Required<Theme> {}
}
