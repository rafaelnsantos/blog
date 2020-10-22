import dynamic from 'next/dynamic';
import { InitOptions } from 'netlify-identity-widget';
import { useEffect, useState } from 'react';

export const IdentityWidget = dynamic(
  async () => {
    const identity = await import('netlify-identity-widget');

    (window as any).netlifyIdentity = identity;

    interface IdentityProps {
      config?: InitOptions;
    }

    const Identity = (props: IdentityProps) => {
      const [loaded, setLoaded] = useState(process.env.NODE_ENV !== 'production');
      useEffect(() => {
        identity.init(props.config);
        identity.on('init', () => {
          setLoaded(true);
        });
      }, []);

      if (!loaded) {
        return (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999,
            }}
          >
            loading
          </div>
        );
      }
      return <div></div>;
    };

    return Identity;
  },
  { ssr: false }
);
