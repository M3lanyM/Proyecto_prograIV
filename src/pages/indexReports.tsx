import DatePicker from "@/components/calendar"
import Page_footer from "@/components/page_footer"
import Page_header from "@/components/page_header"

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

            <section className="">
                <div>
                    <table className="table-reports">
                        <thead>
                            <tr className="tr-reports">
                                <th className="th-reports">Fecha</th>
                                <th className="th-reports">E/S</th>
                                <th className="th-reports">Ruta </th>
                                <th className="th-reports">Código </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="tr-reports">
                                <td className="td-reports" data-label="Fecha">Dato 1</td>
                                <td className="td-reports" data-label="E/S">Dato 2</td>
                                <td className="td-reports" data-label="Ruta">Dato 3</td>
                                <td className="td-reports" data-label="Código">Dato 3</td>
                            </tr>
                            <tr className="tr-reports">
                                <td className="td-reports" data-label="Fecha">Dato 4</td>
                                <td className="td-reports" data-label="E/S">Dato 5</td>
                                <td className="td-reports" data-label="Ruta">Dato 6</td>
                                <td className="td-reports" data-label="Código">Dato 7</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
            <footer>
            <div className="footer">
                <h2>Contactenos: </h2>
            </div>
            </footer>
        </>
    )
}