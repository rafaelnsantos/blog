import { CodeBlock } from '~/components/markdown/CodeBlock';
import { formatTimestamp } from '~/utils/timeUtils';
import styles from '~/components/markdown/markdown.module.scss';
import { BlogPostProps } from '~/pages/blog/post/[slug]';
import { Anchors } from '../molecules/Anchors';
import { Text } from '../atoms/Text';
import { Image } from '../atoms/Image';

import { Heading } from '~/components/markdown/Heading';
import { HtmlRender } from '../blog/HtmlRender';

export function PostTemplate({ post, anchors }: BlogPostProps) {
  return (
    <div className="flex flex-row-reverse justify-center">
      {anchors && <Anchors anchors={anchors} />}
      <div className="w-full md:max-w-3xl">
        <div className={`${styles.markdown} markdown`}>
          <div className="text-center">
            <Text variant="h1" lineHeight={3}>
              {post.title}
            </Text>
            <Image src={post.meta.image} alt={post.title} />
            <Text align="center">{formatTimestamp(post.date)}</Text>
            <Text size={0.85} align="center">
              {post.readingTime} min read
            </Text>
            <div className="flex flex-row justify-center">
              {post.authors.map((author) => (
                <a
                  target="_blank"
                  rel="noreferrer"
                  key={author}
                  href={`https://github.com/${author}`}
                >
                  <img
                    alt={`${author}'s github`}
                    style={{ borderRadius: 20, margin: 10 }}
                    src={`https://github.com/${author}.png?size=40`}
                  />
                </a>
              ))}
            </div>
          </div>
          <HtmlRender
            source={post.body}
            renderers={{
              code: CodeBlock,
              heading: Heading,
            }}
          />
        </div>
      </div>
    </div>
  );
}
