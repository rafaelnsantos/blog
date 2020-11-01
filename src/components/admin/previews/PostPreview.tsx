import { PostTemplate } from '~/components/templates/Post';
import { Post } from '~/utils/blogUtils';
import { getReadingTime } from '~/utils/getReadingTime';
import { Preview } from '@monx/react-netlifycms/dist/Preview';
import { PreviewPage } from './PreviewPage';

export const PostPreview = Preview<Post>(({ values }) => {
  return (
    <PreviewPage>
      <PostTemplate
        post={{
          authors: Object.values(values.authors || []),
          tags: Object.values(values.tags || []),
          readingTime: getReadingTime(values.body || ''),
          body: values.body || '',
          date: values.date || new Date().getTime(),
          meta: values.meta || {
            description: '',
            image: '',
            title: '',
          },
          published: values.published || false,
          slug: values.slug || '',
          title: values.title || '',
        }}
      />
    </PreviewPage>
  );
});
