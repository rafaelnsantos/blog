import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import seo from 'next-seo.config' 

export function SEO () {
  return (
    <>
      <DefaultSeo {...seo}/>
      <Head>
        {/* <meta name="theme-color" content={'#fefefe'} /> */}
        {/* <link rel="apple-touch-icon" href="/static/meta/apple-touch-icon.png" /> */}
        {/* <link
          rel="mask-icon"
          href="/static/meta/mask-icon.svg"
          color={'#050505'}
        /> */}
        {/* <link rel="manifest" href="/static/meta/manifest.json" /> */}
        {/* <link
          rel="icon"
          href={`data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`}
        /> */}
      </Head>
    </>
  )
}