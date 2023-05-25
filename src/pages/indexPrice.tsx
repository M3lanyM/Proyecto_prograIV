import { calculate } from "@/components/funtion/calculateprice";
import Page_footer from "@/components/page_footer"
import Page_header from "@/components/page_header"
import React, { useState } from "react";

export default function IndexPrice() {
    /*Price*/
    const [input1, setInput1] = useState<number>(0);
    const [input2, setInput2] = useState<number>(0);
    const [input3, setInput3] = useState<number>(0);
    const [input4, setInput4] = useState("");
    const [result, setResult] = useState<number>(0);

    const handlerPrice = () => {
        const Price = calculate(input1, input2, input3, input4);
        setResult(Price);
    }
    /*Personal*/
    const [part, setPart] = useState(false);

    const handlerPart = () => {
        setPart(true);
    }

    return (
        <>
            <header>
                <Page_header />
            </header>
            <div className="min-h-screen flex flex-col justify-center items-center">
                <section className="grid grid-cols-2 gap-4">
                    <div>
                        <label form="weight">Ingrese el peso:</label>
                        <input className="m-4" type="number"
                            value={input1} onChange={(e) => setInput1(parseInt(e.target.value))} placeholder="Kg" />
                    </div>
                    <div>
                        <label form="height">Ingrese la altura:</label>
                        <input className="m-4" type="number"
                            value={input2} onChange={(e) => setInput2(parseInt(e.target.value))} placeholder="H" />
                    </div>
                    <div>
                        <label form="width">Ingrese el ancho:</label>
                        <input className="m-4" type="number"
                            value={input3} onChange={(e) => setInput3(parseInt(e.target.value))} placeholder="W" />
                    </div>
                    <div>
                        <label form="Route">Seleccione la Ruta:</label>
                        <select className="m-4"
                            value={input4} onChange={(e) => setInput4(e.target.value)}>
                            <option value="Seleccion">Seleccione una ruta</option>
                            <option value="SanJose">San Jose</option>
                            <option value="PasoCanoas">Paso Canoas</option>
                            <option value="Neily">Neily</option>
                        </select>
                    </div>
                </section>
                <div>
                    <button className="Row" onClick={handlerPrice}>Calcular</button>
                    <p>el precio es de: {result} colones</p>
                    <button className="Row" onClick={handlerPart}>Datos Personales</button>
                </div>
                {/*Personal*/}
                {part && (
                    <section className="grid grid-cols-1 gap-4">
                        <div>
                            <label form="name">Nombre:</label>
                            <input className="m-4" type="text" placeholder="Ingrese su nombre" />
                        </div>
                        <div>
                            <label form="lastname">Apellido:</label>
                            <input className="m-4" type="text" placeholder="Ingrese su apellido" />
                        </div>
                        <div>
                            <label form="email">Email:</label>
                            <input className="m-4" type="email" placeholder="Ingrese su correo electrónico" />
                        </div>
                        <div>
                            <label form="phonenumber">Teléfono:</label>
                            <input className="m-4" type="tel" placeholder="Ingrese su número de teléfono" />
                        </div>
                        <div>
                            <button className="Row" >Generar Factura</button>
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