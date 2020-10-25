import { useEffect } from 'react';
import { CmsConfigFixed } from './config';
import CMS from 'netlify-cms-app';
import { OnLoad } from './IdentityWidget';

export interface NetlifyCMSProps {
  config: CmsConfigFixed;
  onLoad?: OnLoad<typeof CMS>;
}

export const NetlifyCMS = (props: NetlifyCMSProps) => {
  useEffect(() => {
    CMS.init({
      config: props.config,
    });

    if (props.onLoad) return props.onLoad(CMS);
  }, []);
  return <div />;
};
