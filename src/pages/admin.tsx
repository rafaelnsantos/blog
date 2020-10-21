/* eslint-disable @typescript-eslint/camelcase */
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { CmsConfig } from 'netlify-cms-core';
import { collections } from '~/config/admin';
import { useEffect, useState } from 'react';
import { User } from 'netlify-identity-widget';

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
    const identity = await import('netlify-identity-widget');

    identity.init({
      container: '#netlify-identity',
      logo: false,
      APIUrl:
        process.env.NODE_ENV === 'development'
          ? undefined
          : `${process.env.NEXT_PUBLIC_URL}/.netlify/identity`,
    });

    cms.init({
      config: cmsConfig,
    });

    const { PostPreview } = await import('~/components/admin/previews/PostPreview');
    const { ColorPreview } = await import('~/components/admin/previews/ColorPreview');
    const { ColorWidget } = await import('~/components/admin/widgets/ColorWidget');

    const CMS = () => {
      const [user, setUser] = useState(identity.currentUser());

      useEffect(() => {
        console.log(user);
        if (!user) {
          identity.open('login');
        } else {
          identity.close();
        }
      }, [user]);

      useEffect(() => {
        cms.registerPreviewStyle('/style/preview/preview.css');
        cms.registerPreviewStyle('/style/preview/global.css');
        cms.registerPreviewStyle('/style/preview/markdown.css');
        cms.registerWidget('color', ColorWidget);
        cms.registerPreviewTemplate('blog', PostPreview);
        cms.registerPreviewTemplate('colors', ColorPreview);
        identity.on('login', setUser);
        identity.on('logout', () => setUser(null));
        identity.on('init', setUser);
        identity.on('error', (err) => {
          console.log(err);
        });

        return () => {
          identity.off('login');
          identity.off('logout');
          identity.off('init');
          identity.off('error');
        };
      }, []);
      return <></>;
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
      <div id="netlify-identity" />
      <CMS />
    </>
  );
}
