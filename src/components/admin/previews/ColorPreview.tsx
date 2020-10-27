import { PreviewTemplateComponentProps } from 'netlify-cms-core';
import { Post as PostType, PostPreview } from '~/utils/blogUtils';
import { Preview } from './Preview';
import COLORS from 'content/colors.json';
import { useCallback, useMemo, useState } from 'react';
import { HeaderNavPreview } from '~/components/header/HeaderNav';
import { LandingPageTemplate } from '~/components/templates/LandingPage';
import { AboutPageTemplate } from '~/components/templates/AboutPage';
import { PostTemplate } from '~/components/templates/Post';
import { BlogTemplate } from '~/components/templates/Blog';
import { ContactTemplate } from '~/components/templates/Contact';

const post: PostType = {
  title: 'asd',
  content: `# Hello`,
  timestamp: new Date().getTime(),
  meta: {
    description: 'asdasd',
    image: 'MonxClosed.png',
    title: 'asdasd',
  },
  readingTime: 1,
  slug: 'slug',
  published: true,
  tags: ['asdasd'],
  authors: ['rafaelnsantos'],
};

const postPreview: PostPreview = {
  meta: post.meta,
  slug: post.slug,
  tags: post.tags,
  timestamp: post.timestamp,
  title: post.title,
};

const templates = {
  contact: <ContactTemplate onSubmit={async (values) => console.log(values)} />,
  blog: (
    <BlogTemplate
      preview
      posts={[postPreview, postPreview, postPreview, postPreview, postPreview]}
      tags={[
        {
          count: 1,
          value: 'asd',
        },
      ]}
    />
  ),
  about: <AboutPageTemplate />,
  home: <LandingPageTemplate />,
  post: <PostTemplate post={post} />,
};

export function ColorPreview({ entry }: PreviewTemplateComponentProps) {
  const get = useCallback((keys: string[]) => entry.getIn(['data', ...keys]), [entry]);

  const [selectedTemplate, setSelectedTemplate] = useState(templates.home);

  const colors = useMemo(
    () =>
      Object.keys(COLORS).reduce((prev, color) => {
        prev[color as keyof typeof COLORS] = {
          light: get([color, 'light']),
          dark: get([color, 'dark']),
        };
        return prev;
      }, {} as typeof COLORS),
    [entry]
  );

  return (
    <Preview colors={colors}>
      <div className="flex flex-row justify-evenly">
        {Object.entries(templates).map((template) => (
          <button key={template[0]} onClick={() => setSelectedTemplate(template[1])}>
            {template[0]}
          </button>
        ))}
      </div>

      <HeaderNavPreview
        links={[
          { title: 'home', path: '/' },
          { title: 'blog', path: '/blog' },
        ]}
      />

      {selectedTemplate}
    </Preview>
  );
}
