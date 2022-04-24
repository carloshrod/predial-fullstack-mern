import { useEffect, useState } from 'react';
import { generatePassword } from '../tools/generatePassword';
import { validateFormUser } from '../tools/validateForm';

const DEFAULT_AVATAR = "/img/default-avatar.png";
const IMG_LOADING = "/img/img-loading.gif";

export const useFormUser = (initialForm, usersDb, createUser, updateUser, userToEdit, setUserToEdit) => {
    const [form, setForm] = useState(initialForm);
    const [file, setFile] = useState("");
    const [avatar, setAvatar] = useState("")
    const [pathImage, setPathImage] = useState(IMG_LOADING)
    const [reset, setReset] = useState(false);

    useEffect(() => {
        if (userToEdit) {
            setPathImage(userToEdit.avatar.secure_url || DEFAULT_AVATAR)
            setForm(userToEdit);
        } else {
            setPathImage(DEFAULT_AVATAR)
            setForm(initialForm);
        }
    }, [userToEdit, initialForm]);

    const onChangeFile = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const image = e.target.files[0];
            if (image.type.includes("image")) {
                const reader = new FileReader()
                reader.readAsDataURL(image)
                reader.onload = function load() {
                    setPathImage(reader.result)
                }
                setFile(image)
            }
        }
    }

    const handleDeleteAvatar = (e) => {
        setFile("")
        setAvatar("delete")
        setPathImage(DEFAULT_AVATAR)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    };

    const handleReset = (e) => {
        setForm(initialForm);
        setUserToEdit(null);
        setPathImage(DEFAULT_AVATAR);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateFormUser(form, usersDb, userToEdit) === true) {
            if (form.estado === null) {
                const formData = new FormData();
                formData.append("nombres", form.nombres)
                formData.append("apellidos", form.apellidos)
                formData.append("tipo_doc", form.tipo_doc)
                formData.append("nro_doc", form.nro_doc)
                formData.append("email", form.email)
                formData.append("password", generatePassword(8))
                formData.append("telefono", form.telefono)
                formData.append("direccion", form.direccion)
                formData.append("rol", 2) // Rol 2 -> Usuario Interno
                formData.append("estado", 1)
                formData.append("created_predios", 0)
                formData.append("edited_predios", 0)
                formData.append("deleted_predios", 0)
                formData.append("avatar", avatar)    
                formData.append("imagen", file) // Archivo de imágen
                createUser(formData);
                handleReset();
                setReset(!reset);
            } else {
                const formData = new FormData();
                formData.append("nombres", form.nombres)
                formData.append("apellidos", form.apellidos)
                formData.append("tipo_doc", form.tipo_doc)
                formData.append("nro_doc", form.nro_doc)
                formData.append("email", form.email)
                formData.append("telefono", form.telefono)
                formData.append("direccion", form.direccion)
                formData.append("avatar", avatar)
                formData.append("imagen", file) // Archivo de imágen
                updateUser(formData);
                setFile("");
            }
        }
    };

    return {
        form,
        pathImage,
        reset,
        handleChange,
        onChangeFile,
        handleDeleteAvatar,
        handleSubmit
    }
}