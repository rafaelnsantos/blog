import { NetlifyCMS, NetlifyCMSProps } from './NetlifyCMS';
import { IdentityProps, IdentityWidget } from './IdentityWidget';

import { PostPreview } from './previews/PostPreview';
import { ColorPreview } from './previews/ColorPreview';
import { ColorWidget } from './widgets/ColorWidget';

interface AdminTemplateProps {
  cmsConfig: NetlifyCMSProps['config'];
  identityConfig?: IdentityProps['config'];
}

export function AdminTemplate(props: AdminTemplateProps) {
  return (
    <>
      <IdentityWidget
        config={props.identityConfig}
        onInit={(identity, user) => !user && identity.open('login')}
        onLogin={(identity, user) => (user ? identity.close() : identity.open('login'))}
        onClose={(identity, user) => !user && identity.open('login')}
        onLogout={(identity) => identity.open('login')}
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
