import { calculate } from "@/components/function/calculateprice";
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
                        <label className="label1-price" form="Route">Seleccione la Ruta:</label>
                        <select className="Select-Rout m-4"
                            value={input4} onChange={(e) => setInput4(e.target.value)}>
                            <option value="Seleccion">Seleccione una ruta</option>
                            <option value="SanJose">San Jose</option>
                            <option value="PasoCanoas">Paso Canoas</option>
                            <option value="Neily">Neily</option>
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