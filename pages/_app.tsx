import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import React from 'react'

function MyApp({ Component, pageProps: { session, ...pageProps} }: AppProps) {
  return( 
    // the higher order component is used to persist the session through the entire app
    <SessionProvider session={session}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp

// ignore in-browser next/js recoil warnings 
const mutedConsole = (console:any) => ({
  ...console,
  warn: (...args:any) => args[0].includes('Duplicate atom key')
    ? null
    : console.warn(...args)
})
global.console = mutedConsole(global.console);