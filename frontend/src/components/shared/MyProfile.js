import React from 'react';
import { getLoggedUser } from '../../services/auth/getLoggedUser';
import FormChangePassword from '../forms/FormChangePassword'

export const initialForm = {
    currentPassword: "",
    newPassword: "",
    renewPassword: "",
}

const DEFAULT_AVATAR = "/img/default-avatar.png";

function MyProfile({ loader, usersDb, payload, setUserToEdit, formEdit, changePassword }) {
    const loggedUser = getLoggedUser(usersDb, payload)
    const { avatar, nombres, apellidos, nro_doc, email, telefono, direccion } = loggedUser || {};
    const { secure_url } = avatar || {};

    const handleEdit = (e) => {
        setUserToEdit(loggedUser);
    }

    return (
        <div className="profile col-12">
            <ul className="nav nav-tabs nav-tabs-bordered">
                <li className="nav-item mt-1">
                    <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Vista General</button>
                </li>

                <li className="nav-item mt-1">
                    <button type="button" className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit" onClick={handleEdit}>Editar Perfil</button>
                </li>

                <li className="nav-item mt-1">
                    <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Cambiar Contraseña</button>
                </li>
            </ul>

            <div className="tab-content pt-3">
                <div className="tab-pane fade show active profile-overview" id="profile-overview">
                    {loggedUser ?
                        <>
                            <div className="card-body profile-card d-flex flex-column align-items-center mt-3">
                                <img src={secure_url || DEFAULT_AVATAR} alt="Profile" className="img-fluid rounded-circle avatar" />
                                <h2 className="text-center mt-3">{nombres + " " + apellidos}</h2>
                                <div className="social-links mt-3 mb-3">
                                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="twitter"><i className="bi bi-twitter"></i></a>
                                    <a href="https://es-la.facebook.com" target="_blank" rel="noreferrer" className="facebook"><i className="bi bi-facebook"></i></a>
                                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="instagram"><i className="bi bi-instagram"></i></a>
                                    <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="linkedin"><i className="bi bi-linkedin"></i></a>
                                </div>
                            </div>

                            <div className="col-12 col-sm-8 text-center mx-auto">
                                <div className="row justify-content-center">
                                    <div className="col-5 col-sm-5 col-md-4 col-lg-4 label">Nombre Completo:</div>
                                    <div className="col-7 col-sm-5 col-md-6 col-lg-6 vh-center">{nombres + " " + apellidos}</div>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col-5 col-sm-5 col-md-4 col-lg-4 label">Número de Documento:</div>
                                    <div className="col-7 col-sm-5 col-md-6 col-lg-6 vh-center">{nro_doc}</div>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col-5 col-sm-5 col-md-4 col-lg-4 label">Correo Electrónico:</div>
                                    <div className="col-7 col-sm-5 col-md-6 col-lg-6 vh-center">{email}</div>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col-5 col-sm-5 col-md-4 col-lg-4 label">Dirección de Residencia:</div>
                                    <div className="col-7 col-sm-5 col-md-6 col-lg-6 vh-center">{direccion}</div>
                                </div>

                                <div className="row justify-content-center">
                                    <div className="col-5 col-sm-5 col-md-4 col-lg-4 label">Teléfono:</div>
                                    <div className="col-7 col-sm-5 col-md-6 col-lg-6 vh-center">{telefono}</div>
                                </div>
                            </div>
                        </>
                        :
                        <h2 className="text-center m-5">{loader}{!loader && "¡No hay información!"}</h2>
                    }
                </div>

                <div className="tab-pane fade pt-3" id="profile-edit">
                    {formEdit}
                </div>

                <div className="tab-pane fade pt-3" id="profile-change-password">
                    <div className="card-body profile-card d-flex flex-column align-items-center">
                        <img src={secure_url || DEFAULT_AVATAR} alt="Profile" className="img-fluid rounded-circle avatar" />
                        {loggedUser ?
                            <>
                                <h2 className="text-center mt-3">{nombres + " " + apellidos}</h2>
                                <div className="social-links mt-3 mb-3">
                                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="twitter"><i className="bi bi-twitter"></i></a>
                                    <a href="https://es-la.facebook.com" target="_blank" rel="noreferrer" className="facebook"><i className="bi bi-facebook"></i></a>
                                    <a href="https://www.instagram.com" target="_blank" rel="noreferrer" className="instagram"><i className="bi bi-instagram"></i></a>
                                    <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="linkedin"><i className="bi bi-linkedin"></i></a>
                                </div>
                            </>
                            :
                            <h2 className="text-center">{loader}{!loader && "¡No hay información!"}</h2>
                        }
                    </div>

                    <div className="col-12 col-sm-10 mx-auto">
                        <FormChangePassword changePassword={changePassword} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MyProfile;
