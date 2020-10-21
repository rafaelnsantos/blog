import { google } from 'googleapis';
import ga from 'content/analytics.json';
const scopes = 'https://www.googleapis.com/auth/analytics';

const jwt = new google.auth.JWT({
  email: ga.clientEmail,
  key: process.env.GOOGLE_ANALYTICS_KEY,
  scopes,
});

export const analytics = (params: any) => {
  return google.analytics('v3').data.ga.get({
    auth: jwt,
    ids: `ga:${ga.viewID}`,
    ...params,
  });
};
