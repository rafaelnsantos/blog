import Head from 'next/head';
import dynamic from 'next/dynamic';
import { GetStaticProps } from 'next';
import { ComponentProps } from 'react';

const AdminTemplate = dynamic(
  async () => (await import('~/components/admin/AdminTemplate')).AdminTemplate,
  { ssr: false }
);

type AdminPageProps = ComponentProps<typeof AdminTemplate>;

export default function AdminPage(props: AdminPageProps) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminTemplate cmsConfig={props.cmsConfig} identityConfig={props.identityConfig} />
    </>
  );
}

export const getStaticProps: GetStaticProps<AdminPageProps> = async () => {
  const config = await import('~/components/admin/config');
  return {
    props: {
      cmsConfig: config.cmsConfig,
      identityConfig: config.identityConfig,
    },
  };
};
