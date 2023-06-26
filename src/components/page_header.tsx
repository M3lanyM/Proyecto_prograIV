import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PageHeader = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

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

  const handleContactenosClick = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
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
          <li><a href="#" onClick={handleContactenosClick}>Contáctenos</a></li>
        </ul>
      </nav>

      {isModalOpen && (
        <div className="modal-about">
          <div className="content-about">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <img src="/img/bus.gif" alt="Logo de Buses Universidad Nacional" />
            <h2>Acerca de Buses Universidad Nacional</h2>
            <p>
              Buses Universidad Nacional es una empresa líder en el envío de encomiendas a nivel nacional.
              Nuestra misión es proporcionar soluciones confiables y eficientes,
              garantizando la seguridad y puntualidad en cada envío.
              Contamos con una flota moderna y conductores altamente capacitados,
              brindando un servicio personalizado y atención al cliente de alta calidad.
              Si buscas confiabilidad para tus envíos de encomiendas,
              contáctanos hoy mismo y descubre por qué somos la opción preferida de tantos clientes satisfechos.
            </p>
          </div>
        </div>
      )}

      {isContactModalOpen && (
        <div className="modal-contact">
          <div className="content-contact">
            <span className="close" onClick={handleCloseContactModal}>&times;</span>
            <h2>Contacto</h2>
            <p>
              Horario de atención: de lunes a viernes de 7am a 6pm para atender consultas.<br />
              Ubicación física: H4FH+82P, 2, Puntarenas Province, Corredores<br />
              Correo electrónico: info@busesUNA.com<br />
              Teléfono: +1234567890
            </p>
            <p>Texto de contacto adicional...</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default PageHeader;
