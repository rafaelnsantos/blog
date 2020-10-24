import identity, { InitOptions, User } from 'netlify-identity-widget';
import { ReactNode, useEffect, useState } from 'react';

export interface IdentityProps {
  config?: InitOptions;
  onLogin?: (identit: typeof identity, user: User | null) => void;
  onLogout?: (identit: typeof identity) => void;
  onInit?: (identit: typeof identity, user: User | null) => void;
  onClose?: (identit: typeof identity, user: User | null) => void;
  Loading?: ReactNode;
}

export const IdentityWidget = (props: IdentityProps) => {
  const [loading, setLoading] = useState(process.env.NODE_ENV === 'production');

  useEffect(() => {
    (window as any).netlifyIdentity = identity;

    identity.init(props.config);

    identity.on('init', (user) => {
      setTimeout(() => {
        setLoading(false);
        if (props.onInit) props.onInit(identity, user);
      }, 100);
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

    return () => {
      identity.off('init');
      identity.off('login');
      identity.off('logout');
      identity.off('close');
    };
  }, []);

  if (loading && props.Loading) {
    return <>{props.Loading}</>;
  }

  return <div></div>;
};