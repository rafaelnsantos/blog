import * as identity from 'netlify-identity-widget';
import { useEffect } from 'react';

export interface IdentityProps {
  config?: identity.InitOptions;
  onLogin?: (identit: typeof identity, user: identity.User | null) => void;
  onLogout?: (identit: typeof identity) => void;
  onInit?: (identit: typeof identity, user: identity.User | null) => void;
  onClose?: (identit: typeof identity, user: identity.User | null) => void;
}

export const IdentityWidget = (props: IdentityProps) => {
  useEffect(() => {
    identity.on('init', (user) => {
      if (props.onInit) props.onInit(identity, user);
    });

    identity.on('login', (user) => {
      if (props.onLogin) props.onLogin(identity, user);
    });

    identity.on('logout', () => {
      if (props.onLogout) props.onLogout(identity);
    });

    identity.on('close', () => {
      if (props.onClose) props.onClose(identity, identity.currentUser());
    });

    identity.init(props.config);

    return () => {
      identity.off('init');
      identity.off('login');
      identity.off('logout');
      identity.off('close');
    };
  }, []);

  return <div></div>;
};
