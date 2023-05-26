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
        <img src="/img/autobus.png" alt="Logo de empresa"/>
      </div>
      <nav>
        <ul className="nav-links">
          <li><a href="#" onClick={handleInicioLinkClick}>Inicio</a></li>
          <li><Link href="#">Acerca de</Link></li>
          <li><Link href="#">Contáctenos</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default PageHeader;
