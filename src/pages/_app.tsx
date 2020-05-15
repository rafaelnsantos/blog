import React from 'react'
import { Header } from '~/components/header'
import { Providers } from '~/components/providers'
import '~/theme/global.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <Providers>
      <Header />
      <Component {...pageProps} />
    </Providers>
  )
}

export default MyApp