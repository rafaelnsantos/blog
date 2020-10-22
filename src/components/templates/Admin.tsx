import { InitOptions } from 'netlify-identity-widget';
import { CmsConfigFixed } from '~/config/admin';
import { CMS } from '../organisms/NetlifyCMS';
import { IdentityWidget } from '../organisms/IdentityWidget';
import dynamic from 'next/dynamic';

interface AdminTemplateProps {
  cmsConfig: CmsConfigFixed;
  identityConfig?: InitOptions;
}

const PostPreview = dynamic(
  async () => (await import('~/components/admin/previews/PostPreview')).PostPreview
);

const ColorPreview = dynamic(
  async () => (await import('~/components/admin/previews/ColorPreview')).ColorPreview
);

const ColorWidget = dynamic(
  async () => (await import('~/components/admin/widgets/ColorWidget')).ColorWidget
);

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
