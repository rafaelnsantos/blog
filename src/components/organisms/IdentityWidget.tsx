import dynamic from 'next/dynamic';
import { InitOptions } from 'netlify-identity-widget';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RingLoader } from 'react-spinners';

const Loading = styled.div`
  display: grid;
  place-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: var(--bg-primary);
  z-index: 9999;
`;

export const IdentityWidget = dynamic(
  async () => {
    const identity = await import('netlify-identity-widget');

    (window as any).netlifyIdentity = identity;

    interface IdentityProps {
      config?: InitOptions;
    }

    const Identity = (props: IdentityProps) => {
      const [loading, setLoading] = useState(process.env.NODE_ENV === 'production');
      useEffect(() => {
        identity.init(props.config);
        identity.on('init', () => {
          setLoading(false);
        });
      }, []);

      if (loading) {
        return (
          <Loading>
            <RingLoader size="35vh" color="var(--text-primary)" />
          </Loading>
        );
      }
      return <div></div>;
    };

    return Identity;
  },
  { ssr: false }
);
