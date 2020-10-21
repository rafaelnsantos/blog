import { Page } from '~/components/Page';
import { LandingPageTemplate } from '~/components/templates/LandingPage';

export default function Index() {
  return (
    <Page title="Home" description="Home">
      <LandingPageTemplate />
    </Page>
  );
}
