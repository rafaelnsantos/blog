import { CmsCollection, CmsField } from '@monx/react-netlifycms';
import COLORS from 'content/colors.json';

const blog: CmsCollection = {
  name: 'blog',
  label: 'Post',
  folder: 'blog',
  create: true,
  fields: [
    { label: 'Title', name: 'title', widget: 'string' },
    { label: 'Publish Date', name: 'date', widget: 'datetime' },
    {
      label: 'meta',
      name: 'meta',
      widget: 'object',
      fields: [
        { label: 'Meta Title', name: 'title', widget: 'string' },
        { label: 'Meta Description', name: 'description', widget: 'string' },
        { label: 'Meta Image', name: 'image', widget: 'image' },
      ],
    },
    {
      label: 'Body',
      name: 'body',
      widget: 'editor',
      apiKey: process.env.NEXT_PUBLIC_TINY_API_KEY,
      height: 600,
      menubar: true,
      plugins:
        'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount codesample',
      toolbar:
        'undo redo | formatselect | bold italic backcolor | codesample | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
    } as CmsField,
    { label: 'Tags', name: 'tags', widget: 'list' },
    { label: 'Authors', name: 'authors', widget: 'list' },
    { label: 'Published', name: 'published', widget: 'boolean' },
  ],
};

const settings: CmsCollection = {
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

      fields: Object.entries(COLORS).map(([color, variants]) => ({
        name: color,
        label: color,
        widget: 'object',
        fields: Object.keys(variants).map((variant) => ({
          name: variant,
          label: variant,
          widget: 'color',
        })),
      })),
    },
    {
      file: 'content/navigation.json',
      label: 'Pages',
      name: 'navigation',

      fields: [
        {
          name: 'links',
          label: 'Links',
          widget: 'list',
          fields: [
            { name: 'title', label: 'Title', widget: 'string' },
            { name: 'path', label: 'path', widget: 'string' },
          ],
        },
      ],
    },
    {
      file: 'content/contact.json',
      label: 'Contact',
      name: 'contact',

      fields: [
        {
          name: 'discord',
          label: 'Discord Webhook',
          widget: 'string',
        },
      ],
    },
  ],
};

export const collections: CmsCollection[] = [blog, settings];
