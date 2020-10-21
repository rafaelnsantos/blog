import { AppPropsType } from 'next/dist/next-server/lib/utils';
import '~/theme/global.scss';

import { gaTrackingID } from 'content/analytics.json';
import { GoogleAnalyticsProvider } from '~/providers/GoogleAnalytics';

const MyApp = ({ Component, pageProps }: AppPropsType) => {
  return (
    <GoogleAnalyticsProvider trackingId={gaTrackingID}>
      <Component {...pageProps} />
    </GoogleAnalyticsProvider>
  );
};

export default MyApp;
