---
title: NextJS with NetlifyCMS
date: 2020-10-26T22:38:30.796Z
metaTitle: NextJS with NetlifyCMS
metaDescription: NextJS with NetlifyCMS
metaImage: uploads/meta.jpg
tags:
  - react
  - nextjs
  - netlify cms
  - typescript
  - tutorial
authors:
  - rafaelnsantos
  - andrebonizi
published: true
---
<h2>Install dependencies</h2>
<pre class="language-javascript"><code>yarn add @monx/react-netlifycms
yarn add -D @types/netlify-identity-widget </code></pre>
<p>&nbsp;</p>
<h2>admin/collections.ts</h2>
<pre class="language-javascript"><code>import { CmsCollection } from '@monx/react-netlifycms';

export const collections: CmsCollection[] = [
  {
    name: 'blog',
    label: 'Post',
    folder: 'blog',
    create: true,
    fields: [
      { label: 'Published', name: 'published', widget: 'boolean' },
      { label: 'Title', name: 'title', widget: 'string' },
      { label: 'Publish Date', name: 'date', widget: 'datetime' },
      { label: 'Body', name: 'body', widget: 'markdown' },
      { label: 'Tags', name: 'tags', widget: 'list' },
      { label: 'Authors', name: 'authors', widget: 'list' },
    ],
  },
]</code></pre>
<p>&nbsp;</p>
<h2>pages/admin.tsx</h2>
<pre class="language-javascript"><code>import dynamic from 'next/dynamic';
import { collections } from '~/admin/collections';

const NetlifyCMS = dynamic(() =&gt; import('@monx/react-netlifycms'), {
  ssr: false,
});

export default function AdminPage() {
  return (
    &lt;NetlifyCMS 
      cms={{
        config: {
          backend: {
            name: 'git-gateway',
            branch: 'master',
          },
          media_folder: 'public/uploads',
          public_folder: 'uploads',
          collections,
          local_backend: process.env.NODE_ENV !== 'production',
          load_config_file: false,
        },
        onLoad: (cms) =&gt; {
          // optional
          // register previews, styles and widgets here
        },
      }}
      identity={{
        config: {
          APIUrl:
            process.env.NODE_ENV === 'production'
              ? `${process.env.NEXT_PUBLIC_URL}/.netlify/identity`
              : undefined,
        },
        onLoad: (identity) =&gt; {
          // optional
        },
      }}
    /&gt;
  );
}</code></pre>