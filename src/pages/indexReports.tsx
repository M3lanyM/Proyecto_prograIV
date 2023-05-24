import Page_footer from "@/components/page_footer"
import Page_header from "@/components/page_header"

export default function indexReports() {
    return (
        <>
            <header>
                <Page_header></Page_header>
            </header>
            <section>
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
                <Page_footer></Page_footer>
            </footer>
        </>
    )
}