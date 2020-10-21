import { CmsCollection } from 'netlify-cms-core';
import COLORS from 'content/colors.json';

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
      { label: 'Starred', name: 'star', widget: 'boolean' },
    ],
  },
  {
    name: 'settings',
    label: 'Settings',
    extension: 'json',

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
        file: 'content/analytics.json',
        label: 'Analytics',
        name: 'analytics',

        fields: [
          { name: 'gaTrackingID', label: 'Google Analytics Tracking ID', widget: 'string' },
          { name: 'clientEmail', label: 'Analytics Client Email', widget: 'string' },
          { name: 'viewID', label: 'Analytics View ID', widget: 'string' },
        ],
      },
      {
        file: 'content/pagination.json',
        label: 'Pagination',
        name: 'pagination',

        fields: [
          { name: 'size', label: 'Posts per page', widget: 'number' },
          {
            name: 'wordsPerMinute',
            label: 'Words per minute',
            widget: 'number',
            hint: 'To calculate post read time',
          },
        ],
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
            { name: 'light', label: 'light', widget: 'color' },
            { name: 'dark', label: 'dark', widget: 'color' },
          ],
        })),
      },
    ],
  },
];
