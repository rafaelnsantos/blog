import { AppPropsType } from 'next/dist/next-server/lib/utils';
import { Header } from '~/components/header/Header';
import { Providers } from '~/components/providers';

import './app.scss';

const MyApp = ({ Component, pageProps }: AppPropsType) => {
  return (
    <Providers>
      <Header
        links={[
          { title: 'home', path: '/' },
          { title: 'blog', path: '/blog' },
        ]}
      />
      <Component {...pageProps} />
    </Providers>
  );
};

export default MyApp;
