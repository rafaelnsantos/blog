import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import fs from 'fs';
import path from 'path';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      if (process.env.NODE_ENV !== 'development') {
        const filePath = path.join(process.cwd(), 'public', 'style', 'preview', 'preview.css');

        if (fs.existsSync(filePath)) {
          fs.appendFileSync(filePath, sheet.getStyleTags());
        } else {
          fs.writeFileSync(filePath, sheet.getStyleTags());
        }
      }

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
          <link rel="preconnect" href="https://www.google-analytics.com" crossOrigin="anonymous" />
          <link
            rel="dns-prefetch"
            href="https://www.google-analytics.com"
            crossOrigin="anonymous"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="//fonts.googleapis.com" crossOrigin="anonymous" />

          <meta name="theme-color" content="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Fira+Mono:wght@400;500;700&family=Merriweather&family=Handlee&display=swap"
            rel="stylesheet"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
