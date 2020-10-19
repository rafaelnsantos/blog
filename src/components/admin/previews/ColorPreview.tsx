import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import { Post as PostType } from '~/utils/blogUtils';
import { Preview } from './Preview';
import COLORS from 'content/colors.json';
import { Post } from '~/components/blog/Post';
import { useCallback } from 'react';

export function ColorPreview({ entry }: PreviewTemplateComponentProps) {
  const get = useCallback((keys: string[]) => entry.getIn(['data', ...keys]), [entry]);

  const colors: any = {};

  Object.keys(COLORS).map((color) => {
    colors[color] = {
      light: get([color, 'light']),
      dark: get([color, 'dark']),
    };
  });

  const post: PostType = {
    title: 'asd',
    content: '',
    timestamp: new Date().getTime(),
    meta: {
      description: 'asdasd',
      image: 'asdasd',
      title: 'asdasd',
    },
    readingTime: 1,
    slug: 'slug',
    star: true,
    tags: ['asdasd'],
  };

  return (
    <Preview colors={colors}>
      <Post post={post} />
    </Preview>
  );
}
