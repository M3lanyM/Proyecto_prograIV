import DatePicker from "@/components/calendar"
import Page_footer from "@/components/page_footer"
import Page_header from "@/components/page_header"

export default function indexReports() {
    return (
        <>
            <header>
                <Page_header />
            </header>
            <section className="min-h-screen">
                
                <div className="report-container">
                    <DatePicker></DatePicker>

                    <DatePicker></DatePicker>

                    <label className="option-route">Selecciona una ruta:</label>
                    <select className="route-report">
                        <option value="">--Selecciona una opción--</option>
                        <option value="San José">San José</option>
                        <option value="Cartago">Cartago</option>
                        <option value="Heredia">Heredia</option>
                    </select>
                    <button className="report-button" > Filtrar </button>
                </div>

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
                <Page_footer />
            </footer>
        </>
    )
}