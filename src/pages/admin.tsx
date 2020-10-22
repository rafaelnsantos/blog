/* eslint-disable @typescript-eslint/camelcase */
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { CmsConfig } from 'netlify-cms-core';
import { collections } from '~/config/admin';
import { useEffect } from 'react';

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
    const identity = await import('netlify-identity-widget');

    (window as any).netlifyIdentity = identity;

    identity.init({
      APIUrl:
        process.env.NODE_ENV === 'production'
          ? `${process.env.NEXT_PUBLIC_URL}/.netlify/identity`
          : undefined,
      logo: false,
    });

    const cms = (await import('netlify-cms-app')).default;

    cms.init({
      config: cmsConfig,
    });

    cms.registerPreviewStyle('/style/preview/preview.css');
    cms.registerPreviewStyle('/style/preview/global.css');
    cms.registerPreviewStyle('/style/preview/markdown.css');

    const { PostPreview } = await import('~/components/admin/previews/PostPreview');
    cms.registerPreviewTemplate('blog', PostPreview);

    const { ColorPreview } = await import('~/components/admin/previews/ColorPreview');
    cms.registerPreviewTemplate('colors', ColorPreview);

    const { ColorWidget } = await import('~/components/admin/widgets/ColorWidget');
    cms.registerWidget('color', ColorWidget);

    const CMS = () => {
      return <div></div>;
    };

    return CMS;
  },
  { ssr: false }
);

export default function AdminPage() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <CMS />
    </>
  );
}
