import { NextSeo, NextSeoProps } from 'next-seo';
import styled from 'styled-components';
import { Header } from './header/Header';
import seoContent from 'content/seo.json';
interface PageProps {
  children: React.ReactNode;
  seo: NextSeoProps;
}

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;

export function Page({ children, seo }: PageProps) {
  return (
    <PageContainer>
      <NextSeo {...seo} title={`${seo.title} | ${seoContent.title}`} />
      <Header
        links={[
          { title: 'home', path: '/' },
          { title: 'blog', path: '/blog' },
        ]}
      />
      {children}
    </PageContainer>
  );
}
