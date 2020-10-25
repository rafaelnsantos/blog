---
title: NextJS with NetlifyCMS
date: 2020-10-21T18:16:16.239Z
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
yarn add netlify-cms-app netlify-identity-widget 
yarn add -D netlify-cms-proxy-server concurrently
```
### admin/collections.ts

```ts
import { CmsCollection } from 'netlify-cms-core';

export const collections: CmsCollection[] = [
  {
    name: 'blog',
    label: 'Post',
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
      { label: 'Authors', name: 'authors', widget: 'list' },
      { label: 'Published', name: 'published', widget: 'boolean' },
    ],
  },
]
```

### admin/config.ts

in this file we'll have the Netlify CMS and Identity widgets configs.

```ts
import { CmsConfig } from 'netlify-cms-core';
import { InitOptions } from 'netlify-identity-widget';
import { collections } from './collections';

export interface CmsConfigFixed extends CmsConfig {
  local_backend?: boolean;
  load_config_file?: boolean;
}

export const cmsConfig: CmsConfigFixed = {
  backend: {
    name: 'git-gateway',
    branch: 'master',
  },
  media_folder: 'public/uploads',
  public_folder: 'uploads',
  collections: collections,
  local_backend: process.env.NODE_ENV !== 'production',
  load_config_file: false,
};

export const identityConfig: InitOptions = {
  APIUrl:
    process.env.NODE_ENV === 'production'
      ? `${process.env.NEXT_PUBLIC_URL}/.netlify/identity`
      : undefined,
  logo: false,
};
```

### admin/NetlifyCMS.tsx

```tsx
import React, { useEffect } from 'react';
import CMS from 'netlify-cms-app';
import { CmsConfigFixed } from './config';

export interface NetlifyCMSProps {
  config: CmsConfigFixed;
  onLoad?: (cms: typeof CMS) => void;
}

export const NetlifyCMS = (props: NetlifyCMSProps) => {
  useEffect(() => {
    CMS.init({
      config: props.config,
    });

    if (props.onLoad) props.onLoad(CMS);
  }, []);
  return <div />;
};
```

### admin/IdentityWidget.tsx
```tsx
import identity from 'netlify-identity-widget';
import { useEffect } from 'react';

export interface IdentityProps {
  config?: identity.InitOptions;
  onLoad?: (Identity: typeof identity) => void;
}

export const IdentityWidget = (props: IdentityProps) => {
  useEffect(() => {
    (window as any).netlifyIdentity = identity;

    if (props.onLoad) props.onLoad(identity);

    identity.init(props.config);
  }, []);

  return <div />;
};
```

### admin/AdminTemplate.tsx

```tsx
import { NetlifyCMS, NetlifyCMSProps } from './NetlifyCMS';
import { IdentityProps, IdentityWidget } from './IdentityWidget';

import { useState } from 'react';

interface AdminTemplateProps {
  cms: NetlifyCMSProps;
  identity: IdentityProps;
}

export function AdminTemplate(props: AdminTemplateProps) {
  return (
    <>
      <IdentityWidget {...props.identity} />
      <NetlifyCMS {...props.cms} />
    </>
  );
}
```

### pages/admin.tsx

```tsx
import dynamic from 'next/dynamic';
import { cmsConfig, identityConfig } from '~/components/admin/config';

const AdminTemplate = dynamic(
  async () => (await import('~/components/admin/AdminTemplate')).AdminTemplate,
  {
    ssr: false,
  }
);

export default function AdminPage() {
  return (
    <AdminTemplate
      cms={{
        config: cmsConfig,
        onLoad: (cms) => {
          // register previews, styles and widgets here
        },
      }}
      identity={{
        config: identityConfig,
      }}
    />
  );
}
```

### add script in package.json

````json
"dev:admin": "concurrently \"next dev\" \"netlify-cms-proxy-server\""
```