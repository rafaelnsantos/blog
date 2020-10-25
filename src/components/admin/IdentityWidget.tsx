import identity from 'netlify-identity-widget';
import { useEffect } from 'react';

export type OnLoad<T> = (item: T) => void | (() => void | undefined);

export interface IdentityProps {
  config: identity.InitOptions;
  onLoad?: OnLoad<typeof identity>;
}

export const IdentityWidget = (props: IdentityProps) => {
  useEffect(() => {
    (window as any).netlifyIdentity = identity;

    const unmountFn = props.onLoad ? props.onLoad(identity) : undefined;

    identity.init(props.config);

    return unmountFn;
  }, []);

  return <div></div>;
};
