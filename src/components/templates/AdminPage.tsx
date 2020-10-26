import Head from 'next/head';

import { PostPreview } from '~/components/admin/previews/PostPreview';
import { ColorPreview } from '~/components/admin/previews/ColorPreview';
import { ColorWidget } from '~/components/admin/widgets/ColorWidget';

import { IdentityWidget, NetlifyCMS, CmsConfig, IdentityConfig } from '@monx/react-netlifycms';

interface AdminTemplateProps {
  config: {
    cms: CmsConfig;
    identity: IdentityConfig;
  };
}

export default function AdminTemplate(props: AdminTemplateProps) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <IdentityWidget
        config={props.config.identity}
        onLoad={(identity) => {
          identity.on('init', (user) => !user && identity.open('login'));

          identity.on('logout', () => identity.open('login'));
        }}
      />
      <NetlifyCMS
        config={props.config.cms}
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
