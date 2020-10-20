import dynamic from 'next/dynamic';
import { CodeBlock } from '~/components/markdown/CodeBlock';
import { formatTimestamp } from '~/utils/timeUtils';
import styles from '~/components/markdown/markdown.module.scss';
import { Heading } from '~/components/markdown/Heading';
import { BlogPostProps } from '~/pages/blog/post/[slug]';
import { useState } from 'react';
import { Anchors } from '../blog/Anchors';
import { Text } from '../atoms/Text';
import { Image } from '../atoms/Image';

const Markdown = dynamic(() => import('react-markdown'));

export function PostTemplate({ post, anchors }: BlogPostProps) {
  const [activeAnchor, setActiveAnchor] = useState('');
  return (
    <div className="flex flex-row-reverse justify-center">
      {anchors && <Anchors anchors={anchors} active={activeAnchor} onClick={setActiveAnchor} />}
      <div className="w-full md:max-w-3xl">
        <div className={`${styles.markdown} markdown`}>
          <div className="text-center">
            <Text variant="h1">{post.title}</Text>
            <Image src={post.meta.image} />
            <Text align="center">{formatTimestamp(post.timestamp)}</Text>
            <Text size={0.85} align="center">
              {post.readingTime} min read
            </Text>
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
