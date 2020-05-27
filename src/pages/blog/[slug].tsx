import { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import ReactMarkdown from 'react-markdown';
import { NextSeo } from 'next-seo';
import { Link } from 'react-scroll';
import { getPostBySlug, getPosts, Post } from '~/utils/blogUtils';
import { CodeBlock } from '~/components/markdown/CodeBlock';
import { formatTimestamp } from '~/utils/timeUtils';
import styles from '~/components/markdown/markdown.module.scss';
import { HeadingRenderer } from '~/components/markdown/Heading';
import { firestore } from '~/services/firestore';
import { CommentForm } from '~/components/blog/CommentForm';

interface Anchor {
  title: string;
  slug: string;
}

export interface Comment {
  id: string;
  user: string;
  createdAt: number;
  comment: string;
}

interface BlogPostProps {
  post: Post;
  anchors?: Anchor[];
  comments: Comment[];
}

export default function BlogPost({ post, anchors, ...props }: BlogPostProps) {
  const [comments, setComments] = useState<Comment[]>(props.comments);

  const addNewComment = (comment) => setComments([comment, ...comments]);

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
              <Link
                className="cursor-pointer"
                to={anchor.slug}
                smooth
                duration={500}
                key={anchor.title}
              >
                <li className="text-xs hover:text-pink-500 text-primary">{anchor.title}</li>
              </Link>
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
        <div className="">
          <CommentForm slug={post.slug} onNewComment={addNewComment} />
          {comments.map((comment) => (
            <div key={comment.id}>
              {comment.user} - {comment.comment}
            </div>
          ))}
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

  const docs = await firestore.collection(slug as string).get();

  const comments: Comment[] = [];

  docs.forEach((doc) => {
    const comment = doc.data();
    comments.push({
      id: doc.id,
      comment: comment.comment,
      user: comment.user,
      createdAt: doc.createTime.toDate().getTime(),
    });
  });

  return {
    props: {
      post,
      anchors,
      comments: comments.sort((a, b) => b.createdAt - a.createdAt),
    },
    // eslint-disable-next-line @typescript-eslint/camelcase
    unstable_revalidate: parseInt(process.env.REVALIDATE_COMMENTS),
  };
};
