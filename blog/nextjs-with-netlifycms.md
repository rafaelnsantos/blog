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
## Install dependencies

```bash
yarn add @monx/react-netlifycms
yarn add -D @types/netlify-identity-widget 
```

### admin/collections.ts

```typescript
import { CmsCollection } from '@monx/react-netlifycms';

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
]
```

### pages/admin.tsx

```typescript
import dynamic from 'next/dynamic';
import { collections } from '~/admin/collections';

const NetlifyCMS = dynamic(() => import('@monx/react-netlifycms'), {
  ssr: false,
});

export default function AdminPage() {
  return (
    <NetlifyCMS 
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
        onLoad: (cms) => {
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
        onLoad: (identity) => {
          // optional
        },
      }}
    />
  );
}
```

## Dev development

```bash
yarn add -D concurrently netlify-cms-proxy-server
```


### add script in package.json

```json
"dev:admin": "concurrently \"next dev\" \"netlify-cms-proxy-server\""
```

run

```bash
yarn dev:admin
```

access localhost:3000/admin without login