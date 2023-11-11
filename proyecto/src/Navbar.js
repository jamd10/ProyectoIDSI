import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <a className="navbar-brand menu-button" href="/">
          <img src="/logo.png" alt="Logo" width="150" height="75" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="search-box-mobile d-lg-none">
            <form className="d-flex">
              <input
                type="text"
                className="form-control search-input"
                placeholder="Buscar"
              />
              <button className="btn search-button" style={{ borderColor: '#23c01e' }}>
                <i className="fa fa-search" style={{ color: '#23c01e' }}></i>
              </button>
            </form>
          </div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item active">
              <a className="nav-link menu-button" href="/">
                Inicio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link menu-button" href="/mas-limpio">
                Mas Limpio
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link menu-button" href="/acerca">
                Sobre Nosotros
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link menu-button" href="/mi-perfil">
                Mi Perfil
              </a>
            </li>
            <li className="nav-item d-none d-lg-block">
              <div className="search-box">
                <form className="d-flex">
                  <input
                    type="text"
                    className="form-control search-input"
                    placeholder="Buscar"
                  />
                  <button className="btn search-button" style={{ borderColor: '#23c01e' }}>
                    <i className="fa fa-search" style={{ color: '#23c01e' }}></i>
                  </button>
                </form>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link menu-button" href="/carrito">
                <i className="fa fa-shopping-cart" style={{ fontSize: '25px', color: '#23c01e' }}></i> L.0
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
