import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { validateFormNewPassword } from '../../tools/validateForm';
import InputForm2 from '../inputForms/InputForm2';

export const initialForm = {
    newPassword: "",
    renewPassword: ""
}

function FormNewPassword({ newPassword }) {
    const [form, setForm] = useState(initialForm)
    const { token } = useParams()
    const [reset, setReset] = useState(false)
    console.log(token)

    const inputNewPassword = [
        {
            id: "IdNewPassword",
            name: "newPassword",
            className: "mt-2 mb-2",
            type: "password",
            logo: "bi bi-lock-fill",
            errorMessage: "La contraseña debe tener una longitud mínima de 8; contener al menos 1 mayuscula, 1 minuscula, 1 número y un caracter especial!!!",
            label: "Nueva contraseña:",
            pattern: "^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])((?=.*\\W)|(?=.*_)).*$",
            required: true,
        },
        {
            id: "IdRenewPassword",
            name: "renewPassword",
            className: "mt-2 mb-2",
            type: "password",
            logo: "bi bi-lock-fill",
            errorMessage: "Las contraseñas no coinciden!!!",
            label: "Confirmar nueva contraseña:",
            pattern: form.newPassword,
            required: true,
        },
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateFormNewPassword(form)) {
            newPassword(form, token);
            setReset(true)
        }
    }

    return (
        <div className="row justify-content-center">
            <div className="card form-1 col-12 col-sm-12 col-md-10 col-lg-9 col-xl-7">
                <div className="card-body">
                    <div className="col-10 pt-4 pb-2 m-auto">
                        <h5 className="card-title text-center pb-0 fs-4">¿Olvidaste tu contraseña?</h5>
                        <p className="text-center small">Por favor, ingresa una nueva contraseña:</p>
                    </div>
                    <form onSubmit={handleSubmit} noValidate>
                        {inputNewPassword.map((input) => (
                            <InputForm2
                                key={input.id}
                                type={input.type}
                                {...input}
                                value={form[input.name]}
                                onChange={handleChange}
                                reset={reset}
                            />
                        ))}
                        <div className="text-center">
                            <button type="submit" className="btn my-btn-success rounded-pill">Restablecer Contraseña</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormNewPassword;
