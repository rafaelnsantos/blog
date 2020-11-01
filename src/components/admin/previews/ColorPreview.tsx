import { Post as PostType, PostPreview } from '~/utils/blogUtils';
import { PreviewPage } from './PreviewPage';
import COLORS from 'content/colors.json';
import { useState } from 'react';
import { HeaderNavPreview } from '~/components/header/HeaderNav';
import { LandingPageTemplate } from '~/components/templates/LandingPage';
import { AboutPageTemplate } from '~/components/templates/AboutPage';
import { PostTemplate } from '~/components/templates/Post';
import { BlogTemplate } from '~/components/templates/Blog';
import { ContactTemplate } from '~/components/templates/Contact';
import { Preview } from '@monx/react-netlifycms/dist/Preview';

const post: PostType = {
  title: 'asd',
  body: `# Hello`,
  date: new Date().getTime(),
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

const templates = {
  contact: <ContactTemplate onSubmit={async (values) => console.log(values)} />,
  blog: (
    <BlogTemplate
      preview
      posts={[post, post, post, post, post]}
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

export const ColorPreview = Preview<typeof COLORS>(({ values }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(templates.home);

  return (
    <PreviewPage colors={values}>
      <div className="flex flex-row justify-evenly">
        {Object.entries(templates).map(([name, Template]) => (
          <button key={name} onClick={() => setSelectedTemplate(Template)}>
            {name}
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
    </PreviewPage>
  );
});
