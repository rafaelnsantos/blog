import { NetlifyCMS, NetlifyCMSProps } from './NetlifyCMS';
import { IdentityProps, IdentityWidget } from './IdentityWidget';

import { useState } from 'react';

interface AdminTemplateProps {
  cms: NetlifyCMSProps;
  identity: IdentityProps;
}

export function AdminTemplate(props: AdminTemplateProps) {
  const [logged, setLogged] = useState(process.env.NODE_ENV === 'development');

  return (
    <>
      <IdentityWidget
        config={props.identity.config}
        onLoad={(identity) => {
          if (props.identity.onLoad) props.identity.onLoad(identity);

          identity.on('init', (user) => {
            if (user) {
              setLogged(true);
            } else {
              identity.open('login');
            }
          });

          identity.on('login', () => {
            setLogged(true);
            identity.close();
          });

          identity.on('logout', () => {
            setLogged(false);
            identity.open('login');
          });

          identity.on('close', () => !logged && identity.open('login'));

          return () => {
            identity.off('init');
            identity.off('login');
            identity.off('logout');
            identity.off('close');
          };
        }}
      />
      <NetlifyCMS {...props.cms} />
    </>
  );
}
