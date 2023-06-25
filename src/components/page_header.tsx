import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const PageHeader = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInicioLinkClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    router.push('/');
  };

  const handleAcercaDeClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/img/autobus.png" alt="Logo de la empresa" />
      </div>
      <nav>
        <ul className="nav-links">
          <li><a href="#" onClick={handleInicioLinkClick}>Inicio</a></li>
          <li><a href="#" onClick={handleAcercaDeClick}>Acerca de</a></li>
          <li><Link href="#">Contáctenos</Link></li>
        </ul>
      </nav>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <img src="/img/bus.gif" alt="Logo de Buses Universidad Nacional" />
            <h2>Acerca de Buses Universidad Nacional</h2>
            <p>
              Buses Universidad Nacional es una empresa líder en el envío de encomiendas a nivel nacional. Nuestra misión es proporcionar soluciones confiables y eficientes, garantizando la seguridad y puntualidad en cada envío. Contamos con una flota moderna y conductores altamente capacitados, brindando un servicio personalizado y atención al cliente de alta calidad. Si buscas confiabilidad para tus envíos de encomiendas, contáctanos hoy mismo y descubre por qué somos la opción preferida de tantos clientes satisfechos.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};

export default PageHeader;
