import React from 'react';
import ReactTooltip from 'react-tooltip';
import { useFormUser } from '../../hooks/useFormUser';
import { inputUsers } from '../../tools/inputProps';
import InputForm from '../inputForms/InputForm';

const initialForm = {
    estado: null,
    nombres: "",
    apellidos: "",
    tipo_doc: "",
    nro_doc: "",
    email: "",
    telefono: "",
    direccion: "",
};

function FormUser({ usersDb, createUser, updateUser, userToEdit, setUserToEdit, deleteAvatar, titulo, btn_text }) {
    const {
        form,
        pathImage,
        reset,
        handleChange,
        onChangeFile,
        handleDeleteAvatar,
        handleSubmit
    } = useFormUser(initialForm, usersDb, createUser, updateUser, userToEdit, setUserToEdit, deleteAvatar);

    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    {titulo && <h5 className="card-title">{titulo}</h5>}
                    <form className="row g-3 needs-validation" encType="multipart/form-data" onSubmit={handleSubmit} noValidate>

                        <div className="col-12 text-center mb-3">
                            <img src={pathImage} alt="Profile" className="img-fluid rounded-circle center-img avatar mb-2" />
                            <label data-tip data-for="toolTipUpload" className="btn my-btn-edit custom-file-upload m-1">
                                <ReactTooltip id="toolTipUpload" place="top" type="dark" effect="solid">
                                    Subir imágen de perfil
                                </ReactTooltip>
                                <input type="file" name="file" onChange={onChangeFile} />
                                <i className="bi bi-upload" />
                            </label>
                            <label data-tip data-for="toolTipDelete" className="m-1">
                                <ReactTooltip id="toolTipDelete" place="top" type="dark" effect="solid">
                                    Eliminar imágen de perfil
                                </ReactTooltip>
                                <button type="button" className="btn my-btn-delete" onClick={handleDeleteAvatar}>
                                    <i className="bi bi-trash" />
                                </button>
                            </label>
                        </div>

                        {inputUsers.map((input) => (
                            <InputForm
                                key={input.id}
                                type={input.type}
                                {...input}
                                value={form[input.name]}
                                onChange={handleChange}
                                reset={reset}
                            />
                        ))}

                        <div className="col-5 col-sm-3 col-md-2 col-lg-2 m-auto mt-3">
                            <button className="btn my-btn-success rounded-pill w-100" type="submit">{btn_text}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormUser;
