import React from 'react';
import { Link } from "react-router-dom";

function HomeUserExt() {
    return (
        <>
            <img className="d-block mx-auto img-fluid mt-5" src="img/logo-escudo.png" alt="" />

            <section className="section mb-4 mg-t-75px">
                <div className="row">
                    <div className="col-lg-6 px-5">
                        <div className="card card-home-ue">
                            <Link to="/user-ext/asociar-predios">
                                <h5 className="card-title text-center">Asociar predios</h5>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-6 px-5">
                        <div className="card card-home-ue">
                            <Link to="/user-ext/pagar">
                                <h5 className="card-title text-center">Pagar impuesto predial</h5>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeUserExt;
