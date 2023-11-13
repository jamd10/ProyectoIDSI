import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer-content">
                <div className="social-icons">
                    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                    <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
                    <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                </div>
                <p>Derechos reservados © 2023 | Grupo + Limpio</p>
            </div>
        </div>
    );
};

export default Footer;
