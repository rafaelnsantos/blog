import { NextSeo } from 'next-seo';
import SEO from 'content/seo.json';

const youtube = 'tgbNymZ7vqY';

export default function Index() {
  return (
    <>
      <NextSeo
        title={SEO.title}
        description={SEO.description}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: process.env.NEXT_PUBLIC_URL,
          images: [
            {
              url: SEO.image,
              width: 1200,
              height: 630,
              alt: SEO.title,
            },
          ],
        }}
      />
      <iframe
        title="video"
        width="420"
        height="315"
        src={`https://www.youtube.com/embed/${youtube}`}
      />
    </>
  );
}
