import { useEffect } from 'react';
import { CmsConfigFixed } from './config';
import CMS from 'netlify-cms-app';

export interface NetlifyCMSProps {
  config: CmsConfigFixed;
  onLoad?: (cms: typeof CMS) => void;
}

export const NetlifyCMS = (props: NetlifyCMSProps) => {
  useEffect(() => {
    CMS.init({
      config: props.config,
    });
    if (props.onLoad) props.onLoad(CMS);
  }, []);
  return <div />;
};
