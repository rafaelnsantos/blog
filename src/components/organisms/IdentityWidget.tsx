import dynamic from 'next/dynamic';
import { InitOptions } from 'netlify-identity-widget';
import { useEffect } from 'react';

export const IdentityWidget = dynamic(
  async () => {
    const identity = await import('netlify-identity-widget');

    (window as any).netlifyIdentity = identity;

    interface IdentityProps {
      config?: InitOptions;
    }

    const Identity = (props: IdentityProps) => {
      useEffect(() => {
        identity.init(props.config);
      }, []);

      return <div></div>;
    };

    return Identity;
  },
  { ssr: false }
);
