import dynamic from 'next/dynamic';
import { CodeBlock } from '~/components/markdown/CodeBlock';
import { formatTimestamp } from '~/utils/timeUtils';
import styles from '~/components/markdown/markdown.module.scss';
import { Heading } from '~/components/markdown/Heading';
import { BlogPostProps } from '~/pages/blog/post/[slug]';
import { Image } from '../markdown/Image';
import { useState } from 'react';
import { Anchors } from '../blog/Anchors';

const Markdown = dynamic(() => import('react-markdown'));

export function PostTemplate({ post, anchors }: BlogPostProps) {
  const [activeAnchor, setActiveAnchor] = useState('');
  return (
    <div className="flex flex-row-reverse justify-center">
      {anchors && <Anchors anchors={anchors} active={activeAnchor} onClick={setActiveAnchor} />}
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
              heading: Heading,
              image: Image,
            }}
          />
        </div>
      </div>
    </div>
  );
}
