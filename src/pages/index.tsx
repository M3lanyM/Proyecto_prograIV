import Image from 'next/image'
import { Inter } from 'next/font/google'
import Page_header from '@/components/page_header'
import Page_services from '@/components/page_service'
import Page_footer from '@/components/page_footer'
import { Josefin_Sans } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <header>
        <Page_header></Page_header>
      </header>
      <section>
        <Page_services></Page_services>
      </section>
      <footer>
        <Page_footer></Page_footer>
      </footer>
    </>
  )
}
