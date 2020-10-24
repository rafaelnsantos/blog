import Head from 'next/head';
import { cmsConfig, identityConfig } from '~/components/admin/config';
import dynamic from 'next/dynamic';

const AdminTemplate = dynamic(
  async () => (await import('~/components/templates/Admin')).AdminTemplate,
  { ssr: false }
);

export default function AdminPage() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminTemplate cmsConfig={cmsConfig} identityConfig={identityConfig} />
    </>
  );
}
