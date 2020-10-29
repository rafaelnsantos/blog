/* eslint-disable @typescript-eslint/camelcase */
import { collections } from './collections';
import { IdentityConfig, CmsConfig } from '@monx/react-netlifycms';

export const cmsConfig: CmsConfig = {
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

export const identityConfig: IdentityConfig = {
  logo: false,
};
