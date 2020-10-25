import ReactGA from 'react-ga';
import { GenericProvider } from './Provider';

interface AnalitycsProviderProps {
  trackingId: string;
}

export const [GoogleAnalyticsProvider, useGoogleAnalytics] = GenericProvider<
  AnalitycsProviderProps,
  typeof ReactGA
>(({ trackingId }) => {
  ReactGA.initialize(trackingId, {
    debug: process.env.NODE_ENV !== 'production',
  });

  return ReactGA;
}, ReactGA);
