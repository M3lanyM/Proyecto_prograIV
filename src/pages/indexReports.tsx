import DatePicker from "@/components/function/calendar"
import Page_footer from "@/components/page_footer"
import Page_header from "@/components/page_header"
import Tablereports from "@/components/function/reportsTable"

export default function indexReports() {
    return (
        <>
            <header>
                <Page_header />
            </header>

            <nav className="nav-report">
                <div>
                    <h1 className="title-nav">
                        Cierre de ventas
                        <img className="nav-img" src="/img/movimientos.png" alt="error" />
                    </h1>

                </div>
            </nav>

            <article>
                <div className="labels-div">
                    <label className="label1-report">Movimientos por fecha</label>
                    <label className="label2-report">Movimientos por ruta</label>
                </div>

                <div className="report-container">
                    <DatePicker></DatePicker>
                    <DatePicker></DatePicker>

                    <select className="route-report">
                        <option value="">Selecciona una ruta</option>
                        <option value="San José">San José</option>
                        <option value="Cartago">Cartago</option>
                        <option value="Heredia">Heredia</option>
                    </select>
                    <button className="report-button" > Filtrar </button>
                </div>
            </article>

            <section>
                <Tablereports></Tablereports>
            </section>

                <footer>
                    <div className="footer">
                        <p className="inf-footer">Contactenos: <br />
                            Correo electrónico: info@busesUNA.com<br />
                            Teléfono: +1234567890<br />
                            Dirección:  Canoas, Puntarenas, Costa Rica.<br />
                        </p>
                        <h1 className="copyright"> © 2023 </h1>
                    </div>
                </footer>
        </>
    )
}