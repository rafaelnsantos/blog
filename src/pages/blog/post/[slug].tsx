import { GetStaticProps, GetStaticPaths } from 'next';
import { getPostBySlug, getPosts, Post as PostType } from '~/utils/blogUtils';
import { Page } from '~/components/Page';
import { PostTemplate } from '~/components/templates/Post';

export interface Anchor {
  title: string;
  slug: string;
}

export interface BlogPostProps {
  post: PostType;
  anchors?: Anchor[];
}

export default function BlogPost({ post, anchors }: BlogPostProps) {
  return (
    <Page title={post.meta.title} description={post.meta.description} image={post.meta.image}>
      <PostTemplate post={post} anchors={anchors} />
    </Page>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostProps> = async (context) => {
  const slug = context.params?.slug as string;

  const post = await getPostBySlug(slug);

  const lines = post.content.split('\n');

  const anchors: Anchor[] = [];

  lines.forEach((line) => {
    if (line.startsWith('<h2')) {
      console.log(line);
      const title = line
        .replace(/<h2>/g, '')
        .replace(/<\/h2>/g, '')
        .replace('\r', '')
        .trim();
      const slug = title.toLowerCase().replace(/\W/g, '-');
      anchors.push({ title, slug });
    }
  });

  return { props: { post, anchors } };
};
