/* eslint-disable @typescript-eslint/camelcase */
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
