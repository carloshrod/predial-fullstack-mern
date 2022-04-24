import React, { useState, useEffect } from 'react';
import Header from '../components/shared/Header';
import Container from '../components/shared/Container';
import HomeUserExt from "../components/userExt/HomeUserExt";
import MyProfile from '../components/shared/MyProfile';
import FormUser from '../components/forms/FormUser';
import PagarImpuestos from '../components/userExt/PagarImpuestos';
import AsociarPredios from '../components/userExt/AsociarPredios';
import Loader from '../components/shared/Loader';
import Footer from "../components/shared/Footer";
import { auth } from '../services/auth/auth';
import { Navigate } from 'react-router-dom';
import { helpHttp } from '../helpers/helpHttp';
import { logout } from '../services/auth/logout';
import { getPayload } from '../services/auth/getPayload';
import { crudUsers } from '../services/crud/crudUsers';

function UserExtPage({ page }) {
    const [usersDb, setUsersDb] = useState([])
    const [userToEdit, setUserToEdit] = useState(null);
    const [loading, setLoading] = useState(false);
    let api = helpHttp();
    const payload = getPayload();

    useEffect(() => {
        setLoading(true);
        api.get("/users/listar")
            .then((res) => {
                if (!res.error) {
                    if (res.users) {
                        setUsersDb(res.users);
                    }
                } else {
                    setUsersDb(null);
                }
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const {
        updateUser, // Editar mi perfil
        changePassword // Cambiar contraseña
    } = crudUsers(usersDb, setUsersDb)

    // Autenticación por rol:
    const rol = payload ? payload.rol : null

    return (
        <>
            {auth() && rol === 3 ?
                <>
                    <main className="container-bg">
                        <Header usersDb={usersDb} payload={payload} />

                        {page === "home" &&
                            <Container titulo="Plataforma de Gestión Catastral" className="container d-flex align-items-center min-vh-100">
                                <HomeUserExt />  {/* Children */}
                            </Container>}

                        {page === "myProfile" &&
                            <Container titulo="Mi Perfil" className="container d-flex align-items-center min-vh-100">
                                <MyProfile
                                    loader={loading && <Loader />}
                                    usersDb={usersDb}
                                    payload={payload}
                                    changePassword={changePassword}
                                    setUserToEdit={setUserToEdit}
                                    formEdit={
                                        <FormUser
                                            updateUser={updateUser}
                                            userToEdit={userToEdit}
                                            setUserToEdit={setUserToEdit}
                                            btn_text="Editar"
                                        />}
                                />  {/* Children */}
                            </Container>}

                        {page === "asociarPredios" &&
                            <Container titulo="Asociar Predios" className="container d-flex align-items-center min-vh-100">
                                <AsociarPredios />  {/* Children */}
                            </Container>}

                        {page === "pagar" &&
                            <Container titulo="Pagar Impuesto Predial" className="container d-flex align-items-center min-vh-100">
                                <PagarImpuestos />  {/* Children */}
                            </Container>}

                        <Footer />
                    </main>
                </>
                :
                <>
                    {logout()}
                    <Navigate to={-1} />
                </>
            }
        </>
    )
}

export default UserExtPage;
