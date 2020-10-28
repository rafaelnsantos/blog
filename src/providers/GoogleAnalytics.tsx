import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { GenericProvider } from './Provider';

interface AnalitycsProviderProps {
  trackingId: string;
}

export const [GoogleAnalyticsProvider, useGoogleAnalytics] = GenericProvider<
  AnalitycsProviderProps,
  typeof ReactGA
>(({ trackingId }) => {
  useEffect(() => {
    ReactGA.initialize(trackingId, {
      debug: process.env.NODE_ENV !== 'production',
    });
    (window as any).gtag = ReactGA;
  }, []);

  return ReactGA;
}, ReactGA);
