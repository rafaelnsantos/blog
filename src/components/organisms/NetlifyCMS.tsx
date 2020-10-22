import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { CmsConfigFixed } from '~/config/admin';

export const CMS = dynamic(
  async () => {
    const cms = (await import('netlify-cms-app')).default;

    interface CMSProps {
      config: CmsConfigFixed;
      onLoad?: (cmss: typeof cms) => void;
    }

    const CMS = (props: CMSProps) => {
      useEffect(() => {
        cms.init({
          config: props.config,
        });
        if (props.onLoad) props.onLoad(cms);
      }, []);
      return <div></div>;
    };

    return CMS;
  },
  { ssr: false }
);
