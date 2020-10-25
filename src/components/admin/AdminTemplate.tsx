import { NetlifyCMS, NetlifyCMSProps } from './NetlifyCMS';
import { IdentityProps, IdentityWidget } from './IdentityWidget';

import { PostPreview } from './previews/PostPreview';
import { ColorPreview } from './previews/ColorPreview';
import { ColorWidget } from './widgets/ColorWidget';
import { useEffect, useState } from 'react';

interface AdminTemplateProps {
  cmsConfig: NetlifyCMSProps['config'];
  identityConfig?: IdentityProps['config'];
}

export function AdminTemplate(props: AdminTemplateProps) {
  const [logged, setLogged] = useState(false);

  return (
    <>
      <IdentityWidget
        config={props.identityConfig}
        onLoad={(identity) => {
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
      <NetlifyCMS
        config={props.cmsConfig}
        onLoad={(cms) => {
          cms.registerPreviewStyle('/style/preview/preview.css');
          cms.registerPreviewStyle('/style/preview/global.css');
          cms.registerPreviewStyle('/style/preview/markdown.css');
          cms.registerPreviewTemplate('blog', PostPreview);
          cms.registerPreviewTemplate('colors', ColorPreview);
          cms.registerWidget('color', ColorWidget);
        }}
      />
    </>
  );
}
