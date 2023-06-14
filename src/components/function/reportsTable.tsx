import React, { FormEvent, useEffect, useState } from "react";
import "firebase/firestore";
import "firebase/compat/firestore";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import database from "@/firebase/app";
import firebaseConfig from "@/firebase/app";
import { initializeApp } from "firebase/app";

const Tablereports = () => {
    const [id, setId] = useState("");
    const [fecha, setFecha] = useState("");
    const [es, setES] = useState("");
    const [ruta, setRuta] = useState("");
    const [codigo, setCodigo] = useState("");
    const [reportsData, setReportsData] = useState<any[]>([]);

    const app = initializeApp(firebaseConfig);

    const database = getFirestore(app);

    useEffect(() => {
        const fetchData = async () => {
            const database = getFirestore();
            const reportdb = await getDocs(collection(database, "prueba"));
            const mine = reportdb.docs.map((doc) => ({id: doc.id, ...doc.data(),
            }));
            setReportsData(mine);
        }
        fetchData();
    }, []);

const saveData = {
    id, fecha, es, ruta, codigo,
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
                                <th className="th-reports">Ruta </th>
                                <th className="th-reports">Código </th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportsData.map((mine) => (
                                <tr key= {mine.id}>
                                    <td>{mine.id}</td>
                                    <td>{mine.fecha}</td>
                                    <td>{mine.es}</td>
                                    <td>{mine.ruta}</td>
                                    <td>{mine.codigo}</td>
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