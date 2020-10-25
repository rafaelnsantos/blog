import Head from 'next/head';
import dynamic from 'next/dynamic';
import { cmsConfig, identityConfig } from '~/components/admin/config';
import styled from 'styled-components';
import { RingLoader } from 'react-spinners';

import { PostPreview } from '~/components/admin/previews/PostPreview';
import { ColorPreview } from '~/components/admin/previews/ColorPreview';
import { ColorWidget } from '~/components/admin/widgets/ColorWidget';

const Loading = styled.div`
  display: grid;
  place-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: var(--bg-primary);
  z-index: 9999;
`;

const LoadingAdmin = () => (
  <Loading>
    <RingLoader size="35vh" color="var(--text-primary)" />
  </Loading>
);

const AdminTemplate = dynamic(() => import('~/components/admin/AdminTemplate'), {
  ssr: false,
  loading: LoadingAdmin,
});

export default function AdminPage() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminTemplate
        cms={{
          config: cmsConfig,
          onLoad: (cms) => {
            cms.registerPreviewStyle('/style/preview/preview.css');
            cms.registerPreviewStyle('/style/preview/global.css');
            cms.registerPreviewStyle('/style/preview/markdown.css');
            cms.registerPreviewTemplate('blog', PostPreview);
            cms.registerPreviewTemplate('colors', ColorPreview);
            cms.registerWidget('color', ColorWidget);
          },
        }}
        identity={{
          config: identityConfig,
        }}
      />
    </>
  );
}
