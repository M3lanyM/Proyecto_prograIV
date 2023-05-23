import Link from "next/link"

const Page_services = ({ }) => {
    return (
        <section className="parcel-services">
            <div className="Row">
            <Link href="/indexReports" className="service-titles">Cotización de  precios
              </Link>

                {/*<a className="service-titles" href="#"> Cotización de  precios</a>*/}
                <p className="text-cost">
                    Estime el costo de envió de sus paquetes en función<br />
                    de la ruta, el peso y el volumen.
                    <img className = "service-img" src="/cotizacion.png"/>
                </p>
            </div>

            <div className="Row">
                <a className="service-titles2" href="#"> Seguimiento de paquetes </a>
                <p className="text-track" >
                    Conoce la información del estado actual del envio
                    <img className = "service-img2" src="/paquete.png"/>
                </p>
            </div>

            <div className="Row">
                <a className="service-titles" href="#"> Reportes </a>
                <p className="text-pack">
                    Mira tu historial de paquetes enviados y recibidos
                    <img className = "service-img3" src="/reporte.png"/>
                </p>
            </div>
        </section>

    )
}

export default Page_services