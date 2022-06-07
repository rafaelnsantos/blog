import { ReactElement } from 'react';
import { Seo } from '~/components/organisms/SEO';
import { Page } from '~/components/Page';
import { LandingPageTemplate } from '~/components/templates/LandingPage';

export default function Index() {
  return <LandingPageTemplate />;
}

Index.getLayout = function getLayout(page: ReactElement) {
  return (
    <Page>
      <Seo title="Home" description="Home" />
      {page}
    </Page>
  );
};
