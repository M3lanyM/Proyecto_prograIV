import '@/styles/globals.css'
import '@/styles/styles.price.css'
import '@/styles/reports.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
