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

const Identity = dynamic(
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

    const Identity = () => {
      return <div></div>;
    };

    return Identity;
  },
  { ssr: false }
);

const CMS = dynamic(
  async () => {
    const cms = (await import('netlify-cms-app')).default;

    cms.init({
      config: cmsConfig,
    });

    const { PostPreview } = await import('~/components/admin/previews/PostPreview');
    const { ColorPreview } = await import('~/components/admin/previews/ColorPreview');
    const { ColorWidget } = await import('~/components/admin/widgets/ColorWidget');

    const CMS = () => {
      useEffect(() => {
        cms.registerPreviewStyle('/style/preview/preview.css');
        cms.registerPreviewStyle('/style/preview/global.css');
        cms.registerPreviewStyle('/style/preview/markdown.css');
        cms.registerWidget('color', ColorWidget);
        cms.registerPreviewTemplate('blog', PostPreview);
        cms.registerPreviewTemplate('colors', ColorPreview);
      }, []);
      return (
        <div>
          <Identity />
        </div>
      );
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
