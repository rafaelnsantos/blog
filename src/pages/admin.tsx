/* eslint-disable @typescript-eslint/camelcase */
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { CmsConfig } from 'netlify-cms-core';
import { PostPreview } from '~/components/admin/previews/PostPreview';
import { ColorPreview } from '~/components/admin/previews/ColorPreview';
import { ColorWidget } from '~/components/admin/widgets/ColorWidget';
import { collections } from '~/config/admin';
interface ConfigFixed extends CmsConfig {
  local_backend?: boolean;
  load_config_file?: boolean;
}

const cmsConfig: ConfigFixed = {
  backend: {
    name: 'git-gateway',
    branch: 'master',
  },
  media_folder: 'public/uploads',
  public_folder: 'uploads',
  collections,
  local_backend: process.env.NODE_ENV !== 'production',
  load_config_file: false,
};

const CMS = dynamic(
  async () => {
    const cms = (await import('netlify-cms-app')).default;
    const CMS = () => <div />;
    cms.init({
      config: cmsConfig,
    });
    cms.registerPreviewStyle('/style/preview/preview.css');
    cms.registerPreviewStyle('/style/preview/global.css');
    cms.registerPreviewStyle('/style/preview/markdown.css');
    cms.registerWidget('color', ColorWidget);
    cms.registerPreviewTemplate('blog', PostPreview);
    cms.registerPreviewTemplate('colors', ColorPreview);
    return CMS;
  },
  { ssr: false }
);

export default function AdminPage() {
  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <CMS />
    </>
  );
}
