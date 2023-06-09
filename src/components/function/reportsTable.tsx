import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, getDoc, DocumentReference, DocumentSnapshot, DocumentData } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/app";
import generatePDF from "@/components/function/reportsPDF";

//interfaces for the data types used
interface ReportData {
    id: string;
    fecha: Date;
    ruta: string;
    codigo: string;
    destinatario: string;
}

interface RutaData {
    [rutaId: string]: string;
}

interface DestinatarioData {
    [destinatarioId: string]: string;
}

interface TablereportsProps {
    selectedRuta: string;
    selectedDate: Date | null;
}

const Tablereports = ({ selectedRuta, selectedDate }: TablereportsProps) => {
    const [filteredReportsData, setFilteredReportsData] = useState<ReportData[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const app = initializeApp(firebaseConfig);
            const database = getFirestore(app);

            try {
                // Get the documents from the collections parcel, route and recipient
                const [encomiendastored, rutastored, destinatarioDocs] = await Promise.all([
                    getDocs(collection(database, "encomienda")),
                    getDocs(collection(database, "ruta")),
                    getDocs(collection(database, "destinatario"))
                ]);

                // get the route names
                const rutaData: RutaData = rutastored.docs.reduce((acc, doc) => {
                    const rutaId = doc.id;
                    const rutaNombre = doc.data().nombre;
                    return { ...acc, [rutaId]: rutaNombre };
                }, {});

                // get recipient names
                const destinatarioData: DestinatarioData = destinatarioDocs.docs.reduce((acc, doc) => {
                    const destinatarioId = doc.id;
                    const destinatarioNombre = doc.data().nombre;
                    const destinatarioApellido = doc.data().apellido;
                    const nombreCompleto = `${destinatarioNombre} ${destinatarioApellido}`;
                    return { ...acc, [destinatarioId]: nombreCompleto };
                }, {});

                //it goes through the documents because for each document
                //it obtains the data of the parcel and the data of the recipient's document.
                const reportsData: Promise<ReportData>[] = encomiendastored.docs.map(async (doc) => {
                    const encomiendaData = doc.data();
                    const rutaId = encomiendaData.ruta.id;

                    const destinatarioRef: DocumentReference = encomiendaData.destinatario;
                    const destinatarioDoc: DocumentSnapshot<DocumentData> = await getDoc(destinatarioRef);

                    //stores the full name of the recipient
                    let destinatarioNombreCompleto = '';
                    //stores the full name of the recipient
                    if (destinatarioDoc.exists()) {
                        const destinatarioId = destinatarioDoc.id;
                        destinatarioNombreCompleto = destinatarioData[destinatarioId];
                    }

                    return {
                        id: doc.id,
                        fecha: encomiendaData.fecha.toDate(),
                        ruta: rutaData[rutaId],
                        codigo: doc.id,
                        destinatario: destinatarioNombreCompleto,
                    };
                });

                const reportsDataWithDestinatario = await Promise.all(reportsData);
                // Filter the data based on the selected route and date
                const filteredData = selectedRuta
                    ? reportsDataWithDestinatario.filter(
                        (item) =>
                            item.ruta === selectedRuta &&
                            (!selectedDate || item.fecha.toDateString() === selectedDate.toDateString())
                    )
                    : reportsDataWithDestinatario.filter(
                        (item) => !selectedDate || item.fecha.toDateString() === selectedDate.toDateString()
                    );
                // update with the filtered data
                setFilteredReportsData(filteredData);
            } catch (error) {
                console.error("Error fetching data:", error);

            }
        };

        fetchData();
    }, [selectedRuta, selectedDate]);

    //PDF generation
    const handleGeneratePDF = () => {
        generatePDF(filteredReportsData);
    };

    return (
        <>
            <div className="containerTable">
                <table className="table-reports">
                    <thead>
                        <tr className="tr-reports">
                            <th className="th-reports">Fecha</th>
                            <th className="th-reports">Ruta</th>
                            <th className="th-reports">Destinatario</th>
                            <th className="th-reports">Código</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReportsData.map((item) => (
                            <React.Fragment key={item.id}>
                                <tr key={item.id}>
                                    <td style={{ textAlign: "center" }}>{item.fecha.toLocaleDateString()}</td>
                                    <td style={{ textAlign: "center" }}>{item.ruta}</td>
                                    <td style={{ textAlign: "center" }}>{item.destinatario}</td>
                                    <td style={{ textAlign: "center" }}>{item.id}</td>
                                </tr>
                                <tr className="row-separator">
                                    <td colSpan={4}></td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>

            <button className="report-button" onClick={handleGeneratePDF}>
                Generar PDF
            </button>
        </>
    );
};

export default Tablereports;
