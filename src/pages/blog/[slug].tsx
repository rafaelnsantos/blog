import { GetStaticProps, GetStaticPaths } from 'next';
import ReactMarkdown from 'react-markdown';
import { NextSeo } from 'next-seo';
import { getPostBySlug, getPosts, Post } from '~/utils/blogUtils';
import { CodeBlock } from '~/components/markdown/CodeBlock';
import { formatTimestamp } from '~/utils/timeUtils';

interface BlogPostProps {
  post: Post;
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <div className="markdown">
      <NextSeo
        title={post.meta.title}
        description={post.meta.description}
        openGraph={{
          title: post.meta.title,
          description: post.meta.description,
          url: `${process.env.NEXT_PUBLIC_URL}/blog/${post.slug}`,
          images: [
            {
              url: post.meta.image,
              width: 1200,
              height: 630,
              alt: post.meta.title,
            },
          ],
          type: 'article',
        }}
      />
      <div>{post.title}</div>
      <div>{formatTimestamp(post.timestamp)}</div>
      <div>
        {post.readingTime} minute{post.readingTime > 1 && 's'}
      </div>
      <ReactMarkdown source={post.content} renderers={{ code: CodeBlock }} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();

  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;

  const post = await getPostBySlug(slug as string);

  return { props: { post } };
};
