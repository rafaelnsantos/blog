import identity from 'netlify-identity-widget';
import { useEffect } from 'react';

export interface IdentityProps {
  config?: identity.InitOptions;
  onLoad?: (identit: typeof identity) => void | (() => void | undefined);
}

export const IdentityWidget = (props: IdentityProps) => {
  useEffect(() => {
    (window as any).netlifyIdentity = identity;

    const unmountFn = props.onLoad ? props.onLoad(identity) : null;

    identity.init(props.config);

    if (typeof unmountFn === 'function') {
      return unmountFn();
    }
  }, []);

  return <div></div>;
};
