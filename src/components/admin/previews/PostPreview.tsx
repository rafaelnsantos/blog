import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import { PostTemplate } from '~/components/templates/Post';
import { Post } from '~/utils/blogUtils';
import { getReadingTime } from '~/utils/getReadingTime';
import { Preview } from './Preview';

export function PostPreview({ entry }: PreviewTemplateComponentProps) {
  const get = (keys: string[]) => entry.getIn(['data', ...keys]);

  const content = get(['body']) || 'content';

  const post: Post = {
    title: get(['title']) || 'Title',
    content,
    timestamp: get(['date']) || new Date().getTime(),
    meta: {
      description: get(['metaDescription'] || 'description'),
      image: get(['metaImage']) || '',
      title: get(['metaTitle']) || '',
    },
    readingTime: getReadingTime(content),
    slug: 'slug',
    published: get(['published']) || true,
    tags: get(['tags']) || [''],
    authors: get(['authors']) || ['rafa'],
  };

  return (
    <Preview>
      <PostTemplate post={post} />
    </Preview>
  );
}
