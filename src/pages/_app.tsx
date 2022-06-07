import { AppProps, NextWebVitalsMetric } from 'next/app';
import '~/theme/global.scss';
import ReactGA from 'react-ga';

import { gaTrackingID } from 'content/analytics.json';
import { GoogleAnalyticsProvider } from '~/providers/GoogleAnalytics';
import { ThemeProvider } from 'styled-components';
import { tokens } from 'tokens';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <GoogleAnalyticsProvider trackingId={gaTrackingID}>
      <ThemeProvider theme={tokens}>{getLayout(<Component {...pageProps} />)}</ThemeProvider>
    </GoogleAnalyticsProvider>
  );
};

export function reportWebVitals({ id, name, label, value }: NextWebVitalsMetric) {
  const gtag: typeof ReactGA = (window as any).gtag;

  if (process.env.NODE_ENV !== 'production' || !gtag) return;

  gtag.event({
    category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
    action: name,
  });
}

export default MyApp;
