import React, { createContext, useContext, useEffect } from 'react';
import ReactGA from 'react-ga';
export const analitycsContext = createContext(ReactGA);

const { Provider } = analitycsContext;

interface AnalitycsProviderProps {
  children: React.ReactNode;
  trackingId: string;
}

export function GoogleAnalyticsProvider({ children, trackingId }: AnalitycsProviderProps) {
  useEffect(() => {
    ReactGA.initialize(trackingId, {
      debug: process.env.NODE_ENV !== 'production',
    });
  }, []);
  return <Provider value={ReactGA}>{children}</Provider>;
}

export const useGoogleAnalytics = () => useContext(analitycsContext);
