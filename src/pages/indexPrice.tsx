import { calculate } from "@/components/function/calculateprice";
import Page_footer from "@/components/page_footer"
import Page_header from "@/components/page_header"
import firebaseConfig from "@/firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { useEffect } from "react";

export default function IndexPrice() {
    /*Price*/
    const [input1, setInput1] = useState<number>(0);
    const [input2, setInput2] = useState<number>(0);
    const [input3, setInput3] = useState<number>(0);
    const [result, setResult] = useState<number>(0);
    const [rutaOptions, setRutaOptions] = useState<string[]>([]);
    const [selectedRuta, setSelectedRuta] = useState<string>("");

    useEffect(() => {
        const fetchRutaOptions = async () => {
            const app = initializeApp(firebaseConfig);
            const database = getFirestore(app);

            const prueba2db = await getDocs(collection(database, "prueba2"));
            const prueba2Data = prueba2db.docs.map((doc) => doc.data().ruta);

            setRutaOptions(prueba2Data);
        };

        fetchRutaOptions();
    }, []);

    const handlerPrice = () => {
        const Price = calculate(input1, input2, input3, selectedRuta);
        setResult(Price);
    }
    /*Personal*/
    const [part, setPart] = useState(false);

    const handlerPart = () => {
        setPart(true);
    }
    const handleRutaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRuta(event.target.value);
    };

    return (
        <>
            <header>
                <Page_header />
            </header>

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
                            {rutaOptions.map((ruta) => (
                                <option key={ruta} value={ruta}>
                                    {ruta}
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
                            <input className="input2-price m-4" type="text" placeholder="Ingrese su nombre" />
                        </div>
                        <div>
                            <label className="label1-price" form="lastname">Apellido:</label>
                            <input className="input2-price m-4" type="text" placeholder="Ingrese su apellido" />
                        </div>
                        <div>
                            <label className="label1-price" form="email">Email:</label>
                            <input className="input2-price m-4" type="email" placeholder="Ingrese su correo electrónico" />
                        </div>
                        <div>
                            <label className="label1-price" form="phonenumber">Teléfono:</label>
                            <input className="input2-price m-4" type="tel" placeholder="Ingrese su número de teléfono" />
                        </div>
                        <div>
                            <button className="Generate-bill" >Generar Factura</button>
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