import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="footer-col d-none d-sm-block">
                        <h4>Gobernación del Cauca</h4>
                        <a href="https://www.cauca.gov.co/" target="_blank" rel="noreferrer">
                            <img className="img-fluid" src="img/logo-footer.png" alt="" />
                        </a>
                    </div>
                    <div className="footer-col">
                        <h4>Contáctanos</h4>
                        <ul>
                            <li><p href="#">Dirección: Carrera 7 Calle 4 Esquina Popayán - Cauca. </p></li>
                            <li><p href="#">Código Postal 190001</p></li>
                            <li><p href="#">Teléfono: 602 8320352 - 602 8220571 - 602 8220572 - 602 8242121</p></li>
                            <li><p href="#">contactenos@cauca.gov.co</p></li>
                            <li><p href="#">Notificaciones judiciales:
                                notificaciones@cauca.gov.co</p></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Síguenos</h4>
                        <div className="social-links">
                            <a href="https://es-la.facebook.com/GobCauca/" target="_blank" rel="noreferrer"><i className="bi bi-facebook"></i></a>&nbsp;&nbsp;
                            <a href="https://www.instagram.com/GobCauca/" target="_blank" rel="noreferrer"><i className="bi bi-instagram"></i></a>&nbsp;&nbsp;
                            <a href="https://twitter.com/GobCauca" target="_blank" rel="noreferrer"><i className="bi bi-twitter"></i></a>&nbsp;&nbsp;
                            <a href="https://www.youtube.com/channel/UCJUgHfrUdzJojR2Ktao7fHw" target="_blank" rel="noreferrer"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>
                    <div className="footer-col d-none d-sm-block">
                        <h4>Gobierno de Colombia</h4>
                        <a href="https://www.gov.co/home/" target="_blank" rel="noreferrer">
                            <img className="img-fluid" src="/img/logo2-footer.png" alt="" />
                        </a>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <p style={{ color: '#d4d4d4' }}>
                        &copy;{new Date().getFullYear()} <b>Chrod</b> | All rights reserved
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
