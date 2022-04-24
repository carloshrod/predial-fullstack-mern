import React, { useEffect, useState } from 'react';
import HeaderAdmin from "../components/admin/HeaderAdmin";
import Sidebar from "../components/admin/Sidebar";
import ContainerAdmin from '../components/admin/ContainerAdmin';
import FooterAdmin from "../components/admin/FooterAdmin";
import Dashboard from '../components/admin/Dashboard';
import MyProfile from '../components/shared/MyProfile';
import FormUser from '../components/forms/FormUser';
import FormPredio from '../components/forms/FormPredio';
import TableUsers from '../components/tables/TableUsers';
import TablePredios from '../components/tables/TablePredios';
import Loader from '../components/shared/Loader';
import Message from '../components/shared/Message';
import { helpHttp } from '../helpers/helpHttp';
import { auth } from '../services/auth/auth';
import { Navigate } from 'react-router-dom';
import { logout } from '../services/auth/logout';
import { getPayload } from '../services/auth/getPayload';
import { crudUsers } from '../services/crud/crudUsers';
import { crudPredios } from '../services/crud/crudPredios';

function AdminPage({ type, page }) {
    const [usersDb, setUsersDb] = useState([])
    const [userToEdit, setUserToEdit] = useState(null);
    const [prediosDb, setPrediosDb] = useState([])
    const [predioToEdit, setPredioToEdit] = useState(null);
    const [historial, setHistorial] = useState([])
    const [error, setError] = useState(null);
    const [msgError, setMsgError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [inactive, setInactive] = useState(false); // Toggle-Sidebar
    let api = helpHttp();
    const payload = getPayload();

    // ******************** CRUD Users ********************
    // Obtener usuarios:
    useEffect(() => {
        setLoading(true);
        api.get("/users/listar")
            .then((res) => {
                if (!res.error) {
                    setError(null);
                    if (res.users) {
                        setUsersDb(res.users);
                    } else {
                        setError(true);
                        setMsgError("Error, no hay conexión con la base de datos!!!");
                    }
                } else {
                    setUsersDb(null);
                }
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        createUser, // Crear usuarios
        updateUser, // Editar usuarios
        deleteUser, // Eliminar usuarios
        changePassword // Cambiar contraseña
    } = crudUsers(usersDb, setUsersDb)
    // ******************** End CRUD Users ********************

    // ********************* CRUD predios *********************
    // Obtener predios:
    useEffect(() => {
        setLoading(true);
        api.get("/predios/listar")
            .then((res) => {
                if (!res.error) {
                    setError(null);
                    if (res.predios) {
                        setPrediosDb(res.predios);
                    } else {
                        setError(true);
                        setMsgError("Error, no hay conexión con la base de datos!!!");
                    }
                } else {
                    setPrediosDb(null);
                }
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Obtener historial:
    useEffect(() => {
        setLoading(true);
        api.get("/predios/historial")
            .then((res) => {
                if (!res.error) {
                    setError(null);
                    if (res.historial) {
                        setHistorial(res.historial)
                    } else {
                        setError(true);
                        setMsgError("Error, no hay conexión con la base de datos!!!");
                    }
                } else {
                    setHistorial(null);
                }
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        createPredio, // Crear predios
        updatePredio, // Editar predios
        deletePredio // Eliminar predios
    } = crudPredios(prediosDb, setPrediosDb, usersDb, setUsersDb, historial, setHistorial)
    // ******************* End CRUD predios *******************

    // Contar usuarios por rol:
    const countUsers = usersDb && ((rol) => usersDb.filter((e) => (e.rol === rol)).length)

    // Contar predios:
    const countPredios = prediosDb && prediosDb.length

    // Autenticación por rol:
    const rol = payload ? payload.rol : null

    return (
        <>
            {auth() && (rol === 1 || rol === 2) ?
                <>
                    <main className={inactive ? "toggle-sidebar" : ""}>
                        <HeaderAdmin
                            btn={<div onClick={() => { setInactive(!inactive) }}>
                                <i className="nav-home-ue bi bi-list toggle-sidebar-btn"></i>
                            </div>}
                            usersDb={usersDb}
                            payload={payload}
                        />
                        <Sidebar />

                        {page === "home" &&
                            <ContainerAdmin
                                titulo="Dashboard"
                                linkTo="#"
                                error={error && <Message msg={msgError} bgColor="#dc3545" />}
                            >
                                <Dashboard
                                    loader={loading && <Loader />}
                                    cantidadUsuarios={countUsers}
                                    cantidadPredios={countPredios}
                                    usersDb={usersDb}
                                    prediosDb={prediosDb}
                                    historial={historial}
                                />  {/* Children */}
                            </ContainerAdmin>}

                        {page === "myProfile" &&
                            <ContainerAdmin
                                titulo="Mi Perfil"
                                linkTo="#"
                                error={error && <Message msg={msgError} bgColor="#dc3545" />}
                            >
                                <MyProfile
                                    loader={loading && <Loader />}
                                    usersDb={usersDb}
                                    payload={payload}
                                    setUserToEdit={setUserToEdit}
                                    changePassword={changePassword}
                                    formEdit={
                                        <FormUser
                                            updateUser={updateUser}
                                            userToEdit={userToEdit}
                                            setUserToEdit={setUserToEdit}
                                            btn_text="Editar"
                                        />}
                                />  {/* Children */}
                            </ContainerAdmin>}

                        {page === "createUser" &&
                            <ContainerAdmin titulo="Crear Usuario" linkTo="#" >
                                <FormUser
                                    titulo="Ingrese los datos del usuario"
                                    usersDb={usersDb}
                                    createUser={createUser}
                                    setUserToEdit={setUserToEdit}
                                    btn_text="Crear"
                                />  {/* Children */}
                            </ContainerAdmin>}

                        {page === "manageUsers" &&
                            <ContainerAdmin
                                titulo="Gestionar Usuarios"
                                linkTo="#"
                                error={error && <Message msg={msgError} bgColor="#dc3545" />}
                            >
                                <TableUsers
                                    loader={loading && <Loader />}
                                    users={usersDb.filter((user) => user.rol !== 1)}
                                    setUserToEdit={setUserToEdit}
                                    deleteUser={deleteUser}
                                />
                            </ContainerAdmin>}

                        {page === "editUser" &&
                            <ContainerAdmin titulo="Editar Usuario" linkTo="/admin/manage-users" subtitulo="Gestionar Usuarios" sep="&nbsp;/&nbsp;" subtitulo2="Editar Usuario">
                                <FormUser
                                    titulo="Datos del usuario a editar"
                                    usersDb={usersDb}
                                    updateUser={updateUser}
                                    userToEdit={userToEdit}
                                    setUserToEdit={setUserToEdit}
                                    btn_text="Editar"
                                />  {/* Children */}
                            </ContainerAdmin>}

                        {page === "createPredio" &&
                            <ContainerAdmin titulo="Crear Predio" linkTo="#">
                                <FormPredio
                                    titulo="Ingrese los datos del predio"
                                    prediosDb={prediosDb}
                                    createPredio={createPredio}
                                    updatePredio={updatePredio}
                                    setPredioToEdit={setPredioToEdit}
                                    btn_text="Crear"
                                />  {/* Children */}
                            </ContainerAdmin>}

                        {page === "managePredio" &&
                            <ContainerAdmin
                                titulo="Gestionar Predios"
                                linkTo="#"
                                error={error && <Message msg={msgError} bgColor="#dc3545" />}
                            >
                                <TablePredios
                                    loader={loading && <Loader />}
                                    predios={prediosDb}
                                    setPredioToEdit={setPredioToEdit}
                                    deletePredio={deletePredio}
                                    linkTo={type === "admin" ? "/admin/manage-predios/edit" : "/user-int/manage-predios/edit"}
                                />
                            </ContainerAdmin>}

                        {page === "editPredio" &&
                            <ContainerAdmin
                                titulo="Editar Predio"
                                linkTo={type === "admin" ? "/admin/manage-predios" : "/user-int/manage-predios"}
                                subtitulo="Gestionar Predios"
                                sep="&nbsp;/&nbsp;"
                                subtitulo2="Editar Predio">
                                <FormPredio
                                    titulo="Datos del predio a editar"
                                    prediosDb={prediosDb}
                                    createPredio={createPredio}
                                    updatePredio={updatePredio}
                                    predioToEdit={predioToEdit}
                                    setPredioToEdit={setPredioToEdit}
                                    btn_text="Editar"
                                />  {/* Children */}
                            </ContainerAdmin>}

                        <FooterAdmin />
                    </main>
                </>
                :
                <>
                    {logout()}
                    <Navigate to={-1} />
                </>
            }
        </>
    );
}

export default AdminPage;