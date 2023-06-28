import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/app";
import generatePDF from "@/components/function/reportsPDF";

interface TablereportsProps {
    selectedRuta: string;
    selectedDate: Date | null;
}

interface RutaData {
    [rutaId: string]: string;
}

const Tablereports = ({ selectedRuta, selectedDate }: TablereportsProps) => {
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
                ? reportsData.filter(
                    (item) =>
                        item.ruta === selectedRuta &&
                        (!selectedDate || item.fecha.toDateString() === selectedDate.toDateString())
                )
                : reportsData.filter(
                    (item) => !selectedDate || item.fecha.toDateString() === selectedDate.toDateString()
                );

            setFilteredReportsData(filteredData);
        };

        fetchData();
    }, [selectedRuta, selectedDate]);

    const handleGeneratePDF = () => {
        generatePDF(filteredReportsData);
    };
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
            <button className="report-button" onClick={handleGeneratePDF}>Generar PDF</button>
        </>
    );
};

export default Tablereports;
