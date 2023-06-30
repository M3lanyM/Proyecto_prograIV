import Page_header from "@/components/page_header";
import React, { useState } from "react";
import Page_footer from "@/components/page_footer";
import Tabletracks from "@/components/function/tracksTable";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/app";

const PackageTracking: React.FC = () => {
  const [selectedEncomiendaId, setselectedEncomiendaId] = useState<string>("");
  const [part, setPart] = useState(false);
  const [showError, setShowError] = useState(false);
  const [encomiendaHora, setEncomiendaHora] = useState<Date | null>(null);

  const handleRutaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setselectedEncomiendaId(event.target.value);
  };

  const handlerPart = async () => {
    const app = initializeApp(firebaseConfig);
    const database = getFirestore(app);

    const encomiendaRef = doc(database, "encomienda", selectedEncomiendaId);
    const encomiendaSnapshot = await getDoc(encomiendaRef);

    if (encomiendaSnapshot.exists()) {
      setPart(true);
      setShowError(false);

      const encomiendaData = encomiendaSnapshot.data();
      const fecha = encomiendaData.fecha.toDate();
      setEncomiendaHora(fecha);
    } else {
      setShowError(true);
    }
  };

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
            <div className="error-popup">Error: El código no existe</div>
          ) : part ? (
            <section id="principalTrack" className="items-center">
              <div className="downstairs">
                <div className="justify-center items-center">
                  <div className="containerTrack">
                    <div className={`circleRegistered ${isTimePassed(encomiendaHora) ? 'green' : ''}`}>
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

export default PackageTracking;
