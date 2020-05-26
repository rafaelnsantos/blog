import { GetStaticProps, GetStaticPaths } from 'next';
import ReactMarkdown from 'react-markdown';
import { NextSeo } from 'next-seo';
import { getPostBySlug, getPosts, Post } from '~/utils/blogUtils';
import { CodeBlock } from '~/components/markdown/CodeBlock';
import { formatTimestamp } from '~/utils/timeUtils';
import styles from '~/components/markdown/markdown.module.scss';
import { HeadingRenderer } from '~/components/markdown/Heading';

interface Anchor {
  title: string;
  slug: string;
}

interface BlogPostProps {
  post: Post;
  anchors?: Anchor[];
}

export default function BlogPost({ post, anchors }: BlogPostProps) {
  return (
    <div className="flex flex-row-reverse justify-center">
      <NextSeo
        title={post.meta.title}
        description={post.meta.description}
        openGraph={{
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
        }}
      />
      {anchors.length > 1 && (
        <div className="hidden lg:block sticky top-0 overflow-auto h-full pl-20">
          <div>Table of Contents</div>
          <ul>
            {anchors.map((anchor) => (
              <a key={anchor.title} href={`#${anchor.slug}`}>
                <li className="text-xs text-primary">{anchor.title}</li>
              </a>
            ))}
          </ul>
        </div>
      )}
      <div className="w-full md:max-w-3xl">
        <div className={styles.markdown}>
          <div className="text-center">
            <h1>{post.title}</h1>
            <div className="text-sm">{formatTimestamp(post.timestamp)}</div>
            <div>{post.readingTime} min read</div>
          </div>
          <ReactMarkdown
            source={post.content}
            renderers={{
              code: CodeBlock,
              heading: HeadingRenderer,
            }}
          />
        </div>
      </div>
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

  const lines = post.content.split('\n');

  const anchors: Anchor[] = [];

  lines.forEach((line) => {
    if (line.startsWith('## ')) {
      const title = line.replace(/#/g, '').replace('\r', '').trim();
      const slug = title.toLowerCase().replace(/\W/g, '-');
      anchors.push({ title, slug });
    }
  });

  return { props: { post, anchors }, unstable_revalidate: 1 };
};
