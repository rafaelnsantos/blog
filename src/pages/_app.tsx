import { AppPropsType } from 'next/dist/next-server/lib/utils';
import '~/theme/global.scss';

const MyApp = ({ Component, pageProps }: AppPropsType) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
