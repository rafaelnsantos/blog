/* eslint-disable @typescript-eslint/no-var-requires */
const sitemap = require('nextjs-sitemap-generator');
const path = require('path');

sitemap({
  baseUrl: process.env.NEXT_PUBLIC_URL,
  ignoredPaths: ['admin', '_next', 'uploads', 'style'],
  pagesDirectory: path.join(__dirname, 'out'),
  targetDirectory: 'out/',
  sitemapFilename: 'sitemap.xml',
  ignoredExtensions: ['png', 'jpg', 'ico'],
  ignoreIndexFiles: true,
});
