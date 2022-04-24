import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export const initialForm = {
    email: "",
    password: "",
}

function FormLogin({ login }) {
    const [form, setForm] = useState(initialForm)
    const [showPassword, setShowPassword] = useState(false)

    const handleInputChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleShow = (e) => {
        setShowPassword(!showPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            toast.error("Datos incompletos!!!")
            return;
        }

        login(form);
    }

    return (
        <section className="section min-vh-100 d-flex flex-column align-items-center justify-content-center">
            <div className="container">
                <div className="row justify-content-center">

                    <div className="col-lg-5 col-md-7 d-flex flex-column align-items-center justify-content-center">
                        <div className="card mb-3 form-1">
                            <div className="card-body">
                                <div className="pt-4 pb-2">
                                    <h5 className="card-title text-center pb-0 fs-4">¡Bienvenido!</h5>
                                    <p className="text-center small">Para iniciar sesión, ingresa tu usuario y tu contraseña</p>
                                </div>
                                {/* ******************** Form Login ******************** */}
                                <form className="row g-3 needs-validation justify-content-center" onSubmit={handleSubmit} noValidate>

                                    <div className="col-10">
                                        <label htmlFor="idUsuario" className="form-label">Usuario</label>
                                        <div className="input-group has-validation">
                                            <span className="input-group-text" id="inputGroupPrepend"><i className="bi bi-person-fill"></i></span>
                                            <input type="email" name="email" className="form-control" id="idUsuario" onChange={handleInputChange} value={form.email} required />
                                        </div>
                                    </div>

                                    <div className="col-10">
                                        <label htmlFor="idPassword" className="form-label">Contraseña</label>
                                        <div className="input-group has-validation">
                                            <span className="input-group-text" id="inputGroupPrepend"><i className="bi bi-lock-fill"></i></span>
                                            <input type={showPassword ? "text" : "password"} name="password" className="form-control" id="idPassword" onChange={handleInputChange} value={form.password} required />
                                            <button className="btn-show-pass input-group-text" type="button" onClick={handleShow}>
                                                <i className={showPassword ? "bi bi-eye-slash-fill" : "bi bi-eye-fill"}></i>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-6">
                                        <button className="btn my-btn-success rounded-pill w-100" type="submit">Iniciar Sesión</button>
                                    </div>

                                    <div className="col-10 text-center">
                                        <p className="small mb-0">¿No tienes una cuenta? <Link to="/register" className="form-link">Registrate aquí!</Link></p>
                                    </div>

                                    <div className="col-10 text-center">
                                        <p className="small mb-0">¿Olvidaste tu contraseña? <Link to="/reset-password" className="form-link">Recuperala aquí!</Link></p>
                                    </div>
                                </form>
                                {/* ******************** End Form Login ******************** */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FormLogin;
