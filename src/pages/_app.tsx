import { AppPropsType } from 'next/dist/next-server/lib/utils';
import './app.scss';

const MyApp = ({ Component, pageProps }: AppPropsType) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
