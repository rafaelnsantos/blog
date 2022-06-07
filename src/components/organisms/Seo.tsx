import { NextSeo } from 'next-seo';
import SEO from 'content/seo.json';
import { useRouter } from 'next/router';

interface PageProps {
  title: string;
  description: string;
  image?: string;
}

export function Seo(seo: PageProps) {
  const seoImg = seo.image || SEO.image;

  const imgUrl = `${process.env.NEXT_PUBLIC_URL}/${
    seoImg.startsWith('/') ? seoImg.substring(1) : seoImg
  }`;

  const router = useRouter();

  return (
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
  );
}
