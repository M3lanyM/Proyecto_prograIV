import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/app";
import DatePicker from "@/components/function/calendar";
import Page_header from "@/components/page_header";
import Tablereports from "@/components/function/reportsTable";

const IndexReports = () => {
  const [rutaOptions, setRutaOptions] = useState<string[]>([]);
  const [selectedRuta, setSelectedRuta] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  //here get the route options from the database
  useEffect(() => {
    const fetchRutaOptions = async () => {
      const app = initializeApp(firebaseConfig);
      const database = getFirestore(app);
      //I consult the "route" collection
      const rutareportdb = await getDocs(collection(database, "ruta"));
      //I map the documents to extract the name of the routes 
      const rutareportData = rutareportdb.docs.map((doc) => doc.data().nombre);

      //update the routeOptions with the obtained data
      setRutaOptions(rutareportData);
    };

    fetchRutaOptions();
  }, []);

  //updates the selectedRoute states when a route is selected in the component
  const handleRutaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRuta(event.target.value);
  };

  //updates the selectedDate when a date is selected in the component
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
};

export default IndexReports;
