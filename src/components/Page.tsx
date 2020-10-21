import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import { Header } from './header/Header';
import SEO from 'content/seo.json';
interface PageProps {
  children: React.ReactNode;
  url: string;
  title: string;
  description: string;
  image?: string;
}

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;

export function Page({ children, ...seo }: PageProps) {
  const seoImg = seo.image || SEO.image;

  const imgUrl = `${process.env.NEXT_PUBLIC_URL}/${
    seoImg.startsWith('/') ? seoImg.substring(1) : seoImg
  }`;

  return (
    <PageContainer>
      <NextSeo
        title={`${seo.title} | ${SEO.title}`}
        description={seo.description}
        openGraph={{
          type: 'website',
          url: `${process.env.NEXT_PUBLIC_URL}${seo.url}`,
          images: [
            {
              url: imgUrl,
              alt: seo.title,
            },
          ],
        }}
      />
      <Header
        title={SEO.title}
        links={[
          { title: 'home', path: '/' },
          { title: 'blog', path: '/blog' },
        ]}
      />
      {children}
    </PageContainer>
  );
}
