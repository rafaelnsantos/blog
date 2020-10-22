import { InitOptions } from 'netlify-identity-widget';
import { CmsConfigFixed } from '~/config/admin';
import { CMS } from '../organisms/NetlifyCMS';
import { IdentityWidget } from '../organisms/IdentityWidget';

import { PostPreview } from '~/components/admin/previews/PostPreview';
import { ColorPreview } from '~/components/admin/previews/ColorPreview';
import { ColorWidget } from '~/components/admin/widgets/ColorWidget';

interface AdminTemplateProps {
  cmsConfig: CmsConfigFixed;
  identityConfig?: InitOptions;
}

export function AdminTemplate(props: AdminTemplateProps) {
  return (
    <>
      <IdentityWidget config={props.identityConfig} />
      <CMS
        onLoad={(cms) => {
          cms.registerPreviewStyle('/style/preview/preview.css');
          cms.registerPreviewStyle('/style/preview/global.css');
          cms.registerPreviewStyle('/style/preview/markdown.css');
          cms.registerPreviewTemplate('blog', PostPreview);
          cms.registerPreviewTemplate('colors', ColorPreview);
          cms.registerWidget('color', ColorWidget);
        }}
        config={props.cmsConfig}
      />
    </>
  );
}
