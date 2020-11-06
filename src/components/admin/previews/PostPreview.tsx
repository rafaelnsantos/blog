import { PostTemplate } from '~/components/templates/Post';
import { Post } from '~/utils/blogUtils';
import { getReadingTime } from '~/utils/getReadingTime';
import { PreviewPage } from './PreviewPage';
import { Preview } from '@monx/react-netlifycms/dist/Preview';

export const PostPreview = Preview<Post>(({ values }) => {
  return (
    <PreviewPage>
      <PostTemplate
        post={{
          authors: values.authors || [],
          tags: values.tags || [],
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
