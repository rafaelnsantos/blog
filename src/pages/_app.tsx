import React from 'react';
import { AppPropsType } from 'next/dist/next-server/lib/utils';
import { Header } from '~/components/header';
import { Providers } from '~/components/providers';

import '~/theme/global.css';
import './blog/markdown.css';
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
