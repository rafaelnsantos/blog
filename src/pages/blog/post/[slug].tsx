import { GetStaticProps, GetStaticPaths } from 'next';
import { getPostBySlug, getPosts, Post as PostType } from '~/utils/blogUtils';
import { Page } from '~/components/Page';
import { Post } from '~/components/blog/Post';

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
    <Page
      title={post.meta.title}
      description={post.meta.description}
      url={`/blog/post/${post.slug}`}
      image={post.meta.image}
    >
      <Post post={post} anchors={anchors} />
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
    if (line.startsWith('## ')) {
      const title = line.replace(/#/g, '').replace('\r', '').trim();
      const slug = title.toLowerCase().replace(/\W/g, '-');
      anchors.push({ title, slug });
    }
  });

  return { props: { post, anchors } };
};
