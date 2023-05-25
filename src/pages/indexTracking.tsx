import Page_header from '@/components/page_header';
import React, { useState } from "react";
import Page_footer from '@/components/page_footer';


const PackageTracking: React.FC = () => {
    const [part, setPart] = useState(false);

    const handlerPart = () => {
        setPart(true);
    }
    return (
        <>
            <header>
                <Page_header />
            </header>
            <section className="min-h-screen">
                <input className="code" type="text" placeholder="Código" />
                <div>
                    <button className="Rowtrack" onClick={handlerPart}>Rastrear</button>
                    {part && (
                        <section className="grid grid-cols-1 gap-4">
                            <div>
                            <div className="contener">
                                <div className="circleRegistered">
                                    <img src="/img/mercaderia.png" alt="Mercaderia" />
                                </div>
                                <label form="registered">Mercaderia Registrada</label>
                            </div>
                            <div className="contener">
                                <div className="circleProcess">
                                <img src="/img/transito.png" alt="En Transito" />
                                </div>
                                <label form="process">En transito</label>
                            </div>
                            <div className="contener">
                                <div className="circleDelivered">
                                <img src="/img/entregado.png" alt="Entregado" />
                                </div>
                                <label form="delivered">Entregado</label>
                            </div>
                            </div>
                            
                            <table className="table-track">
                                <thead>
                                    <tr className="tr-track">
                                        <th className="th-track">Fecha</th>
                                        <th className="th-track">Descripcion </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="tr-track">
                                        <td className="td-track" data-label="Fecha">Dato 1</td>
                                        <td className="td-track" data-label="E/S">Dato 2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    )}

                </div>
            </section>
            <footer >
                <Page_footer/>
            </footer>
        </>
    );
};

export default PackageTracking;

