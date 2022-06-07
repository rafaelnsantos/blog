import styled from 'styled-components';
import { Header } from './header/Header';
import SEO from 'content/seo.json';
import { useGoogleAnalytics } from '~/providers/GoogleAnalytics';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { links } from 'content/navigation.json';

interface PageProps {
  children: React.ReactNode;
}

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;

export function Page({ children }: PageProps) {
  const ga = useGoogleAnalytics();
  const router = useRouter();

  useEffect(() => {
    ga.pageview(router.asPath);
  }, []);

  return (
    <PageContainer>
      <Header title={SEO.title} links={links} />
      {children}
    </PageContainer>
  );
}
