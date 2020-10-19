import dynamic from 'next/dynamic';
import { CodeBlock } from '~/components/markdown/CodeBlock';
import { formatTimestamp } from '~/utils/timeUtils';
import styles from '~/components/markdown/markdown.module.scss';
import { HeadingRenderer } from '~/components/markdown/Heading';
import { Anchors } from './Anchors';
import { BlogPostProps } from '~/pages/blog/post/[slug]';

const Markdown = dynamic(() => import('react-markdown'));

export function Post({ post, anchors }: BlogPostProps) {
  return (
    <div className="flex flex-row-reverse justify-center">
      {anchors && <Anchors anchors={anchors} />}
      <div className="w-full md:max-w-3xl">
        <div className={`${styles.markdown} markdown`}>
          <div className="text-center">
            <h1>{post.title}</h1>
            <div className="text-sm">{formatTimestamp(post.timestamp)}</div>
            <div>{post.readingTime} min read</div>
          </div>
          <Markdown
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
