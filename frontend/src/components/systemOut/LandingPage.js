import React from 'react';
import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <>
            <img className="img-fluid d-block mx-auto mt-4" src="img/logo-escudo-cauca.png" alt="" />

            <div className="container mt-5 mb-4">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card card-home">
                            <Link to="/login">
                                <h5 className="card-title text-center">Iniciar Sesión</h5>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="card card-home">
                            <Link to="/register">
                                <h5 className="card-title text-center">¿No tienes una cuenta? Registrate aquí!!!</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LandingPage;
