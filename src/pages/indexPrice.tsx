import { calculate } from "@/components/function/calculateprice";
import { sendDataToFirebase } from "@/components/function/sendDataAddress";
import { sendDataEnco } from "@/components/function/sendDataParcel";
import Page_footer from "@/components/page_footer"
import Page_header from "@/components/page_header"
import firebaseConfig from "@/firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";
import { generatePDF } from "@/components/function/generateBilling";

export default function IndexPrice() {
    /*stores price data*/
    const [input1, setInput1] = useState<number>(0);
    const [input2, setInput2] = useState<number>(0);
    const [input3, setInput3] = useState<number>(0);
    const [result, setResult] = useState<number>(0);
    /*stores route data*/
    const [routeOptions, setRouteOptions] = useState<{ id: string, name: string, distance: number }[]>([]);
    const [selectedRoute, setSelectedRoute] = useState("");
    const [Route, setRoute] = useState("");
    const [RouteName, setRouteName] = useState("");
    const [RouteDis, setRouteDis] = useState(0);
    /*stores recipient data*/
    const [name, setName] = useState<string>("");
    const [last, setLast] = useState<string>("");
    const [mail, setMail] = useState<string>("");
    const [number, setNumber] = useState<string>("");
    /*get the data from the routes table in firebase*/
    useEffect(() => {
        const fetchRutaOptions = async () => {
            try {
                const app = initializeApp(firebaseConfig);
                const database = getFirestore(app);

                const db = await getDocs(collection(database, "ruta"));
                const T2Data = db.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().nombre,
                    distance: doc.data().distanciaKm,
                }));

                setRouteOptions(T2Data);
            } catch (error) {
                console.error("Error al obtener los datos de Firebase:", error);
            }
        };

        fetchRutaOptions();
    }, []);
    /*Calculate the price and get the route data*/
    const handlerPrice = () => {
        if (input1 === 0 || input2 === 0 || input3 === 0 || selectedRoute === "") {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }
        if (selectedRoute) {
            const selected = routeOptions.find((route) => route.id === selectedRoute);
            if (selected) {
                const selectedDis = selected.distance;
                const selectedRut = selected.id;
                const name = selected.name;
                const Price = calculate(input1, input2, input3, selectedDis);
                setResult(Price);
                setRouteDis(selectedDis);
                setRouteName(name);
                setRoute(selectedRut);
            }
        }
    }
    /*method which checks the data, creates the destination and creates the order, generates the pdf */
    const handleButtonClick = () => {
        if (name === "" || last === "" || mail === "" || number === "") {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }
        const date = new Date();
        sendDataToFirebase(name, last, mail, number)
            .then((id) => {
                if (id) {
                    console.log("el destinatario es: ", id, "por la ruta: ", Route)
                    sendDataEnco(input1, input2, input3, Route, result, id, date)
                        .then((ids) => {
                            if (ids) {
                                generatePDF(ids, input2, input3, result, date, input1, RouteDis, RouteName);
                            }
                        })
                        .catch((error) => {
                            console.error("Error al enviar los datos a Firebase:", error);
                        });
                }
            })
            .catch((error) => {
                console.error("Error al enviar los datos a Firebase:", error);
            });

    };

    /*Personal*/
    const [part, setPart] = useState(false);
    /*Show the personal data section*/
    const handlerPart = () => {
        if (result === 0) {
            alert('Por favor, realice un calculo de precio');
            return;
        }
        setPart(true);
    }
    /*get the id of the route in the option*/
    const handleRutaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRoute(event.target.value);
    };

    return (
        <>
            <header>
                <Page_header />
            </header>
            {/*Price*/}
            <div id="Price" className="min-h-screen flex flex-col justify-center items-center">
                <section className="container-price grid grid-cols-2 gap-4">
                    <div>
                        <label className="label1-price" form="weight">Ingrese el peso:</label>
                        <input className="input1-price m-4" type="number"
                            value={input1} onChange={(e) => setInput1(parseInt(e.target.value))} placeholder="Kg" />
                    </div>
                    <div>
                        <label className="label1-price" form="height">Ingrese la altura:</label>
                        <input className="input1-price m-4" type="number"
                            value={input2} onChange={(e) => setInput2(parseInt(e.target.value))} placeholder="H" />
                    </div>
                    <div>
                        <label className="label1-price" form="width">Ingrese el ancho:</label>
                        <input className=" input1-price m-4" type="number"
                            value={input3} onChange={(e) => setInput3(parseInt(e.target.value))} placeholder="W" />
                    </div>
                    <div>
                        <label className="label1-price"> Seleccione la ruta</label>
                        <select className="Select-Rout m-4" onChange={handleRutaChange}>
                            <option value="">Selecciona una ruta</option>
                            {routeOptions.map((route) => (
                                <option key={route.id} value={route.id}>
                                    {route.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </section>
                <div>
                    <button className="button-price" onClick={handlerPrice}>Calcular</button>
                    <p className="result-price">El precio es de: {result} colones</p>
                    <button className="button-personal" onClick={handlerPart}>Datos Personales</button>
                </div>

                {/*Personal*/}
                {part && (
                    <section className="container-personal grid grid-cols-1 gap-4">
                        <div>
                            <label className="label1-price" form="name">Nombre:</label>
                            <input className="input2-price m-4" type="text" placeholder="Ingrese su nombre"
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <label className="label1-price" form="lastname">Apellido:</label>
                            <input className="input2-price m-4" type="text" placeholder="Ingrese su apellido"
                                value={last} onChange={(e) => setLast(e.target.value)} />
                        </div>
                        <div>
                            <label className="label1-price" form="email">Email:</label>
                            <input className="input2-price m-4" type="email" placeholder="Ingrese su correo electrónico"
                                value={mail} onChange={(e) => setMail(e.target.value)} />
                        </div>
                        <div>
                            <label className="label1-price" form="phonenumber">Teléfono:</label>
                            <input className="input2-price m-4" type="tel" placeholder="Ingrese su número de teléfono"
                                value={number} onChange={(e) => setNumber(e.target.value)} />
                        </div>
                        <div>
                            <button className="Generate-bill" onClick={handleButtonClick}>Generar Factura</button>
                        </div>
                    </section>
                )}
            </div>
            <footer >
                <Page_footer />
            </footer>
        </>
    )
}