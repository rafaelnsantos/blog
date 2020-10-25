import { NetlifyCMS, NetlifyCMSProps } from './NetlifyCMS';
import { IdentityProps, IdentityWidget } from './IdentityWidget';

import { useState } from 'react';

interface AdminTemplateProps {
  cms: NetlifyCMSProps;
  identity: IdentityProps;
}

export function AdminTemplate(props: AdminTemplateProps) {
  return (
    <>
      <IdentityWidget
        config={props.identity.config}
        onLoad={(identity) => {
          if (props.identity.onLoad) props.identity.onLoad(identity);

          identity.on('init', (user) => {
            if (!user) {
              identity.open('login');
            }
          });

          identity.on('login', () => {
            identity.close();
          });

          identity.on('logout', () => {
            identity.open('login');
          });

          identity.on('close', () => {
            if (!identity.currentUser()) {
              identity.open('login');
            }
          });

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
