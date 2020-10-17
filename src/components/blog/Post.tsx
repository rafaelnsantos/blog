import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '~/components/markdown/CodeBlock';
import { formatTimestamp } from '~/utils/timeUtils';
import styles from '~/components/markdown/markdown.module.scss';
import { HeadingRenderer } from '~/components/markdown/Heading';
import { BlogPostProps } from '~/pages/blog/[slug]';
import { Anchors } from './Anchors';

export function Post({ post, anchors }: BlogPostProps) {
  return (
    <div className="flex flex-row-reverse justify-center">
      <Anchors anchors={anchors} />
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
