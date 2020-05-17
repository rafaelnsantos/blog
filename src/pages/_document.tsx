import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { FallbackStyles, MagicScriptTag } from '~/theme/InlineCssVariables';
import { Gtag, PageView } from '~/utils/gtag';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <FallbackStyles />
          <Gtag />
          <PageView />
          <link rel="preconnect" href="https://www.google-analytics.com" />
          <link rel="dns-prefetch" href="https://www.google-analytics.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com/" />
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <MagicScriptTag />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
