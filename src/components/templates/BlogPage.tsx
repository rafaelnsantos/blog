import { BlogPageProps } from '~/pages/blog/page/[id]';
import { BlogPagination } from '../blog/BlogPagination';
import { PostList } from '../organisms/PostList';

export function BlogPageTemplate({ posts, pages, page, preview }: BlogPageProps) {
  return (
    <>
      <h1>Blog Page</h1>
      <PostList posts={posts} preview={preview} />
      <BlogPagination preview={preview} pages={pages} page={page} />
    </>
  );
}
