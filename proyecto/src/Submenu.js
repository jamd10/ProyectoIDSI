import React from 'react';
import './Submenu.css';

function Submenu() {
  return (
    <div className="submenu">
      <a href="/baños" className="submenu-button">
        Baños
      </a>
      <a href="/lavanderia" className="submenu-button">
        Lavandería
      </a>
      <a href="/herramientas" className="submenu-button">
        Herramientas de Limpieza
      </a>
      <a href="/bioseguridad" className="submenu-button">
        Bioseguridad
      </a>
      <a href="/desinfectante" className="submenu-button">
        Desinfectante
      </a>
      <a href="/cuidado-personal" className="submenu-button">
        Cuidado Personal
      </a>
      <a href="/productos-plasticos" className="submenu-button">
        Productos Plásticos
      </a>
    </div>
  );
}

export default Submenu;
