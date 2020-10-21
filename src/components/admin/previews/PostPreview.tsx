import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import { PostTemplate } from '~/components/templates/Post';
import { Post } from '~/utils/blogUtils';
import { getReadingTime } from '~/utils/getReadingTime';
import { Preview } from './Preview';

export function PostPreview({ entry }: PreviewTemplateComponentProps) {
  const get = (keys: string[]) => entry.getIn(['data', ...keys]);

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
    authors: get(['authors']),
  };

  return (
    <Preview>
      <PostTemplate post={post} />
    </Preview>
  );
}
