import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/app";

// Props interface for the Tabletracks component
interface TabletracksProps {
  selectedEncomiendaId: string;
}

// Interface for the EncomiendaData object
interface EncomiendaData {
  fecha: Date;
  ruta: string;
}

// Tabletracks component
const Tabletracks = ({ selectedEncomiendaId }: TabletracksProps) => {
  // State to store encomienda data
  const [encomiendaData, setEncomiendaData] = useState<EncomiendaData | null>(null);

  useEffect(() => {

    // Fetches the encomienda data from Firestore
    const fetchData = async () => {
      const app = initializeApp(firebaseConfig);
      const database = getFirestore(app);

      const encomiendaRef = doc(database, "encomienda", selectedEncomiendaId);
      const parcelSnapshot = await getDoc(encomiendaRef);

      if (parcelSnapshot.exists()) {

        // If the encomienda exists, fetches the associated ruta data
        const encomiendaData = parcelSnapshot.data();
        const rutaId = encomiendaData.ruta.id;

        const rutaRef = doc(database, "ruta", rutaId);
        const rutaSnapshot = await getDoc(rutaRef);

        if (rutaSnapshot.exists()) {

          // If the ruta exists, retrieves the required data
          const rutaData = rutaSnapshot.data();
          const fecha = encomiendaData.fecha.toDate();
          const ruta = rutaData.nombre;

          setEncomiendaData({ fecha, ruta });
        } else {

          // If the ruta doesn't exist, sets encomiendaData to null
          setEncomiendaData(null);
        }
      } else {

        // If the encomienda doesn't exist, sets encomiendaData to null
        setEncomiendaData(null);
      }
    };


    // Fetch data only when selectedEncomiendaId changes
    if (selectedEncomiendaId) {
      fetchData();
    }
  }, [selectedEncomiendaId]);

  return (
    <>
      <table className="table-track">
        <thead>
          <tr className="tr-track">
            <th className="th-track">Fecha</th>
            <th className="th-track ">ruta </th>
          </tr>
        </thead>
        <tbody>
          <tr className="tr-track">
            <td>{encomiendaData?.fecha.toLocaleDateString()}</td>
            <td>{encomiendaData?.ruta}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Tabletracks;
