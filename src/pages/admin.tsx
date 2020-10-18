/* eslint-disable @typescript-eslint/camelcase */
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { CmsConfig, CmsCollection } from 'netlify-cms-core';
import COLORS from 'content/colors.json';
interface ConfigFixed extends CmsConfig {
  local_backend?: boolean;
  load_config_file?: boolean;
}

const collections: CmsCollection[] = [
  {
    name: 'blog',
    label: 'Blog',
    folder: 'blog',
    create: true,
    fields: [
      { label: 'Title', name: 'title', widget: 'string' },
      { label: 'Publish Date', name: 'date', widget: 'datetime' },
      { label: 'Meta Title', name: 'metaTitle', widget: 'string' },
      { label: 'Meta Description', name: 'metaDescription', widget: 'string' },
      { label: 'Meta Image', name: 'metaImage', widget: 'image' },
      { label: 'Body', name: 'body', widget: 'markdown' },
      { label: 'Tags', name: 'tags', widget: 'list' },
      { label: 'Starred', name: 'star', widget: 'boolean' },
    ],
  },
  {
    name: 'settings',
    label: 'Settings',
    extension: 'json',
    editor: {
      preview: false,
    },
    files: [
      {
        file: 'content/seo.json',
        label: 'Search Engine Optimization',
        name: 'seo',

        fields: [
          { name: 'title', label: 'Title', widget: 'string' },
          { name: 'description', label: 'Description', widget: 'string' },
          { name: 'image', label: 'Image', widget: 'image' },
        ],
      },
      {
        file: 'content/pagination.json',
        label: 'Pagination',
        name: 'pagination',

        fields: [{ name: 'size', label: 'Posts per page', widget: 'number' }],
      },
      {
        file: 'content/colors.json',
        label: 'Colors',
        name: 'colors',

        fields: Object.keys(COLORS).map((color) => ({
          name: color,
          label: color,
          widget: 'object',
          fields: [
            { name: 'light', label: 'light', widget: 'string' },
            { name: 'dark', label: 'dark', widget: 'string' },
          ],
        })),
      },
    ],
  },
];

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
