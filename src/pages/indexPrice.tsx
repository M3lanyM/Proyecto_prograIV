import Page_footer from "@/components/page_footer"
import Page_header from "@/components/page_header"

export default function indexReports() {
    return (
        <>
            <header>
                <Page_header />
            </header>
            <section className="m-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label form="weight">Ingrese el peso:</label>
                        <input className="m-4" type="number" name="weight" placeholder="Kg" />
                    </div>
                    <div>
                        <label form="height">Ingrese la altura:</label>
                        <input className="m-4" type="number" name="height" placeholder="H" />
                    </div>
                    <div>
                        <label form="width">Ingrese el ancho:</label>
                        <input className="m-4" type="number" name="width" placeholder="W" />
                    </div>
                    <div>
                        <label form="Route">Seleccione la Ruta:</label>
                        <select className="m-4" name="route">
                            <option value="SanJose">San Jose</option>
                            <option value="PasoCanoas">Paso Canoas</option>
                            <option value="Neily">Neily</option>
                        </select>
                    </div>
                </div>
                <div>
                    <button className="Row">Calcular</button>
                </div>
            </section>
            <footer>
                <Page_footer />
            </footer>
        </>
    )
}