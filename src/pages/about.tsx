import { Page } from '~/components/Page';
import { AboutPageTemplate } from '~/components/templates/AboutPage';

export default function About() {
  return (
    <Page title="About" description="about page" url="/about">
      <AboutPageTemplate />
    </Page>
  );
}
