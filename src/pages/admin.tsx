import Head from 'next/head';
import dynamic from 'next/dynamic';
import { cmsConfig, identityConfig } from '~/components/admin/config';
import styled from 'styled-components';
import { RingLoader } from 'react-spinners';

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

const AdminTemplate = dynamic(() => import('~/components/templates/AdminPage'), {
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
        config={{
          cms: cmsConfig,
          identity: identityConfig,
        }}
      />
    </>
  );
}
