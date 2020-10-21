import ReactGA from 'react-ga';
import { ProviderBase } from './Provider';

interface AnalitycsProviderProps {
  trackingId: string;
}

export const [GoogleAnalyticsProvider, useGoogleAnalytics] = ProviderBase<
  typeof ReactGA,
  AnalitycsProviderProps
>(({ trackingId }) => {
  ReactGA.initialize(trackingId, {
    debug: process.env.NODE_ENV !== 'production',
  });
  return ReactGA;
}, ReactGA);
