import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/app";

interface TablereportsProps {
    selectedRuta: string;
}

interface RutaData {
    [rutaId: string]: string;
}

const Tablereports = ({ selectedRuta }: TablereportsProps) => {
    const [filteredReportsData, setFilteredReportsData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const app = initializeApp(firebaseConfig);
            const database = getFirestore(app);

            const encomiendaCollection = collection(database, "encomienda");
            const encomiendaSnapshot = await getDocs(encomiendaCollection);

            const rutaCollection = collection(database, "ruta");
            const rutaSnapshot = await getDocs(rutaCollection);
            const rutaData: RutaData = rutaSnapshot.docs.reduce((acc, doc) => {
                const rutaId = doc.id;
                const rutaNombre = doc.data().nombre;
                return { ...acc, [rutaId]: rutaNombre };
            }, {});

            const reportsData = encomiendaSnapshot.docs.map((doc) => {
                const encomiendaData = doc.data();
                const rutaId = encomiendaData.ruta.id;
                return {
                    id: doc.id,
                    fecha: encomiendaData.fecha.toDate(),
                    ruta: rutaData[rutaId],
                    codigo: doc.id,
                };
            });


            const filteredData = selectedRuta
                ? reportsData.filter((item) => item.ruta === selectedRuta)
                : reportsData;

            setFilteredReportsData(filteredData);
        };

        fetchData();
    }, [selectedRuta]);

    return (
        <>
            <section className="">
                <div>
                    <table className="table-reports">
                        <thead>
                            <tr className="tr-reports">
                                <th className="th-reports">Fecha</th>
                                <th className="th-reports">Ruta</th>
                                <th className="th-reports">Código</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReportsData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.fecha.toLocaleDateString()}</td>
                                    <td>{item.ruta}</td>
                                    <td>{item.id}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};

export default Tablereports;
