import dynamic from 'next/dynamic';
import { InitOptions } from 'netlify-identity-widget';
import { ComponentProps, useEffect } from 'react';
import { CMS } from './NetlifyCMS';

export const IdentityWidget = dynamic(
  async () => {
    const identity = await import('netlify-identity-widget');

    (window as any).netlifyIdentity = identity;

    interface IdentityProps {
      config?: InitOptions;
      cmsConfig: ComponentProps<typeof CMS>;
    }

    const Identity = (props: IdentityProps) => {
      useEffect(() => {
        identity.init(props.config);
      }, []);

      return (
        <div>
          <CMS config={props.cmsConfig.config} onLoad={props.cmsConfig.onLoad} />
        </div>
      );
    };

    return Identity;
  },
  { ssr: false }
);
