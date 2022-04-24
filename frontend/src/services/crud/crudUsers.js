import { getToken } from '../auth/getToken';
import { helpHttp } from '../../helpers/helpHttp';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { logout } from '../auth/logout';

export const crudUsers = (usersDb, setUsersDb) => {
    let api = helpHttp()
    const token = getToken()

    // ********** Crear Usuario **********
    const createUser = async (formData) => {
        let options = {
            body: formData,
            headers: {
                "authorization": `Bearer ${token}`
            },
        }
        await api.post("/users/guardar", options).then((res) => {
            if (!res.estado) {
                toast.error("No hay conexión con la base de datos!!!", { autoClose: 10000, theme: "colored" })
            }
            if (!res.error) {
                if (res.user) {
                    setUsersDb([...usersDb, res.user])
                    toast.success(res.msg)
                } else {
                    toast.error(res.msg)
                }
            } else {
                toast.error(res.msg)
            }
        })
    }

    // Registro de usuarios externos:
    const registerUser = async (user) => {
        user.rol = 3 // Rol 3 -> Usuario Externo
        user.estado = 1
        let options = {
            body: JSON.stringify(user),
            headers: { "content-type": "application/json" },
        }

        await api.post("/users/registro", options).then((res) => {
            if (!res.estado) {
                toast.error("No hay conexión con la base de datos!!!", { autoClose: 10000, theme: "colored" })
            }
            if (res.user) {
                toast.success(res.msg, { autoClose: 3000 })
                setTimeout(() => {
                    window.location.href = "/login"
                }, 3000)
            } else {
                toast.error(res.msg)
            }
        })
    }

    // ********** Editar Usuario **********
    const updateUser = async (formData) => {
        let nro_doc = formData.get("nro_doc")
        let options = {
            body: formData,
            headers: {
                "authorization": `Bearer ${token}`
            }
        }
        await api.post(`/users/editar/${nro_doc}`, options).then((res) => {
            if (!res.estado) {
                toast.error("No hay conexión con la base de datos!!!", { autoClose: 10000, theme: "colored" })
            }
            if (!res.error) {
                if (res.user) {
                    let newData = usersDb.map((e) => (e._id === res.user._id ? res.user : e))
                    setUsersDb(newData)
                    toast.success(res.msg)
                } else {
                    toast.error(res.msg)
                }
            } else {
                toast.error(res.msg)
            }
        })
    }

    // ********** Eliminar Usuario **********
    const deleteUser = (nro_doc) => {
        Swal.fire({
            html: `¿Estás seguro que quieres eliminar el usuario con número de documento <b>${nro_doc}</b>?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0b295e',
            cancelButtonColor: '#be0d1f',
            confirmButtonText: 'Sí, aceptar',
            cancelButtonText: 'Cancelar'
        }).then(res => {
            if (res.isConfirmed) {
                let options = {
                    headers: {
                        "authorization": `Bearer ${token}`
                    },
                }
                api.del(`/users/eliminar/${nro_doc}`, options).then((res) => {
                    if (!res.estado) {
                        toast.error("No hay conexión con la base de datos!!!", { autoClose: 10000, theme: "colored" })
                    }
                    if (!res.error) {
                        if (res.estado === "ok") {
                            let newData = usersDb.filter((el) => el.nro_doc !== nro_doc)
                            setUsersDb(newData)
                            toast.success(res.msg)
                        } else {
                            toast.error(res.msg)
                        }
                    } else {
                        toast.error(res.msg)
                    }
                })
            }
        })
    }

    const changePassword = (user) => {
        let options = {
            body: JSON.stringify(user),
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            }
        }
        api.post("/users/cambiar-password", options).then((res) => {
            if (!res.estado) {
                toast.error("No hay conexión con la base de datos!!!", { autoClose: 10000, theme: "colored" })
            }
            if (!res.error) {
                if (res.estado === "ok") {
                    toast.success(res.msg, { autoClose: 3000 })
                    setTimeout(() => {
                        logout()
                    }, 3000)
                } else {
                    toast.error(res.msg)
                }
            } else {
                toast.error(res.msg)
            }
        })
    }

    // Solicitar restablecimiento de contraseña:
    const resetPassword = (user) => {
        let options = {
            body: JSON.stringify(user),
            headers: { "content-type": "application/json" },
        }

        api.post("/users/reset-password", options).then((res) => {
            if (!res.estado) {
                toast.error("No hay conexión con la base de datos!!!", { autoClose: 10000, theme: "colored" })
            }
            if (!res.error) {
                if (res.estado === "ok") {
                    toast.info(res.msg)
                } else {
                    toast.error(res.msg)
                }
            } else {
                toast.error(res.msg)
            }
        })
    }

    // Restablecer contraseña:
    const newPassword = (user, resetToken) => {
        user.resetToken = resetToken
        let options = {
            body: JSON.stringify(user),
            headers: { "content-type": "application/json" },
        }

        api.post("/users/new-password", options).then((res) => {
            if (!res.error) {
                if (res.estado === "ok") {
                    toast.success(res.msg, { autoClose: 3000 })
                    setTimeout(() => {
                        window.location.href = "/login"
                    }, 3000)
                } else {
                    toast.error(res.msg)
                }
            } else {
                toast.error(res.msg)
            }
        })
    }

    return {
        createUser,
        registerUser,
        updateUser,
        deleteUser,
        changePassword,
        resetPassword,
        newPassword
    }
}