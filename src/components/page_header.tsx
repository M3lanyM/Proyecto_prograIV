const Page_header = ({ }) => {
    return (
        <header className= "header">
            <div className="logo">
                <img src="/img/autobus.png" alt="Logo de empresa" />
                {/*<h1 className="company-name">Nombre de la empresa </h1>*/}
            </div>

            <nav>
                <ul className="nav-links">
                    <li><a href="#">Inicio</a></li>
                    <li><a href="#">Acerca de</a></li>
                    <li><a href="#">Contáctenos</a></li>
                </ul>
            </nav>
        </header>

    )
}

export default Page_header