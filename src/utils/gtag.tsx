/* eslint-disable @typescript-eslint/camelcase */
import { gaTrackingID as GA_TRACKING_ID } from 'content/analytics.json';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  (window as any).gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: any) => {
  (window as any).gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const Gtag = () => (
  <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
);

export const PageView = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_TRACKING_ID}', {
      page_path: window.location.pathname,
    });
  `,
    }}
  />
);
