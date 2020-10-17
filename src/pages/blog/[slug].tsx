import { GetStaticProps, GetStaticPaths } from 'next';
import { NextSeo } from 'next-seo';
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
      seo={{
        title: post.meta.title,
        description: post.meta.description,
        openGraph: {
          title: post.meta.title,
          description: post.meta.description,
          url: `${process.env.NEXT_PUBLIC_URL}/blog/${post.slug}`,
          images: [
            {
              url: `${process.env.NEXT_PUBLIC_URL}${post.meta.image}`,
              width: 1200,
              height: 630,
              alt: post.meta.title,
            },
          ],
          type: 'article',
        },
      }}
    >
      <NextSeo />
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
  const { slug } = context.params;

  const post = await getPostBySlug(slug as string);

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
