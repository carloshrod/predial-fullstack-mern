import { getToken } from '../auth/getToken';
import { helpHttp } from '../../helpers/helpHttp';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const crudPredios = (prediosDb, setPrediosDb, usersDb, setUsersDb, historial, setHistorial) => {
    let api = helpHttp()
    const token = getToken()

    // ********** Crear Predio **********
    const createPredio = (predio) => {
        predio.estado = 1
        let options = {
            body: JSON.stringify(predio),
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            },
        }
        api.post("/predios/guardar", options).then((res) => {
            if (!res.estado) {
                toast.error("No hay conexión con la base de datos!!!", { autoClose: 10000, theme: "colored" })
            }
            if (!res.err) {
                if (res.predio) {
                    setPrediosDb([...prediosDb, res.predio])
                    toast.success(res.msg)
                    let newData = usersDb.map((e) => (e._id === res.user._id ? res.user : e))
                    setUsersDb(newData)
                    setHistorial([...historial, res.historial])
                } else {
                    toast.error(res.msg)
                }
            } else {
                toast.error(res.msg)
            }
        })
    }

    // ********** Editar Predio **********
    const updatePredio = (predio) => {
        let vrPredio = predio.valor_predio.replace(/[$.]/g, '')
        let vrPredial = vrPredio * 0.01
        predio.valor_predial = Math.round(vrPredial)
        let options = {
            body: JSON.stringify(predio),
            headers: {
                "content-type": "application/json",
                "authorization": `Bearer ${token}`
            },
        }
        api.post("/predios/editar", options).then((res) => {
            if (!res.estado) {
                toast.error("No hay conexión con la base de datos!!!", { autoClose: 10000, theme: "colored" })
            }
            if (!res.err) {
                let newData = prediosDb.map((e) => (e._id === predio._id ? predio : e))
                setPrediosDb(newData)
                let newUsersData = usersDb.map((e) => (e._id === res.user._id ? res.user : e))
                setUsersDb(newUsersData)
                setHistorial([...historial, res.historial]);
                if (res.estado === "ok") {
                    toast.success(res.msg)
                } else {
                    toast.error(res.msg)
                }
            } else {
                toast.error(res.msg)
            }
        })
    }

    // ********** Eliminar Predio **********
    const deletePredio = (codigo) => {
        Swal.fire({
            html: `¿Estás seguro que quieres eliminar el predio con código <b>${codigo}</b>?`,
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
                api.post(`/predios/eliminar/${codigo}`, options).then((res) => {
                    if (!res.estado) {
                        toast.error("No hay conexión con la base de datos!!!", { autoClose: 10000, theme: "colored" })
                    }
                    if (!res.err) {
                        let newData = prediosDb.filter((el) => el.codigo !== codigo)
                        setPrediosDb(newData)
                        toast.success(res.msg)
                        let newUsersData = usersDb.map((e) => (e._id === res.user._id ? res.user : e))
                        setUsersDb(newUsersData)
                        setHistorial([...historial, res.historial])
                    } else {
                        toast.error(res.msg)
                    }
                })
            }
        })
    }

    return {
        createPredio,
        updatePredio,
        deletePredio
    }
}