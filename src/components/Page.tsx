import { NextSeo } from 'next-seo';
import styled from 'styled-components';
import { Header } from './header/Header';
import SEO from 'content/seo.json';
import { useGoogleAnalytics } from '~/providers/GoogleAnalytics';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { links } from 'content/navigation.json';

interface PageProps {
  children: React.ReactNode;
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

  const ga = useGoogleAnalytics();
  const router = useRouter();

  useEffect(() => {
    ga.pageview(router.asPath);
  }, []);

  return (
    <PageContainer>
      <NextSeo
        title={`${seo.title} | ${SEO.title}`}
        description={seo.description}
        openGraph={{
          type: 'website',
          url: `${process.env.NEXT_PUBLIC_URL}${router.asPath}`,
          images: [
            {
              url: imgUrl,
              alt: seo.title,
            },
          ],
        }}
      />
      <Header title={SEO.title} links={links} />
      {children}
    </PageContainer>
  );
}
