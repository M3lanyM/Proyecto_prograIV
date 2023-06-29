import Page_header from '@/components/page_header';
import React, { useState } from "react";
import Page_footer from '@/components/page_footer';
import Tabletracks from "@/components/function/tracksTable";


const PackageTracking: React.FC = () => {
    const [selectedEncomiendaId, setselectedEncomiendaId] = useState<string>("");
    const [part, setPart] = useState(false);

    const handleRutaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setselectedEncomiendaId(event.target.value);
    };
    

    const handlerPart = () => {
        setPart(true);
    }
    return (
        <>
            <header>
                <Page_header />
            </header>
            <section className="min-h-screen items-center">
                <input className="code" type="text" placeholder="Código" 
                value={selectedEncomiendaId} onChange={(e) => setselectedEncomiendaId(e.target.value)} />
                <div >
                    <button className="Rowtrack" onClick={handlerPart}>Rastrear</button>
                    {part && (
                        <section id="principalTrack" className="items-center">

                            <div className='downstairs'>
                                <div className="justify-center items-center">
                                    <div className="containerTrack">

                                        <div className="circleRegistered">
                                            <img src="/img/mercaderia.png" alt="Mercaderia" />
                                        </div>
                                        <label form="registered">Registrado</label>
                                    </div>
                                    <div className="containerTrack">
                                        <div className="circleProcess">
                                            <img src="/img/transito.png" alt="En Transito" />
                                        </div>
                                        <label form="process">En transito</label>
                                    </div>
                                    <div className="containerTrack">
                                        <div className="circleDelivered">
                                            <img src="/img/entregado.png" alt="Entregado" />
                                        </div>
                                        <label form="delivered">Entregado</label>
                                    </div>
                                </div>
                            </div>
                            <section>
                                <Tabletracks selectedEncomiendaId={selectedEncomiendaId} />
                            </section>
                        </section>
                    )}

                </div>
            </section>
            <footer >
                <Page_footer />
            </footer>
        </>
    );
};

export default PackageTracking;

