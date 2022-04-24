import React from 'react';
import { Link } from 'react-router-dom';

function Error404() {
    return (
        <>
            <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center container-bg">
                <h1>404</h1>
                <h2>La página a la que intentas acceder no existe!!!</h2>
                <Link to={-1} className="btn">Regresar</Link>
                <img src="img/not-found.svg" className="img-fluid py-5" alt="Page Not Found"/>
                    <div className="credits">
                        Designed by <a href="https://bootstrapmade.com/" target="_blank" rel="noreferrer">BootstrapMade</a>
                    </div>
            </section>
        </>
    )
}

export default Error404;
