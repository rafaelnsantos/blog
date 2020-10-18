import { AppPropsType } from 'next/dist/next-server/lib/utils';
import { GlobalCSS } from '~/theme/GlobalCSS';
import '~/theme/global.scss';

const MyApp = ({ Component, pageProps }: AppPropsType) => {
  return (
    <>
      <GlobalCSS />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
