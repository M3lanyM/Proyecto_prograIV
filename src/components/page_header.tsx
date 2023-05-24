import Link from 'next/link';
import { useRouter } from 'next/router';

const PageHeader = () => {
  const router = useRouter();

  const handleInicioLinkClick = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    router.push('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/img/autobus.png" alt="Logo de empresa" />
        {/*<h1 className="company-name">Nombre de la empresa </h1>*/}
      </div>

      <nav>
        <ul className="nav-links">
          <li><a href="#" onClick={handleInicioLinkClick}>Inicio</a></li>
          <li><Link href="/acerca-de">Acerca de</Link></li>
          <li><Link href="/contacto">Contáctenos</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default PageHeader;
