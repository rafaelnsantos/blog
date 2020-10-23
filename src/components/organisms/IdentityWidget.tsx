import dynamic from 'next/dynamic';
import { InitOptions } from 'netlify-identity-widget';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { RingLoader } from 'react-spinners';

const Loading = styled.div<{ index: number }>`
  display: grid;
  place-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: var(--bg-primary);
  z-index: ${(props) => props.index};
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
      const [logged, setLogged] = useState(process.env.NODE_ENV !== 'production');

      useEffect(() => {
        identity.init(props.config);

        identity.on('init', (user) => {
          setLoading(false);
          setLogged(!!user);

          if (!user) setTimeout(() => identity.open('login'), 100);
        });

        identity.on('login', (user) => {
          setLogged(!!user);
          if (user) {
            identity.close();
          } else {
            identity.open('login');
          }
        });

        identity.on('logout', () => {
          setLogged(false);
        });

        identity.on('close', () => {
          if (!logged) identity.open('login');
        });

        const iframe = document.getElementById('netlify-identity-widget');
        if (iframe) {
          const element = (iframe as any).contentWindow.document.querySelector(
            'button[class="btnClose"]'
          );

          if (element) element.setAttribute('display', 'none');
        }

        return () => {
          identity.off('init');
          identity.off('login');
          identity.off('logout');
          identity.off('logout');
          identity.off('close');
        };
      }, []);

      if (loading) {
        return (
          <Loading index={9999}>
            <RingLoader size="35vh" color="var(--text-primary)" />
          </Loading>
        );
      }

      if (!logged) {
        return (
          <Loading index={95}>
            <button onClick={() => identity.open('login')}>login</button>
          </Loading>
        );
      }

      return <div></div>;
    };

    return Identity;
  },
  { ssr: false }
);