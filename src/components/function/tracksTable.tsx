import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/app";

interface TabletracksProps {
  selectedEncomiendaId: string;
}

interface EncomiendaData {
  fecha: Date;
  ruta: string;
}

const Tabletracks = ({ selectedEncomiendaId }: TabletracksProps) => {
  const [encomiendaData, setEncomiendaData] = useState<EncomiendaData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const app = initializeApp(firebaseConfig);
      const database = getFirestore(app);

      const encomiendaRef = doc(database, "encomienda", selectedEncomiendaId);
      const encomiendaSnapshot = await getDoc(encomiendaRef);

      if (encomiendaSnapshot.exists()) {
        const encomiendaData = encomiendaSnapshot.data();
        const rutaId = encomiendaData.ruta.id;

        const rutaRef = doc(database, "ruta", rutaId);
        const rutaSnapshot = await getDoc(rutaRef);

        if (rutaSnapshot.exists()) {
          const rutaData = rutaSnapshot.data();
          const fecha = encomiendaData.fecha.toDate();
          const ruta = rutaData.nombre;

          setEncomiendaData({ fecha, ruta });
        } else {
          setEncomiendaData(null);
        }
      } else {
        setEncomiendaData(null);
      }
    };

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