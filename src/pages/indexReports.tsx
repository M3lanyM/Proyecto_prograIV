import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/app";
import DatePicker from "@/components/function/calendar";
import Page_header from "@/components/page_header";
import Tablereports from "@/components/function/reportsTable";

export default function indexReports() {
    const [rutaOptions, setRutaOptions] = useState<string[]>([]);
    const [selectedRuta, setSelectedRuta] = useState<string>("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        const fetchRutaOptions = async () => {
            const app = initializeApp(firebaseConfig);
            const database = getFirestore(app);

            const rutareportdb = await getDocs(collection(database, "ruta"));
            const rutareportData = rutareportdb.docs.map((doc) => doc.data().nombre);

            setRutaOptions(rutareportData);
        };

        fetchRutaOptions();
    }, []);

    const handleRutaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRuta(event.target.value);
    };

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

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
                    <DatePicker selectedDate={selectedDate} onDateChange={handleDateChange} />

                    <select className="route-report" onChange={handleRutaChange}>
                        <option value="">Selecciona una ruta</option>
                        {rutaOptions.map((ruta) => (
                            <option key={ruta} value={ruta}>
                                {ruta}
                            </option>
                        ))}
                    </select>
                    <button className="report-button">Filtrar</button>
                </div>
            </article>

            <section>
                <Tablereports selectedRuta={selectedRuta} selectedDate={selectedDate} />
            </section>

            <footer>
                <div className="footer">
                    <p className="inf-footer">
                        Contactenos: <br />
                        Correo electrónico: info@busesUNA.com<br />
                        Teléfono: +1234567890<br />
                        Dirección: Canoas, Puntarenas, Costa Rica.<br />
                    </p>
                    <h1 className="copyright">© 2023</h1>
                </div>
            </footer>
        </>
    );
}
