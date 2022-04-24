import React, { useState } from 'react';
import { toast } from 'react-toastify';

export const initialForm = {
    email: ""
}

function FormForgotPassword({ resetPassword }) {
    const [form, setForm] = useState(initialForm)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.email) {
            toast.error("Por favor, ingresa tu correo electrónico!!!");
            return;
        }

        resetPassword(form);
    }


    return (
        <>
            <section className="section min-vh-100 d-flex flex-column align-items-center justify-content-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-8 d-flex flex-column align-items-center justify-content-center">

                            <div className="card mb-3 form-1">

                                <div className="card-body">

                                    <div className="col-8 pt-4 pb-2 m-auto">
                                        <h5 className="card-title text-center pb-0 fs-4">¿Olvidaste tu contraseña?</h5>
                                        <p className="text-center small">Ingresa el correo electrónico con el que te registraste a continuación y te enviaremos un enlace para restablecer tu contraseña:</p>
                                    </div>

                                    <form className="row g-3 needs-validation justify-content-center" onSubmit={handleSubmit} noValidate>

                                        <div className="col-9">
                                            <label htmlFor="yourUsername" className="form-label">Correo Electrónico</label>
                                            <div className="input-group has-validation">
                                                <span className="input-group-text" id="inputGroupPrepend"><i className="bi bi-envelope-fill"></i></span>
                                                <input type="email" name="email" className="form-control" id="yourEmail" onChange={handleChange} value={form.email} required />
                                                <div className="invalid-feedback">Por favor, ingresa un correo electrónico válido!</div>
                                            </div>
                                        </div>

                                        <div className="col-7">
                                            <button className="btn my-btn-success rounded-pill w-100" type="submit">Recuperar Contraseña</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default FormForgotPassword;
