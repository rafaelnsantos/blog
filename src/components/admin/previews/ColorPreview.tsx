import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import { Post as PostType } from '~/utils/blogUtils';
import { Preview } from './Preview';
import COLORS from 'content/colors.json';
import { Post } from '~/components/blog/Post';

export function ColorPreview({ entry }: PreviewTemplateComponentProps) {
  const colors: any = {};

  Object.keys(COLORS).map((color) => {
    colors[color] = {
      light: entry.getIn(['data', color, 'light']),
      dark: entry.getIn(['data', color, 'dark']),
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
