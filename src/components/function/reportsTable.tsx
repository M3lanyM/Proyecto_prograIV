import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import firebaseConfig from "@/firebase/app";

interface TablereportsProps {
    selectedRuta: string;
}

const Tablereports = ({ selectedRuta }: TablereportsProps) => {
    const [id, setId] = useState("");
    const [fecha, setFecha] = useState("");
    const [es, setES] = useState("");
    const [codigo, setCodigo] = useState("");
    const [reportsData, setReportsData] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const app = initializeApp(firebaseConfig);
            const database = getFirestore(app);

            const reportdb = await getDocs(collection(database, "prueba"));
            const mine = reportdb.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            const prueba2db = await getDocs(collection(database, "prueba2"));
            const prueba2Data = prueba2db.docs.map((doc) => doc.data().ruta);

            const mergedData = mine.map((item, index) => ({
                ...item,
                ruta: prueba2Data[index],
            }));

            const filteredData = selectedRuta
                ? mergedData.filter((item) => item.ruta === selectedRuta)
                : mergedData;

            setReportsData(filteredData);
        };

        fetchData();
    }, [selectedRuta]);

    const saveData = {
        id,
        fecha,
        es,
        codigo,
    };

    return (
        <>
            <section className="">
                <div>
                    <table className="table-reports">
                        <thead>
                            <tr className="tr-reports">
                                <th className="th-reports">ID</th>
                                <th className="th-reports">Fecha</th>
                                <th className="th-reports">E/S</th>
                                <th className="th-reports">Ruta</th>
                                <th className="th-reports">Código</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportsData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.fecha}</td>
                                    <td>{item.es}</td>
                                    <td>{item.ruta}</td>
                                    <td>{item.codigo}</td>
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
