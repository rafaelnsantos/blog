import Head from 'next/head';
import { AdminTemplate } from '~/components/templates/Admin';
import { cmsConfig, identityConfig } from '~/config/admin';

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
