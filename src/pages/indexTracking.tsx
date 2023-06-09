import Page_header from "@/components/page_header";
import React, { useState } from "react";
import Page_footer from "@/components/page_footer";
import Tabletracks from "@/components/function/tracksTable";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/app";


// Defining the PackageTracking functional component
const PackageTracking: React.FC = () => {
  const [selectedEncomiendaId, setselectedEncomiendaId] = useState<string>("");
  const [part, setPart] = useState(false);
  const [showError, setShowError] = useState(false);
  const [encomiendaHora, setEncomiendaHora] = useState<Date | null>(null);

  // Event handler for tracking code input change
  const handleRutaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setselectedEncomiendaId(event.target.value);
  };

  // Event handler for tracking button click
  const handlerPart = async () => {
    const app = initializeApp(firebaseConfig);
    const database = getFirestore(app);

    const encomiendaRef = doc(database, "encomienda", selectedEncomiendaId);
    const parcelSnapshot = await getDoc(encomiendaRef);

    if (parcelSnapshot.exists()) {
      setPart(true);
      setShowError(false);

      const encomiendaData = parcelSnapshot.data();
      const fecha = encomiendaData.fecha.toDate();
      setEncomiendaHora(fecha);
    } else {
      setShowError(true);
      alert('Error: El código no existe');
    }
  };

  // Helper function to check if the time has passed
  const isTimePassed = (encomiendaHora: Date | null) => {
    if (!encomiendaHora) {
      return false;
    }

    const currentTimestamp = new Date().getTime();
    const encomiendaTimestamp = encomiendaHora.getTime();
    const fourHoursInMilliseconds = 4 * 60 * 60 * 1000; // 4 hours in milliseconds

    return currentTimestamp - encomiendaTimestamp >= fourHoursInMilliseconds;
  };

  return (
    <>
      <header>
        <Page_header />
      </header>
      <section className="min-h-screen items-center">
        <input
          className="code"
          type="text"
          placeholder="Código"
          value={selectedEncomiendaId}
          onChange={(e) => setselectedEncomiendaId(e.target.value)}
        />
        <div>
          <button className="Rowtrack" onClick={handlerPart}>
            Rastrear
          </button>
          {showError ? (
            <div className="error-popup"></div>
          ) : part ? (
            <section id="principalTrack" className="items-center">
              <div className="downstairs">
                <div className="justify-center items-center">
                  <div className="containerTrack">
                  <div className="circleRegistered">
                        <img src="/img/mercaderia.png" alt="Mercaderia" />
                      </div>
                      <label form="registered">Registrado</label>
                    </div>
                  <div className="containerTrack">
                    <div className={`circleProcess ${isTimePassed(encomiendaHora) ? 'green' : ''}`}>
                      <img src="/img/transito.png" alt="En Transito" />
                    </div>
                    <label form="process">En transito</label>
                  </div>
                  <div className="containerTrack">
                    <div className="circleDelivered">
                      <img src="/img/entregado.png" alt="Entregado" />
                    </div>
                    <label form="delivered">Entregado</label>
                  </div>
                </div>
              </div>
              <section>
                <Tabletracks selectedEncomiendaId={selectedEncomiendaId} />
              </section>
            </section>
          ) : null}
        </div>
      </section>
      <footer>
        <Page_footer />
      </footer>
    </>
  );
};

export default PackageTracking; // Exporting the PackageTracking component
