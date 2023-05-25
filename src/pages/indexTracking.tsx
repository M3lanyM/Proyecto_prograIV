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
            <section>
                <input className="code" type="text" placeholder="Código" />
                <div>
                    <button className="Rowtrack" onClick={handlerPart}>Rastrear</button>
                    {part && (
                        <section className="grid grid-cols-1 gap-4">
                            <div className="circle" />
                            <table className="table-reports">
                                <thead>
                                    <tr className="tr-reports">
                                        <th className="th-reports">Fecha</th>
                                        <th className="th-reports">Descripcion </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="tr-reports">
                                        <td className="td-reports" data-label="Fecha">Dato 1</td>
                                        <td className="td-reports" data-label="E/S">Dato 2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                    )}

                </div>
            </section>
            <footer >
                <Page_footer></Page_footer>
            </footer>
        </>
    );
};

export default PackageTracking;

