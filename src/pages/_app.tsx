import { AppPropsType } from 'next/dist/next-server/lib/utils';
import { GlobalStyle } from '~/styles/global';

import './app.scss';

const MyApp = ({ Component, pageProps }: AppPropsType) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
