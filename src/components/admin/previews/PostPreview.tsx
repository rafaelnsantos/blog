import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import { useCallback } from 'react';
import { PostTemplate } from '~/components/templates/Post';
import { Post } from '~/utils/blogUtils';
import { getReadingTime } from '~/utils/getReadingTime';
import { Preview } from './Preview';

export function PostPreview({ entry }: PreviewTemplateComponentProps) {
  const get = useCallback((keys: string[]) => entry.getIn(['data', ...keys]), [entry]);

  const content = get(['body']);

  const post: Post = {
    title: get(['title']),
    content,
    timestamp: get(['date']),
    meta: {
      description: get(['metaDescription']),
      image: get(['metaImage']),
      title: get(['metaTitle']),
    },
    readingTime: getReadingTime(content),
    slug: 'slug',
    published: get(['published']),
    tags: get(['tags']),
  };

  return (
    <Preview>
      <PostTemplate post={post} />
    </Preview>
  );
}
