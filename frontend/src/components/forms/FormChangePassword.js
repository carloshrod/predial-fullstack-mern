import React, { useState } from 'react';
import InputForm2 from '../inputForms/InputForm2';
import { validateFormChangePassword } from '../../tools/validateForm';

export const initialForm = {
    currentPassword: "",
    newPassword: "",
    renewPassword: ""
}

function FormChangePassword({ changePassword }) {
    const [form, setForm] = useState(initialForm);

    const inputChangePassword = [
        {
            id: "IdCurrentPassword",
            name: "currentPassword",
            type: "password",
            className: "mt-2 mb-2",
            logo: "bi bi-lock-fill",
            label: "Contraseña actual:",
            required: true,
        },
        {
            id: "IdNewPassword",
            name: "newPassword",
            type: "password",
            className: "mt-2 mb-2",
            logo: "bi bi-lock-fill",
            errorMessage: "La contraseña debe tener una longitud mínima de 8; contener al menos 1 mayuscula, 1 minuscula, 1 número y un caracter especial!!!",
            label: "Nueva contraseña:",
            pattern: "^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])((?=.*\\W)|(?=.*_)).*$",
            required: true,
        },
        {
            id: "IdRenewPassword",
            name: "renewPassword",
            type: "password",
            className: "mt-2 mb-2",
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

        if (validateFormChangePassword(form)) {
            changePassword(form);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} noValidate>
                {inputChangePassword.map((input) => (
                    <InputForm2
                        key={input.id}
                        type={input.type}
                        {...input}
                        value={form[input.name]}
                        onChange={handleChange}
                    />
                ))}
                <div className="text-center">
                    <button type="submit" className="btn my-btn-success rounded-pill">Cambiar Contraseña</button>
                </div>
            </form>

        </>
    );
}

export default FormChangePassword;
