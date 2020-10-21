/* eslint-disable @typescript-eslint/camelcase */
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { CmsConfig } from 'netlify-cms-core';
import { collections } from '~/config/admin';
import { useEffect, useState } from 'react';

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

interface CMSProps {
  onLoaded: () => void;
}

const CMS = dynamic(
  async () => {
    const cms = (await import('netlify-cms-app')).default;

    cms.init({
      config: cmsConfig,
    });

    const { PostPreview } = await import('~/components/admin/previews/PostPreview');
    const { ColorPreview } = await import('~/components/admin/previews/ColorPreview');
    const { ColorWidget } = await import('~/components/admin/widgets/ColorWidget');

    const CMS = ({ onLoaded }: CMSProps) => {
      useEffect(() => {
        cms.registerPreviewStyle('/style/preview/preview.css');
        cms.registerPreviewStyle('/style/preview/global.css');
        cms.registerPreviewStyle('/style/preview/markdown.css');
        cms.registerWidget('color', ColorWidget);
        cms.registerPreviewTemplate('blog', PostPreview);
        cms.registerPreviewTemplate('colors', ColorPreview);
        onLoaded();
      }, []);
      return <div />;
    };

    return CMS;
  },
  { ssr: false }
);

export default function AdminPage() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://identity.netlify.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://identity.netlify.com" crossOrigin="anonymous" />
        {loaded && (
          <script
            type="text/javascript"
            src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          />
        )}
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <CMS onLoaded={() => setLoaded(true)} />
    </>
  );
}
