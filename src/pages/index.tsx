import Image from 'next/image'
import Link from "next/link"
import { Inter } from 'next/font/google'
import Page_header from '@/components/page_header'
import Page_footer from '@/components/page_footer'
import { Josefin_Sans } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <header>
        <Page_header></Page_header>
      </header>

      <nav className="nav-home">
        <h1 className="company-name">Buses Universidad Nacional </h1>
      </nav>

      <section className="parcel-services min-h-screen  ">
        <div className="Row">
          <Link href="/indexPrice" className="service-titles">Cotización de  precios
          </Link>
          <p className="text-cost">
            Estime el costo de envio de sus paquetes en función<br />
            de la ruta, el peso y el volumen.
            <img className="service-img" src="/img/cotizacion.png" />
          </p>
        </div>

        <div className="Row">
          <Link className="service-titles2" href="/indexTracking"> Seguimiento de paquetes </Link>
          <p className="text-track" >
            Conoce la información del estado actual del envio
            <img className="service-img2" src="/img/paquete.png" />
          </p>
        </div>

        <div className="Row">
          <Link className="service-titles" href="/indexReports"> Reportes </Link>
          <p className="text-pack">
            Mira tu historial de paquetes enviados y recibidos
            <img className="service-img3" src="/img/reporte.png" />
          </p>
        </div>
      </section>
      <footer>
        <Page_footer></Page_footer>
      </footer>
    </>
  )
}
