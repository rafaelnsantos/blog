import { ReactElement } from 'react';
import { Seo } from '~/components/organisms/Seo';
import { Page } from '~/components/Page';
import { AboutPageTemplate } from '~/components/templates/AboutPage';

export default function About() {
  return <AboutPageTemplate />;
}

About.getLayout = function getLayout(page: ReactElement) {
  return (
    <Page>
      <Seo title="About" description="about page" />
      {page}
    </Page>
  );
};
